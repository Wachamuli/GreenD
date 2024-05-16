import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";

import Field, { FieldProps } from "./Field";
import { useState } from "react";
import Tappable from "./Tappable";
import { View } from "react-native";
import { horizontalScale, moderateScale } from "../../utilities/metrics";
import { ColorPalette } from "../../styles/colorPalette";

const PasswordField = (props: FieldProps): JSX.Element => {
  const [secureTextEntryToggle, setSecureEntry] = useState(true);

  return (
    <Field
      {...props}
      secureTextEntry={secureTextEntryToggle}
      placeholder={secureTextEntryToggle ? "********" : ""}
      autoCapitalize="none"
      maxLength={16}>
      <View
        style={{
          position: "absolute",
          top: "35%",
          right: "10%",
        }}>
        <Tappable hitSlop={30} onPress={() => setSecureEntry(toggle => !toggle)}>
          <FontAwesomeIcon
            icon={secureTextEntryToggle ? faEye : faEyeSlash}
            size={moderateScale(20)}
            color={ColorPalette.tertiary}
          />
        </Tappable>
      </View>
    </Field>
  );
};

export default PasswordField;
