import React, { useEffect, useState } from "react";
import Checkbox from "./controls/Checkbox";
import { Control, Controller, FieldValue } from "react-hook-form";
import { View } from "react-native";
import ErrorMessage from "./ErrorMessage";

type Props = {
  name: string;
  data?: string[];
  control: Control<FieldValue<any>>;
  formValue: (name: string, value: string[]) => void;
};

const Details = (props: Props): JSX.Element => {
  const [selectedDetails, setSelectedDetails] = useState<string[]>([]);

  useEffect(() => {
    props.formValue("details", selectedDetails);
  }, [selectedDetails]);

  return (
    <Controller
      name="details"
      control={props.control}
      render={({ fieldState: { error } }) => (
        <View>
          {props.data &&
            props.data.map((detail, index) => (
              <Checkbox
                name={`detail${index}`}
                control={props.control}
                key={index}
                label={detail}
                onChange={(isChecked: boolean) => {
                  isChecked
                    ? setSelectedDetails(prevState => [...prevState, detail])
                    : setSelectedDetails(prevState =>
                        prevState.filter(item => item !== detail),
                      );

                  if (error) error.message = "";
                }}
              />
            ))}
          <ErrorMessage error={error} />
        </View>
      )}
    />
  );
};

export default Details;
