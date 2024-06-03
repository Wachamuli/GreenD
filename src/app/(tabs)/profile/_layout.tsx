import { Stack } from "expo-router";
import CustomHeader from "../../../components/layout/CustomHeader";

const ProfileLayout = () => {
  return (
    <Stack screenOptions={{ header: CustomHeader }}>
      <Stack.Screen name="index" options={{ title: "Perfil" }} />
    </Stack>
  )
}

export default ProfileLayout;