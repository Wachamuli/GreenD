import React, { useEffect, useMemo, useState } from "react";
import {
  ScrollView,
  Text,
  StyleSheet,
  View,
  TextInput,
  FlatList,
  Button,
  Alert,
} from "react-native";

import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { RootStackParamList, navigationProp } from "../screens/HomeScreen";
import { Services } from "../api/mockData";
import { Image } from "react-native";
import Gheader from "./Gheader";
import Gtext from "./Gtext";
import Gbutton from "./Gbutton";
import Detail from "./Detail";
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from "../utilities/metrics";

// TODO: Maybe use agenda
import { Agenda, Calendar, WeekCalendar } from "react-native-calendars";
import { useNavigation } from "@react-navigation/native";

type ScreenProps = NativeStackScreenProps<RootStackParamList, "serviceDetails">;

const ServiceDetails = ({ route }: ScreenProps): JSX.Element => {
  const [checkedDetails, setCheckedDetails] = useState<{
    [key: string]: boolean;
  }>({});
  const [selectedDay, setSelectedDay] = useState<string>("");
  const [notes, setNotes] = useState("");
  const navigation = useNavigation<navigationProp>();

  const getDetails = (checkedDetails: { [key: string]: boolean }) => {
    const cleanDetails = Object.entries(checkedDetails).filter(
      check => check[1],
    );
    return Object.assign(cleanDetails);
  };

  const getService = Services.find(
    item => item.serviceId.toString() == route.params.serviceId,
  );

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

  const marked = useMemo(() => {
    return {
      [selectedDay]: {
        selected: true,
        selectedColor: "black",
        textColor: "white",
      },
    };
  }, [selectedDay]);

  const today = new Date();
  today.setDate(today.getDay() + 15);

  return (
    <>
      <ScrollView
        contentContainerStyle={{ backgroundColor: "white" }}
        style={styles.serviceDetailsContainer}>
        <Image source={getService?.serviceImage} style={styles.serviceImage} />
        <View style={styles.textContainer}>
          <Gheader title={getService?.serviceName} />
          <View style={styles.serviceDescriptionContainer}>
            <Gtext>{getService?.serviceFullDescription}</Gtext>
          </View>

          <Gheader title="Contratar" />
          <View style={styles.detailsContainer}>
            {getService?.serviceDetails.map((detail, index) => (
              <Detail
                detail={detail}
                key={index}
                value={checkedDetails[detail]}
                onValueChange={() => {
                  const newCheks = { ...checkedDetails };
                  newCheks[detail] = !newCheks[detail];
                  setCheckedDetails(prevState => ({
                    ...prevState,
                    [detail]: newCheks[detail],
                  }));
                }}
              />
            ))}
          </View>

          <Gheader title={"Agendar"} />
          <View style={styles.agendaContainer}>
            <Calendar
              enableSwipeMonths
              // disableAllTouchEventsForDisabledDays
              testID="Details"
              minDate={new Date().toString()}
              maxDate={today.toString()}
              onDayPress={day => setSelectedDay(day.dateString)}
              markedDates={marked}
            />
          </View>

          <Gheader title="Nota" />
          <View style={styles.textInputContainer}>
            <TextInput
              style={styles.textInput}
              onChangeText={setNotes}
              value={notes}
              selectTextOnFocus={true}
              placeholder="Escriba una nota aquí"
              placeholderTextColor={"black"}
            />
          </View>
        </View>
      </ScrollView>

      <View style={styles.buttonContainer}>
        <Gbutton
          title="Solicitar"
          onPress={() =>
            navigation.navigate("serviceResume", {
              serviceId: route.params.serviceId,
              selectedDetails: getDetails(checkedDetails),
              selectedDay: selectedDay,
              note: notes,
            })
          }
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
    borderWidth: 2,
    minHeight: verticalScale(100),
  },
  buttonContainer: {
    position: "absolute",
    // padding: 6,
    width: "100%",
    bottom: 0,
  },
});

export default ServiceDetails;
