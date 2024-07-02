import { useState } from "react";
import { FlatList } from "react-native";
import { useQuery } from "@tanstack/react-query";

import Filter from "./controls/Filter";
import LoadingIndicator from "./info/LoadingIndicator";
import HomeOutsourcerCard from "./HomeOutsourcerCard";
import ErrorView from "./info/ErrorView";
import { supabase } from "../lib/supabase";
import { ColorPalette } from "../styles/colorPalette";

const OutsourcersHomeView = () => {
  const [serviceFilter, setServiceFilter] = useState<string | number>(0);
  const {
    data: user,
    isLoading: isUserLoading,
    error: userError,
  } = useQuery({
    queryKey: ["user"],
    queryFn: async () => await supabase.auth.getUser(),
  });
  const {
    data: outsourcers,
    isLoading: isOutsourcersLoading,
    error: outsourcersError,
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
  const {
    data: services,
    isLoading: isServicesLoading,
    error: servicesError,
  } = useQuery({
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

  if (userError || servicesError || outsourcersError) return <ErrorView />;

  if (isUserLoading || isServicesLoading || isOutsourcersLoading)
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
