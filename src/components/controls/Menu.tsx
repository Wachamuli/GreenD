import { StyleSheet, View } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Control, FieldValue, useController } from "react-hook-form";

import { verticalScale } from "../../utilities/metrics";
import Txt from "../Txt";
import ErrorMessage from "../ErrorMessage";

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
    <View style={styles.pickerContainer}>
      <Txt style={styles.label}>Residencial</Txt>
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
      <ErrorMessage error={error} />
    </View>
  );
};

const styles = StyleSheet.create({
  pickerContainer: {
    marginBottom: verticalScale(8),
  },
  picker: {
    backgroundColor: "#f3f4f6",
  },
  label: {
    marginVertical: verticalScale(10),
  },
});

export default Menu;
