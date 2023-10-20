import React, { useState } from "react";
import {
  ScrollView,
  Text,
  StyleSheet,
  View,
  TextInput,
  FlatList,
  Button,
} from "react-native";
import CheckBox from "expo-checkbox";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { RootStackParamList } from "../screens/HomeScreen";
import { Services } from "../api/mockData";
import { Image } from "react-native";
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from "../utilities/metrics";

type ScreenProps = NativeStackScreenProps<RootStackParamList, "serviceDetails">;

const ServiceDetails = ({ route }: ScreenProps): JSX.Element => {
  const getService = Services.find(
    item => item.serviceId.toString() == route.params.serviceId,
  );

  const [toggleCheckbox, setToggleCheckbox] = useState(false);
  const [notes, setNotes] = useState("");

  return (
    <View style={{ position: "relative" }}>
      <Image source={getService?.serviceImage} style={styles.serviceImage} />
      <Text style={styles.textContainer}>
        <Text style={styles.header}>{getService?.serviceName}</Text>
        <Text>{getService?.serviceFullDescription}</Text> {"\n"}
        <Text>
          {getService?.serviceDetails.map((item, index) => (
            <>
              <CheckBox
                disabled={false}
                value={toggleCheckbox}
                onValueChange={() => setToggleCheckbox(!toggleCheckbox)}
                />
                <Text>{item}</Text> {"\n"}
            </>
          ))}
        </Text>
      </Text>
      <Text>Notas</Text>
      <TextInput
        style={styles.textInput}
        onChangeText={setNotes}
        value={notes}
        placeholder="Escriba una nota aquí"
      />
      <View style={styles.buttonContainer}>
        <Button title="Solicitar" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  serviceImage: {
    width: "100%",
    maxHeight: verticalScale(200),
  },
  textContainer: {
    color: "black",
    paddingHorizontal: horizontalScale(10),
    paddingVertical: verticalScale(10),
  },
  header: {
    fontSize: moderateScale(24),
    fontWeight: "bold",
    marginBottom: verticalScale(20),
  },
  buttonContainer: {
    position: "absolute",
    width: "100%",
    bottom: 0,
  },
  textInput: {
    color: "black",
    width: "100%",
    borderColor: "black",
    borderWidth: 2,
  },
});

export default ServiceDetails;
