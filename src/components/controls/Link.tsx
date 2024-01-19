import { ReactNode } from "react";
import {
  GestureResponderEvent,
  StyleProp,
  TextStyle,
  View,
} from "react-native";

import Txt from "../Txt";
import Tappable from "./Tappable";
import { ColorPalette } from "../../styles/colorPalette";

type Props = {
  onPress: (event?: GestureResponderEvent) => any;
  style?: StyleProp<TextStyle>;
  children: ReactNode;
};

const Link = ({ onPress, style, children }: Props) => {
  return (
    <Tappable onPress={onPress}>
      <Txt style={[{ color: ColorPalette.primary }, style]}>{children}</Txt>
    </Tappable>
  );
};

export default Link;
