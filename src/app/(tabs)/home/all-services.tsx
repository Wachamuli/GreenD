import { supabase } from "../../../lib/supabase";
import { ActivityIndicator, Alert, FlatList, View } from "react-native";
import ServiceCard from "../../../components/ServiceCard";
import { horizontalScale } from "../../../utilities/metrics";
import { useQuery } from "@tanstack/react-query";
import ErroView from "../../../components/info/ErrorView";

const AllServicesScreen = () => {
  const {
    data: services,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["services"],
    queryFn: async () =>
      await supabase
        .from("condominium_services")
        .select(`service_id (id, name, description, image)`)
        // The user should only be able to watch their own services.
        // Enforce this behaviour by RLS.
        // .eq("condominium_id", user?.user_metadata.condominium)
        .throwOnError(),
  });
  // const [services, setServices] = useState<
  //   | {
  //       id: string;
  //       name: string;
  //       description: string;
  //       image: string;
  //     }[]
  //   | null
  // >(null);

  // const getServices = async () => {
  //   const {
  //     data: { user },
  //     error: userError,
  //   } = await supabase.auth.getUser();

  //   const { data: condominiumServices, error } = await supabase
  //     .from("condominium_services")
  //     .select(`service_id (id, name, description, image)`)
  //     .eq("condominium_id", user?.user_metadata.condominium);

  //   if (error) Alert.alert(error.message);

  //   const serviceData = condominiumServices?.map(item => item["service_id"]);

  //   // FIXME:
  //   setServices(serviceData);
  // };

  // useEffect(() => {
  //   getServices();
  // }, []);

  if (error) return <ErroView />;

  if (isLoading)
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
    <View style={{ backgroundColor: "white", flex: 1 }}>
      <FlatList
        data={services?.data}
        keyExtractor={item => item.service_id}
        showsVerticalScrollIndicator={false}
        numColumns={3}
        contentContainerStyle={{ paddingHorizontal: horizontalScale(20) }}
        columnWrapperStyle={{
          justifyContent: "space-between",
        }}
        renderItem={({ item: data, index }) => (
          <ServiceCard {...data.service_id} />
        )}
      />
    </View>
  );
};

export default AllServicesScreen;
