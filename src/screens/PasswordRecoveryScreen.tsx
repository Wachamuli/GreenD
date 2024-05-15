import { Alert, StyleSheet, View } from "react-native";
import { useForm } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";
import { zodResolver } from "@hookform/resolvers/zod";

import Btn from "../components/controls/Btn";
import Field from "../components/controls/Field";
import Header from "../components/Header";
import Link from "../components/controls/Link";
import PasswordEnforcer from "../components/controls/PasswordEnforcer";
import { supabase } from "../lib/supabase";
import { navigationProp } from "../App";
import { horizontalScale, verticalScale } from "../utilities/metrics";
import {
  PasswordRecoverySchema,
  passwordRecoverySchema,
} from "../utilities/validators/PasswordRecoverySchema";

const PasswordRecoveryScreen = (): JSX.Element => {
  const { control, handleSubmit, getValues } = useForm<PasswordRecoverySchema>({
    resolver: zodResolver(passwordRecoverySchema),
  });
  const navigation = useNavigation<navigationProp>();

  const sendRecoveryEmail = async () => {
    const { error } = await supabase.auth.resetPasswordForEmail(
      getValues("email"),
    );

    if (error) Alert.alert(error.message);
  };

  const recovery = async (values: PasswordRecoverySchema) => {
    const { error } = await supabase.auth.updateUser({
      password: values.newPassword,
    });

    if (error) {
      Alert.alert(error.message);
      return;
    }

    navigation.navigate("login");
  };

  return (
    <View style={styles.loginScreenContainer}>
      <Header title="Recuperar Contraseña" />

      <Field
        name="email"
        control={control}
        label="Correo electrónico"
        keyboardType="email-address"
        autoCapitalize="none"
        placeholder="janedoe@domain.tls"
      />

      <Link style={styles.link} onPress={sendRecoveryEmail}>
        Enviar correo de recuperación
      </Link>

      <PasswordEnforcer
        name="newPassword"
        label="Nueva contraseña"
        control={control}
      />

      <Field
        name="confirmPassword"
        label="Confirmar nueva contraseña"
        control={control}
        secureTextEntry={true}
        maxLength={16}
        autoCapitalize="none"
        placeholder="********"
      />

      <Btn onPress={handleSubmit(recovery)} label="Aceptar" />
    </View>
  );
};

export default PasswordRecoveryScreen;

const styles = StyleSheet.create({
  loginScreenContainer: {
    flex: 1,
    backgroundColor: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: horizontalScale(60),
  },
  link: {
    textAlign: "center",
    marginVertical: verticalScale(10),
  },
});
