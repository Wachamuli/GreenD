import { FlatList } from "react-native";
import Filter from "./controls/Filter";
import LoadingIndicator from "./info/LoadingIndicator";
import { supabase } from "../lib/supabase";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { ColorPalette } from "../styles/colorPalette";
import HomeOutsourcerCard from "./HomeOutsourcerCard";
import { verticalScale } from "../utilities/metrics";

const OutsourcersHomeView = () => {
  const [serviceFilter, setServiceFilter] = useState<string | number>(0);
  const { data: user, isLoading: isUserLoading } = useQuery({
    queryKey: ["user"],
    queryFn: async () => await supabase.auth.getUser(),
  });
  const {
    data: outsourcers,
    isLoading: isOutsourcersLoading,
    isSuccess,
  } = useQuery({
    enabled: !!user,
    queryKey: ["outsourcers", user, serviceFilter],
    queryFn: async () =>
      await supabase
        .from("outsourcers")
        .select(
          "id, name, logo, brief_description, condominium, owner, service (name)",
        )
        .eq("condominium", user?.data.user?.user_metadata.condominium)
        .match(serviceFilter ? { service: serviceFilter } : {})
        .throwOnError(),
  });
  const { data: services, isLoading: isServicesLoading } = useQuery({
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

  if (isUserLoading || isOutsourcersLoading || isServicesLoading)
    return <LoadingIndicator />;

  return (
    <FlatList
      data={outsourcers!.data}
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={() => (
        <Filter
          data={services}
          selected={serviceFilter}
          onPress={id => setServiceFilter(id)}
          style={{
            selectedBackgroundColor: ColorPalette.primary,
            selectedColor: "white",
          }}
        />
      )}
      renderItem={({ item: outsourcer }) => (
        <HomeOutsourcerCard {...outsourcer} />
      )}
    />
  );
};

export default OutsourcersHomeView;
