import {
  faBan,
  faCheck,
  faCheckDouble,
  faClock,
  faSpinner
} from "@fortawesome/free-solid-svg-icons";
import { ServiceRequestStatus } from "../../lib/supabase.type.alias";
import { ColorPalette } from "../../styles/colorPalette";
import { View } from "react-native";
import Txt from "./Txt";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

const StatusLabel = ({
  status,
}: {
  status: ServiceRequestStatus;
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
      ]}>
      <FontAwesomeIcon
        icon={statusBarStyle.icon}
        color="white"
        size={moderateScale(12)} />
      <Txt style={styles.status}>{item.status}</Txt>
    </View>
  );
};
