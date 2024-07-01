import { FlatList, View } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { router } from "expo-router";

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";

import Txt from "../../../components/info/Txt";
import ServiceCard from "../../../components/ServiceCard";
import Tappable from "../../../components/controls/Tappable";
import LoadingIndicator from "../../../components/info/LoadingIndicator";
import { supabase } from "../../../lib/supabase";
import { Service } from "../../../lib/supabase.type.alias";
import { moderateScale } from "../../../utilities/metrics";
import { ColorPalette } from "../../../styles/colorPalette";

const ServicesHomeView = () => {
  const { data: user } = useQuery({
    queryKey: ["user"],
    queryFn: async () => await supabase.auth.getUser(),
  });
  const { data: services, isLoading } = useQuery({
    enabled: !!user,
    queryKey: ["services", user],
    queryFn: async () => {
      const { data: condominiumServices } = await supabase
        .from("condominium_services")
        .select(`service_id (*)`)
        .eq("condominium_id", user?.data.user?.user_metadata.condominium)
        .throwOnError();

      // @ts-ignore
      const services: Service[] = condominiumServices?.map(
        item => item["service_id"],
      ); 

      return services;
    },
  });

  if (isLoading) return <LoadingIndicator />;

  return (
    <FlatList
      data={services}
      keyExtractor={item => item.id.toString()}
      showsVerticalScrollIndicator={false}
      numColumns={3}
      columnWrapperStyle={{
        justifyContent: "space-between",
      }}
      renderItem={({ item: data, index }) => {
        if (index <= 4)
          return (
            <ServiceCard
              id={data.id.toString()}
              name={data.name}
              image={data.image}
              description={data.description}
            />
          );

        return (
          <Tappable onPress={() => router.navigate("/home/all-services")}>
            <View
              style={{
                width: moderateScale(100),
                height: moderateScale(80),
                justifyContent: "center",
                alignItems: "center",
              }}>
              <View
                style={{
                  width: moderateScale(80),
                  height: moderateScale(80),
                  borderRadius: moderateScale(80) / 2,
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "#f3f4f6",
                }}>
                <FontAwesomeIcon
                  icon={faEllipsis}
                  size={moderateScale(42)}
                  color={ColorPalette.tertiary}
                />
              </View>
            </View>
            <View>
              <Txt
                style={{
                  fontSize: moderateScale(12),
                  textAlign: "center",
                  fontFamily: "ffBold",
                  color: ColorPalette.tertiary,
                }}>
                Ver todos
              </Txt>
            </View>
          </Tappable>
        );
      }}
    />
  );
};

export default ServicesHomeView;
