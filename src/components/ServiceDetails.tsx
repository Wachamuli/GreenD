import React, { useEffect, useState } from "react";
import {
  ScrollView,
  Text,
  StyleSheet,
  View,
  TextInput,
  FlatList,
  Button,
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
import { Agenda, Calendar } from "react-native-calendars";
import { useNavigation } from "@react-navigation/native";

type ScreenProps = NativeStackScreenProps<RootStackParamList, "serviceDetails">;

const ServiceDetails = ({ route }: ScreenProps): JSX.Element => {
  const [isChecked, setIsChecked] = useState<boolean[]>([]);
  const [selectedDetails, setSelectedDetails] = useState(["Suma"]);

  const [notes, setNotes] = useState("");
  const navigation = useNavigation<navigationProp>();

  const getService = Services.find(
    item => item.serviceId.toString() == route.params.serviceId,
  );


  useEffect(() => console.log(selectedDetails), [selectedDetails])


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

          {selectedDetails.map((value, index) => (
            <Gtext key={index}>{value}</Gtext>
          ))}

          <Gheader title="Contratar" />
          <View style={styles.detailsContainer}>
            {getService?.serviceDetails.map((detail, index) => (
              <Detail
                detail={detail}
                key={index}
                value={isChecked[index]}
                onValueChange={() => {
                  const newCheks = [...isChecked]
                  newCheks[index] = !newCheks[index]

                  if (newCheks[index]) {
                    setSelectedDetails(prevState => [...prevState, detail])
                  } else {
                    setSelectedDetails(selectedDetails.filter((value) => value !== detail))
                  }

                  setIsChecked(newCheks)
                }} 
              />
            ))}
          </View>

          <Gheader title={"Agendar"} />
          <View style={styles.agendaContainer}>
            <Calendar />
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
