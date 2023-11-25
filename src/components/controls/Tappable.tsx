import React, { ReactNode, useState } from "react";
import {
  GestureResponderEvent,
  Pressable,
  StyleProp,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import Txt from "../Txt";

type Props = {
  label?: string;
  children?: ReactNode;
  disabled?: boolean;
  style?: StyleProp<TextStyle>;
  containerStyle?: StyleProp<ViewStyle>;
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
