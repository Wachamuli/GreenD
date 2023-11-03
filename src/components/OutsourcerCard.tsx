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

type Props = {
  setValue: (value: SetStateAction<string>) => void;
}

const OutsourcerCard = (props: Props) => {
  const [isAsigned, setIsAsigned] = useState<boolean[]>([]);

  return (
    <View>
      <FlatList
        horizontal
        data={Outsourcers}
        renderItem={({ item, index }) => (
          <View style={styles.outsourcerCardContainer}>
            <Image
              style={styles.outsourcerCardImage}
              source={item.outsourcerLogo}></Image>
            <View
              style={styles.rightSideContainer}>
              <Par style={styles.outsourcerName}>{item.outsourcerName}</Par>
              <Par numberOfLines={2}>{item.outsourcerBriefDescription}</Par>
              <Tappable
                style={{
                  ...styles.outsourcerButton,
                  backgroundColor: isAsigned[index] ? "green" : "white",
                  color: isAsigned[index] ? "white" : "green",
                }}
                title={isAsigned[index] ? "Asignado" : "Asignar"}
                onPress={() => setIsAsigned(prevState => {
                   const newValues = [...prevState];
                   newValues[index] = !newValues[index];
                   props.setValue(item.outsourcerId.toString());
                   return newValues
                })}
              />
            </View>
          </View>
        )}></FlatList>
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
  rightSideContainer : {
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
