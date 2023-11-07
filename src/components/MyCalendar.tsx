import React, { useMemo, useState } from "react";
import {
  Control,
  FieldValue,
  FieldValues,
  UseFormSetValue,
  useController,
} from "react-hook-form";
import { Calendar } from "react-native-calendars";
import ErrorMessage from "./ErrorMessage";

type Props = {
  name: string;
  control: Control<FieldValue<any>>;
  formSet: (name: string, value: string) => void;
};

const MyCalendar = (props: Props): JSX.Element => {
  const { fieldState: { error } } = useController({
    control: props.control,
    defaultValue: "",
    name: props.name,
  });
  const [selectedDay, setSelectedDay] = useState<string>("");

  const marked = useMemo(() => {
    return {
      [selectedDay]: {
        selected: true,
        selectedColor: "black",
        textColor: "white",
      },
    };
  }, [selectedDay]);

  return (
    <>
      <Calendar
        enableSwipeMonths
        disableAllTouchEventsForDisabledDays
        testID="Details"
        minDate={new Date().toString()}
        // maxDate={today.toString()}
        onDayPress={day => {
          setSelectedDay(day.dateString);
          props.formSet(props.name, day.dateString);
          if (error) error.message = "";
        }}
        markedDates={marked}
      />
      <ErrorMessage error={error} />
    </>
  );
};

export default MyCalendar;
