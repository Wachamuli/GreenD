import { StyleSheet, View } from "react-native";
import { NativeStackHeaderProps } from "@react-navigation/native-stack/lib/typescript/src/types";
import { HeaderButtonProps } from "@react-navigation/native-stack/lib/typescript/src/types";
import {
  faArrowLeft,
  faArrowLeftLong,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

import Txt from "../Txt";
import Tappable from "../controls/Tappable";
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from "../../utilities/metrics";
import { ColorPalette } from "../../styles/colorPalette";

const CustomHeader = ({ options, navigation }: NativeStackHeaderProps) => {
  const headerButtonProps: HeaderButtonProps = {
    tintColor: options.headerTintColor,
    canGoBack: navigation.canGoBack(),
  };

  const Title = () => <Txt style={styles.label}>{options.title}</Txt>;

  const Left = () => (
    <View style={styles.left}>
      {navigation.canGoBack() ? (
        <Tappable hitSlop={20} onPress={() => navigation.goBack()}>
          <FontAwesomeIcon
            size={20}
            icon={faArrowLeftLong}
          />
        </Tappable>
      ) : (
        <>{options.headerLeft && options.headerLeft(headerButtonProps)}</>
      )}
    </View>
  );

  const Right = () => (
    <View style={styles.right}>
      <>{options.headerRight && options.headerRight(headerButtonProps)}</>
    </View>
  );

  return (
    <View style={styles.headerContainer}>
      <Left />
      <Title />
      <Right />
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    // top: 25,
    flexDirection: "row",
    backgroundColor: "white",

    justifyContent: "space-between",
    alignItems: "center",

    paddingHorizontal: horizontalScale(20),
    paddingTop: verticalScale(45),
    paddingBottom: verticalScale(20),

    // borderColor: ColorPalette.tertiary,
    // borderBottomWidth: verticalScale(2),
    // borderLeftWidth: verticalScale(2),
    // borderRightWidth: verticalScale(2),

    // borderBottomLeftRadius: moderateScale(20),
    // borderBottomRightRadius: moderateScale(20),
  },
  label: {
    fontFamily: "ffBold",
    fontSize: moderateScale(22),
  },
  title: {
    // flex: 2,
  },
  left: {
    // position: "absolute",
    // left: 0,
    // bottom: verticalScale(20),
    // marginLeft: horizontalScale(15),
  },
  right: {
    // position: "absolute",
    // right: 0,
    // bottom: verticalScale(20),
    // marginRight: horizontalScale(15),
  },
});

export default CustomHeader;
