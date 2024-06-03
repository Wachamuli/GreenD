import { StyleSheet, View } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Control, FieldValue, useController } from "react-hook-form";

import { moderateScale, verticalScale } from "../../utilities/metrics";
import Txt from "../info/Txt";
import ErrorMessage from "../info/ErrorMessage";

type Props = {
  name: string;
  control: Control<FieldValue<any>>;
  placeholder?: string;
  options?: Record<string, unknown>[] | null;
};

const Menu = (props: Props): JSX.Element => {
  const {
    field,
    fieldState: { error },
  } = useController({
    name: props.name,
    control: props.control,
    defaultValue: "",
  });

  return (
    <View style={styles.fieldContainer}>
      <Txt style={styles.label}>Residencial</Txt>
      <View style={styles.pickerContainer}>
        <Picker
          mode="dialog"
          style={styles.picker}
          selectedValue={field.value}
          onValueChange={field.onChange}>
          {props.placeholder && (
            <Picker.Item label={props.placeholder} value="" color="#9ca3af" />
          )}
          {props.options?.map((option, index) => {
            const [key, value] = Object.values(option);
            return (
              <Picker.Item key={index} value={key} label={value as string} />
            );
          })}
        </Picker>
      </View>
      <ErrorMessage error={error} />
    </View>
  );
};

const styles = StyleSheet.create({
  fieldContainer: {
    marginBottom: verticalScale(8),
  },
  pickerContainer: {
    borderWidth: moderateScale(1),
    borderRadius: verticalScale(10),
    borderColor: "#9ca3af",
    overflow: "hidden",
  },
  picker: {
    backgroundColor: "#f9fafb",
  },
  label: {
    marginVertical: verticalScale(10),
  },
});

export default Menu;
