import { StyleSheet, View } from "react-native";
import {
  HeaderButtonProps,
  NativeStackHeaderProps,
} from "@react-navigation/native-stack/lib/typescript/src/types";
import { faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

import Txt from "../info/Txt";
import Tappable from "../controls/Tappable";
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from "../../utilities/metrics";

const CustomHeader = ({ options, navigation }: NativeStackHeaderProps) => {
  const headerButtonProps: HeaderButtonProps = {
    tintColor: options.headerTintColor,
    canGoBack: navigation.canGoBack(),
  };

  const Title = () => <Txt style={styles.label}>{options.title}</Txt>;

  const Left = () => (
    <View style={styles.left}>
      {navigation.getState().routes.length > 1 && navigation.canGoBack() ? (
        <Tappable hitSlop={20} onPress={() => navigation.goBack()}>
          <FontAwesomeIcon size={20} icon={faArrowLeftLong} />
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
    flexDirection: "row",
    backgroundColor: "white",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: horizontalScale(20),
    paddingTop: verticalScale(45),
    paddingBottom: verticalScale(20),
  },
  label: {
    fontFamily: "ffBold",
    fontSize: moderateScale(22),
  },
  right: {},
  left: {},
});

export default CustomHeader;
