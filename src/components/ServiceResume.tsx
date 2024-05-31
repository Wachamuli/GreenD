import { useEffect, useState } from "react";
import { Alert, ScrollView, StyleSheet, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../screens/HomeStack";
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from "../utilities/metrics";

import Grid from "./grid/Grid";
import Card from "./Card";
import Txt from "./Txt";
import Header from "./Header";
import Btn from "./controls/Btn";
import { CommonActions, useNavigation } from "@react-navigation/native";
import { supabase } from "../lib/supabase";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faCaretDown,
  faCaretRight,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import dayjs from "dayjs";
import { capitalize } from "../utilities/utils";
import { ColorPalette } from "../styles/colorPalette";
import Link from "./controls/Link";

type ScreenProps = NativeStackScreenProps<RootStackParamList, "serviceResume">;

const ServiceResume = ({ route, navigation }: ScreenProps) => {
  const [seeNote, setSeeNote] = useState(true);
  const [outsourcer, setOutsourcer] = useState<{
    name: string;
    logo: string | null;
    brief_description: string;
    service: any;
  } | null>();
  const parentNavigation = useNavigation<any>();

  const getOutsourcer = async () => {
    const { data } = await supabase
      .from("outsourcers")
      .select("name, logo, brief_description, service (name)")
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
      Alert.alert(error?.message || "Could not get user.");
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
    <ScrollView>
      <View style={{ paddingHorizontal: horizontalScale(20) }}>
        <Card style={styles.card}>
          <Grid.Row>
            <Grid.Col colNumber={1}>
              <Txt style={styles.key}>Servicio</Txt>
            </Grid.Col>

            <Grid.Col colNumber={2}>
              <Txt style={styles.item}>{outsourcer?.service.name}</Txt>
            </Grid.Col>
          </Grid.Row>

          <Grid.Row>
            <Grid.Col colNumber={1}>
              <Txt style={styles.key}>Contratista</Txt>
            </Grid.Col>

            <Grid.Col colNumber={2}>
              <Txt style={styles.item}>{outsourcer?.name}</Txt>
            </Grid.Col>
          </Grid.Row>

          <Grid.Row>
            <Grid.Col colNumber={1}>
              <Txt style={styles.key}>Día</Txt>
            </Grid.Col>

            <Grid.Col colNumber={2}>
              <Txt style={styles.item}>
                {capitalize(
                  dayjs(route.params.selectedDay).format("dddd, MMMM D"),
                )}
              </Txt>
            </Grid.Col>
          </Grid.Row>

          <Grid.Row>
            <Grid.Col colNumber={1}>
              <Txt style={styles.key}>Hora</Txt>
            </Grid.Col>

            <Grid.Col colNumber={2}>
              <Txt style={styles.item}>{route.params.selectedTime}</Txt>
            </Grid.Col>
          </Grid.Row>

          <Grid.Row>
            <Grid.Col colNumber={1}>
              <Txt style={styles.key}>Nota</Txt>
            </Grid.Col>

            <Grid.Col colNumber={2}>
              {route.params.note && route.params.note?.length > 0 ? (
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "flex-end",
                  }}>
                  <Link onPress={() => setSeeNote(toggle => !toggle)}>Ver</Link>
                  <FontAwesomeIcon
                    icon={seeNote ? faCaretDown : faCaretRight}
                    color={ColorPalette.primary}
                  />
                </View>
              ) : (
                <Txt
                  style={[
                    styles.item,
                    { color: ColorPalette.tertiary, fontFamily: "ffItalic" },
                  ]}>
                  Sin nota
                </Txt>
              )}
            </Grid.Col>
          </Grid.Row>

          {seeNote && route.params.note && route.params.note?.length > 0 ? (
            <View style={styles.noteContainer}>
              <Txt>{route.params.note}</Txt>
            </View>
          ) : (
            <></>
          )}
        </Card>

        <Header title="A Realizar..." style={styles.subHeader} />

        <Card>
          {route.params.selectedDetails.map((value, index) => (
            <View key={index} style={styles.detailContainer}>
              <FontAwesomeIcon
                style={{ marginRight: horizontalScale(5) }}
                icon={faCheck}
                size={moderateScale(20)}
              />
              <Txt>{value}</Txt>
            </View>
          ))}
        </Card>

        <Btn label="Solicitar" onPress={createRequest} style={styles.button} />
      </View>
    </ScrollView>
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
    marginBottom: verticalScale(10),
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
  card: {
    marginVertical: verticalScale(5),
  },
  key: {
    fontFamily: "ffItalic",
    opacity: 0.5,
  },
  item: {
    textAlign: "right",
  },
  noteContainer: {
    justifyContent: "flex-start",
    padding: moderateScale(10),
    borderRadius: moderateScale(10),
    backgroundColor: "#f3f5ff",
  },
  subHeader: {
    fontSize: moderateScale(16),
    marginTop: verticalScale(10),
  },
  detailContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "99%", // weird
  },
  button: {
    borderRadius: moderateScale(10),
    width: "100%",
  },
});

export default ServiceResume;
