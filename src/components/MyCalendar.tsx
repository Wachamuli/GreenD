import { useState, useMemo } from "react";
import { StyleSheet, View } from "react-native";

import dayjs from "dayjs";
import { Control, FieldValue, useController } from "react-hook-form";
import { Calendar } from "react-native-calendars";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

import Txt from "./Txt";
import ErrorMessage from "./ErrorMessage";
import { ColorPalette } from "../styles/colorPalette";
import { moderateScale } from "../utilities/metrics";

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
        selectedColor: ColorPalette.primary,
        textColor: "white",
      },
    };
  }, [selectedDay]);

  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 15);

  return (
    <View>
      <Calendar
        onDayPress={day => {
          setSelectedDay(day.dateString);
          props.onValueChange(props.name, day.dateString);
          if (error) error.message = "";
        }}
        renderHeader={date => (
          <Txt style={styles.headerStyle}>
            {dayjs(date).format("MMMM YYYY")}{" "}
          </Txt>
        )}
        renderArrow={direction =>
          direction === "right" ? (
            <FontAwesomeIcon icon={faChevronRight} />
          ) : (
            <FontAwesomeIcon icon={faChevronLeft} />
          )
        }
        firstDay={1}
        futureScrollRange={1}
        pastScrollRange={1}
        disableAllTouchEventsForDisabledDays
        disableAllTouchEventsForInactiveDays
        enableSwipeMonths
        markedDates={marked}
        // maxDate={maxDate.toString()}
        style={styles.calendarContainer}
        theme={{
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
          textDayFontFamily: "ffNormal",
          textDayHeaderFontFamily: "ffBold",
          calendarBackground: "#f3f5ff",
        }}
      />
      <ErrorMessage error={error} />
    </View>
  );
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
