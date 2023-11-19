import React, { useEffect, useState } from "react";
import { Alert, Pressable, StyleSheet, View } from "react-native";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Header from "../components/Header";
import Field from "../components/controls/Field";
import Txt from "../components/Txt";
import Tappable from "../components/controls/Tappable";
import Checkbox from "../components/controls/Checkbox";
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from "../utilities/metrics";
import { useNavigation } from "@react-navigation/native";
import { navigationProp } from "../App";
import { supabase } from "../lib/supabase";
import PopUp from "../components/PopUp";
import Btn from "../components/controls/Btn";

const LoginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Correo requerido " })
    .email("Correo no válido"),
  password: z.string().min(1, { message: "Contraseña requerida " }),
});

const LoginScreen = () => {
  const { handleSubmit, control, getValues } = useForm({
    resolver: zodResolver(LoginSchema),
  });
  const navigation = useNavigation<navigationProp>();
  const [loading, setLoading] = useState(false);
  const [openPopup, setOpenPopup] = useState(false);
  const [errorDescription, setErrorDescription] = useState("");

  const signIn = async () => {
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email: getValues("email"),
      password: getValues("password"),
    });

    // TODO: Handle Specific errors
    if (error) {
      setErrorDescription(error.message);
      setOpenPopup(true);
      setLoading(false);
      return;
    }

    setLoading(false);
    navigation.navigate("index");
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
        <Checkbox name="rememberMe" control={control} style={styles.rememberMe}>
          <Txt>Recuérdame</Txt>
        </Checkbox>
        <Btn
          disabled={loading}
          label="Iniciar Sesión"
          onPress={handleSubmit(signIn)}
        />

        <Txt style={styles.createAccount}>
          ¿No tienes cuenta?{" "}
          <Tappable
            label="Regístrate"
            style={{ color: "blue" }}
            onPress={() => navigation.navigate("signUp")}
          />
        </Txt>
      </View>

      {openPopup && (
        <PopUp
          setOpen={setOpenPopup}
          title="¡Ups! Algo salió mal"
          description={errorDescription}
        />
      )}
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
    marginTop: verticalScale(20),
    alignItems: "center",
    textAlignVertical: "center",
  },
});

export default LoginScreen;
