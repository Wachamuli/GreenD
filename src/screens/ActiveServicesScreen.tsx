import { useEffect, useState } from "react";
import { FlatList, Image, StyleSheet, View } from "react-native";

import dayjs from "dayjs";
import { useNavigation } from "@react-navigation/native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  IconDefinition,
  faBan,
  faCheck,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import { TabView, SceneMap } from "react-native-tab-view";

import Txt from "../components/Txt";
import Tappable from "../components/controls/Tappable";
import { navigationProps } from "./ServiceRequestsStack";
import { ColorPalette } from "../styles/colorPalette";
import { supabase } from "../lib/supabase";
import { Database } from "../lib/supabase.types";
import {
  ServiceRequest,
  ServiceRequestStatus,
} from "../lib/supabase.type.alias";
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from "../utilities/metrics";
import {
  capitalize,
  requestStatusFormatter,
  timeFormatter,
} from "../utilities/utils";

function ServiceRequestsScreen() {
  const [index, setIndex] = useState(0);

  const [routes] = useState([
    { key: "first", title: "Pendiente" },
    { key: "second", title: "Completado" },
  ]);

  return (
    <TabView
      renderTabBar={props => (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-evenly",
            borderBottomWidth: moderateScale(1),
            borderColor: ColorPalette.tertiary,
            paddingBottom: verticalScale(10),
          }}>
          {props.navigationState.routes.map((route, index) => {
            const currentIndex = props.navigationState.index === index;
            return (
              <Tappable key={index} onPress={() => setIndex(index)}>
                <Txt
                  style={{
                    fontFamily: currentIndex ? "ffBold" : "ffNormal",
                    color: currentIndex ? ColorPalette.primary : "#9ca3af",
                  }}>
                  {route.title}
                </Txt>
              </Tappable>
            );
          })}
        </View>
      )}
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={SceneMap({
        first: ActiveServicesScreen,
        second: InactiveServiceRequests,
      })}
    />
  );
}

const InactiveServiceRequests = () => {
  const navigation = useNavigation<navigationProps>();
  const [serviceRequests, setServiceRequests] = useState<
    | {
        id: string;
        outsourcer: { name: string; logo: string };
        r_date: string;
        r_time: string;
        service: { name: string };
        status: Database["public"]["Enums"]["service_request_status"];
      }[]
    | null
  >([]);

  const getServiceRequests = async () => {
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (!user || userError) {
      console.error(userError?.message || "Could not get user.");
      return;
    }

    const { data, error } = await supabase
      .from("service_requests")
      .select(
        "id, r_date, r_time, status, service (name), outsourcer (logo, name)",
      )
      .or("status.eq.Completed, status.eq.Canceled")
      .eq("user_id", user.id);

    if (error) {
      console.log(error.message);
      return;
    }

    setServiceRequests(data);
  };

  useEffect(() => {
    const suscription = navigation.addListener("focus", getServiceRequests);
    return suscription;
  }, [navigation]);

  if (serviceRequests && serviceRequests?.length < 1) {
    return (
      <View
        style={{
          display: "flex",
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}>
        <Txt>Sin solicitudes por el momento</Txt>
      </View>
    );
  }

  return (
    <View
      style={{
        paddingHorizontal: horizontalScale(20),
        marginTop: verticalScale(10),
      }}>
      <FlatList
        data={serviceRequests}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <ServiceRequestCard {...item} />}
      />
    </View>
  );
};

const ActiveServicesScreen = (): JSX.Element => {
  const navigation = useNavigation<navigationProps>();
  const [serviceRequests, setServiceRequests] = useState<
    | {
        id: string;
        outsourcer: { name: string; logo: string };
        r_date: string;
        r_time: string;
        service: { name: string };
        status: Database["public"]["Enums"]["service_request_status"];
      }[]
    | null
  >([]);

  const getServiceRequests = async () => {
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (!user || userError) {
      console.error(userError?.message || "Could not get user.");
      return;
    }

    const { data, error } = await supabase
      .from("service_requests")
      .select(
        "id, r_date, r_time, status, service (name), outsourcer (logo, name)",
      )
      .or("status.eq.Pending, status.eq.Confirmed, status.eq.InProgress")
      .eq("user_id", user.id);

    if (error) {
      console.log(error.message);
      return;
    }

    setServiceRequests(data);
  };

  useEffect(() => {
    const suscription = navigation.addListener("focus", getServiceRequests);
    return suscription;
  }, [navigation]);

  if (serviceRequests && serviceRequests?.length < 1) {
    return (
      <View
        style={{
          display: "flex",
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}>
        <Txt>Sin solicitudes por el momento</Txt>
      </View>
    );
  }

  return (
    <View
      style={{
        paddingHorizontal: horizontalScale(20),
        marginTop: verticalScale(10),
      }}>
      <FlatList
        data={serviceRequests}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <ServiceRequestCard {...item} />}
      />
    </View>
  );
};

const ServiceRequestCard = (item: any) => {
  const navigation = useNavigation<navigationProps>();

  const statusColor = (status: ServiceRequestStatus): string => {
    switch (status) {
      case "Pending":
        return ColorPalette.lighterSecondary;
      // case "Confirmed":
      case "InProgress":
        return ColorPalette.accent;
      case "Completed":
        return ColorPalette.secondary;
      case "Canceled":
        return ColorPalette.error;
      default:
        return ColorPalette.error;
    }
  };

  const statusIcon = (status: ServiceRequestStatus): IconDefinition => {
    switch (status) {
      case "Pending":
        return faClock;
      // case "Confirmed":
      // case "InProgress":
      case "Completed":
        return faCheck;
      case "Canceled":
        return faBan;
      default:
        return faBan;
    }
  };

  return (
    <Tappable
      onPress={() => {
        navigation.navigate("activeServicesDetails", {
          serviceRequestId: item.id,
        });
      }}>
      <View style={styles.container}>
        <Image source={{ uri: item?.outsourcer.logo }} style={styles.logo} />

        <View style={{ width: "67%" }}>
          <View style={styles.upperContainer}>
            <Txt numberOfLines={1} style={styles.serviceName}>
              {item.service.name}
            </Txt>
          </View>

          <Txt style={styles.outsourcerName}>{item.outsourcer.name}</Txt>

          <View
            style={[
              styles.statusContainer,
              { backgroundColor: statusColor(item.status) },
            ]}>
            <FontAwesomeIcon
              icon={statusIcon(item.status)}
              color="white"
              size={moderateScale(12)}
            />
            <Txt style={styles.status}>{item.status}</Txt>
          </View>

          <View style={styles.scheduleContainer}>
            <View>
              <Txt style={{ fontSize: moderateScale(12) }}>
                {capitalize(dayjs(item.r_date).format("dddd, MMMM D"))}{" "}
              </Txt>
              <Txt style={{ fontSize: moderateScale(12) }}>
                {timeFormatter(item.r_time)}
              </Txt>
            </View>

            <Tappable onPress={() => {}} hitSlop={moderateScale(15)}>
              <View style={styles.phoneIconContainer}>
                <FontAwesomeIcon icon={faPhone} />
              </View>
            </Tappable>
          </View>
        </View>
      </View>
    </Tappable>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    height: verticalScale(190),
    marginVertical: verticalScale(5),
    borderWidth: moderateScale(0.5),
    borderColor: ColorPalette.tertiary,
    borderRadius: moderateScale(10),
    padding: moderateScale(20),

    justifyContent: "center",
    alignItems: "center",
  },
  upperContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  logo: {
    width: "30%",
    height: "100%",
    borderRadius: moderateScale(10),
    marginRight: horizontalScale(10),
  },
  serviceName: {
    fontSize: moderateScale(14),
  },
  outsourcerName: {
    fontFamily: "ffBold",
    marginTop: verticalScale(10),
  },
  statusContainer: {
    flexDirection: "row",
    alignSelf: "flex-start",
    borderRadius: moderateScale(10),
    paddingVertical: verticalScale(5),
    paddingHorizontal: verticalScale(10),
    // backgroundColor: ColorPalette.lighterSecondary,
    alignItems: "center",
  },
  status: {
    color: "white",
    fontSize: moderateScale(12),
    marginLeft: horizontalScale(5),
  },
  phoneIconContainer: {
    alignSelf: "flex-end",
    color: ColorPalette.primary,
    alignItems: "center",
    justifyContent: "center",
    height: verticalScale(40),
    width: verticalScale(40),
    borderWidth: moderateScale(0.5),
    borderRadius: moderateScale(40) / 2,
    borderColor: ColorPalette.tertiary,
  },
  scheduleContainer: {
    flexDirection: "row",
    marginVertical: verticalScale(10),
    justifyContent: "space-between",
  },
});

export default ServiceRequestsScreen;
