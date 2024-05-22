import { useState, useEffect } from "react";
import {
  FlatList,
  SectionList,
  Image,
  View,
  Alert,
  ActivityIndicator,
  TextInput,
  ScrollView,
} from "react-native";

import ServiceCard from "./serviceCard";
import { supabase } from "../lib/supabase";
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from "../utilities/metrics";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faCircle,
  faCircleDot,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import Header from "./Header";
import { ColorPalette } from "../styles/colorPalette";
import Txt from "./Txt";
import Tappable from "./controls/Tappable";
import { faBookmark } from "@fortawesome/free-regular-svg-icons";
import { Picker } from "@react-native-picker/picker";

const ServiceList = (): JSX.Element => {
  const [loading, setLoading] = useState(true);
  const [outsourcers, setOutsourcers] = useState<
    | {
        id: string;
        name: string;
        logo: string;
        brief_description: string;
        condominium: string;
        service: { name: string };
        owner: string;
      }[]
    | null
  >(null);
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
    setLoading(true);

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
    setLoading(false);
  };

  const getOutsourcers = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { data, error } = await supabase
      .from("outsourcers")
      .select(
        "id, name, logo, brief_description, condominium, owner, service (name)",
      )
      .eq("condominium", user?.user_metadata.condominium);

    setOutsourcers(data);
  };

  useEffect(() => {
    getServices();
    getOutsourcers();
  }, []);

  if (loading) {
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
  }

  const DATA = [
    {
      title: "Servicios",
      data: services,
      Component: ServiceCard,
      horizontal: true,
    },
    {
      title: "Más Populares",
      data: outsourcers,
      Component: OutsourcerCard,
      horizontal: false,
    },
  ];

  return (
    <View style={{ width: "100%", paddingHorizontal: horizontalScale(20) }}>
      <SearchBar />

      {/* I can't believe this is the correct way to handle lists in RN. */}
      <SectionList
        sections={DATA}
        style={{ width: "100%" }}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: verticalScale(100) }}
        renderSectionHeader={({ section: { title, data, horizontal } }) => {
          if (!horizontal) {
            return <></>;
          }

          return (
            <>
              {/* <Header title="Ofertas" style={{ fontSize: moderateScale(18) }} />

              <View
                style={{
                  width: "100%",
                  height: verticalScale(80),
                  borderWidth: 1,
                  borderRadius: moderateScale(10),
                }}>
                <Txt style={{ fontFamily: "ffBold" }}>30%</Txt>
              </View>

              <View
                style={{ alignItems: "center", marginTop: verticalScale(4) }}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: "10%",
                  }}>
                  <FontAwesomeIcon
                    icon={faCircleDot}
                    size={moderateScale(10)}
                    color={ColorPalette.primary}
                  />
                  <FontAwesomeIcon
                    icon={faCircle}
                    size={moderateScale(10)}
                    color={ColorPalette.tertiary}
                  />
                  <FontAwesomeIcon
                    icon={faCircle}
                    size={moderateScale(10)}
                    color={ColorPalette.tertiary}
                  />
                </View>
              </View> */}

              <View style={{ paddingVertical: verticalScale(10) }}>
                <FlatList
                  data={data}
                  keyExtractor={item => item.id}
                  showsVerticalScrollIndicator={false}
                  numColumns={3}
                  contentContainerStyle={{
                    flexDirection: "column",
                    rowGap: verticalScale(15),
                    paddingVertical: verticalScale(10),
                  }}
                  columnWrapperStyle={{
                    justifyContent: "space-between",
                  }}
                  ListHeaderComponent={() => (
                    <Header
                      style={{ fontSize: moderateScale(18) }}
                      title={"Servicios"}
                    />
                  )}
                  renderItem={({ item: data }) => <ServiceCard {...data} />}
                />
              </View>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}>
                <Header
                  style={{ fontSize: moderateScale(18) }}
                  title="Más Populares"
                />
                <View
                  style={{
                    position: "relative",
                    borderColor: ColorPalette.tertiary,
                    borderWidth: moderateScale(0.5),
                    borderRadius: verticalScale(40),
                    width: horizontalScale(135),
                    height: verticalScale(30),
                    overflow: "hidden",
                  }}>
                  <Picker
                    mode="dropdown"
                    style={{
                      bottom: 13,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      width: "100%",
                    }}
                    // selectedValue={field.value}
                  >
                    <Picker.Item key={0} value={""} label={"Filtros"} />
                  </Picker>
                </View>
              </View>
            </>
          );
        }}
        renderItem={({ item, section: { Component, horizontal } }) => {
          if (horizontal) {
            return <></>;
          }
          return <Component {...item} />;
        }}
      />

      {/* <FlatList
        data={services}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        numColumns={3}
        // contentContainerStyle={{
        //   flexDirection: "column",
        //   rowGap: verticalScale(15),
        //   paddingVertical: verticalScale(10),
        // }}
        // columnWrapperStyle={{
        //   justifyContent: "space-between",
        // }}
        ListHeaderComponent={() => <Header title="Servicios" />}
        renderItem={({ item: data }) => <ServiceCard {...data} />}
      />

      <FlatList
        data={outsourcers}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={() => <Header title="Servicios" />}
        renderItem={({ item: data }) => <OutsourcerCard {...data} />}
      /> */}
    </View>
  );
};

const OutsourcerCard = (item: any) => {
  return (
    <Tappable>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          height: verticalScale(150),
          marginVertical: verticalScale(5),
          borderWidth: moderateScale(0.5),
          borderColor: ColorPalette.tertiary,
          borderRadius: moderateScale(10),
          padding: moderateScale(20),
        }}>
        <Image
          source={{ uri: item.logo }}
          style={{
            width: "30%",
            height: "100%",
            borderRadius: moderateScale(10),
            marginRight: horizontalScale(10),
          }}
        />

        <View style={{ width: "67%" }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}>
            <Txt
              style={{
                fontSize: moderateScale(14),
              }}>
              {item.service.name}
            </Txt>

            <Tappable onPress={() => {}} hitSlop={moderateScale(20)}>
              <FontAwesomeIcon icon={faBookmark} size={moderateScale(20)} />
            </Tappable>
          </View>

          <Txt
            style={{
              fontFamily: "ffBold",
              marginTop: verticalScale(10),
            }}>
            {item.name}
          </Txt>
          <Txt
            style={{
              fontFamily: "ffBold",
              color: ColorPalette.lighterSecondary,
            }}>
            $250
          </Txt>
        </View>
      </View>
    </Tappable>
  );
};

const SearchBar = () => {
  return (
    <View
      style={{
        // marginBottom: verticalScale(25),
        width: "100%",
      }}>
      <View>
        <TextInput
          placeholder="Buscar"
          placeholderTextColor={"#9ca3af"}
          style={{
            backgroundColor: "#f3f4f6",
            borderRadius: moderateScale(10),
            borderColor: ColorPalette.tertiary,
            paddingVertical: verticalScale(15),
            paddingHorizontal: horizontalScale(50),

            fontSize: moderateScale(16),
            width: "100%",
          }}
        />
        <View style={{ position: "absolute", left: "5%", top: "30%" }}>
          <FontAwesomeIcon icon={faMagnifyingGlass} size={20} color="#9ca3af" />
        </View>
      </View>
    </View>
  );
};

export default ServiceList;
