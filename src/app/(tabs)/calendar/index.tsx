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
import { Calendar as MyCalendar } from "react-native-calendars";
import {
  // MyCalendar,
  SelectedDay,
} from "../../../components/controls/MyCalendar";
import { ColorPalette } from "../../../styles/colorPalette";
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from "../../../utilities/metrics";
import { ServiceRequest } from "../../../lib/supabase.type.alias";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

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
    console.log(formattedBookingDays);

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
    <FlatList
      style={styles.container}
      data={filteredRequests}
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={() => (
        <>
          {/* <MyCalendar markedDates={marked} onValueChange={setSelectedDay} /> */}
          <View>
            <MyCalendar
              firstDay={1}
              pastScrollRange={1}
              futureScrollRange={1}
              enableSwipeMonths
              disableAllTouchEventsForDisabledDays
              disableAllTouchEventsForInactiveDays
              markedDates={marked}
              style={styles.calendarContainer}
              theme={{
                textDayFontFamily: "ffNormal",
                textDayHeaderFontFamily: "ffBold",
                calendarBackground: "#f3f5ff",
                "stylesheet.calendar.header": {
                  dayTextAtIndex0: {
                    color: "black",
                  },
                  dayTextAtIndex1: {
                    color: "black",
                  },
                  dayTextAtIndex2: {
                    color: "black",
                  },
                  dayTextAtIndex3: {
                    color: "black",
                  },
                  dayTextAtIndex4: {
                    color: "black",
                  },
                  dayTextAtIndex5: {
                    color: "black",
                  },
                  dayTextAtIndex6: {
                    color: "black",
                  },
                },
              }}
              onDayPress={day => {
                setSelectedDay(day.dateString);
              }}
              renderHeader={date => (
                <Txt style={styles.headerStyle}>
                  {dayjs(date).format("MMMM YYYY")}{" "}
                </Txt>
              )}
              // renderArrow={direction => (
              //   <FontAwesomeIcon
              //     icon={direction === "right" ? faChevronRight : faChevronLeft}
              //   />
              // )}
            />
          </View>

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
