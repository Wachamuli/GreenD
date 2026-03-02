import { View, StyleSheet } from "react-native";

import MergeList from "../../../components/MergeList";
import Header from "../../../components/info/Header";
import SearchBar from "../../../components/controls/SearchBar";
import ServicesHomeView from "../requests/ServicesHomeView";
import Carousel from "../../../components/Carousel";
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from "../../../utilities/metrics";
import OutsourcersHomeView from "../../../components/OutsourcersHomeView";

const Home = (): JSX.Element => {
  return (
    <View style={styles.container}>
      <SearchBar />

      <MergeList contentContainerStyle={styles.subContainer}>
        <Header title="Ofertas" style={styles.header} />
        <Carousel
          images={[
            "http://10.0.2.2:54321/storage/v1/object/public/outsourcer_logos/deal_banner_placeholder.png",
            "http://10.0.2.2:54321/storage/v1/object/public/outsourcer_logos/deal_banner_placeholder.png",
            "http://10.0.2.2:54321/storage/v1/object/public/outsourcer_logos/deal_banner_placeholder.png",
            "http://10.0.2.2:54321/storage/v1/object/public/outsourcer_logos/deal_banner_placeholder.png",
          ]}
        />

        <Header style={styles.header} title="Servicios" />
        <ServicesHomeView />

        <Header style={styles.header} title="Más Populares" />
        <OutsourcersHomeView />
      </MergeList>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    // paddingBottom: verticalScale(70),
    backgroundColor: "white",
    paddingHorizontal: horizontalScale(20),
  },
  subContainer: {
    paddingBottom: verticalScale(100),
  },
  header: {
    fontSize: moderateScale(18),
  },
});

export default Home;
