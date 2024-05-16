import { ReactNode } from "react";
import {
  GestureResponderEvent,
  StyleProp,
  TextStyle,
  PressableProps,
} from "react-native";

import Txt from "../Txt";
import Tappable from "./Tappable";
import { ColorPalette } from "../../styles/colorPalette";

type Props = {
  onPress: (event?: GestureResponderEvent) => any;
  disabled?: boolean;
  style?: StyleProp<TextStyle>;
  children: ReactNode;
} & PressableProps;

const Link = (props: Props) => {
  return (
    <Tappable onPress={props.onPress} disabled={props.disabled}>
      <Txt
        style={[
          { color: ColorPalette.primary, opacity: props.disabled ? 0.5 : 1 },
          props.style,
        ]}>
        {props.children}
      </Txt>
    </Tappable>
  );
};

export default Link;
