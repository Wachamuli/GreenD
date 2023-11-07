import { View } from "react-native";
import Par from "./Par";

import { FieldError, FieldErrorsImpl, Merge } from "react-hook-form";

const ErrorMessage = ({
  error,
}: {
  error: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined;
}): JSX.Element => {
  return (
    <>
      {error && (
        <Par style={{ color: "red" }}>{error?.message?.toString()}</Par>
      )}
    </>
  );
};

export default ErrorMessage;
