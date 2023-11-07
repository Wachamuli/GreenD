import React, { useEffect } from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  TextInput,
  Alert,
  Image,
} from "react-native";

import { Controller, useForm } from "react-hook-form";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import z from "zod";

import Header from "./Header";
import Par from "./Par";
import Tappable from "./controls/Tappable";
import Checkbox from "./controls/Checkbox";
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from "../utilities/metrics";
import { RootStackParamList, navigationProp } from "../screens/HomeScreen";
import { Outsourcers, Services } from "../api/mockData";

// TODO: Maybe use agenda
import OutsourcerCard from "./OutsourcerCard";
import { zodResolver } from "@hookform/resolvers/zod";
import MyCalendar from "./MyCalendar";
import Field from "./controls/Field";
import Details from "./Details";
import ErrorMessage from "./ErrorMessage";

const ServiceDetailsSchema = z.object({
  details: z.array(z.string()).min(1, "Seleccione al menos un detalle."),
  calendar: z.coerce.date(),
  outsourcer: z.string().min(1, "Asigna un contrata"),
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

  const today = new Date();
  today.setDate(today.getDay() + 15);

  return (
    <>
      <ScrollView
        contentContainerStyle={{ backgroundColor: "white" }}
        style={styles.serviceDetailsContainer}>
        <Image source={getService?.serviceImage} style={styles.serviceImage} />
        <View style={styles.textContainer}>
          <Header title={getService?.serviceName} />
          <View style={styles.serviceDescriptionContainer}>
            <Par>{getService?.serviceFullDescription}</Par>
          </View>

          <Header title="Solicitar" />
          <View style={styles.detailsContainer}>
            <Details
              name="details"
              data={getService?.serviceDetails}
              formValue={setValue}
              control={control}
            />
          </View>

          <Header title="Agendar" />
          <View style={styles.agendaContainer}>
            <MyCalendar name="calendar" formSet={setValue} control={control} />
          </View>

          <Header title="Contratar" />
          <View style={styles.agendaContainer}>
            <OutsourcerCard
              name="outsourcer"
              data={Outsourcers}
              control={control}
              formSet={setValue}
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
        </View>
      </ScrollView>

      <View style={styles.buttonContainer}>
        <Tappable
          title="Solicitar"
          onPress={handleSubmit(() =>
            navigation.navigate("serviceResume", {
              serviceId: route.params.serviceId,
              selectedDetails: getValues("details"),
              selectedDay: getValues("calendar"),
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
  buttonContainer: {
    position: "absolute",
    width: "100%",
    bottom: 0,
  },
});

export default ServiceDetails;
