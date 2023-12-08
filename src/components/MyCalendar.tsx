import { useEffect, useMemo, useState } from "react";
import { View } from "react-native";
import { Control, FieldValue, useController } from "react-hook-form";
import { Calendar } from "react-native-calendars";

import ErrorMessage from "./ErrorMessage";

type Props = {
  name: string;
  control: Control<FieldValue<any>>;
  onValueChange: any;
  // onValueChange: Dispatch<React.SetStateAction<string | undefined>>;
};

const MyCalendar = (props: Props): JSX.Element => {
  const {
    fieldState: { error },
  } = useController({
    control: props.control,
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

  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 15);

  return (
    <View>
      <Calendar
        firstDay={1}
        futureScrollRange={1}
        pastScrollRange={1}
        disableAllTouchEventsForDisabledDays
        enableSwipeMonths
        markedDates={marked}
        onDayPress={day => {
          setSelectedDay(day.dateString);
          props.onValueChange(props.name, day.dateString)
          if (error) error.message = "";
        }}
        // maxDate={maxDate.toString()}
        // maxToRenderPerBatch={1}
        // calendarWidth={Dimensions.get("screen").width - horizontalScale(20)} /* FIXME: */
      />
      <ErrorMessage error={error} />
    </View>
  );
};

export default MyCalendar;
