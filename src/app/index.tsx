import { router } from "expo-router";
import { Image, StyleSheet, View } from "react-native";
import Btn from "../components/controls/Btn";
import Txt from "../components/info/Txt";
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from "../utilities/metrics";
import { ColorPalette } from "../styles/colorPalette";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faHeadset } from "@fortawesome/free-solid-svg-icons";

const Index = () => {
  return (
    <View style={styles.container}>
      <Txt style={styles.welcome}>Bienvenido a</Txt>
      <Image
        source={require("../assets/greenrlogo.png")}
        style={styles.image}
      />
      <Txt style={{ fontSize: moderateScale(20) }}>Slogan Placeholder.</Txt>
      <View style={styles.buttonsContainer}>
        <Btn
          style={styles.loginButton}
          label="Iniciar Sesión"
          onPress={() => router.push("/sign-in")}
        />
        <Btn
          style={{ width: "100%" }}
          label="Regístrate"
          onPress={() => router.push("/sign-up")}
        />
        <View style={styles.helpContainer}>
          <FontAwesomeIcon
            style={{ marginRight: moderateScale(10) }}
            icon={faHeadset}
            color={ColorPalette.tertiary}
            size={moderateScale(18)}
          />
          <Txt style={{ color: ColorPalette.tertiary, fontFamily: "ffBold", fontSize: moderateScale(14) }}>
            Ayuda
          </Txt>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: horizontalScale(20),
    alignItems: "center",
  },
  welcome: {
    marginBottom: verticalScale(20),
    color: ColorPalette.tertiary,
  },
  image: {
    width: horizontalScale(280),
    height: verticalScale(110),
  },
  buttonsContainer: {
    width: "100%",
    position: "absolute",
    bottom: verticalScale(20),
  },
  loginButton: {
    width: "100%",
    backgroundColor: "#f3f5ff",
    color: ColorPalette.primary,
    borderWidth: moderateScale(2),
    borderColor: ColorPalette.primary,
  },
  helpContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: verticalScale(20),
  },
});

export default Index;
