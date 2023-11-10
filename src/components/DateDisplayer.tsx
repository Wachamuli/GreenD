import { View, StyleSheet } from "react-native";
import Header from "./Header";
import Par from "./Par";
import { horizontalScale, moderateScale, verticalScale } from "../utilities/metrics";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";

type Props = {
  date: string;
};

const DateDisplayer = (prop: Props) => {
  return (
    <View style={styles.displayerContainer}>
      <View style={styles.calendarIconContainer}>
        <FontAwesomeIcon icon={faCalendarDays} color="white" />
      </View>
      <View style={styles.dateContainer}>
        <Par style={styles.date}>Sábado, Agosto 23</Par>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  displayerContainer: {
    width: "50%",
    marginVertical: verticalScale(20),
    borderRadius: moderateScale(20),
    borderWidth: moderateScale(1),
    backgroundColor: "white",
    flexDirection: "row",
    overflow: "hidden",
  },
  calendarIconContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
    paddingHorizontal: horizontalScale(10),
  },
  dateContainer: {
    padding: moderateScale(10),
  },
  date: {
    color: "black",
    textAlign: "center",
    fontWeight: "bold",
  },
});

export default DateDisplayer;
