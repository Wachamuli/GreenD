import { GestureResponderEvent, StyleSheet, View } from "react-native";
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from "../utilities/metrics";
import Txt from "./Txt";
import Tappable from "./controls/Tappable";

const Tag = ({
  name,
  color,
  onPress,
}: {
  name: string;
  color: string;
  onPress?: (event: GestureResponderEvent) => void;
}): JSX.Element => {
  return (
    <View
      style={[
        styles.tagContainer,
        { borderColor: color },
      ]}>
      <Tappable
        onPress={onPress}
        style={[styles.tag, { color: color, }]}
        label={name}
      />
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
    borderWidth: moderateScale(2),
    alignSelf: "flex-start",
    width: "auto",
    marginBottom: verticalScale(4),
    marginRight: verticalScale(4),
    paddingHorizontal: horizontalScale(10),
    paddingVertical: horizontalScale(5),
    borderRadius: moderateScale(20),
  },
  tag: {
    color: "white",
    fontFamily: "ffBold",
  },
});

export default Tag;
