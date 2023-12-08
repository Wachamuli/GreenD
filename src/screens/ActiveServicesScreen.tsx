import { useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faWrench } from "@fortawesome/free-solid-svg-icons";

import dayjs from "dayjs";
import { supabase } from "../lib/supabase";
import Txt from "../components/Txt";
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
import Tappable from "../components/controls/Tappable";
import { navigationProps } from "./ServiceRequestsStack";

const ActiveServicesScreen = (): JSX.Element => {
  const navigation = useNavigation<navigationProps>();
  const [serviceRequests, setServiceRequests] = useState<
    | {
        id: string;
        r_date: string;
        r_time: string;
        service: { name: string };
        request_status: number;
      }[]
    | null
  >([]);

  const getServiceRequests = async () => {
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError) console.log(userError.message);
    if (!user) console.log("No user");

    const { data } = await supabase
      .from("service_requests")
      .select("id, r_date, r_time, request_status, service(name)")
      .eq("user_id", user?.id ?? "No user");

    // FIXME: It's just Typescript complaint but it's working
    setServiceRequests(data);
  };

  useEffect(() => {
    getServiceRequests();
  }, []);

  return (
    <FlatList
      data={serviceRequests}
      keyExtractor={item => item.id}
      renderItem={({
        item: { id, r_date, r_time, service, request_status },
      }) => (
        <Tappable
          onPress={() => {
            navigation.navigate("activeServicesDetails", {
              serviceRequestId: id,
            });
          }}>
          <View style={styles.container}>
            <View style={styles.datetimeContainer}>
              <Txt style={styles.dateLabel}>
                {capitalize(dayjs(r_date).format("dddd, MMMM D"))}{" "}
              </Txt>
              <Txt style={styles.timeLabel}>{timeFormatter(r_time)}</Txt>
            </View>
            <View style={styles.apponitmentDetailsCard}>
              <View>
                <View style={styles.serviceContainer}>
                  <View style={styles.serviceIcon}>
                    <FontAwesomeIcon color="white" icon={faWrench} />
                  </View>
                  <Txt style={styles.serviceName}>{service.name}</Txt>
                </View>
                <Txt style={styles.state}>
                  {requestStatusFormatter(request_status)}
                </Txt>
              </View>
            </View>
          </View>
        </Tappable>
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "flex-start",
    paddingHorizontal: horizontalScale(40),
    paddingVertical: verticalScale(10),
    marginHorizontal: horizontalScale(10),
    marginVertical: verticalScale(10),
    borderRadius: moderateScale(20),
    borderWidth: moderateScale(2),
  },
  datetimeContainer: {
    flexDirection: "column",
  },
  dateLabel: {
    fontFamily: "ffNormal",
  },
  timeLabel: {
    fontFamily: "ffNormal",
  },
  serviceContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: moderateScale(2),
    borderRadius: 100,
  },
  serviceIcon: {
    backgroundColor: "red",
    paddingVertical: moderateScale(20),
    paddingHorizontal: moderateScale(20),
    borderRadius: 100,
  },
  serviceName: {
    fontFamily: "ffBold",
    marginLeft: horizontalScale(5),
  },
  state: {
    color: "#FFA33C",
  },
  apponitmentDetailsCard: {
    paddingVertical: horizontalScale(20),
  },
});

export default ActiveServicesScreen;
