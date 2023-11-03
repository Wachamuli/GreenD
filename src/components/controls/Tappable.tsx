import React from "react";
import { GestureResponderEvent, Pressable, StyleSheet, Text, View } from "react-native";
import { verticalScale } from "../../utilities/metrics";

type Props = {
  title: string;
  disabled?: boolean;
  style?: {},
  onPress?: (event: GestureResponderEvent) => void;
};


const Tappable = (props: Props): JSX.Element => {
  return (
    <Pressable onPress={props.onPress} disabled={props.disabled}>
        <Text style={{...styles.button, ...props.style}}>{props.title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: verticalScale(20),
    backgroundColor: "black",
    textTransform: "uppercase",
    fontWeight: "bold",
    color: "white",
    textAlign: "center"
  },
});

export default Tappable;
