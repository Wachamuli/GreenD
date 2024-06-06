import { useEffect, useState } from "react";
import { Alert, ScrollView, StyleSheet, View } from "react-native";
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from "../../../utilities/metrics";

import Grid from "../../../components/containers/Grid";
import Card from "../../../components/containers/Card";
import Txt from "../../../components/info/Txt";
import Header from "../../../components/info/Header";
import Btn from "../../../components/controls/Btn";
import { useNavigation } from "@react-navigation/native";
import { supabase } from "../../../lib/supabase";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faCaretDown,
  faCaretRight,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import dayjs from "dayjs";
import { capitalize } from "../../../utilities/utils";
import { ColorPalette } from "../../../styles/colorPalette";
import Link from "../../../components/controls/Link";
import { router, useLocalSearchParams } from "expo-router";

const ServiceResume = () => {
  const params = useLocalSearchParams();
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
      .eq("id", params.selectedOutsourcer)
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
        details: params.selectedDetails,
        outsourcer: params.selectedOutsourcer,
        r_date: params.selectedDay,
        r_time: params.selectedTime,
        service: Number(params.serviceId),
        note: params.note,
      });

    if (insertionError) {
      Alert.alert(insertionError.message);
      return;
    }

    router.dismissAll();
    router.replace("/requests");
  };

  return (
    <>
      <ScrollView
        style={{ backgroundColor: "white" }}
        contentContainerStyle={{
          backgroundColor: "white",
          paddingHorizontal: horizontalScale(20),
        }}>
        <View>
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
                  {capitalize(dayjs(params.selectedDay).format("dddd, MMMM D"))}
                </Txt>
              </Grid.Col>
            </Grid.Row>

            <Grid.Row>
              <Grid.Col colNumber={1}>
                <Txt style={styles.key}>Hora</Txt>
              </Grid.Col>

              <Grid.Col colNumber={2}>
                <Txt style={styles.item}>{params.selectedTime}</Txt>
              </Grid.Col>
            </Grid.Row>

            <Grid.Row>
              <Grid.Col colNumber={1}>
                <Txt style={styles.key}>Nota</Txt>
              </Grid.Col>

              <Grid.Col colNumber={2}>
                {params.note && params.note?.length > 0 ? (
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "flex-end",
                    }}>
                    <Link onPress={() => setSeeNote(toggle => !toggle)}>
                      Ver
                    </Link>
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

            {seeNote && params.note && params.note?.length > 0 ? (
              <View style={styles.noteContainer}>
                <Txt>{params.note}</Txt>
              </View>
            ) : (
              <></>
            )}
          </Card>

          <Header title="A Realizar..." style={styles.subHeader} />

          <Card style={{ marginBottom: verticalScale(10) }}>
            {params.selectedDetails?.split(",").map((detail, index) => (
              <View key={index} style={styles.detailContainer}>
                <FontAwesomeIcon
                  style={{ marginRight: horizontalScale(5) }}
                  icon={faCheck}
                  size={moderateScale(20)}
                />
                <Txt>{detail}</Txt>
              </View>
            ))}
          </Card>
        </View>
      </ScrollView>

      <View
        style={{
          bottom: 0,
          width: "100%",
          position: "absolute",
          paddingHorizontal: horizontalScale(20),
        }}>
        <Btn label="Solicitar" onPress={createRequest} style={styles.button} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  resumeTableContainer: {
    alignItems: "center",
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
