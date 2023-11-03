import React from "react";
import { Text } from "react-native";

import Par from "./Par";
import { moderateScale, verticalScale } from "../utilities/metrics";

const Header = ({ title }: { title: string | undefined }): JSX.Element => {
  return (
    <Par style={{ marginBottom: verticalScale(10)}}>
      <Text
        style={{
          color: "black",
          fontWeight: "bold",
          fontSize: moderateScale(22),
        }}>
        {title}
      </Text>
    </Par>
  );
};

export default Header;
