import { ReactNode, useState } from "react";
import {
  Pressable,
  PressableProps,
  StyleProp,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import Txt from "../Txt";

type PressablePropsWithoutStyle = Omit<PressableProps, "style">;

type Props = PressablePropsWithoutStyle & {
  label?: string;
  children?: ReactNode;
  disabled?: boolean;
  style?: StyleProp<TextStyle>;
  containerStyle?: StyleProp<ViewStyle>;
};

const Tappable = (props: Props): JSX.Element => {
  const [pressed, setPressed] = useState(false);
  return (
    <Pressable
      hitSlop={props.hitSlop}
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      onPress={props.onPress}
      disabled={props.disabled}>
      <View
        style={[
          { opacity: props.disabled || pressed ? 0.5 : 1 },
          props.containerStyle,
        ]}>
        {props.label && <Txt style={props.style}>{props.label}</Txt>}
        {props.children}
      </View>
    </Pressable>
  );
};

export default Tappable;
