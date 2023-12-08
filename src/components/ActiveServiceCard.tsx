import { useEffect, useState } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import dayjs from "dayjs";

import { timeFormatter, requestStatusFormatter } from "../utilities/utils";
import { supabase } from "../lib/supabase";
import Txt from "./Txt";
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from "../utilities/metrics";

type Props = {
  time: string;
  day: string;
  details: string[];
  status: string;
};

const ActiveServiceCard = (props: Props): JSX.Element => {
  const [serviceRequests, setServiceRequests] = useState<
    | {
        id: string;
        r_date: string;
        r_time: string;
        details: string;
        request_status: number;
      }[]
    | null
  >();

  const getServiceRequests = async () => {
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError) console.log(userError.message);
    if (!user) console.log("No user");

    const { data } = await supabase
      .from("service_requests")
      .select("id, r_date, r_time, details, request_status")
      .eq("user_id", user?.id ?? "No user");

    setServiceRequests(data);
  };

  useEffect(() => {
    getServiceRequests();
  }, []);

  return (
    <FlatList
      data={serviceRequests}
      keyExtractor={item => item.id}
      renderItem={({ item: { r_date, r_time, details, request_status } }) => (
        <View style={styles.container}>
          <View style={styles.datetimeContainer}>
            <Txt style={styles.dateLabel}>
              {dayjs(r_date).format("dddd, MMMM D")}
            </Txt>
            <Txt style={styles.timeLabel}>{timeFormatter(r_time)}</Txt>
          </View>
          <View style={styles.apponitmentDetailsCard}>
            <View>
              <Txt>{details.split("\n", 1)[0]}</Txt>
              <Txt style={styles.state}>{requestStatusFormatter(request_status)}</Txt>
            </View>
          </View>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "flex-start",
    backgroundColor: "white",
    paddingHorizontal: horizontalScale(40),
    paddingVertical: verticalScale(10),
    marginTop: verticalScale(10),
    borderRadius: moderateScale(20),
    // marginBottom: verticalScale(10),
  },
  datetimeContainer: {
    flexDirection: "column",
  },
  dateLabel: {
    fontFamily: "ffBold",
  },
  timeLabel: {
    fontFamily: "ffNormal",
  },
  state: {
    color: "#FFC436",
  },
  apponitmentDetailsCard: {
    // maxWidth: "75%",
    // borderLeftWidth: 2,
    // borderBottomWidth: 2,
    // borderRadius: moderateScale(10),
    paddingVertical: horizontalScale(20),
  },
});

export default ActiveServiceCard;
