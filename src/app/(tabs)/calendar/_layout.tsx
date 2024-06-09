import { Stack } from "expo-router";
import CustomHeader from "../../../components/layout/CustomHeader";

const CalendarLayout = () => {
  return (
    <Stack screenOptions={{ header: CustomHeader }}>
      <Stack.Screen name="index" options={{ title: "Calendario" }} />
    </Stack>
  );
};

export default CalendarLayout;
