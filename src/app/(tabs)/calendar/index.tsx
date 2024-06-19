import { useCallback, useEffect, useMemo, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { Calendar as CalendarComponent } from "react-native-calendars";
import { supabase } from "../../../lib/supabase";
import Txt from "../../../components/info/Txt";
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from "../../../utilities/metrics";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import dayjs from "dayjs";
import { ColorPalette } from "../../../styles/colorPalette";
import Header from "../../../components/info/Header";
import { useFocusEffect } from "expo-router";
import { ServiceRequestCard } from "../requests";

type SelectedDay = {
  [x: string]: {
    selected: boolean;
    selectedColor: string;
    textColor: string;
  };
}[];

const Calendar = () => {
  const [serviceRequests, setServiceRequests] = useState<any>();
  const [bookingDays, setBookingDays] = useState<SelectedDay>();
  const [selectedDay, setSelectedDay] = useState<string>(
    dayjs(new Date()).format("YYYY-MM-DD"),
  );

  const getBookings = async (selectedDay: string) => {
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (!user || userError) {
      console.error(userError?.message || "Could not get user.");
      return;
    }

    const { data: serviceRequests } = await supabase
      .from("service_requests")
      .select("*, outsourcer(name, logo), service(name) ")
      .or("status.eq.Pending, status.eq.Confirmed, status.eq.InProgress")
      .eq("user_id", user.id);

    const filteredServices = serviceRequests?.filter(
      requests => requests.r_date === selectedDay,
    );

    setServiceRequests(filteredServices);

    const formattedBookingDays = serviceRequests?.reduce(
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

  useFocusEffect(
    useCallback(() => {
      getBookings(selectedDay);
    }, []),
  );

  useEffect(() => {
    getBookings(selectedDay);
  }, [selectedDay]);

  let date = new Date();

  const marked = useMemo(() => {
    return {
      ...bookingDays,
      [selectedDay]: {
        selected: true,
        selectedColor: ColorPalette.primary,
        textColor: "white",
      },
    };
  }, [selectedDay, bookingDays]);

  return (
    <View
      style={{
        paddingHorizontal: horizontalScale(20),
        backgroundColor: "white",
        flex: 1,
      }}>
      <FlatList
        data={serviceRequests}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={() => (
          <>
            <CalendarComponent
              firstDay={1}
              futureScrollRange={6}
              pastScrollRange={6}
              disableAllTouchEventsForInactiveDays
              enableSwipeMonths
              markedDates={marked}
              onDayPress={date => {
                setSelectedDay(date.dateString);
              }}
              renderHeader={date => (
                <Txt style={styles.headerStyle}>
                  {dayjs(date).format("MMMM YYYY")}{" "}
                </Txt>
              )}
              renderArrow={direction =>
                direction === "right" ? (
                  <FontAwesomeIcon icon={faChevronRight} />
                ) : (
                  <FontAwesomeIcon icon={faChevronLeft} />
                )
              }
              style={{ borderRadius: moderateScale(10), overflow: "hidden" }}
              theme={{
                textDayFontFamily: "ffNormal",
                textDayHeaderFontFamily: "ffBold",
                calendarBackground: "#f3f5ff",
                selectedDayBackgroundColor: ColorPalette.primary,
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
            />

            <Header
              title={`Citas (${serviceRequests?.length})`}
              style={{
                fontSize: moderateScale(18),
                marginTop: verticalScale(10),
              }}
            />
          </>
        )}
        renderItem={({ item }) => <ServiceRequestCard {...item} />}
        ListEmptyComponent={() => (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
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
  calendarContainer: {
    borderRadius: moderateScale(10),
    overflow: "hidden",
  },
  headerStyle: {
    textTransform: "capitalize",
    fontFamily: "ffBold",
    fontSize: moderateScale(14),
  },
});

export default Calendar;
