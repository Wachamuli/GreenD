import { useState, useEffect } from "react";
import { FlatList, View, Alert, ActivityIndicator, Image } from "react-native";

import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";
import { navigationProp } from "../screens/HomeStack";
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
  faEllipsis,
} from "@fortawesome/free-solid-svg-icons";
import Header from "./Header";
import { ColorPalette } from "../styles/colorPalette";
import Txt from "./Txt";
import Tappable from "./controls/Tappable";
import SearchBar from "../components/controls/SearchBar";
import HomeOutsourcerCard from "./HomeOutsourcerCard";

const ServiceList = (): JSX.Element => {
  const navigation = useNavigation<navigationProp>();
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

  return (
    <View
      style={{
        width: "100%",
        paddingHorizontal: horizontalScale(20),
        paddingBottom: verticalScale(70),
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

            {/* <View style={{ alignItems: "center", marginTop: verticalScale(4) }}>
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
                  <Tappable onPress={() => navigation.navigate("allServices")}>
                    <View
                      style={{
                        width: moderateScale(100),
                        height: moderateScale(80),
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "white",
                      }}>
                      <FontAwesomeIcon
                        icon={faEllipsis}
                        size={moderateScale(42)}
                      />
                    </View>
                    <View>
                      <Txt
                        style={{
                          fontSize: moderateScale(12),
                          textAlign: "center",
                          fontFamily: "ffBold",
                          color: "black",
                        }}>
                        Ver más
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

const Filter = () => {
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
        style={{
          bottom: 13,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}>
        <Picker.Item key={0} value={""} label={"Filtros"} />
      </Picker>
    </View>
  );
};

export default ServiceList;
