import React, { SetStateAction, useState } from "react";
import { FlatList, Image, StyleSheet, View } from "react-native";

import { Outsourcers } from "../api/mockData";

import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from "../utilities/metrics";
import Par from "./Par";
import Tappable from "./controls/Tappable";
import { Outsourcer } from "../api/mockData";
import { Control, FieldValue, useController } from "react-hook-form";
import ErrorMessage from "./ErrorMessage";

type Props = {
  name: string;
  data: Outsourcer[];
  control: Control<FieldValue<any>>;
  setValue?: (value: SetStateAction<string>) => void;
  onValueChange: (name: string, value: string) => void;
};

const OutsourcerCard = (props: Props) => {
  const { fieldState: { error } } = useController({
    name: props.name,
    control: props.control,
    defaultValue: "",
  });
  const [isAsigned, setIsAsigned] = useState<boolean[]>([]);

  return (
    <View>
      <FlatList
        horizontal
        data={props.data}
        renderItem={({ item, index }) => (
          <View style={styles.outsourcerCardContainer}>
            <Image
              style={styles.outsourcerCardImage}
              source={item.outsourcerLogo}
            />
            <View style={styles.rightSideContainer}>
              <Par style={styles.outsourcerName}>{item.outsourcerName}</Par>
              <Par numberOfLines={2}>{item.outsourcerBriefDescription}</Par>
              <Tappable
                style={{
                  ...styles.outsourcerButton,
                  backgroundColor: isAsigned[index] ? "green" : "white",
                  color: isAsigned[index] ? "white" : "green",
                }}
                title={isAsigned[index] ? "Asignado" : "Asignar"}
                onPress={() => {
                  props.onValueChange(props.name, item.outsourcerId.toString());
                  setIsAsigned(prevStates => {
                    const newStates = [...prevStates].fill(false);
                    newStates[index] = true;
                    if (error) error.message = ""
                    return newStates;
                  });
                }}
              />
            </View>
          </View>
        )}></FlatList>
      <ErrorMessage error={error} />
    </View>
  );
};

const styles = StyleSheet.create({
  outsourcerCardContainer: {
    display: "flex",
    position: "relative",
    flexDirection: "row",
    borderColor: "#D9D9D9",
    borderWidth: moderateScale(2),
    borderRadius: moderateScale(10),
    marginRight: horizontalScale(10),
    paddingHorizontal: horizontalScale(30),
    paddingVertical: verticalScale(30),
  },
  outsourcerCardImage: {
    height: "100%",
    width: horizontalScale(100),
    marginRight: horizontalScale(10),
  },
  rightSideContainer: {
    display: "flex",
    justifyContent: "flex-end",
    maxWidth: horizontalScale(180),
    minWidth: horizontalScale(180),
  },
  outsourcerName: {
    fontWeight: "bold",
    fontSize: moderateScale(18),
  },
  outsourcerButton: {
    borderRadius: moderateScale(10),
    borderColor: "green",
    color: "green",
    borderWidth: moderateScale(1),
    backgroundColor: "white",
  },
});

export default OutsourcerCard;
