import React, { useEffect, useState } from "react";
import { Control, Controller, FieldValue } from "react-hook-form";
import { View } from "react-native";
import ErrorMessage from "./info/ErrorMessage";
import Detail from "./Detail";

type Props = {
  name: string;
  data: string[] | null;
  control: Control<FieldValue<any>>;
  onValueChange: any;
};

const Details = (props: Props): JSX.Element => {
  const [selectedDetails, setSelectedDetails] = useState<string[]>([]);

  useEffect(() => {
    props.onValueChange("details", selectedDetails);
  }, [selectedDetails]);

  return (
    <Controller
      name={props.name}
      control={props.control}
      render={({ fieldState: { error } }) => (
        <View>
          {props.data &&
            props.data.map((detail, index) => (
              <Detail
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
