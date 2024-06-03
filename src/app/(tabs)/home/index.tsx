import { useState, useEffect } from "react";
import { FlatList, View, Alert, ActivityIndicator, Image } from "react-native";

import { Picker } from "@react-native-picker/picker";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";

import Txt from "../../../components/Txt";
import Header from "../../../components/Header";
import ServiceCard from "../../../components/ServiceCard";
import Tappable from "../../../components/controls/Tappable";
import SearchBar from "../../../components/controls/SearchBar";
import HomeOutsourcerCard from "../../../components/HomeOutsourcerCard";
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from "../../../utilities/metrics";
import { supabase } from "../../../lib/supabase";
import { ColorPalette } from "../../../styles/colorPalette";
import { router } from "expo-router";

const Home = (): JSX.Element => {
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

  const Filter = () => {
    const [selectedValue, setSelectedValue] = useState();

    // TODO:
    // useEffect(() => {
    //   setServices((prevServices) => {
    //     const oldServices = [...prevServices];
    //   })
    // }, [selectedValue])

    return (
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
          selectedValue={selectedValue}
          onValueChange={setSelectedValue}
          style={{
            bottom: 13,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}>
          <Picker.Item key={0} value={""} label={"Filtros"} />
          {services?.map((service, index) => (
            <Picker.Item
              key={index + 1}
              value={service.id}
              label={service.name}
            />
          ))}
        </Picker>
      </View>
    );
  };

  return (
    <View
      style={{
        width: "100%",
        paddingHorizontal: horizontalScale(20),
        paddingBottom: verticalScale(70),
        backgroundColor: "white",
      }}>
      <SearchBar />

      <FlatList
        data={outsourcers}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={() => (
          <View>
            <Header title="Ofertas" style={{ fontSize: moderateScale(18) }} />

            <View
              style={{
                width: "100%",
                height: verticalScale(80),
                borderRadius: moderateScale(10),
                overflow: "hidden",
                marginBottom: verticalScale(20),
              }}>
              <Image
                source={{
                  uri: "https://zeawfjfjjegnpsfvfapw.supabase.co/storage/v1/object/public/outsourcer_logos/deal_banner_placeholder.png",
                }}
                style={{
                  height: verticalScale(80),
                  width: "100%",
                }}
              />
            </View>

            <FlatList
              data={services}
              keyExtractor={item => item.id}
              showsVerticalScrollIndicator={false}
              numColumns={3}
              columnWrapperStyle={{
                justifyContent: "space-between",
              }}
              ListHeaderComponent={() => (
                <Header
                  style={{ fontSize: moderateScale(18) }}
                  title={"Servicios"}
                />
              )}
              renderItem={({ item: data, index }) => {
                if (index <= 4) return <ServiceCard {...data} />;

                return (
                  <Tappable onPress={() => router.push("/home/all-services")}>
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
              <Filter />
            </View>
          </View>
        )}
        renderItem={({ item: outsourcer }) => (
          <HomeOutsourcerCard {...outsourcer} />
        )}
      />
    </View>
  );
};

export default Home;
