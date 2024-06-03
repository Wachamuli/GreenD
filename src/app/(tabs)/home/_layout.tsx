import { Stack } from "expo-router";
import CustomHeader from "../../../components/layout/CustomHeader";

const HomeLayout = () => {
  return (
    <Stack screenOptions={{ header: CustomHeader }}>
      <Stack.Screen name="index" />
      <Stack.Screen
        name="all-services"
        options={{ title: "Todos los servicios" }}
      />
    </Stack>
  );
};

export default HomeLayout;
