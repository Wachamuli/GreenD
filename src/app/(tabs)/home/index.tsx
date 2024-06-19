import { useState, useEffect } from "react";
import { FlatList, View, Alert, ActivityIndicator, Image } from "react-native";

import { Picker } from "@react-native-picker/picker";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";

import Txt from "../../../components/info/Txt";
import Header from "../../../components/info/Header";
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
import Filter from "../../../components/controls/Filter";

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
  const [serviceFilter, setServiceFilter] = useState<string | number>(0);

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

    let outsourcerData;
    let outsourcerError;

    if (serviceFilter) {
      const { data, error } = await supabase
        .from("outsourcers")
        .select(
          "id, name, logo, brief_description, condominium, owner, service (name)",
        )
        .eq("service", serviceFilter)
        .eq("condominium", user?.user_metadata.condominium);

      outsourcerError = error;
      outsourcerData = data;
    } else {
      const { data, error } = await supabase
        .from("outsourcers")
        .select(
          "id, name, logo, brief_description, condominium, owner, service (name)",
        )
        .eq("condominium", user?.user_metadata.condominium);

      outsourcerError = error;
      outsourcerData = data;
    }

    if (outsourcerError) {
      console.log(outsourcerError.message);
      return;
    }

    setOutsourcers(outsourcerData);
  };

  useEffect(() => {
    getServices();
  }, []);

  useEffect(() => {
    getOutsourcers();
  }, [serviceFilter])

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

  return (
    <View
      style={{
        width: "100%",
        paddingBottom: verticalScale(70),
        backgroundColor: "white",
      }}>
      <SearchBar />

      <FlatList
        data={outsourcers}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={() => (
          <View>
            <View style={{ paddingHorizontal: horizontalScale(20) }}>
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
                    <Tappable
                      onPress={() => router.navigate("/home/all-services")}>
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

              <Header
                style={{ fontSize: moderateScale(18) }}
                title="Más Populares"
              />
            </View>

            <Filter
              data={services}
              selected={serviceFilter}
              onPress={id => setServiceFilter(id)}
              style={{
                selectedBackgroundColor: ColorPalette.primary,
                selectedColor: "white",
              }}
            />
          </View>
        )}
        renderItem={({ item: outsourcer }) => (
          <View style={{ paddingHorizontal: horizontalScale(20) }}>
            <HomeOutsourcerCard {...outsourcer} />
          </View>
        )}
      />
    </View>
  );
};

export default Home;
