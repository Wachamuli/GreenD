import React from "react";
import { GestureResponderEvent, Pressable, StyleSheet, Text, View } from "react-native";
import { verticalScale } from "../utilities/metrics";

type Props = {
  title: string;
  onPress?: (event: GestureResponderEvent) => void;
};


const Gbutton = (props: Props): JSX.Element => {
  return (
    <Pressable onPress={props.onPress} style={styles.button}>
        <Text style={styles.title}>{props.title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: verticalScale(20),
    backgroundColor: "black",
  },
  title: {
    textTransform: "uppercase",
    fontWeight: "bold",
    color: "white",
    textAlign: "center"
  },
});

export default Gbutton;
