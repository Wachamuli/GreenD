import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { ActivityIndicator, Alert, FlatList, View } from "react-native";
import ServiceCard from "../components/serviceCard";
import { horizontalScale } from "../utilities/metrics";

const AllServicesScreen = () => {
  const [services, setServices] = useState<
    | {
        id: string;
        name: string;
        description: string;
        image: string;
      }[]
    | null
  >(null);

  const getServices = async () => {

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    const { data: condominiumServices, error } = await supabase
      .from("condominium_services")
      .select(`service_id (id, name, description, image)`)
      .eq("condominium_id", user?.user_metadata.condominium);

    if (error) Alert.alert(error.message);

    const serviceData = condominiumServices?.map(item => item["service_id"]);

    // FIXME:
    setServices(serviceData);
  };

  useEffect(() => {
    getServices();
  }, []);

  if (!services)
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}>
        <ActivityIndicator size={40} />
      </View>
    );

  return (
    <FlatList
      data={services}
      keyExtractor={item => item.id}
      showsVerticalScrollIndicator={false}
      numColumns={3}
      contentContainerStyle={{ paddingHorizontal: horizontalScale(20) }}
      columnWrapperStyle={{
        justifyContent: "space-between",
      }}
      renderItem={({ item: data, index }) => <ServiceCard {...data} />}
    />
  );
};

export default AllServicesScreen;
