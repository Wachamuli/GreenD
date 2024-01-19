import {
  GestureResponderEvent,
  StyleProp,
  StyleSheet,
  TextStyle,
  ViewStyle,
} from "react-native";

import { ColorPalette } from "../../styles/colorPalette";
import Tappable from "./Tappable";
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from "../../utilities/metrics";

type Props = {
  label?: string;
  disabled?: boolean;
  style?: StyleProp<TextStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  onPress?: (event: GestureResponderEvent) => void;
};

const Btn = (props: Props) => {
  return <Tappable {...props} style={[styles.button, props.style]} />;
};

const styles = StyleSheet.create({
  button: {
    fontFamily: "ffBold",
    width: horizontalScale(250),
    color: "white",
    textAlign: "center",
    paddingVertical: verticalScale(20),
    marginVertical: verticalScale(10),
    borderRadius: moderateScale(40),
    backgroundColor: ColorPalette.primary,
    textTransform: "capitalize",
  },
});

export default Btn;
