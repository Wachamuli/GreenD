import { FlatList, StyleSheet, View } from "react-native";
import Header from "../components/Header";
import MyCalendar from "../components/MyCalendar";
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from "../utilities/metrics";
import Txt from "../components/Txt";
import Tappable from "../components/controls/Tappable";
import { ColorPalette } from "../styles/colorPalette";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  type ServiceBookingSchema,
  serviceBookingSchema,
} from "../utilities/validators/ServiceDetailsSchema";
import DateTimeDisplayer from "../components/controls/DateTimeDisplayer";
import TimePicker from "../components/controls/TimePicker";
import Btn from "../components/controls/Btn";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "./HomeStack";

type ScreenProps = NativeStackScreenProps<RootStackParamList, "serviceBooking">;

const ServiceBookingScreen = ({ navigation, route }: ScreenProps) => {
  const [time, setTime] = useState("");
  const [date, setDate] = useState(new Date());
  const { handleSubmit, control, setValue } = useForm<ServiceBookingSchema>({
    resolver: zodResolver(serviceBookingSchema),
  });

  return (
    <View style={styles.container}>
      <MyCalendar
        // onValueChange={setDate}
        onValueChange={setValue}
        name="calendar"
        control={control}
      />

      <View style={styles.timeContainer}>
        <TimePicker
          value={time}
          onValueChange={setValue}
          name="timePicker"
          control={control}
        />
        <DateTimeDisplayer date={date} time={time} />
      </View>

      <Txt style={styles.header}>Tiempos recomendados</Txt>

      <FlatList
        horizontal
        contentContainerStyle={styles.recommendedTime}
        data={[
          "8:00 AM",
          "10:00 AM",
          "1:00 PM",
          "2:00 PM",
          "3:00 PM",
          "5:00 PM",
        ]}
        renderItem={({ item }) => (
          <Tappable onPress={() => setTime(item)}>
            <View
              style={{
                borderWidth: moderateScale(0.5),
                borderRadius: moderateScale(20),
                borderColor: ColorPalette.tertiary,
                marginRight: horizontalScale(10),
                paddingHorizontal: horizontalScale(10),
                paddingVertical: verticalScale(5),
              }}>
              <Txt>{item}</Txt>
            </View>
          </Tappable>
        )}
      />

      <Btn
        label="Continuar"
        style={styles.button}
        onPress={handleSubmit(values =>
          navigation.navigate("serviceResume", {
            serviceId: route.params.serviceId,
            note: route.params.note,
            selectedDetails: route.params.selectedDetails,
            selectedOutsourcer: route.params.selectedOutsourcer,
            selectedDay: values.calendar.toDateString(),
            selectedTime: values.timePicker,
          }),
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: horizontalScale(20),
  },
  timeContainer: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  header: {
    fontFamily: "ffBold",
    marginBottom: verticalScale(10),
  },
  recommendedTime: {
    paddingBottom: verticalScale(10),
  },
  button: {
    borderRadius: moderateScale(10),
    marginRight: horizontalScale(10),
    width: "100%",
  },
});

export default ServiceBookingScreen;
