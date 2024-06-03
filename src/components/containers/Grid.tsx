import { PropsWithChildren } from "react";
import { View } from "react-native";
import { verticalScale } from "../../utilities/metrics";

const Table = ({
  children,
  totalColums,
}: PropsWithChildren & { totalColums: number }): JSX.Element => {
  return <View>{children}</View>;
};

const Row = ({ children }: PropsWithChildren): JSX.Element => {
  return (
    <View style={{ flexDirection: "row", marginBottom: verticalScale(10), alignItems: "center" }}>
      {children}
    </View>
  );
};

const Col = ({
  children,
  colNumber,
}: PropsWithChildren & { colNumber: number }): JSX.Element => {
  return <View style={{ flex: colNumber }}>{children}</View>;
};

export default { Table, Row, Col };
