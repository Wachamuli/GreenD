import { PropsWithChildren } from "react";
import { View } from "react-native";

const Table = ({
  children,
  totalColums,
}: PropsWithChildren & { totalColums: number }): JSX.Element => {
  return <View>{children}</View>;
};

const Row = ({ children }: PropsWithChildren): JSX.Element => {
  return <View style={{ flexDirection: "row" }}>{children}</View>;
};

const Col = ({
  children,
  colNumber,
}: PropsWithChildren & { colNumber: number }): JSX.Element => {
  return <View style={{ flex: colNumber }}>{children}</View>;
};

export default { Table, Row, Col };
