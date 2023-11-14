import React, {
  Dispatch,
  memo,
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
import { Calendar, CalendarProvider, ExpandableCalendar } from "react-native-calendars";
import ErrorMessage from "./ErrorMessage";
import { horizontalScale } from "../utilities/metrics";
import { Dimensions } from "react-native";

type Props = {
  name: string;
  control: Control<FieldValue<any>>;
  onChange: (name: string, value: string) => void;
  onValueChange: Dispatch<React.SetStateAction<string | undefined>>;
};

const MyCalendar = (props: Props): JSX.Element => {
  const {
    fieldState: { error },
  } = useController({
    control: props.control,
    name: props.name,
  });

  const [selectedDay, setSelectedDay] = useState<string>((new Date()).toString());

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
    props.onChange(props.name, selectedDay);
  }, [selectedDay]);

  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 15);

  return (
    <CalendarProvider date={"2020-05-05"}>
      <ExpandableCalendar
        firstDay={1}
        enableSwipeMonths
        futureScrollRange={1}
        disableAllTouchEventsForDisabledDays
        // minDate={new Date().toString()}
        // maxDate={maxDate.toString()}
        maxToRenderPerBatch={1}
        markedDates={marked}
        calendarWidth={Dimensions.get("screen").width - horizontalScale(20)} /* FIXME: */
        onDayPress={day => {
          setSelectedDay(day.dateString);
          if (error) error.message = "";
        }}
      />
      {/* // <ErrorMessage error={error} /> */}
    </CalendarProvider>
  );
};

export default MyCalendar;
