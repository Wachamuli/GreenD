import { View } from "react-native";
import Par from "./Par";

import { FieldError, FieldErrorsImpl, Merge } from "react-hook-form";
import { horizontalScale, moderateScale, verticalScale } from "../utilities/metrics";

const ErrorMessage = ({
  error,
}: {
  error: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined;
}): JSX.Element => {
  return (
    <>
      {error?.message && (
        <Par
          style={{
            color: "#FF7D7D",
            marginTop: verticalScale(10),
            fontWeight: "bold",
            backgroundColor: "#FFF2F2",
            paddingHorizontal: horizontalScale(10),
            paddingVertical: verticalScale(10),
            borderRadius: moderateScale(10),
          }}>
          {error?.message?.toString()}
        </Par>
      )}
    </>
  );
};

export default ErrorMessage;
