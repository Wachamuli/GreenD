import { StyleSheet, View, ViewStyle } from "react-native";

import {
  faBan,
  faCheck,
  faCheckDouble,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

import Txt from "./Txt";
import { ServiceRequestStatus } from "../../lib/supabase.type.alias";
import { ColorPalette } from "../../styles/colorPalette";
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from "../../utilities/metrics";
import { StyleProp } from "react-native";

const StatusLabel = ({
  status,
  containerStyle,
}: {
  status: ServiceRequestStatus;
  containerStyle?: StyleProp<ViewStyle>;
}): JSX.Element => {
  let statusBarStyle = { icon: faBan, color: "" };

  switch (status) {
    case "Pending":
      statusBarStyle.icon = faClock;
      statusBarStyle.color = ColorPalette.lighterSecondary;
      break;
    case "Confirmed":
      statusBarStyle.icon = faCheck;
      statusBarStyle.color = ColorPalette.lighterSecondary;
      break;
    case "InProgress":
      statusBarStyle.icon = faSpinner;
      statusBarStyle.color = ColorPalette.accent;
      break;
    case "Completed":
      statusBarStyle.icon = faCheckDouble;
      statusBarStyle.color = ColorPalette.secondary;
      break;
    case "Canceled":
      statusBarStyle.icon = faBan;
      statusBarStyle.color = ColorPalette.error;
      break;
  }

  return (
    <View
      style={[
        styles.statusContainer,
        { backgroundColor: statusBarStyle.color },
        containerStyle,
      ]}>
      <FontAwesomeIcon
        icon={statusBarStyle.icon}
        color="white"
        size={moderateScale(12)}
      />
      <Txt style={styles.status}>{status}</Txt>
    </View>
  );
};

const styles = StyleSheet.create({
  statusContainer: {
    flexDirection: "row",
    alignSelf: "flex-start",
    borderRadius: moderateScale(10),
    paddingVertical: verticalScale(5),
    paddingHorizontal: verticalScale(10),
    alignItems: "center",
  },
  status: {
    color: "white",
    fontSize: moderateScale(12),
    marginLeft: horizontalScale(5),
  },
});

export default StatusLabel;
