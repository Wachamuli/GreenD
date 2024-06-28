import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { FlatList, Image, Linking, StyleSheet, View } from "react-native";

import dayjs from "dayjs";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
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
import { capitalize, timeFormatter } from "../../../utilities/utils";
import { router, useFocusEffect } from "expo-router";
import StatusLabel from "../../../components/info/StatusLabel";
import CircleButton from "../../../components/controls/CircleButton";
import Filter from "../../../components/controls/Filter";

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
    <View
      style={{
        display: "flex",
        marginTop: "50%",
        justifyContent: "center",
        alignItems: "center",
      }}>
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
        .select("id, r_date, r_time, status, service (id, name), outsourcer (logo, name)")
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

const ServiceRequestCard = (item: any) => {
  return (
    <Tappable
      onPress={() => {
        router.navigate({
          pathname: "/requests/details",
          params: { serviceRequestId: item.id },
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

          <StatusLabel status={item.status} />

          <View style={styles.scheduleContainer}>
            <View>
              <Txt style={{ fontSize: moderateScale(12) }}>
                {capitalize(dayjs(item.r_date).format("dddd, MMMM D"))}{" "}
              </Txt>
              <Txt style={{ fontSize: moderateScale(12) }}>
                {timeFormatter(item.r_time)}
              </Txt>
            </View>

            <CircleButton
              icon={faPhone}
              onPress={() => {
                Linking.openURL(`tel:${8090001111}`);
              }}
            />
          </View>
        </View>
      </View>
    </Tappable>
  );
};

export { ServiceRequestCard };

const styles = StyleSheet.create({
  listContainer: {
    paddingHorizontal: horizontalScale(20),
    paddingTop: verticalScale(10),
    backgroundColor: "white",
  },
  listContentContainer: {
    paddingBottom: verticalScale(30),
  },
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

export default ServiceRequest;
function a(): undefined {
  throw new Error("Function not implemented.");
}
