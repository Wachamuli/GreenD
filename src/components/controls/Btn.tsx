import {
  GestureResponderEvent,
  StyleProp,
  StyleSheet,
  TextStyle,
  ViewStyle,
} from "react-native";
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
    paddingVertical: verticalScale(20),
    borderRadius: moderateScale(40),
    minWidth: horizontalScale(250),
    backgroundColor: "blue",
    textTransform: "uppercase",
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    marginVertical: verticalScale(10),
  },
});

export default Btn;
