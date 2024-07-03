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
import ErrorView from "../info/ErrorView";

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
  const {
    data: services,
    isLoading: isServicesLoading,
    isSuccess: isServicesSuccess,
    error: servicesError,
  } = useQuery({
    queryKey: ["services"],
    queryFn: async () =>
      await supabase.from("services").select("id, name").throwOnError(),
  });
  const {
    data: outsources,
    isLoading: isOutsourcersLoading,
    isSuccess: isOutsourcersSuccess,
    error: outsourcersError,
  } = useQuery({
    queryKey: ["outsourcers"],
    queryFn: async () =>
      await supabase
        .from("outsourcers")
        .select("id, name, service (name)")
        .returns<{ id: string; name: string; service: { name: string } }[]>()
        .throwOnError(),
  });

  const [temporaryServices, setTemporaryServices] = useState([
    { id: 0, name: "" },
  ]);

  const [temporaryOutsourcers, setTemporaryOutsourcers] = useState([
    { id: "", name: "", service: { name: "" } },
  ]);
  const [search, setSearch] = useState("");

  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    if (!isServicesSuccess) return;

    setTemporaryServices(
      services.data!.filter(service =>
        service.name.toLowerCase().startsWith(search.toLowerCase()),
      ),
    );
  }, [search, isServicesSuccess]);

  useEffect(() => {
    if (!isOutsourcersSuccess) return;

    setTemporaryOutsourcers(
      outsources.data!.filter(outsourcer =>
        outsourcer.service.name.toLowerCase().startsWith(search.toLowerCase()),
      ),
    );
  }, [search, isOutsourcersSuccess]);

  if (servicesError || outsourcersError) return <ErrorView />;

  if (isServicesLoading || isOutsourcersLoading) return <LoadingIndicator />;

  const sections: {
    title: string;
    data: any;
    EmptySectionComponent: () => JSX.Element;
  }[] = [
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
          style={[
            styles.sectionList,
            { display: isSearching ? "flex" : "none" },
          ]}
          keyboardShouldPersistTaps="always"
          keyExtractor={item => item.id.toString()}
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
            <SearchItem id={item.id.toString()} name={item.name} />
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
  sectionList: {
    position: "absolute",
    backgroundColor: "white",
    width: "100%",
    borderWidth: moderateScale(0.5),
    borderRadius: moderateScale(10),
    paddingHorizontal: horizontalScale(10),
    marginTop: verticalScale(5),
  },
});

export default SearchBar;
