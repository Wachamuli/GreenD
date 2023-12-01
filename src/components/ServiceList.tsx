import { useState, useEffect } from "react";
import { FlatList, View, Alert, ActivityIndicator } from "react-native";

import ServiceCard from "./serviceCard";
import { supabase } from "../lib/supabase";

const ServiceList = (): JSX.Element => {
  const [loading, setLoading] = useState(true);
  const [services, setServices] = useState<{
    id: string;
    name: string;
    description: string;
    image: string;
  }[]>();

  const getServices = async () => {
    setLoading(true);

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    const { data: service_id, error } = await supabase
      .from("condominium_services")
      .select(`service_id (id, name, description, image)`)
      .eq("condominium_id", user?.user_metadata.condominium);

    if (error) Alert.alert(error.message);

    const services_data = service_id?.map(item => item["service_id"]);

    // FIXME:
    setServices(services_data);
    setLoading(false);
  };

  useEffect(() => {
    getServices();
  }, []);

  return (
    <>
      {loading ? (
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}>
          <ActivityIndicator size={40} />
        </View>
      ) : (
        <FlatList
          data={services}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <ServiceCard {...item} />}
        />
      )}
    </>
  );
};

export default ServiceList;
