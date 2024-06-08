import { Stack } from "expo-router"
import CustomHeader from "../../../components/layout/CustomHeader";
import Txt from "../../../components/info/Txt";

const BookingsLayout = () => {
  return (
    <Stack screenOptions={{ header: CustomHeader }}>
      <Stack.Screen name="index" options={{ title: "Marcadores" }} />
    </Stack>
  )
}

export default BookingsLayout;