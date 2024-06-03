import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

import { Control, Controller, FieldValue } from "react-hook-form";

import Txt from "../info/Txt";
import ErrorMessage from "../info/ErrorMessage";
import WheelTimePicker from "./WheelTimePicker";
import { horizontalScale, moderateScale } from "../../utilities/metrics";

let hours = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];

let minutes = [
  "00",
  "05",
  "10",
  "15",
  "20",
  "25",
  "30",
  "35",
  "40",
  "45",
  "50",
  "55",
];

let meridiems = ["AM", "PM"];

type Props = {
  name: string;
  control: Control<FieldValue<any>>;
  onValueChange: any;
  value: string;
};

const TimePicker = (props: Props): JSX.Element => {
  const [hour, setHour] = useState(9);
  const [minute, setMinute] = useState(6);
  const [meridiem, setMeridiem] = useState(0);

  useEffect(() => {
    props.onValueChange(props.name, props.value);
  }, [props.value]);

  useEffect(() => {
    const time =
      hours[hour] + ":" + minutes[minute] + " " + meridiems[meridiem];
    props.onValueChange(props.name, time);
  }, [hour, minute, meridiem]);

  return (
    // FIXME: This scrollview is a workaround, get rid of it
    <ScrollView horizontal>
      <Controller
        name={props.name}
        control={props.control}
        render={({ fieldState }) => (
          <View style={styles.timePickerContainer}>
            <WheelTimePicker
              value={hour}
              onValueChange={setHour}
              options={hours}
            />
            <Txt style={styles.colon}>:</Txt>
            <WheelTimePicker
              value={minute}
              onValueChange={setMinute}
              options={minutes}
            />
            <WheelTimePicker
              value={meridiem}
              onValueChange={setMeridiem}
              options={meridiems}
            />
            <ErrorMessage error={fieldState.error} />
          </View>
        )}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  timePickerContainer: {
    alignItems: "center",
    gap: horizontalScale(10),
    flexDirection: "row",
  },
  colon: {
    fontSize: moderateScale(26),
  },
});

export default TimePicker;
