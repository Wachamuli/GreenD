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
import { zodResolver } from "@hookform/resolvers/zod";

import { supabase } from "../../../lib/supabase";
import Header from "../../../components/info/Header";
import Txt from "../../../components/info/Txt";
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from "../../../utilities/metrics";
import Field from "../../../components/controls/Field";
import Details from "../../../components/DetailList";
import Btn from "../../../components/controls/Btn";
import {
  ServiceDetailsSchema,
  serviceDetailsSchema,
} from "../../../utilities/validators/ServiceDetailsSchema";
import OutsourcerCard from "../../../components/OutsourcerCard";
import { router, useLocalSearchParams, useNavigation } from "expo-router";

const ServiceDetails = (): JSX.Element => {
  const navigation = useNavigation();
  const params = useLocalSearchParams();
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
      .eq("id", params.serviceId)
      .single();

    setService(data);
  };

  const getDetails = async () => {
    const { data, error } = await supabase
      .from("details")
      .select("detail")
      .eq("service_id", params.serviceId);

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
      .eq("service", params.serviceId)
      .eq("condominium", user?.user_metadata.condominium);

    setOutsourcers(data);
  };

  useEffect(() => {
    getServiceData();
    getDetails();
    getOutsourcers();
  }, []);

  useEffect(() => {
    navigation.setOptions({ title: service?.name });
  }, [service]);

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
    <ScrollView
      keyboardDismissMode="on-drag"
      contentContainerStyle={{ backgroundColor: "white" }}
      style={styles.serviceDetailsContainer}>
      {/* <Image source={{ uri: service?.image }} style={styles.serviceImage} /> */}

      <View style={styles.mainContainer}>
        <Header title="Contratar" />
        <View>
          <OutsourcerCard
            name="outsourcer"
            data={outsourcers}
            control={control}
            onValueChange={setValue}
          />
        </View>

        <View style={styles.serviceDescriptionContainer}>
          <Txt>{service?.description}</Txt>
        </View>

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

        <Header
          title="Nota"
          style={{
            fontSize: moderateScale(18),
            marginTop: verticalScale(5),
          }}
        />

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

        <Btn
          label="Continuar"
          style={styles.button}
          onPress={handleSubmit(values =>
            router.push({
              pathname: "/home/booking",
              params: {
                serviceId: params.serviceId,
                selectedDetails: values.details,
                selectedOutsourcer: values.outsourcer,
                note: values.note,
              },
            }),
          )}
        />
      </View>
    </ScrollView>
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
  mainContainer: {
    paddingHorizontal: horizontalScale(20),
    paddingVertical: verticalScale(10),
  },
  serviceDescriptionContainer: {
    marginBottom: verticalScale(20),
  },
  detailsContainer: {
    // marginBottom: verticalScale(30),
  },
  agendaContainer: {
    flexDirection: "column",
    marginBottom: verticalScale(30),
  },
  bottonAgendaContainer: {
    justifyContent: "center",
  },
  textInputContainer: {
    // marginBottom: verticalScale(30),
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
    width: "100%",
  },
});

export default ServiceDetails;
