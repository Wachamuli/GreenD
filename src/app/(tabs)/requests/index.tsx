import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { FlatList, StyleSheet, View } from "react-native";

import { TabView, SceneMap } from "react-native-tab-view";

import Txt from "../../../components/info/Txt";
import Tappable from "../../../components/controls/Tappable";
import { ColorPalette } from "../../../styles/colorPalette";
import { supabase } from "../../../lib/supabase";
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from "../../../utilities/metrics";
import Filter from "../../../components/controls/Filter";
import ServiceRequestCard from "../../../components/containers/ServiceRequestCard";

function ServiceRequest() {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "first", title: "Pendiente" },
    { key: "second", title: "Completado" },
  ]);
  const [services, setServices] = useState();
  const [serviceFilter, setServiceFilter] = useState<string | number>(0);

  const getServices = async () => {
    const { data } = await supabase.from("services").select("id, name");
    setServices(data);
  };

  useEffect(() => {
    getServices();
  }, []);

  return (
    <TabView
      renderTabBar={props => (
        <View style={{ backgroundColor: "white" }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-evenly",
              borderBottomWidth: moderateScale(1),
              borderColor: ColorPalette.tertiary,
              paddingBottom: verticalScale(10),
              backgroundColor: "white",
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

          <View style={{ paddingTop: verticalScale(20) }}>
            <Filter
              data={services}
              selected={serviceFilter}
              onPress={id => setServiceFilter(id)}
              style={{
                selectedColor: "white",
                selectedBorderColor: "white",
                selectedBackgroundColor: ColorPalette.primary,
              }}
            />
          </View>
        </View>
      )}
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={SceneMap({
        first: () => <ActiveServicesScreen serviceFilter={serviceFilter} />,
        second: () => <InactiveServiceRequests serviceFilter={serviceFilter} />,
      })}
    />
  );
}

const EmptyRequestList = () => {
  return (
    <View style={styles.centeredItem}>
      <Txt>Sin solicitudes por el momento</Txt>
    </View>
  );
};

const InactiveServiceRequests = ({
  serviceFilter,
}: {
  serviceFilter: string | number;
}) => {
  const {
    data: inactiveServiceRequests,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["inactiveServiceRequests", serviceFilter],
    queryFn: async () =>
      await supabase
        .from("service_requests")
        .select(
          "id, r_date, r_time, status, service (id, name), outsourcer (logo, name)",
        )
        .or("status.eq.Completed, status.eq.Canceled")
        .match(serviceFilter ? { service: serviceFilter } : {})
        .throwOnError(),
  });

  if (error) return <Txt>Hubo un error</Txt>;

  if (isLoading) return <Txt>Cargando...</Txt>;

  return (
    <FlatList
      style={styles.listContainer}
      contentContainerStyle={styles.listContentContainer}
      data={inactiveServiceRequests.data}
      keyExtractor={item => item.id}
      renderItem={({ item }) => <ServiceRequestCard {...item} />}
      ListEmptyComponent={EmptyRequestList}
    />
  );
};

const ActiveServicesScreen = ({
  serviceFilter,
}: {
  serviceFilter: string | number;
}): JSX.Element => {
  const {
    data: activeServiceRequests,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["activeServiceRequests", serviceFilter],
    queryFn: async () =>
      await supabase
        .from("service_requests")
        .select(
          "id, r_date, r_time, status, service (id, name), outsourcer (logo, name)",
        )
        .or("status.eq.Pending, status.eq.Confirmed, status.eq.InProgress")
        .match(serviceFilter ? { service: serviceFilter } : {})
        .throwOnError(),
  });

  if (error) return <Txt>Hubo un error</Txt>;

  if (isLoading) return <Txt>Cargando...</Txt>;

  return (
    <FlatList
      style={styles.listContainer}
      contentContainerStyle={styles.listContentContainer}
      data={activeServiceRequests.data}
      keyExtractor={item => item.id}
      renderItem={({ item }) => <ServiceRequestCard {...item} />}
      ListEmptyComponent={EmptyRequestList}
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    paddingHorizontal: horizontalScale(20),
    paddingTop: verticalScale(10),
    backgroundColor: "white",
  },
  listContentContainer: {
    paddingBottom: verticalScale(30),
  },
  centeredItem: {
    display: "flex",
    marginTop: "50%",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ServiceRequest;
