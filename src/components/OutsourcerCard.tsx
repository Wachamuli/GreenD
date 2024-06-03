import React, { SetStateAction, useState } from "react";
import { FlatList, Image, StyleSheet, View } from "react-native";

import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from "../utilities/metrics";
import Txt from "./info/Txt";
import Tappable from "./controls/Tappable";
import { Outsourcer } from "../api/mockData";
import { Control, FieldValue, useController } from "react-hook-form";
import ErrorMessage from "./info/ErrorMessage";
import Btn from "./controls/Btn";

type Props = {
  name: string;
  data:
    | {
        id: string;
        name: string;
        logo: string | null;
        brief_description: string;
        condominium: string;
      }[]
    | null
    | undefined;
  control: Control<FieldValue<any>>;
  setValue?: (value: SetStateAction<string>) => void;
  onValueChange: any;
};

const OutsourcerCard = (props: Props) => {
  const {
    fieldState: { error },
  } = useController({
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
        renderItem={({ item: outsourcer, index }) => (
          <View style={styles.outsourcerCardContainer}>
            <Image
              style={styles.outsourcerCardImage}
              source={{ uri: outsourcer.logo ?? ""  }}
            />
            <View style={styles.rightSideContainer}>
              <Txt style={styles.outsourcerName}>{outsourcer.name}</Txt>
              <Txt numberOfLines={2}>{outsourcer.brief_description}</Txt>
              <Btn
                style={{
                  ...styles.outsourcerButton,
                  backgroundColor: isAsigned[index] ? "green" : "white",
                  color: isAsigned[index] ? "white" : "green",
                }}
                label={isAsigned[index] ? "Asignado" : "Asignar"}
                onPress={() => {
                  props.onValueChange(props.name, outsourcer.id);
                  setIsAsigned(prevStates => {
                    const newStates = [...prevStates].fill(false);
                    newStates[index] = true;
                    if (error) error.message = "";
                    return newStates;
                  });
                }}
              />
            </View>
          </View>
        )}
      />
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
    width: "auto",
    borderColor: "green",
    color: "green",
    borderWidth: moderateScale(1),
    backgroundColor: "white",
  },
});

export default OutsourcerCard;
