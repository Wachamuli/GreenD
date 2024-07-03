import { useEffect, useState } from "react";
import { SectionList, StyleSheet, TextInput, View } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { router } from "expo-router";

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

import Txt from "../info/Txt";
import Tappable from "./Tappable";
import LoadingIndicator from "../info/LoadingIndicator";
import { supabase } from "../../lib/supabase";
import { ColorPalette } from "../../styles/colorPalette";
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from "../../utilities/metrics";

const SearchItem = ({ name, id }: { name: string; id?: string }) => {
  return (
    <Tappable
      disabled={!id}
      onPress={() => {
        router.navigate({
          pathname: "/home/details",
          params: { serviceId: id },
        });
      }}>
      <View
        style={{
          borderBottomWidth: moderateScale(0.5),
          borderBottomColor: ColorPalette.tertiary,
          paddingVertical: verticalScale(15),
        }}>
        <Txt>{name}</Txt>
      </View>
    </Tappable>
  );
};

const SearchBar = () => {
  const [search, setSearch] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const [temporaryServices, setTemporaryServices] = useState([
    { id: 0, name: "" },
  ]);
  const {
    data: services,
    isLoading: isServicesLoading,
    isSuccess: isServicesSuccess,
  } = useQuery({
    queryKey: ["services"],
    queryFn: async () => {
      const result = await supabase
        .from("services")
        .select("id, name")
        .throwOnError();

      setTemporaryServices(result.data);
      return result;
    },
  });

  const [temporaryOutsourcers, setTemporaryOutsourcers] = useState([
    { id: "", name: "", service: { name: "" } },
  ]);
  const {
    data: outsources,
    isLoading: isOutsourcersLoading,
    isSuccess: isOutsourcersSuccess,
  } = useQuery({
    queryKey: ["outsourcers"],
    queryFn: async () => {
      const result = await supabase
        .from("outsourcers")
        .select("id, name, service (name)")
        .throwOnError();

      setTemporaryOutsourcers(result.data);
      return result;
    },
  });

  if (isServicesLoading) return <LoadingIndicator />;

  useEffect(() => {
    if (isServicesSuccess)
      setTemporaryServices(
        services.data!.filter(service =>
          service.name.toLowerCase().startsWith(search.toLowerCase()),
        ),
      );

    if (isOutsourcersSuccess)
      setTemporaryOutsourcers(
        outsources.data!.filter(outsourcer =>
          outsourcer.service.name
            .toLowerCase()
            .startsWith(search.toLowerCase()),
        ),
      );
  }, [search]);

  const sections = [
    {
      title: "Servicios",
      data: temporaryServices,
      EmptySectionComponent: () => (
        <SearchItem name="Ningún servicio encontrado" />
      ),
    },
    {
      title: "Populares",
      data: temporaryOutsourcers,
      EmptySectionComponent: () => (
        <SearchItem name="Ningún contratista encontrado" />
      ),
    },
  ];

  return (
    <View style={styles.container}>
      <View>
        <TextInput
          placeholder="Buscar"
          placeholderTextColor={"#9ca3af"}
          style={styles.textInput}
          onChangeText={text => setSearch(text)}
          onFocus={() => setIsSearching(true)}
          onBlur={() => setIsSearching(false)}
        />
        <View style={styles.iconContainer}>
          <FontAwesomeIcon icon={faMagnifyingGlass} size={20} color="#9ca3af" />
        </View>
      </View>
      <View>
        <SectionList
          style={{
            display: isSearching ? "flex" : "none",
            position: "absolute",
            backgroundColor: "white",
            width: "100%",
            borderWidth: moderateScale(0.5),
            borderRadius: moderateScale(10),
            paddingHorizontal: horizontalScale(10),
            marginTop: verticalScale(5),
          }}
          keyboardShouldPersistTaps="always"
          keyExtractor={item => item.id}
          sections={sections}
          ListEmptyComponent={() => <Txt>Resultado no encontrado</Txt>}
          renderSectionHeader={({
            section: { data, title, EmptySectionComponent },
          }) => (
            <View>
              <Txt
                style={{
                  fontFamily: "ffBold",
                  marginTop: verticalScale(10),
                }}>
                {title}
              </Txt>

              {data.length < 1 && <EmptySectionComponent />}
            </View>
          )}
          renderItem={({ item }) => (
            <SearchItem id={item.id} name={item.name} />
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    zIndex: 99,
    marginBottom: verticalScale(5),
    // paddingHorizontal: horizontalScale(20),
    width: "100%",
  },
  textInput: {
    backgroundColor: "#f3f4f6",
    borderRadius: moderateScale(10),
    borderColor: ColorPalette.tertiary,
    paddingVertical: verticalScale(15),
    paddingHorizontal: horizontalScale(50),
    fontSize: moderateScale(16),
    width: "100%",
  },
  iconContainer: {
    position: "absolute",
    left: "5%",
    top: "30%",
  },
});

export default SearchBar;

// const SearchBar = () => {
//   const {
//     data: services,
//     isLoading: isServicesLoading,
//     isSuccess: isServicesSuccess,
//   } = useQuery({
//     queryKey: ["services"],
//     queryFn: async () =>
//       await supabase.from("services").select("id, name").throwOnError(),
//   });
//   const {
//     data: outsources,
//     isLoading: isOutsourcersLoading,
//     isSuccess: isOutsourcersSuccess,
//   } = useQuery({
//     queryKey: ["outsourcers"],
//     queryFn: async () =>
//       await supabase
//         .from("outsourcers")
//         .select("id, name, service (name)")
//         .throwOnError(),
//   });
//   const [isSearching, setIsSearching] = useState(false);
//   const [search, setSearch] = useState("");
//   const [temporaryServices, setTemporaryServices] = useState<any>();
//   const [temporaryOutsourcers, setTemporaryOutsourcers] = useState<any>();

//   if (isServicesSuccess) setTemporaryServices(services);
//   if (isOutsourcersSuccess) setTemporaryOutsourcers(outsources);

//   useEffect(() => {
//     if (isServicesSuccess)
//       setTemporaryServices(
//         services.filter(service =>
//           service.name.toLowerCase().startsWith(search.toLowerCase()),
//         ),
//       );

//     if (isOutsourcersSuccess)
//       setTemporaryOutsourcers(
//         outsourcers.filter(outsourcer =>
//           outsourcer.service.name
//             .toLowerCase()
//             .startsWith(search.toLowerCase()),
//         ),
//       );
//   }, [search]);
// };
