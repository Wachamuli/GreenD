import React, { useState } from "react";
import { StyleSheet, View } from "react-native";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Header from "../components/Header";
import Field from "../components/controls/Field";
import Par from "../components/Par";
import Tappable from "../components/controls/Tappable";
import Checkbox from "../components/controls/Checkbox";
import { horizontalScale, verticalScale } from "../utilities/metrics";
import { useNavigation } from "@react-navigation/native";
import { navigationProp } from "../App";

const LoginSchema = z.object({
  username: z.string().min(1, { message: "Nombre de usuario requerido " }),
  password: z.string().min(1, { message: "Contraseña requerida " }),
});

const LoginScreen = () => {
  const { handleSubmit, control } = useForm({
    resolver: zodResolver(LoginSchema),
  });
  const [rememberMe, setRememberMe] = useState(false);
  const navigation = useNavigation<navigationProp>();

  return (
    <View style={styles.loginScreenContainer}>
      <View>
        <Header title="Iniciar Sesión" />
        <Field
          name="username"
          control={control}
          label="Nombre de usuario"
          placeholder="Jane Doe"
        />
        <Field
          name="password"
          control={control}
          label="Contraseña"
          placeholder="********"
          secureTextEntry={true}
        />
        <Par style={styles.forgotPassword}>¿Olvidaste tu contraseña?</Par>
        <Checkbox
          name="rememberMe"
          control={control}
          style={styles.rememberMe}
          label="Recuérdame"
        />
        <Tappable
          title="Iniciar Sesión"
          onPress={handleSubmit(() => navigation.navigate("index"))}
        />
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
    backgroundColor: "white",
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
