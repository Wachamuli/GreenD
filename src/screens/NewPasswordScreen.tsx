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
import { useNavigation } from "@react-navigation/native";
import { navigationProp } from "../App";
import Btn from "../components/controls/Btn";
import { useState } from "react";
import Popup, { PopupProps } from "../components/Popup";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { ColorPalette } from "../styles/colorPalette";
import { verticalScale } from "../utilities/metrics";

const NewPasswordScreen = () => {
  const [loading, setLoading] = useState(false);
  const [popupProps, setPopupProps] = useState<PopupProps>();
  const { handleSubmit, control } = useForm<NewPasswordSchema>({
    resolver: zodResolver(newPasswordSchema),
  });

  const navigation = useNavigation<navigationProp>();

  const recoverPassword = async (values: NewPasswordSchema) => {
    setLoading(true);
    const { error } = await supabase.auth.updateUser({
      password: values.newPassword,
    });

    if (error) {
      setLoading(false);
      setPopupProps({
        title: "¡Ups! Algo salió mal",
        description: error.message,
        iconProps: { icon: faTriangleExclamation, color: ColorPalette.error },
        buttonOptions: { label: "Entendido" },
      });
      return;
    }

    navigation.navigate("login");
    setLoading(false);
  };

  return (
    <View style={{ alignItems: "center" }}>
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

      <Popup {...popupProps} />
    </View>
  );
};

export default NewPasswordScreen;
