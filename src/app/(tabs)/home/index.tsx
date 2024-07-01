import { useState, useEffect } from "react";
import { FlatList, View, ActivityIndicator } from "react-native";

import Header from "../../../components/info/Header";
import SearchBar from "../../../components/controls/SearchBar";
import HomeOutsourcerCard from "../../../components/HomeOutsourcerCard";
import ServicesHomeView from "../requests/ServicesHomeView";
import Carousel from "../../../components/Carousel";
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from "../../../utilities/metrics";
import { supabase } from "../../../lib/supabase";

const Home = (): JSX.Element => {
  const [loading, setLoading] = useState(false);
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
  const [serviceFilter, setServiceFilter] = useState<string | number>(0);

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
    getOutsourcers();
  }, [serviceFilter]);

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
            <View>
              <View style={{ paddingHorizontal: horizontalScale(20) }}>
                <Header
                  title="Ofertas"
                  style={{ fontSize: moderateScale(18) }}
                />
              </View>

              <Carousel
                images={[
                  "https://zeawfjfjjegnpsfvfapw.supabase.co/storage/v1/object/public/outsourcer_logos/deal_banner_placeholder.png",
                  "https://zeawfjfjjegnpsfvfapw.supabase.co/storage/v1/object/public/outsourcer_logos/deal_banner_placeholder.png",
                  "https://zeawfjfjjegnpsfvfapw.supabase.co/storage/v1/object/public/outsourcer_logos/deal_banner_placeholder.png",
                  "https://zeawfjfjjegnpsfvfapw.supabase.co/storage/v1/object/public/outsourcer_logos/deal_banner_placeholder.png",
                ]}
              />

              <View style={{ paddingHorizontal: horizontalScale(20) }}>
                <ServicesHomeView />

                <Header
                  style={{ fontSize: moderateScale(18) }}
                  title="Más Populares"
                />
              </View>
            </View>

            {/* <Filter
              data={services}
              selected={serviceFilter}
              onPress={id => setServiceFilter(id)}
              style={{
                selectedBackgroundColor: ColorPalette.primary,
                selectedColor: "white",
              }}
            /> */}
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
