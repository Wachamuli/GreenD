import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { navigationProps } from "./ServiceRequestsStack";

import Card from "../components/containers/Card";
import Tappable from "../components/controls/Tappable";
import Txt from "../components/info/Txt";
import { supabase } from "../lib/supabase";
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from "../utilities/metrics";
import { capitalize, timeFormatter } from "../utilities/utils";
import { ServiceRequest } from "../lib/supabase.type.alias";
import dayjs from "dayjs";

const HistorialScreen = (): JSX.Element => {
  // const navigation = useNavigation<navigationProps>();
  const [serviceRequests, setServiceRequests] = useState<
    ServiceRequest[] | null
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
      .select("*")
      .or("status.eq.Completed, status.eq.Canceled")
      .eq("user_id", user.id);

    if (error) {
      console.log(error.message);
      return;
    }

    setServiceRequests(data);
  };

  useEffect(() => {
    getServiceRequests();
  }, [])

  // useEffect(() => {
  //   const suscription = navigation.addListener("focus", getServiceRequests);
  //   return suscription;
  // }, [navigation]);

  return (
    // <View
    //   style={{
    //     display: "flex",
    //     flex: 1,
    //     alignItems: "center",
    //     justifyContent: "center",
    //   }}>
    //   <Text style={{ color: "gray" }}>Historial</Text> */}
    // </View>
    <FlatList
      data={serviceRequests}
      keyExtractor={item => item.id}
      renderItem={({ item: { id, r_date, r_time, service, status } }) => (
        <Card>
          <Tappable
            onPress={() => {
              // navigation.navigate("activeServicesDetails", {
              //   serviceRequestId: id,
              // });
            }}>
            {/* <View style={styles.container}> */}
            <View style={styles.datetimeContainer}>
              <Txt style={styles.dateLabel}>
                {capitalize(dayjs(r_date).format("dddd, MMMM D"))}{" "}
              </Txt>
              <Txt style={styles.timeLabel}>{timeFormatter(r_time)}</Txt>
            </View>
            <View style={styles.apponitmentDetailsCard}>
              <View>
                {/* <View style={styles.serviceContainer}>
                  <View style={styles.serviceIcon}>
                    <FontAwesomeIcon color="white" icon={faWrench} />
                  </View>
                  <Txt style={styles.serviceName}>{service}</Txt>
                </View> */}
                <Txt style={styles.state}>{status}</Txt>
              </View>
            </View>
            {/* </View>  */}
          </Tappable>
        </Card>
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
    borderWidth: moderateScale(1),
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
    backgroundColor: "blue",
    paddingVertical: moderateScale(20),
    paddingHorizontal: moderateScale(20),
    borderRadius: 100,
  },
  serviceName: {
    fontFamily: "ffNormal",
    marginLeft: horizontalScale(5),
  },
  state: {
    fontFamily: "ffBold",
    color: "#FFA33C",
  },
  apponitmentDetailsCard: {
    paddingVertical: horizontalScale(20),
  },
});

export default HistorialScreen;
