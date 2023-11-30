import { Alert, StyleSheet, View } from "react-native";
import { useForm } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";
import { zodResolver } from "@hookform/resolvers/zod";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";

import { supabase } from "../lib/supabase";
import Header from "../components/Header";
import Field from "../components/controls/Field";
import Btn from "../components/controls/Btn";
import { navigationProp } from "../App";
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from "../utilities/metrics";
import Txt from "../components/Txt";
import { useState } from "react";
import PopUp from "../components/PopUp";
import Tappable from "../components/controls/Tappable";
import PasswordEnforcer from "../components/controls/PasswordEnforcer";
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
      <View>
        <Header title="Recuperar Contraseña" />
        <Field
          name="email"
          control={control}
          label="Correo electrónico"
          keyboardType="email-address"
          autoCapitalize="none"
          placeholder="janedoe@domain.tls"
        />

        <Tappable
          onPress={sendRecoveryEmail}
          containerStyle={{ flexDirection: "row", alignItems: "center" }}>
          <Txt
            style={{
              color: "blue",
              marginRight: horizontalScale(4),
              marginVertical: verticalScale(10),
              textAlign: "center",
            }}>
            Enviar correo de recuperación
          </Txt>
          <FontAwesomeIcon
            style={{ marginTop: verticalScale(4) }}
            icon={faEnvelope}
            color="blue"
          />
        </Tappable>

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
  },
});
