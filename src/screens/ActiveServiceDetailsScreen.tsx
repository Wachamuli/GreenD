import { NativeStackScreenProps } from "@react-navigation/native-stack";

import Txt from "../components/Txt";
import { RootStackParamList } from "./ServiceRequestsStack";
import { useEffect } from "react";

type ScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "activeServicesDetails"
>;

const ActiveServiceDetailsScreen = ({
  route,
  navigation,
}: ScreenProps): JSX.Element => {
  return <Txt>{route.params.serviceRequestId}</Txt>;
};

export default ActiveServiceDetailsScreen;
