import { StyleProp, TextStyle, View } from "react-native";
import Txt from "./Txt";

import { FieldError, FieldErrorsImpl, Merge } from "react-hook-form";
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from "../../utilities/metrics";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { ColorPalette } from "../../styles/colorPalette";

const ErrorMessage = ({
  error,
  style,
}: {
  error: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined;
  style?: StyleProp<TextStyle>;
}): JSX.Element => {
  return (
    <View>
      {error?.message && (
        <Txt style={{ marginTop: verticalScale(2) }}>
          <FontAwesomeIcon
            style={{ color: ColorPalette.error }}
            icon={faTriangleExclamation}
          />{" "}
          <Txt
            style={[
              {
                color: ColorPalette.error,
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
    </View>
  );
};

export default ErrorMessage;
