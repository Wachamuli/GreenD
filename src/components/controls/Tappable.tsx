import React, { ReactNode, useState } from "react";
import {
  GestureResponderEvent,
  Pressable,
  StyleProp,
  Text,
  TextStyle,
} from "react-native";
import Txt from "../Txt";

type Props = {
  label?: string;
  children?: ReactNode;
  disabled?: boolean;
  style?: StyleProp<TextStyle>;
  onPress?: (event: GestureResponderEvent) => void;
};

const Tappable = (props: Props): JSX.Element => {
  const [pressed, setPressed] = useState(false);
  return (
    <Pressable
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      onPress={props.onPress}
      disabled={props.disabled}>
      <Txt
        style={[{ opacity: props.disabled || pressed ? 0.5 : 1 }, props.style]}>
        {props.label}
        {props.children}
      </Txt>
    </Pressable>
  );
};

export default Tappable;
