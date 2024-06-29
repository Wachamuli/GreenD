import { StyleSheet, View } from "react-native";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Btn from "../components/controls/Btn";
import Field from "../components/controls/Field";
import { supabase } from "../lib/supabase";
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from "../utilities/metrics";
import {
  PasswordRecoverySchema,
  passwordRecoverySchema,
} from "../utilities/validators/PasswordRecoverySchema";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faTriangleExclamation,
  faUserLock,
} from "@fortawesome/free-solid-svg-icons";
import { ColorPalette } from "../styles/colorPalette";
import { useState } from "react";
import Txt from "../components/info/Txt";
import { router } from "expo-router";
import { useModal } from "../hooks/useModal";

const PasswordRecoveryScreen = (): JSX.Element => {
  const [loading, setLoading] = useState(false);
  const modal = useModal();
  const { control, handleSubmit } = useForm<PasswordRecoverySchema>({
    resolver: zodResolver(passwordRecoverySchema),
  });

  const sendRecoveryEmail = async (data: PasswordRecoverySchema) => {
    setLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(data.email);

    if (error) {
      modal.open({
        title: "¡Ups! Algo salió mal",
        description: error.message,
        iconProps: { icon: faTriangleExclamation, color: ColorPalette.error },
        buttonOptions: [{ label: "Entendido" }],
      });
      setLoading(false);
      return;
    }

    router.navigate({
      pathname: "/password-recovery-email",
      params: { email: data.email },
    });
    setLoading(false);
  };

  return (
    <View style={styles.loginScreenContainer}>
      <View style={{ alignItems: "center" }}>
        <FontAwesomeIcon
          icon={faUserLock}
          color={ColorPalette.primary}
          size={moderateScale(150)}
        />
      </View>

      <Txt style={styles.description}>
        Enviaremos un correo de recuperación al correo asociado.
      </Txt>

      <View style={{ alignItems: "center" }}>
        <Field
          name="email"
          control={control}
          label="Correo electrónico"
          keyboardType="email-address"
          autoCapitalize="none"
          placeholder="janedoe@domain.tls"
        />

        <Field
          name="cellphone"
          control={control}
          label="Número celular"
          keyboardType="phone-pad"
          placeholder="829-000-0000"
          maxLength={50}
        />

        <Btn
          disabled={loading}
          style={styles.btn}
          onPress={handleSubmit(sendRecoveryEmail)}
          label="Continuar"
        />
      </View>
    </View>
  );
};

export default PasswordRecoveryScreen;

const styles = StyleSheet.create({
  loginScreenContainer: {
    flex: 1,
    backgroundColor: "white",
    display: "flex",
    paddingHorizontal: horizontalScale(60),
  },
  description: {
    borderBottomWidth: moderateScale(0.5),
    borderBottomColor: ColorPalette.tertiary,
    paddingBottom: verticalScale(15),
    marginTop: verticalScale(25),
    marginBottom: verticalScale(40),
  },
  btn: {
    marginTop: verticalScale(35),
  },
});
