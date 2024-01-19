import { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import dayjs from "dayjs";

import Txt from "../components/Txt";
import Tappable from "../components/controls/Tappable";
import Card from "../components/Card";
import { RootStackParamList } from "./ServiceRequestsStack";
import Header from "../components/Header";
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from "../utilities/metrics";
import { supabase } from "../lib/supabase";
import Popup, { PopupProps } from "../components/Popup";
import { type ServiceRequest } from "../lib/supabase.type.alias";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faChevronRight,
  faDollarSign,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { faNewspaper } from "@fortawesome/free-regular-svg-icons";
import { capitalize, timeFormatter } from "../utilities/utils";
import Grid from "../components/grid/Grid";
import Hidden from "../components/Hidden";

type ScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "activeServicesDetails"
>;

const ActiveServiceDetailsScreen = ({
  route,
  navigation,
}: ScreenProps): JSX.Element => {
  const [serviceDetails, setServiceDetails] = useState<ServiceRequest>();
  const [popupProps, setPopupProps] = useState<PopupProps>();

  const getServiceDetails = async () => {
    const { data, error } = await supabase
      .from("service_requests")
      // TODO: Also I'm gonna need the agent details
      .select("*, outsourcer(*), service(*)")
      .eq("id", route.params.serviceRequestId)
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
      .eq("id", route.params.serviceRequestId);

    // TODO: Instead of goBack go to the Suggestions screen
    navigation.goBack();
  };

  const showCancelConfirmationModal = () => {
    setPopupProps({
      title: "¿Desea cancelar su solicitud?",
      description: "Al cancelar el servicio no se llevará acabo.",
      buttonOptions: {
        label: "Cancelar",
        onPress: () => cancelServiceRequest(),
      },
    });
  };

  useEffect(() => {
    getServiceDetails();
  }, []);

  return (
    <ScrollView style={styles.container}>
      {/* <Header title="Resumen" /> */}
      <Card>
        <Txt>{serviceDetails?.status + "..."}</Txt>
        <Txt>
          {capitalize(dayjs(serviceDetails?.created_at).format("dddd, MMMM D"))}
        </Txt>
        <Txt>
          {serviceDetails?.r_time && timeFormatter(serviceDetails?.r_time)}
        </Txt>
      </Card>

      <Card style={{ backgroundColor: "white" }}>
        <Tappable>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View
              style={{
                backgroundColor: "black",
                marginRight: horizontalScale(14),
                padding: moderateScale(10),
                borderRadius: moderateScale(20),
              }}>
              <FontAwesomeIcon icon={faDollarSign} color="white" />
            </View>
            <Txt style={{ color: "black", fontWeight: "bold" }}>
              Procesar pago
            </Txt>
            <FontAwesomeIcon
              icon={faChevronRight}
              color="black"
              size={25}
              style={{ marginLeft: "auto" }}
            />
          </View>
        </Tappable>
      </Card>

      <Card>
        <View style={styles.outsourcerInfoContainer}>
          <Image
            style={styles.outsourcerImage}
            source={{
              uri: serviceDetails?.outsourcer?.logo ?? "Default image",
            }}
          />
          <Header
            style={styles.outsourcerName}
            title={serviceDetails?.outsourcer?.name}
          />
          <Txt style={styles.outsourcerBriefDescription}>
            {serviceDetails?.outsourcer?.brief_description}
          </Txt>
        </View>

        <View style={styles.detailsContainer}>
          <Txt style={styles.detail}>{serviceDetails?.details}</Txt>
        </View>

        <View style={styles.appointment}>
          <Grid.Row>
            <Grid.Col colNumber={1}>
              <Txt style={styles.key}>Día</Txt>
            </Grid.Col>
            <Grid.Col colNumber={2}>
              <Txt>{serviceDetails?.r_date}</Txt>
            </Grid.Col>
          </Grid.Row>
          <Grid.Row>
            <Grid.Col colNumber={1}>
              <Txt style={styles.key}>Hora</Txt>
            </Grid.Col>
            <Grid.Col colNumber={2}>
              <Txt>{serviceDetails?.r_time}</Txt>
            </Grid.Col>
          </Grid.Row>

          <View
            style={{
              paddingBottom: verticalScale(50),
              marginTop: verticalScale(50),
              alignItems: "center",
            }}>
            <Txt style={styles.key}>Nota</Txt>
            <Txt> {serviceDetails?.note || "Sin anotaciones"}</Txt>
          </View>
        </View>
      </Card>

      <Card style={{ backgroundColor: "blue" }}>
        <Tappable
          onPress={() => {
            navigation.push("report", {
              serviceRequestId: route.params.serviceRequestId,
            });
          }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View
              style={{
                backgroundColor: "white",
                marginRight: horizontalScale(14),
                padding: moderateScale(10),
                borderRadius: moderateScale(20),
              }}>
              <FontAwesomeIcon icon={faNewspaper} color="blue" />
            </View>
            <Txt style={{ color: "white", fontWeight: "bold" }}>Reportar</Txt>
            <FontAwesomeIcon
              icon={faChevronRight}
              color="white"
              size={25}
              style={{ marginLeft: "auto" }}
            />
          </View>
        </Tappable>
      </Card>

      <Txt
        style={{
          color: "red",
          fontWeight: "bold",
          marginTop: verticalScale(30),
          marginHorizontal: horizontalScale(10),
        }}>
        ¡Cuidado!{" "}
        <Txt style={{ color: "red" }}>Esta acción no es reversible.</Txt>
      </Txt>
      <Card style={{ backgroundColor: "red", marginBottom: verticalScale(60) }}>
        <Tappable onPress={showCancelConfirmationModal}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View
              style={{
                backgroundColor: "white",
                marginRight: horizontalScale(14),
                padding: moderateScale(10),
                borderRadius: moderateScale(20),
              }}>
              <FontAwesomeIcon icon={faTrashCan} color="red" />
            </View>
            <Txt style={{ color: "white", fontWeight: "bold" }}>
              Cancelar solicitud
            </Txt>
          </View>
        </Tappable>
      </Card>

      <Popup {...popupProps} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: horizontalScale(10),
    paddingTop: verticalScale(10),
  },
  resumeTableContainer: {
    alignItems: "center",
    backgroundColor: "white",
    marginHorizontal: horizontalScale(10),
    paddingTop: verticalScale(20),
    marginBottom: verticalScale(20),
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

export default ActiveServiceDetailsScreen;
