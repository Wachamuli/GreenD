import { useEffect, useState } from "react";
import { Image, View } from "react-native";

import Txt from "../components/info/Txt";
import Link from "../components/controls/Link";
import Btn from "../components/controls/Btn";
import { supabase } from "../lib/supabase";
import { horizontalScale, verticalScale } from "../utilities/metrics";
import { ColorPalette } from "../styles/colorPalette";
import {
  faCircleInfo,
  faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import { useLocalSearchParams } from "expo-router";
import { useModal } from "../hooks/useModal";

const EmailConfirmationScreen = (): JSX.Element => {
  let time = 30; // In seconds
  const params = useLocalSearchParams<{ email: string; password: string }>();
  const [counter, setCounter] = useState(time);
  const [loading, setLoading] = useState(false);
  const modal = useModal();

  const resendConfirmationEmail = async () => {
    setCounter(time);
    // Maybe this is not the function that I need for this purpose.
    const { error } = await supabase.auth.signInWithOtp({
      email: params.email!,
      options: {
        shouldCreateUser: false,
        // emailRedirectTo: 'https://example.com/welcome',
      },
    });

    if (error) {
      modal.open({
        title: "¡Ups! Algo salió mal",
        description: error.message,
        iconProps: { icon: faTriangleExclamation, color: ColorPalette.error },
        buttonOptions: [{ label: "Entendido" }],
      });
    }
  };

  // TODO: Instead of going directly to index, first redirect to Login
  // Screen.
  const attemptSingIn = async () => {
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email: params.email!,
      password: params.password!,
    });

    if (error?.message === "Email not confirmed") {
      modal.open({
        title: "¡Correo sin confirmar!",
        description: "Revise su bandeja de entrada o spam.",
        iconProps: { icon: faCircleInfo, color: ColorPalette.secondary },
        buttonOptions: [{ label: "Entendido" }],
      });
      return;
    }

    if (error) {
      modal.open({
        title: "¡Ups! Algo salió mal",
        description: error.message,
        iconProps: { icon: faTriangleExclamation, color: ColorPalette.error },
        buttonOptions: [{ label: "Entendido" }],
      });
    }

    setLoading(false);
  };

  useEffect(() => {
    const timer = setInterval(
      () =>
        setCounter(prevCounter => {
          if (prevCounter <= 0) {
            clearInterval(timer);
            return prevCounter;
          }

          return prevCounter - 1;
        }),
      1000,
    );

    return () => clearInterval(timer);
  }, [counter]);

  return (
    <View
      style={{
        paddingTop: verticalScale(75),
        paddingHorizontal: horizontalScale(60),
        backgroundColor: "white",
        flex: 1,
      }}>
      <View style={{ alignItems: "center" }}>
        {/* FIXME: Image not showing */}
        <Image
          source={require("../assets/greenrlogo.png")}
          style={{
            width: horizontalScale(220),
            height: verticalScale(90),
            marginBottom: verticalScale(40),
          }}
        />
      </View>

      <Txt style={{ marginBottom: verticalScale(20) }}>
        Revise su bandeja de entrada en{" "}
        <Txt style={{ fontFamily: "ffBold" }}>{params.email}</Txt>
      </Txt>

      {counter > 0 && <Txt>Espere {counter} seg. para volver a reenviar.</Txt>}
      <Link
        disabled={loading || counter > 0}
        onPress={() => {
          resendConfirmationEmail();
        }}>
        Reenviar correo de confirmación
      </Link>

      <View
        style={{
          marginTop: verticalScale(50),
          alignItems: "flex-end",
        }}>
        <Btn
          onPress={attemptSingIn}
          disabled={loading}
          label="Continuar"
          style={{
            padding: 0,
            width: 110,
            paddingVertical: 10,
            borderRadius: 10,
          }}
        />
      </View>
    </View>
  );
};

export default EmailConfirmationScreen;
