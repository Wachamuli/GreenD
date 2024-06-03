import { Stack } from "expo-router";
import CustomHeader from "../../../components/layout/CustomHeader";

const RequestsLayout = () => {
  return (
    <Stack screenOptions={{ header: CustomHeader }}>
      <Stack.Screen name="index" options={{ title: "Solicitudes" }} />
      {/* <Stack.Screen name="index" /> */}
    </Stack>
  )
}

export default RequestsLayout;