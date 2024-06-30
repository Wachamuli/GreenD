import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Header from "../components/info/Header";
import Field from "../components/controls/Field";
import Txt from "../components/info/Txt";
import { verticalScale } from "../utilities/metrics";
import { supabase } from "../lib/supabase";
import Btn from "../components/controls/Btn";
import {
  SignInSchema,
  signInSchema,
} from "../utilities/validators/LoginSchema";
import Link from "../components/controls/Link";
import PasswordField from "../components/controls/PasswordField";
import { router } from "expo-router";
import { useModal } from "../hooks/useModal";

const Login = () => {
  const modal = useModal();
  const [loading, setLoading] = useState(false);
  const { handleSubmit, control } = useForm<SignInSchema>({
    resolver: zodResolver(signInSchema),
  });

  const signIn = async (form: SignInSchema) => {
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email: form.email,
      password: form.password,
    });

    if (error?.message === "Email not confirmed") {
      router.navigate({
        pathname: "/confirmation",
        params: { email: form.email, password: form.password },
      });
      return;
    }

    if (error) modal.error(error.message);

    setLoading(false);
  };

  return (
    <View style={styles.loginScreenContainer}>
      <View>
        <Header title="Iniciar Sesión" />
        <Field
          name="email"
          control={control}
          label="Correo electrónico"
          keyboardType="email-address"
          autoCapitalize="none"
          placeholder="janedoe@domain.tls"
        />
        <PasswordField name="password" control={control} label="Contraseña" />
        <View style={styles.forgotPasswordContainer}>
          <Link
            style={styles.forgotPassword}
            onPress={() => router.navigate("/password-recovery")}>
            ¿Olvidaste tu contraseña?
          </Link>
        </View>
        <Btn
          disabled={loading}
          label="Iniciar Sesión"
          onPress={handleSubmit(signIn)}
        />

        <View style={styles.createAccount}>
          <Txt>¿No tienes cuenta? </Txt>
          <Link onPress={() => router.navigate("/sign-up")}>Regístrate</Link>
        </View>
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
    backgroundColor: "white",
  },
  forgotPasswordContainer: {
    marginBottom: verticalScale(40),
  },
  forgotPassword: {
    textAlign: "right",
  },
  rememberMe: {
    marginTop: verticalScale(40),
  },
  createAccount: {
    marginTop: verticalScale(40),
    flexDirection: "row",
    justifyContent: "center",
  },
});

export default Login;
