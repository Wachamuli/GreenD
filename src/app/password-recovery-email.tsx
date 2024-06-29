import { StyleSheet, View } from "react-native";
import Txt from "../components/info/Txt";
import { supabase } from "../lib/supabase";
import Link from "../components/controls/Link";
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from "../utilities/metrics";
import { ColorPalette } from "../styles/colorPalette";
import { useEffect, useState } from "react";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { useLocalSearchParams } from "expo-router";
import { useModal } from "../hooks/useModal";

const PasswordEmailScreen = () => {
  let seconds = 60;
  const params = useLocalSearchParams();
  const [counter, setCounter] = useState(seconds);
  const [loading, setLoading] = useState(false);
  const modal = useModal();

  const sendRecoveryEmail = async () => {
    setCounter(seconds);
    setLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(params?.email);

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
    <View style={styles.container}>
      <View style={styles.box}>
        <View style={styles.square}></View>
        <Txt>El correo de recuperación ha sido enviado a</Txt>
        {/* TODO: Censor the email address. */}
        <Txt style={{ fontFamily: "ffBold" }}>{params?.email}</Txt>
      </View>
      <Txt
        style={{
          marginBottom: verticalScale(160),
          paddingBottom: verticalScale(15),
          borderBottomWidth: moderateScale(0.5),
          borderColor: ColorPalette.tertiary,
          fontFamily: "ffItalic",
        }}>
        Revise su bandeja de entrada o spam.
      </Txt>

      {counter > 0 && <Txt>Espere {counter} seg. para volver a...</Txt>}
      <Link disabled={loading || counter > 0} onPress={sendRecoveryEmail}>
        Reenviar correo
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: horizontalScale(60),
    paddingTop: "10%",
    backgroundColor: "white",
  },
  box: {
    paddingVertical: verticalScale(20),
    marginBottom: verticalScale(20),
  },
  square: {
    position: "absolute",
    backgroundColor: ColorPalette.primary,
    padding: moderateScale(8),
  },
});

export default PasswordEmailScreen;
