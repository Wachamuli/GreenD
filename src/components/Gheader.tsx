import React from "react";

import Gtext from "./Gtext";
import { moderateScale, verticalScale } from "../utilities/metrics";
import { Text, View } from "react-native";

const Gheader = ({ title }: { title: string | undefined }): JSX.Element => {
  return (
    <Gtext style={{ marginBottom: verticalScale(10)}}>
      <Text
        style={{
          color: "black",
          fontWeight: "bold",
          fontSize: moderateScale(22),
        }}>
        {title}
      </Text>
    </Gtext>
  );
};

export default Gheader;
