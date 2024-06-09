import { useState, useEffect } from "react";
import { Tabs } from "expo-router";

import CustomTabs from "../../components/layout/CustomTabs";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faHome,
  faClipboard as faClipboardSolid,
  faUser as faUserSolid,
  faBookmark as faBookmarkSolid,
  faCalendar as faCalendarSolid,
} from "@fortawesome/free-solid-svg-icons";
import {
  faUser as faUserRegular,
  faClipboard as faClipboardRegular,
  faBookmark as faBookmarkRegular,
  faCalendar as faCalendarRegular,
} from "@fortawesome/free-regular-svg-icons";
import { supabase } from "../../lib/supabase";

const TabLayout = () => {
  const [totalActiveServices, setTotalActiveServices] = useState<string>();

  // TODO: This function is also defined and called in ActiveServicesScreen.
  // There's must be a way to take its value from there and bring it to here
  // to avoid code duplication and sustained maintainability.
  const getActiveRequests = async () => {
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    const { error: totalRequestsError, count: totalRequests } = await supabase
      .from("service_requests")
      .select("*", { head: true, count: "exact" })
      .eq("user_id", user?.id ?? "")
      .or("status.eq.Pending, status.eq.Confirmed, status.eq.InProgress");

    const total = totalRequests === 0 ? undefined : totalRequests;

    setTotalActiveServices(total?.toString());
  };

  useEffect(() => {
    getActiveRequests();
  }, []);

  return (
    <Tabs tabBar={CustomTabs} screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="home"
        options={{
          title: "Inicio",
          tabBarIcon: props => <FontAwesomeIcon icon={faHome} {...props} />,
        }}
      />
      <Tabs.Screen
        name="requests"
        options={{
          title: "Solicitudes",
          tabBarIcon: props => (
            <FontAwesomeIcon
              icon={props.focused ? faClipboardSolid : faClipboardRegular}
              {...props}
            />
          ),
          tabBarBadge: totalActiveServices,
        }}
      />
      <Tabs.Screen
        name="calendar"
        options={{
          title: "Calendario",
          tabBarIcon: props => (
            <FontAwesomeIcon
              icon={props.focused ? faCalendarSolid : faCalendarRegular}
              {...props}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="bookings"
        options={{
          title: "Marcadores",
          tabBarIcon: props => (
            <FontAwesomeIcon
              icon={props.focused ? faBookmarkSolid : faBookmarkRegular}
              {...props}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Perfil",
          tabBarIcon: props => (
            <FontAwesomeIcon
              icon={props.focused ? faUserSolid : faUserRegular}
              {...props}
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabLayout;
