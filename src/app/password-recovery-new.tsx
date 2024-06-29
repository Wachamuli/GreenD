import { View } from "react-native";
import PasswordEnforcer from "../components/controls/PasswordEnforcer";
import Field from "../components/controls/Field";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  type NewPasswordSchema,
  newPasswordSchema,
} from "../utilities/validators/PasswordRecoverySchema";
import { supabase } from "../lib/supabase";
import Btn from "../components/controls/Btn";
import { useState } from "react";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { ColorPalette } from "../styles/colorPalette";
import { verticalScale } from "../utilities/metrics";
import { router } from "expo-router";
import { useModal } from "../hooks/useModal";

const NewPasswordScreen = () => {
  const [loading, setLoading] = useState(false);
  const modal = useModal();
  const { handleSubmit, control } = useForm<NewPasswordSchema>({
    resolver: zodResolver(newPasswordSchema),
  });

  const recoverPassword = async (values: NewPasswordSchema) => {
    setLoading(true);
    const { error } = await supabase.auth.updateUser({
      password: values.newPassword,
    });

    if (error) {
      setLoading(false);
      modal.open({
        title: "¡Ups! Algo salió mal",
        description: error.message,
        iconProps: { icon: faTriangleExclamation, color: ColorPalette.error },
        buttonOptions: [{ label: "Entendido" }],
      });
      return;
    }

    router.navigate("/");
    setLoading(false);
  };

  return (
    <View style={{ alignItems: "center", backgroundColor: "white", flex: 1 }}>
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

      <Btn
        style={{ marginTop: verticalScale(35) }}
        disabled={loading}
        label="Continuar"
        onPress={handleSubmit(recoverPassword)}
      />
    </View>
  );
};

export default NewPasswordScreen;
