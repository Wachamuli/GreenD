import {
  IconDefinition,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import Tappable from "./Tappable";
import { StyleSheet, View } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import Txt from "../info/Txt";
import { horizontalScale, verticalScale } from "../../utilities/metrics";

type Props = {
  onPress: () => void;
  fontColor: string;
  icon: IconDefinition;
  iconSize: number;
  label: string;
};

const SettingsOption = (props: Props): JSX.Element => {
  return (
    <Tappable onPress={props.onPress}>
      <View style={styles.container}>
        <View style={styles.subContainer}>
          <FontAwesomeIcon
            style={{ maxWidth: horizontalScale(20) }}
            icon={props.icon}
            color={props.fontColor}
            size={props.iconSize}
          />
          <Txt style={[styles.option, { color: props.fontColor }]}>
            {props.label}
          </Txt>
        </View>
        <FontAwesomeIcon icon={faChevronRight} color={props.fontColor} />
      </View>
    </Tappable>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  subContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  option: {
    fontFamily: "ffBold",
    marginLeft: horizontalScale(10),
    paddingVertical: verticalScale(10),
  },
});

export default SettingsOption;
