import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View, Alert, Image } from "react-native";

import { useForm } from "react-hook-form";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";

import Header from "./Header";
import Txt from "./Txt";
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from "../utilities/metrics";
import { RootStackParamList } from "../screens/HomeScreen";
import { Outsourcers, Services } from "../api/mockData";

import OutsourcerCard from "./OutsourcerCard";
import MyCalendar from "./MyCalendar";
import Field from "./controls/Field";
import Details from "./DetailList";
import TimePicker from "./TimePicker";
import DateDisplayer from "./DateDisplayer";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import Btn from "./controls/Btn";

const ServiceDetailsSchema = z.object({
  details: z.array(z.string()).min(1, "Seleccione al menos un detalle."),
  calendar: z.coerce.date(),
  outsourcer: z.string().min(1, "Asigna un contrata"),
  timePicker: z.string(),
  note: z.string().optional(),
});

type ScreenProps = NativeStackScreenProps<RootStackParamList, "serviceDetails">;

const ServiceDetails = ({ route, navigation }: ScreenProps): JSX.Element => {
  const { handleSubmit, control, getValues, setValue, formState } = useForm({
    resolver: zodResolver(ServiceDetailsSchema),
  });

  useEffect(() =>
    navigation.addListener("beforeRemove", event => {
      event.preventDefault();
      Alert.alert(
        "¿Descartar solicitud?",
        "Si sales de esta sección se eliminarán los detalles de tu solicitud",
        [
          { text: "Continuar", onPress: () => {} },
          {
            text: "Descartar",
            onPress: () => navigation.dispatch(event.data.action),
          },
        ],
      );
    }),
  );

  const getService = Services.find(
    item => item.serviceId.toString() == route.params.serviceId,
  );

  const [date, setDate] = useState<string>();

  return (
    <>
      <ScrollView
        keyboardDismissMode="on-drag"
        contentContainerStyle={{ backgroundColor: "white" }}
        style={styles.serviceDetailsContainer}>
        <Image source={getService?.serviceImage} style={styles.serviceImage} />
        <View style={styles.textContainer}>
          <Header title={getService?.serviceName} />
          <View style={styles.serviceDescriptionContainer}>
            <Txt>{getService?.serviceFullDescription}</Txt>
          </View>

          <Header title="Solicitar" />
          <View style={styles.detailsContainer}>
            <Details
              name="details"
              data={getService?.serviceDetails}
              onValueChange={setValue}
              control={control}
            />
          </View>

          <Header title="Agendar" />
          {/* <View style={styles.agendaContainer}> */}
            {/* <MyCalendar
              name="calendar"
              onValueChange={setDate}
              onChange={setValue}
              control={control}
            />
            <DateDisplayer date={date} />
            <TimePicker
              onValueChange={setValue}
              name="timePicker"
              control={control}
            /> */}
          {/* </View> */}

          <Header title="Contratar" />
          <View>
            <OutsourcerCard
              name="outsourcer"
              data={Outsourcers}
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
        </View>
      </ScrollView>

      <View style={styles.buttonContainer}>
        <Btn
          label="Solicitar"
          onPress={handleSubmit(() =>
            navigation.navigate("serviceResume", {
              serviceId: route.params.serviceId,
              selectedDetails: getValues("details"),
              selectedDay: getValues("calendar"),
              selectedTime: getValues("timePicker"),
              selectedOutsourcer: getValues("outsourcer"),
              note: getValues("note"),
            }),
          )}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  serviceDetailsContainer: {
    position: "relative",
  },
  serviceImage: {
    width: "100%",
    maxHeight: verticalScale(200),
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
    marginBottom: verticalScale(30),
    rowGap: verticalScale(10),
    alignItems: "center",
  },
  bottonAgendaContainer: {
    justifyContent: "center",
    // rowGap: verticalScale(8),
  },
  textInputContainer: {
    marginBottom: verticalScale(30),
  },
  textInput: {
    color: "black",
    borderColor: "black",
    textAlignVertical: "top",
    borderWidth: 3,
    borderRadius: moderateScale(10),
    width: "100%",
    minHeight: verticalScale(150),
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
    position: "absolute",
    width: "100%",
    bottom: 0,
  },
});

export default ServiceDetails;
