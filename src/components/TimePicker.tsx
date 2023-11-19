import { StyleSheet, View } from "react-native";
import Tappable from "./controls/Tappable";
import {
  Control,
  Controller,
  FieldValue,
  useController,
} from "react-hook-form";
import ErrorMessage from "./ErrorMessage";
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from "../utilities/metrics";
import Txt from "./Txt";
import { useEffect, useState } from "react";
import WheelTimePicker from "./WheelTimePicker";

let hours = [
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "10",
  "11",
  "12",
];

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

type Props = {
  name: string;
  control: Control<FieldValue<any>>;
  onValueChange: (name: string, value: string) => void;
};

const TimePicker = (props: Props): JSX.Element => {
  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);
  const [meridiem, setMeridiem] = useState(true);

  useEffect(() => {
    const meridiemString = meridiem ? "AM" : "PM";
    props.onValueChange(
      props.name,
      hours[hour] + ":" + minutes[minute] + " " + meridiemString,
    );
  }, [hour, minute, meridiem]);

  return (
    <Controller
      name={props.name}
      control={props.control}
      render={({ fieldState }) => (
        <View>
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
            <View style={styles.buttonContainer}>
              <Tappable
                onPress={() => setMeridiem(prevsState => !prevsState)}
                style={{
                  ...styles.button,
                  ...styles.buttonA,
                  ...{
                    backgroundColor: meridiem ? "black" : "white",
                    color: meridiem ? "white" : "black",
                  },
                }}
                label="AM"
              />

              <Tappable
                onPress={() => setMeridiem(prevsState => !prevsState)}
                style={{
                  ...styles.button,
                  ...styles.buttonB,
                  ...{
                    backgroundColor: !meridiem ? "black" : "white",
                    color: !meridiem ? "white" : "black",
                  },
                }}
                label="PM"
              />
            </View>
            <ErrorMessage error={fieldState.error} />
          </View>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  timePickerContainer: {
    display: "flex",
    alignItems: "center",
    gap: horizontalScale(10),
    flexDirection: "row",
    // borderWidth: 1,
    // width: horizontalScale(10),
    // borderWidth: 2,
    height: verticalScale(60),
  },
  colon: {
    fontSize: moderateScale(26),
  },
  buttonContainer: {
    flexDirection: "column",
    marginLeft: horizontalScale(10),
  },
  button: {
    fontWeight: "bold",
    fontSize: moderateScale(12),
    textAlign: "center",
    width: horizontalScale(50),
    paddingVertical: verticalScale(5),
    borderWidth: moderateScale(2),
  },
  buttonA: {
    borderTopLeftRadius: moderateScale(10),
    borderTopRightRadius: moderateScale(10),
  },
  buttonB: {
    borderBottomRightRadius: moderateScale(10),
    borderBottomLeftRadius: moderateScale(10),
  },
});

export default TimePicker;
