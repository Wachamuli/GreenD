import React from "react";
import { StyleSheet, View } from "react-native";

import Header from "../components/Header";
import Field from "../components/controls/Field";
import Par from "../components/Par";
import Tappable from "../components/controls/Tappable";
import Checkbox from "../components/controls/Checkbox";
import { horizontalScale, verticalScale } from "../utilities/metrics";

const LoginScreen = () => {
  return (
    <View style={styles.loginScreenContainer}>
      <View>
        <Header title="Iniciar Sesión" />
        <Field label="Nombre de usuario" placeholder="Jane Doe" />
        <Field
          label="Contraseña"
          placeholder="********"
          secureTextEntry={true}
        />
        <Par style={styles.forgotPassword}>¿Olvidaste tu contraseña?</Par>
        <Checkbox style={styles.rememberMe} text="Recuérdame" />
        <Tappable title="Iniciar Sesión" />
        <Par style={styles.createAccount}>
          ¿No tienes contraseña?{" "}
          <Par style={{ color: "blue" }}>Contáctanos</Par>
        </Par>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  loginScreenContainer: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  forgotPassword: {
    color: "blue",
    textAlign: "right",
  },
  rememberMe: {
    marginTop: verticalScale(40),
    marginBottom: verticalScale(10),
  },
  createAccount: {
    marginTop: verticalScale(10),
  },
});

export default LoginScreen;
