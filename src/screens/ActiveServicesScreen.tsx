import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import DateDisplayer from "../components/DateDisplayer";
import TimePicker from "../components/TimePicker";
import { useForm } from "react-hook-form";
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from "../utilities/metrics";

const ActiveServicesScreen = (): JSX.Element => {
  const { control } = useForm();

  return (
    <View
      style={{
        display: "flex",
        gap: horizontalScale(8),
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}>
      <DateDisplayer date={""} />
      <TimePicker name="timePicker" control={control} />
    </View>
  );
};

export default ActiveServicesScreen;
