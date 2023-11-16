import React, { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Header from "../components/Header";
import Field from "../components/controls/Field";
import Txt from "../components/Par";
import Tappable from "../components/controls/Tappable";
import Checkbox from "../components/controls/Checkbox";
import { horizontalScale, verticalScale } from "../utilities/metrics";
import { useNavigation } from "@react-navigation/native";
import { navigationProp } from "../App";
import { supabase } from "../lib/supabase";

const LoginSchema = z.object({
  email: z.string().min(1, { message: "Correo requerido " }).email("Correo no válido"),
  password: z.string().min(1, { message: "Contraseña requerida " }),
});

const LoginScreen = () => {
  const { handleSubmit, control, getValues } = useForm({
    resolver: zodResolver(LoginSchema),
  });
  const navigation = useNavigation<navigationProp>();
  const [loading, setLoading] = useState(false);

  const signUp = async () => {
    setLoading(true);

    const { error } = await supabase.auth.signUp({
      email: getValues("email"),
      password: getValues("password"),
    });

    if (error) {
      Alert.alert(error.message);
      return;
    }
    setLoading(false);
    navigation.navigate("index")
  };

  return (
    <View style={styles.loginScreenContainer}>
      <View>
        <Header title="Iniciar Sesión" />
        <Field
          name="email"
          control={control}
          label="Correo electrónico"
          placeholder="janedoe@domain.tls"
        />
        <Field
          name="password"
          control={control}
          label="Contraseña"
          placeholder="********"
          secureTextEntry={true}
        />
        <Txt style={styles.forgotPassword}>¿Olvidaste tu contraseña?</Txt>
        <Checkbox
          name="rememberMe"
          control={control}
          style={styles.rememberMe}
          label="Recuérdame"
        />
        <Tappable
          title="Iniciar Sesión"
          onPress={handleSubmit(() => signUp())}
        />
        <Txt style={styles.createAccount}>
          ¿No tienes contraseña?{" "}
          <Txt style={{ color: "blue" }}>Contáctanos</Txt>
        </Txt>
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
