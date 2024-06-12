import { useEffect, useState } from "react";
import { Image, Linking, ScrollView, StyleSheet, View } from "react-native";
import dayjs from "dayjs";

import Txt from "../../../components/info/Txt";
import Card from "../../../components/containers/Card";
import Header from "../../../components/info/Header";
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from "../../../utilities/metrics";
import { supabase } from "../../../lib/supabase";
import Popup, { PopupProps } from "../../../components/info/Popup";
import { type ServiceRequest } from "../../../lib/supabase.type.alias";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faCaretDown,
  faCaretRight,
  faCheck,
  faFlag,
  faPhone,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { faBookmark, faCreditCard } from "@fortawesome/free-regular-svg-icons";
import { capitalize, timeFormatter } from "../../../utilities/utils";
import Grid from "../../../components/containers/Grid";
import { router, useLocalSearchParams } from "expo-router";
import Link from "../../../components/controls/Link";
import { ColorPalette } from "../../../styles/colorPalette";
import StatusLabel from "../../../components/info/StatusLabel";
import CircleButton from "../../../components/controls/CircleButton";

const ServiceDetails = (): JSX.Element => {
  const params = useLocalSearchParams();
  const [serviceDetails, setServiceDetails] = useState<ServiceRequest>();
  const [popupProps, setPopupProps] = useState<PopupProps>();

  const getServiceDetails = async () => {
    const { data, error } = await supabase
      .from("service_requests")
      // TODO: Also I'm gonna need the agent details
      .select("*, outsourcer(*), service(*)")
      .eq("id", params.serviceRequestId)
      .single();

    if (error) {
      console.error(error.message);
      return;
    }

    setServiceDetails(data);
  };

  const cancelServiceRequest = async () => {
    const { error } = await supabase
      .from("service_requests")
      .update({ status: "Canceled" })
      .eq("id", params.serviceRequestId);

    // TODO: Instead of goBack go to the Suggestions screen
    router.dismiss();
  };

  const showCancelConfirmationModal = () => {
    setPopupProps({
      title: "¿Desea cancelar su solicitud?",
      description: "Al cancelar el servicio no se llevará acabo.",
      buttonOptions: [
        {
          label: "Atrás",
          onPress: () => {},
          style: {
            fontSize: moderateScale(14),
            backgroundColor: "#f3f5ff",
            color: ColorPalette.primary,

            paddingHorizontal: horizontalScale(20),
            paddingVertical: verticalScale(15),

            borderWidth: moderateScale(2),
            borderColor: ColorPalette.primary,
          },
        },
        {
          label: "Sí, cancelar",
          onPress: () => cancelServiceRequest(),
          style: {
            fontSize: moderateScale(14),
            backgroundColor: ColorPalette.error,

            paddingVertical: verticalScale(15),
            paddingHorizontal: horizontalScale(20),
          },
        },
      ],
    });
  };

  useEffect(() => {
    getServiceDetails();
  }, []);

  const [seeNote, setSeeNote] = useState(true);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <Image
          style={styles.outsourcerImage}
          source={{
            uri: serviceDetails?.outsourcer?.logo,
          }}
        />

        <Header title={serviceDetails?.outsourcer.name} />
        <Txt>{serviceDetails?.outsourcer?.brief_description}</Txt>
      </View>

      <View style={styles.buttonsContainer}>
        {/* TODO: CircleButtons phone, profile, maybe delete? */}
        <CircleButton
          icon={faTrashCan}
          onPress={showCancelConfirmationModal}
          iconStyle={{
            color: ColorPalette.error,
          }}
          containerStyle={{
            borderColor: ColorPalette.error,
          }}
        />
        <CircleButton
          icon={faFlag}
          onPress={() =>
            router.navigate({
              pathname: "/requests/report",
              params: {
                serviceRequestId: serviceDetails?.id,
                outsourcerName: serviceDetails?.outsourcer?.name,
              },
            })
          }
        />
        <CircleButton
          icon={faPhone}
          onPress={() => {
            Linking.openURL(`tel:${8090001111}`);
          }}
        />
        <CircleButton icon={faBookmark} onPress={() => {}} />
      </View>

      <Card>
        <Grid.Row>
          <Grid.Col colNumber={1}>
            <Txt style={styles.key}>Servicio</Txt>
          </Grid.Col>

          <Grid.Col colNumber={2}>
            <Txt style={styles.item}>{serviceDetails?.service.name}</Txt>
          </Grid.Col>
        </Grid.Row>

        <Grid.Row>
          <Grid.Col colNumber={1}>
            <Txt style={styles.key}>Status</Txt>
          </Grid.Col>

          <Grid.Col colNumber={2}>
            <StatusLabel
              containerStyle={{ alignSelf: "flex-end" }}
              status={serviceDetails?.status}
            />
          </Grid.Col>
        </Grid.Row>

        <Grid.Row>
          <Grid.Col colNumber={1}>
            <Txt style={styles.key}>Día</Txt>
          </Grid.Col>

          <Grid.Col colNumber={2}>
            <Txt style={styles.item}>
              {capitalize(dayjs(serviceDetails?.r_date).format("dddd, MMMM D"))}
            </Txt>
          </Grid.Col>
        </Grid.Row>

        <Grid.Row>
          <Grid.Col colNumber={1}>
            <Txt style={styles.key}>Hora</Txt>
          </Grid.Col>

          <Grid.Col colNumber={2}>
            <Txt style={styles.item}>
              {timeFormatter(serviceDetails?.r_time || "")}
            </Txt>
          </Grid.Col>
        </Grid.Row>

        <Grid.Row>
          <Grid.Col colNumber={1}>
            <Txt style={styles.key}>Nota</Txt>
          </Grid.Col>

          <Grid.Col colNumber={2}>
            {serviceDetails?.note && serviceDetails.note?.length > 0 ? (
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

        {seeNote && serviceDetails?.note && serviceDetails.note.length > 0 ? (
          <View style={styles.noteContainer}>
            <Txt>{serviceDetails.note}</Txt>
          </View>
        ) : (
          <></>
        )}
      </Card>

      <Txt style={{ fontFamily: "ffBold", marginTop: verticalScale(20) }}>
        A realizar
      </Txt>

      <Card style={{ marginTop: verticalScale(10) }}>
        {serviceDetails?.details.split(",").map((detail, index) => (
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

      {/* TODO: Maybe add a another container for payment details */}

      <Popup {...popupProps} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: horizontalScale(20),
    paddingBottom: verticalScale(20),
    backgroundColor: "white",
  },
  buttonsContainer: {
    flexDirection: "row",
    marginVertical: verticalScale(10),
    justifyContent: "space-evenly",
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
  outsourcerImage: {
    width: moderateScale(150),
    height: moderateScale(150),
    borderRadius: moderateScale(150) / 2,
  },
  detailContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "99%", // weird
  },
});

export default ServiceDetails;
