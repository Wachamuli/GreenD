import { useEffect, useMemo, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";

import dayjs from "dayjs";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "../../../lib/supabase";

import Txt from "../../../components/info/Txt";
import Header from "../../../components/info/Header";
import ErrorView from "../../../components/info/ErrorView";
import LoadingIndicator from "../../../components/info/LoadingIndicator";
import ServiceRequestCard from "../../../components/containers/ServiceRequestCard";
import MyCalendar, {
  SelectedDay,
} from "../../../components/controls/MyCalendar";
import { ColorPalette } from "../../../styles/colorPalette";
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from "../../../utilities/metrics";
import { ServiceRequest } from "../../../lib/supabase.type.alias";

const today = dayjs(new Date()).format("YYYY-MM-DD");

const Calendar = () => {
  const {
    data: serviceRequests,
    error: requestsError,
    isLoading: isRequestLoading,
    isSuccess: isRequestsSuccess,
  } = useQuery({
    queryKey: ["serviceRequests"],
    queryFn: async () =>
      await supabase
        .from("service_requests")
        .select("*, outsourcer(name, logo), service(name) ")
        .or("status.eq.Pending, status.eq.Confirmed, status.eq.InProgress")
        .throwOnError(),
  });
  const [selectedDay, setSelectedDay] = useState(today);
  const [bookingDays, setBookingDays] = useState<SelectedDay>();
  const [filteredRequests, setFilteredRequests] = useState<ServiceRequest[]>();

  const marked = useMemo(() => {
    return {
      ...bookingDays,
      [selectedDay]: {
        selected: true,
        selectedColor: ColorPalette.primary,
        textColor: "white",
      },
    };
  }, [bookingDays, selectedDay]);

  const getBookingDays = async () => {
    const formattedBookingDays = serviceRequests?.data?.reduce(
      (acc: SelectedDay, item) => {
        acc[item.r_date] = {
          marked: true,
          textColor: "white",
          dotColor: ColorPalette.accent,
        };
        return acc;
      },
      {},
    );

    setBookingDays(formattedBookingDays);
  };

  useEffect(() => {
    if (!isRequestsSuccess) return;

    getBookingDays();
    setFilteredRequests(
      serviceRequests.data?.filter(request => request.r_date === selectedDay),
    );
  }, [selectedDay, isRequestsSuccess]);

  if (requestsError) return <ErrorView />;

  if (isRequestLoading) return <LoadingIndicator />;

  return (
    <View style={styles.container}>
      <FlatList
        data={filteredRequests}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={() => (
          <>
            <MyCalendar markedDates={marked} onValueChange={setSelectedDay} />

            <Header
              title={`Citas (${filteredRequests?.length})`}
              style={styles.subHeader}
            />
          </>
        )}
        renderItem={({ item }) => <ServiceRequestCard {...item} />}
        ListEmptyComponent={() => (
          <View style={styles.emptyList}>
            <Txt style={{ color: ColorPalette.tertiary }}>
              Sin citas disponibles para hoy
            </Txt>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: horizontalScale(20),
  },
  calendarContainer: {
    borderRadius: moderateScale(10),
    overflow: "hidden",
  },
  subHeader: {
    fontSize: moderateScale(18),
    marginTop: verticalScale(10),
  },
  headerStyle: {
    textTransform: "capitalize",
    fontFamily: "ffBold",
    fontSize: moderateScale(14),
  },
  emptyList: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Calendar;
