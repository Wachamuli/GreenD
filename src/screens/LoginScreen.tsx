import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Header from "../components/Header";
import Field from "../components/controls/Field";
import Txt from "../components/Txt";
import Tappable from "../components/controls/Tappable";
import Checkbox from "../components/controls/Checkbox";
import { verticalScale } from "../utilities/metrics";
import { navigationProp } from "../App";
import { supabase } from "../lib/supabase";
import PopUp from "../components/PopUp";
import Btn from "../components/controls/Btn";
import { SignInSchema, signInSchema } from "../utilities/validators/LoginSchema";

const LoginScreen = () => {
  const { handleSubmit, control } = useForm<SignInSchema>({
    resolver: zodResolver(signInSchema),
  });
  const navigation = useNavigation<navigationProp>();
  const [loading, setLoading] = useState(false);
  const [openPopup, setOpenPopup] = useState(false);
  const [errorDescription, setErrorDescription] = useState("");

  // TODO: Show splashscreen when loading and handle specific errors
  const signIn = async (values: SignInSchema) => {
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email: values.email,
      password: values.password,
    });

    if (error) {
      setErrorDescription(error.message);
      setOpenPopup(true);
      setLoading(false);
      return;
    }

    setLoading(false);
    // Goes to IndexScreen automatically
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
        <Field
          name="password"
          control={control}
          label="Contraseña"
          placeholder="********"
          autoCapitalize="none"
          secureTextEntry={true}
        />
        <Tappable onPress={() => navigation.navigate("passwordRecovery")}>
          <Txt style={styles.forgotPassword}>¿Olvidaste tu contraseña?</Txt>
        </Tappable>
        <Checkbox name="rememberMe" control={control} style={styles.rememberMe}>
          <Txt>Recuérdame</Txt>
        </Checkbox>
        <Btn
          disabled={loading || openPopup}
          label="Iniciar Sesión"
          onPress={handleSubmit(signIn)}
        />

        <View style={styles.createAccount}>
          <Txt>¿No tienes cuenta? </Txt>
          <Tappable
            label="Regístrate"
            style={{ color: "blue" }}
            onPress={() => navigation.navigate("signUp")}
          />
        </View>
      </View>

      {openPopup && (
        <PopUp
          setOpen={setOpenPopup}
          title="¡Ups! Algo salió mal"
          description={errorDescription}
          bottonLabel="Entendido"
        />
      )}
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
    // marginBottom: verticalScale(10),
  },
  createAccount: {
    marginTop: verticalScale(40),
    flexDirection: "row",
    justifyContent: "center",
  },
});

export default LoginScreen;
