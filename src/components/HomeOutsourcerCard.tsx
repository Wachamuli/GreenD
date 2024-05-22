import { Image, StyleSheet, View } from "react-native";
import Tappable from "./controls/Tappable";

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faBookmark } from "@fortawesome/free-regular-svg-icons";

import Txt from "./Txt";
import { ColorPalette } from "../styles/colorPalette";
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from "../utilities/metrics";

const HomeOutsourcerCard = (item: any) => {
  return (
    <Tappable>
      <View style={styles.container}>
        <Image source={{ uri: item.logo }} style={styles.logo} />

        <View style={{ width: "67%" }}>
          <View style={styles.upperContainer}>
            <Txt style={styles.serviceName}>{item.service.name}</Txt>

            <Tappable onPress={() => {}} hitSlop={moderateScale(20)}>
              <FontAwesomeIcon icon={faBookmark} size={moderateScale(20)} />
            </Tappable>
          </View>

          <Txt style={styles.outsourcerName}>{item.name}</Txt>
          <Txt style={styles.price}>$250</Txt>
        </View>
      </View>
    </Tappable>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    height: verticalScale(150),
    marginVertical: verticalScale(5),
    borderWidth: moderateScale(0.5),
    borderColor: ColorPalette.tertiary,
    borderRadius: moderateScale(10),
    padding: moderateScale(20),
  },
  upperContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  logo: {
    width: "30%",
    height: "100%",
    borderRadius: moderateScale(10),
    marginRight: horizontalScale(10),
  },
  serviceName: {
    fontSize: moderateScale(14),
  },
  outsourcerName: {
    fontFamily: "ffBold",
    marginTop: verticalScale(10),
  },
  price: {
    fontFamily: "ffBold",
    color: ColorPalette.lighterSecondary,
  },
});

export default HomeOutsourcerCard;
