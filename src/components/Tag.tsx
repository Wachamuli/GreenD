import { GestureResponderEvent, StyleSheet, View } from "react-native";
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from "../utilities/metrics";
import Txt from "./info/Txt";
import Tappable from "./controls/Tappable";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faXmarkCircle } from "@fortawesome/free-regular-svg-icons";
import { ColorPalette } from "../styles/colorPalette";

const Tag = ({
  name,
  color,
  selected,
  onPress,
}: {
  name: string;
  color: string;
  selected?: boolean;
  onPress?: (event: GestureResponderEvent) => void;
}): JSX.Element => {
  return (
    <View style={[styles.tagContainer]}>
      <Tappable containerStyle={styles.tappableContainer} onPress={onPress}>
        {selected && (
          <FontAwesomeIcon
            style={styles.icon}
            icon={faXmarkCircle}
            color={"rgb(111, 146, 240)"}
          />
        )}
        <Txt style={[styles.tag]}>{name}</Txt>
      </Tappable>
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    textAlignVertical: "top",
    width: "100%",
    height: verticalScale(150),
  },
  tagContainer: {
    alignSelf: "flex-start",
    width: "auto",
    marginBottom: verticalScale(4),
    marginRight: verticalScale(4),
    paddingHorizontal: horizontalScale(10),
    paddingVertical: horizontalScale(5),

    // borderWidth: moderateScale(2),
    backgroundColor: "#f3f5ff",
    borderRadius: moderateScale(20),
  },
  tappableContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginRight: horizontalScale(2),
  },
  tag: {
    // color: "white",
    // fontFamily: "ffBold",
    color: "rgb(111, 146, 240)",
  },
});

export default Tag;
