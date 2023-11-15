import React from "react";
import { Text } from "react-native";

import Txt from "./Par";
import { moderateScale, verticalScale } from "../utilities/metrics";

const Header = ({ title }: { title: string | undefined }): JSX.Element => {
  return (
    <Txt style={{ marginBottom: verticalScale(10)}}>
      <Text
        style={{
          color: "black",
          fontWeight: "bold",
          fontSize: moderateScale(22),
        }}>
        {title}
      </Text>
    </Txt>
  );
};

export default Header;
