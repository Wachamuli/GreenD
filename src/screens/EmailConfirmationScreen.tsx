import { Image, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import Txt from "../components/Txt";
import Link from "../components/controls/Link";
import Btn from "../components/controls/Btn";
import { supabase } from "../lib/supabase";
import { RootStackParamList } from "../App";
import { horizontalScale, verticalScale } from "../utilities/metrics";
import { ColorPalette } from "../styles/colorPalette";
import { useState } from "react";
import Popup, { PopupProps } from "../components/Popup";
import {
  faCircleInfo,
  faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";

type ScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "emailConfirmation"
>;

const EmailConfirmationScreen = ({ route }: ScreenProps): JSX.Element => {
  const [loading, setLoading] = useState(false);
  const [popupProps, setPopupProps] = useState<PopupProps>();

  const resendConfirmationEmail = async () => {
    const { data, error } = await supabase.auth.resend({
      type: "signup",
      email: route.params.email,
    });
  };

  // TODO: Instead of going directly to index, first redirect to Login
  // Screen. 
  const attemptSingIn = async () => {
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email: route.params.email,
      password: route.params.password,
    });

    if (error) {
      if (error.message === "Email not confirmed") {
        setPopupProps({
          title: "¡Correo sin confirmar!",
          description: "Revise su bandeja de entrada o spam.",
          iconProps: { icon: faCircleInfo, color: ColorPalette.secondary },
          buttonOptions: { label: "Entendido" },
        });
      } else {
        setPopupProps({
          title: "¡Ups! Algo salió mal",
          description: error.message,
          iconProps: { icon: faTriangleExclamation, color: ColorPalette.error },
          buttonOptions: { label: "Entendido" },
        });
      }
    }

    setLoading(false);
  };

  return (
    <View
      style={{
        marginTop: verticalScale(75),
        paddingHorizontal: horizontalScale(60),
      }}>
      <View style={{ alignItems: "center" }}>
        <Image
          style={{
            width: horizontalScale(220),
            height: verticalScale(90),
            marginBottom: verticalScale(40),
          }}
          source={require("../assets/greenrlogo.png")}
        />
      </View>

      <Txt style={{ marginBottom: verticalScale(20) }}>
        Revise su bandeja de entrada en{" "}
        <Txt style={{ fontFamily: "ffBold" }}>{route.params.email}</Txt>
      </Txt>
      <Link onPress={resendConfirmationEmail}>
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

      <Popup {...popupProps} />
    </View>
  );
};

export default EmailConfirmationScreen;
