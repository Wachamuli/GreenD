import { View, StyleSheet } from "react-native";
import Header from "./Header";
import Txt from "./Par";
import { horizontalScale, moderateScale, verticalScale } from "../utilities/metrics";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";

type Props = {
  date?: string;
};

const DateDisplayer = (props: Props) => {
  return (
    <View style={styles.displayerContainer}>
      <View style={styles.calendarIconContainer}>
        <FontAwesomeIcon icon={faCalendarDays} color="white" />
      </View>
      <View style={styles.dateContainer}>
        <Txt style={styles.date}>{props.date || "Sin fecha"}</Txt>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  displayerContainer: {
    width: "50%",
    marginVertical: verticalScale(20),
    borderRadius: moderateScale(20),
    borderWidth: moderateScale(2),
    backgroundColor: "white",
    flexDirection: "row",
    overflow: "hidden",
  },
  calendarIconContainer: {
    justifyContent: "center",
    backgroundColor: "black",
    paddingHorizontal: horizontalScale(10),
  },
  dateContainer: {
    padding: moderateScale(10),
  },
  date: {
    color: "black",
    fontWeight: "bold",
  },
});

export default DateDisplayer;
