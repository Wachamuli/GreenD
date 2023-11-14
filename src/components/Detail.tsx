import React from "react";
import Par from "./Par";
import Checkbox from "./controls/Checkbox";
import { Control, useController } from "react-hook-form";
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from "../utilities/metrics";

type Props = {
  name: string;
  control: Control<any>;
  key: number;
  label: string;
  onChange: (isChecked: boolean) => void;
};

const Detail = (props: Props): JSX.Element => {
  const { field } = useController({ control: props.control, name: props.name });
  return (
    <Checkbox
      style={{
        backgroundColor: field.value ? "#F2FFE9" : "#F5F7F8",
        paddingVertical: verticalScale(10),
        paddingHorizontal: horizontalScale(10),
        borderRadius: moderateScale(10),
      }}
      labelStyle={{
        color: field.value ? "#28A745" : "black",
      }}
      {...props}
    />
  );
};

export default Detail;
