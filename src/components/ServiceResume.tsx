import { useEffect, useState } from "react";
import { Alert, Image, StyleSheet, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../screens/HomeStack";
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from "../utilities/metrics";
import { boxShadowXP } from "../utilities/crossplatform";

import Txt from "./Txt";
import Header from "./Header";
import Btn from "./controls/Btn";
import { CommonActions, useNavigation } from "@react-navigation/native";
import { supabase } from "../lib/supabase";

type ScreenProps = NativeStackScreenProps<RootStackParamList, "serviceResume">;

const ServiceResume = ({ route, navigation }: ScreenProps) => {
  const [outsourcer, setOutsourcer] = useState<{
    name: string;
    logo: string | null;
    brief_description: string;
  } | null>();
  const parentNavigation = useNavigation<any>();

  const getOutsourcer = async () => {
    const { data } = await supabase
      .from("outsourcers")
      .select("name, logo, brief_description")
      .eq("id", route.params.selectedOutsourcer)
      .single();

    setOutsourcer(data);
  };

  useEffect(() => {
    getOutsourcer();
  }, []);

  const createRequest = async () => {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (!user || error) {
      Alert.alert(error?.message || "Could not get user.")
      return;
    }

    const { error: insertionError } = await supabase
      .from("service_requests")
      .insert({
        user_id: user.id,
        details: route.params.selectedDetails.join("\n"),
        outsourcer: route.params.selectedOutsourcer,
        r_date: route.params.selectedDay,
        r_time: route.params.selectedTime,
        service: Number(route.params.serviceId),
        note: route.params.note,
      });

    if (insertionError) {
      Alert.alert(insertionError.message);
      return;
    }

    Promise.all([
      navigation.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [{ name: "serviceList" }],
        }),
      ),
      parentNavigation.navigate("requests"),
    ]);
  };

  return (
    <>
      <View>
        <Header title="Resumen" />
        <View
          style={[
            styles.resumeTableContainer,
            boxShadowXP("black", 0.5, 20, -4, 10, 20),
          ]}>
          <View style={styles.outsourcerInfoContainer}>
            <Image
              style={styles.outsourcerImage}
              source={{ uri: outsourcer?.logo ?? "Default image" }}
            />
            <Header style={styles.outsourcerName} title={outsourcer?.name} />
            <Txt style={styles.outsourcerBriefDescription}>
              {outsourcer?.brief_description}
            </Txt>
          </View>

          <View style={styles.detailsContainer}>
            {route.params.selectedDetails.map((value, index) => (
              <Txt style={styles.detail} key={index}>
                {value}
              </Txt>
            ))}
          </View>

          <View style={styles.appointment}>
            <View style={styles.row}>
              <Txt style={styles.key}>Día</Txt>
              <Txt>{route.params.selectedDay}</Txt>
            </View>
            <View style={styles.row}>
              <Txt style={styles.key}>Hora</Txt>
              <Txt>{route.params.selectedTime}</Txt>
            </View>
            <View style={styles.row}>
              <Txt style={styles.key}>Nota</Txt>
              <Txt> {route.params.note || "Sin anotaciones"}</Txt>
            </View>
          </View>
        </View>
      </View>

      <Btn label="Solicitar" onPress={createRequest} />
    </>
  );
};

const styles = StyleSheet.create({
  resumeTableContainer: {
    alignItems: "center",
    backgroundColor: "white",
    height: "80%",
    marginHorizontal: horizontalScale(10),
    paddingVertical: verticalScale(20),
    borderRadius: moderateScale(20),
  },
  outsourcerInfoContainer: {
    alignItems: "center",
    textAlign: "center",
  },
  outsourcerImage: {
    width: horizontalScale(150),
    height: verticalScale(150),
    borderRadius: 100,
  },
  outsourcerName: {
    marginTop: verticalScale(10),
    marginBottom: verticalScale(0),
  },
  outsourcerBriefDescription: {
    color: "gray",
    marginTop: verticalScale(0),
  },
  appointment: {
    display: "flex",
    paddingVertical: verticalScale(10),
    paddingHorizontal: horizontalScale(10),
  },
  key: {
    fontWeight: "bold",
  },
  row: {
    columnGap: 30,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  detailsContainer: {
    marginVertical: verticalScale(10),
  },

  detail: {},
  dotlist: {},
  buttonContainer: {
    top: "auto",
    position: "absolute",
    width: "100%",
    bottom: 0,
  },
});

export default ServiceResume;
