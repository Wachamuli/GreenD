import React, {
  Dispatch,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  Control,
  FieldValue,
  FieldValues,
  UseFormSetValue,
  useController,
} from "react-hook-form";
import {
  AgendaList,
  Calendar,
  CalendarProvider,
  ExpandableCalendar,
} from "react-native-calendars";
import ErrorMessage from "./ErrorMessage";
import Par from "./Par";
import {
  Alert,
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type Props = {
  name: string;
  control: Control<FieldValue<any>>;
  formSet: (name: string, value: string) => void;
  onValueChange: Dispatch<React.SetStateAction<string | undefined>>;
};

const MyCalendar = (props: Props): JSX.Element => {
  const {
    fieldState: { error },
  } = useController({
    control: props.control,
    defaultValue: "",
    name: props.name,
  });

  const [selectedDay, setSelectedDay] = useState<string>(new Date().toString());

  const marked = useMemo(() => {
    return {
      [selectedDay]: {
        selected: true,
        selectedColor: "black",
        textColor: "white",
      },
    };
  }, [selectedDay]);

  useEffect(() => {
    props.onValueChange(selectedDay);
    props.formSet(props.name, selectedDay);
  }, [selectedDay]);

  return (
    <CalendarProvider date={selectedDay}>
      <ExpandableCalendar
        enableSwipeMonths
        disableAllTouchEventsForDisabledDays
        testID="Details"
        minDate={new Date().toString()}
        // maxDate={today.toString()}
        onDayPress={day => {
          setSelectedDay(day.dateString);
          if (error) error.message = "";
        }}
        markedDates={marked}
      />
      <ErrorMessage error={error} />
    </CalendarProvider>
  );
};

export default MyCalendar;
