import { useState } from "react";
import { Image, View } from "react-native";

import { useLocalSearchParams } from "expo-router";

import Txt from "../components/info/Txt";
import Link from "../components/controls/Link";
import Btn from "../components/controls/Btn";
import { supabase } from "../lib/supabase";
import { useModal } from "../hooks/useModal";
import { useTimer } from "../hooks/useTimer";
import { horizontalScale, verticalScale } from "../utilities/metrics";

const EmailConfirmationScreen = (): JSX.Element => {
  const modal = useModal();
  const [loading, setLoading] = useState(false);
  const { counter, resetCounter } = useTimer(30);
  const params = useLocalSearchParams<{ email: string; password: string }>();

  const resendConfirmationEmail = async () => {
    resetCounter();
    // Maybe this is not the function that I need for this purpose.
    const { error } = await supabase.auth.signInWithOtp({
      email: params.email!,
      options: {
        shouldCreateUser: false,
        // emailRedirectTo: 'https://example.com/welcome',
      },
    });

    if (error) modal.error(error.message);
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
      modal.info(
        "¡Correo sin confirmar!",
        "Revise su bandeja de entrada o spam.",
      );
      return;
    }

    if (error) modal.error(error.message);

    setLoading(false);
  };

  return (
    <View
      style={{
        paddingTop: verticalScale(75),
        paddingHorizontal: horizontalScale(60),
        backgroundColor: "white",
        flex: 1,
      }}>
      <View style={{ alignItems: "center" }}>
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
