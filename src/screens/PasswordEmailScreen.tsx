import { Alert, StyleSheet, View } from "react-native";
import Txt from "../components/Txt";
import { supabase } from "../lib/supabase";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "./PasswordRecoveryStack";
import Link from "../components/controls/Link";
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from "../utilities/metrics";
import { ColorPalette } from "../styles/colorPalette";
import { useEffect, useState } from "react";
import Popup, { PopupProps } from "../components/Popup";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";

type ScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "passwordEmailScreen"
>;

const PasswordEmailScreen = ({ route }: ScreenProps) => {
  let seconds = 60;
  const [counter, setCounter] = useState(seconds);
  const [loading, setLoading] = useState(false);
  const [popupProps, setPopupProps] = useState<PopupProps>();

  const sendRecoveryEmail = async () => {
    setCounter(seconds);
    setLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(
      route.params?.email,
    );

    if (error) {
      setPopupProps({
        title: "¡Ups! Algo salió mal",
        description: error.message,
        iconProps: { icon: faTriangleExclamation, color: ColorPalette.error },
        buttonOptions: { label: "Entendido" },
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
    <View style={{ paddingHorizontal: horizontalScale(60), marginTop: "10%" }}>
      <View style={styles.box}>
        <View style={styles.square}></View>
        <Txt>El correo de recuperación ha sido enviado a</Txt>
        {/* TODO: Censor the email address. */}
        <Txt style={{ fontFamily: "ffBold" }}>{route.params?.email}</Txt>
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

      <Popup {...popupProps} />
    </View>
  );
};

const styles = StyleSheet.create({
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
