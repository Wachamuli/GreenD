import { useState, useMemo } from "react";
import { StyleSheet, View } from "react-native";

import dayjs from "dayjs";
import { Control, FieldValue, useController, useForm } from "react-hook-form";
import { Calendar } from "react-native-calendars";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

import Txt from "../info/Txt";
import ErrorMessage from "../info/ErrorMessage";
import { ColorPalette } from "../../styles/colorPalette";
import { moderateScale } from "../../utilities/metrics";

export type SelectedDay = {
  [x: string]: {
    selected?: boolean;
    selectedColor?: string;
    textColor?: string;
    marked?: boolean;
    dotColor?: string;
  };
};

type Props = {
  name?: string;
  control?: Control<FieldValue<any>>;
  onValueChange?: any;
  markedDates?: SelectedDay;
  // onValueChange: Dispatch<React.SetStateAction<string | undefined>>;
};

const MyCalendar = (props: Props): JSX.Element => {
  const { control } = useForm();
  const {
    fieldState: { error },
  } = useController({
    control: props.control ?? control,
    name: props.name ?? "",
  });

  const [selectedDay, setSelectedDay] = useState<string>(new Date().toString());

  const marked = useMemo(() => {
    return {
      ...props.markedDates,
      [selectedDay]: {
        selected: true,
        selectedColor: ColorPalette.primary,
        textColor: "white",
      },
    };
  }, [selectedDay]);

  return (
    <View>
      <Calendar
        firstDay={1}
        pastScrollRange={1}
        futureScrollRange={1}
        enableSwipeMonths
        disableAllTouchEventsForDisabledDays
        disableAllTouchEventsForInactiveDays
        markedDates={marked}
        style={styles.calendarContainer}
        theme={calendarTheme}
        onDayPress={day => {
          setSelectedDay(day.dateString);
          // props.onValueChange(props.name, day.dateString);
          props.onValueChange(day.dateString);
          if (error) error.message = "";
        }}
        renderHeader={date => (
          <Txt style={styles.headerStyle}>
            {dayjs(date).format("MMMM YYYY")}{" "}
          </Txt>
        )}
        renderArrow={direction => (
          <FontAwesomeIcon
            icon={direction === "right" ? faChevronRight : faChevronLeft}
          />
        )}
      />
      <ErrorMessage error={error} />
    </View>
  );
};

const calendarTheme = {
  textDayFontFamily: "ffNormal",
  textDayHeaderFontFamily: "ffBold",
  calendarBackground: "#f3f5ff",
  "stylesheet.calendar.header": {
    dayTextAtIndex0: {
      color: "black",
    },
    dayTextAtIndex1: {
      color: "black",
    },
    dayTextAtIndex2: {
      color: "black",
    },
    dayTextAtIndex3: {
      color: "black",
    },
    dayTextAtIndex4: {
      color: "black",
    },
    dayTextAtIndex5: {
      color: "black",
    },
    dayTextAtIndex6: {
      color: "black",
    },
  },
};

const styles = StyleSheet.create({
  calendarContainer: {
    borderRadius: moderateScale(10),
    overflow: "hidden",
  },
  headerStyle: {
    textTransform: "capitalize",
    fontFamily: "ffBold",
    fontSize: moderateScale(14),
  },
});

export default MyCalendar;
