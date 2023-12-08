import { StyleProp, TextStyle, View } from "react-native";
import Txt from "./Txt";

import { FieldError, FieldErrorsImpl, Merge } from "react-hook-form";
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from "../utilities/metrics";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";

const ErrorMessage = ({
  error,
  style,
}: {
  error: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined;
  style?: StyleProp<TextStyle>;
}): JSX.Element => {
  return (
    <>
      {error?.message && (
        <Txt style={{ marginTop: verticalScale(2)}}>
          <FontAwesomeIcon
            style={{ color: "#FF7D7D"}}
            icon={faTriangleExclamation}
          />
          {" "}
          <Txt
            style={[
              {
                color: "#FF7D7D",
                marginTop: verticalScale(10),
                paddingHorizontal: horizontalScale(10),
                paddingVertical: verticalScale(10),
                borderRadius: moderateScale(10),
              },
              style,
            ]}>
            {error?.message?.toString()}
          </Txt>
        </Txt>
      )}
    </>
  );
};

export default ErrorMessage;
