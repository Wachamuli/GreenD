import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  View,
  Alert,
  Image,
} from "react-native";
import { useForm } from "react-hook-form";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { zodResolver } from "@hookform/resolvers/zod";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";

import { supabase } from "../lib/supabase";
import Header from "./Header";
import Txt from "./Txt";
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from "../utilities/metrics";
import { RootStackParamList } from "../screens/HomeStack";
import OutsourcerCard from "./OutsourcerCard";
import MyCalendar from "./MyCalendar";
import Field from "./controls/Field";
import Details from "./DetailList";
import TimePicker from "./TimePicker";
import DateDisplayer from "./DateDisplayer";
import Btn from "./controls/Btn";
import {
  ServiceDetailsSchema,
  serviceDetailsSchema,
} from "../utilities/validators/ServiceDetailsSchema";
import { boxShadowXP } from "../utilities/crossplatform";
import { Calendar } from "react-native-calendars";

type ScreenProps = NativeStackScreenProps<RootStackParamList, "serviceDetails">;

const ServiceDetails = ({ route, navigation }: ScreenProps): JSX.Element => {
  const [service, setService] = useState<{
    name: string;
    image: string;
    description: string;
  } | null>();
  const [details, setDetails] = useState<string[] | null>();
  const [outsourcers, setOutsourcers] = useState<
    | {
        id: string;
        name: string;
        logo: string | null;
        brief_description: string;
        condominium: string;
      }[]
    | null
  >();

  const {
    handleSubmit,
    control,
    setValue,
    formState: { isDirty: hasUnsavedChanges },
  } = useForm<ServiceDetailsSchema>({
    resolver: zodResolver(serviceDetailsSchema),
  });

  const getServiceData = async () => {
    const { data, error } = await supabase
      .from("services")
      .select("name, image, description")
      .eq("id", route.params.serviceId)
      .single();

    setService(data);
  };

  const getDetails = async () => {
    const { data, error } = await supabase
      .from("details")
      .select("detail")
      .eq("service_id", route.params.serviceId);

    const details = data?.map(item => item["detail"]);

    setDetails(details);
  };

  const getOutsourcers = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { data, error } = await supabase
      .from("outsourcers")
      .select("id, name, logo, brief_description, condominium")
      .eq("service", route.params.serviceId)
      .eq("condominium", user?.user_metadata.condominium);

    setOutsourcers(data);
  };

  useEffect(() => {
    getServiceData();
    getDetails();
    getOutsourcers();
  }, []);

  useEffect(() => {
    const handleBeforeRemove = (event: any) => {
      if (!hasUnsavedChanges) return;
      event.preventDefault();

      Alert.alert(
        "¿Descartar solicitud?",
        "Si sales de esta sección se eliminarán los detalles de tu solicitud.",
        [
          { text: "Continuar", onPress: () => {} },
          {
            text: "Descartar",
            onPress: () => navigation.dispatch(event.data.action),
          },
        ],
      );
    };

    const handleBlur = () => {
      navigation.removeListener("beforeRemove", handleBeforeRemove);
    };

    navigation.addListener("beforeRemove", handleBeforeRemove);
    // FIXME: Look for a better event or var. because unsaved changes pop up
    // it's not fired if you outfocus the screen to something else and comeback
    // even if it is not the resume screen.
    navigation.addListener("blur", handleBlur);

    return () => {
      navigation.removeListener("beforeRemove", handleBeforeRemove);
      navigation.removeListener("blur", handleBlur);
    };
  }, [navigation, hasUnsavedChanges]);

  return (
    <>
      <ScrollView
        keyboardDismissMode="on-drag"
        contentContainerStyle={{ backgroundColor: "white" }}
        style={styles.serviceDetailsContainer}>
        <Image source={{ uri: service?.image }} style={styles.serviceImage} />
        <View style={styles.textContainer}>
          <Header title={service?.name} />
          <View style={styles.serviceDescriptionContainer}>
            <Txt>{service?.description}</Txt>
          </View>

          <Header title="Solicitar" />
          <View style={styles.detailsContainer}>
            {details ? (
              <Details
                name="details"
                data={details}
                onValueChange={setValue}
                control={control}
              />
            ) : (
              <ActivityIndicator size={40} />
            )}
          </View>

          <Header title="Agendar" />
          <View style={styles.agendaContainer}>
            <MyCalendar onValueChange={setValue} name="calendar" control={control}/>
            {/* <DateDisplayer/> */}
            <TimePicker
              onValueChange={setValue}
              name="timePicker"
              control={control}
            />
          </View>

          <Header title="Contratar" />
          <View>
            <OutsourcerCard
              name="outsourcer"
              data={outsourcers}
              control={control}
              onValueChange={setValue}
            />
          </View>

          <Header title="Nota" />
          <View style={styles.textInputContainer}>
            <Field
              name="note"
              control={control}
              style={styles.textInput}
              selectTextOnFocus={true}
              multiline
              placeholder="Escriba una nota aquí"
            />
          </View>

          <View style={styles.infoContainer}>
            <FontAwesomeIcon style={styles.infoIcon} icon={faCircleInfo} />
            <Txt>
              <Txt style={styles.infoLabel}>info: </Txt>
              <Txt style={styles.infoContent}>
                es recomendable dar detalles en la nota ¡ayuda con la
                cotización!
              </Txt>
            </Txt>
          </View>

          <Btn
            label="Solicitar"
            style={styles.button}
            onPress={handleSubmit(values =>
              navigation.navigate("serviceResume", {
                serviceId: route.params.serviceId,
                selectedDetails: values.details,
                selectedDay: values.calendar.toUTCString(),
                selectedTime: values.timePicker,
                selectedOutsourcer: values.outsourcer,
                note: values.note,
              }),
            )}
          />
        </View>
      </ScrollView>

      {/* <View style={styles.buttonContainer}> */}
      {/* </View> */}
    </>
  );
};

const styles = StyleSheet.create({
  serviceDetailsContainer: {
    position: "relative",
  },
  serviceImage: {
    width: "100%",
    height: verticalScale(200),
  },
  textContainer: {
    marginHorizontal: horizontalScale(10),
    paddingVertical: verticalScale(10),
  },
  serviceDescriptionContainer: {
    marginBottom: verticalScale(30),
  },
  detailsContainer: {
    marginBottom: verticalScale(30),
  },
  agendaContainer: {
    flexDirection: "column",
    marginBottom: verticalScale(30),
    alignItems: "center",
  },
  bottonAgendaContainer: {
    justifyContent: "center",
  },
  textInputContainer: {
    marginBottom: verticalScale(30),
  },
  textInput: {
    textAlignVertical: "top",
    width: "100%",
    height: verticalScale(150),
  },
  infoContainer: {
    flexDirection: "row",
  },
  infoIcon: {
    marginRight: horizontalScale(2),
    marginTop: horizontalScale(3),
  },
  infoLabel: {
    textTransform: "uppercase",
    fontWeight: "bold",
  },
  infoContent: {
    color: "#9ca3af",
  },
  buttonContainer: {
    borderTopWidth: verticalScale(1),
    position: "absolute",
    backgroundColor: "white",
    alignItems: "flex-end",
    width: "100%",
    bottom: 0,
  },
  button: {
    borderRadius: moderateScale(10),
    marginRight: horizontalScale(10),
    width: horizontalScale(150),
  },
});

export default ServiceDetails;
