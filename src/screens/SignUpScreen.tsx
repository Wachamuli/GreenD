import { useEffect, useState } from "react";
import { ScrollView, StyleSheet } from "react-native";

import { useNavigation } from "@react-navigation/native";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";

import { navigationProp } from "../App";
import Field from "../components/controls/Field";
import Btn from "../components/controls/Btn";
import Menu from "../components/controls/Menu";
import Link from "../components/controls/Link";
import Checkbox from "../components/controls/Checkbox";
import PasswordEnforcer from "../components/controls/PasswordEnforcer";
import Popup, { PopupProps } from "../components/Popup";
import ProfileImagePicker from "../components/controls/ProfileImagePicker";
import { supabase } from "../lib/supabase";
import { horizontalScale, verticalScale } from "../utilities/metrics";
import { ColorPalette } from "../styles/colorPalette";
import {
  type SignUpSchema,
  signUpSchema,
} from "../utilities/validators/SignUpSchema";

const SignUpScreen = (): JSX.Element => {
  const { control, handleSubmit, setError } = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
  });
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation<navigationProp>();
  const [condominiums, setCondomiums] = useState<
    { id: string; name: string }[] | null
  >();
  const [popupProps, setPopupProps] = useState<PopupProps>();
  const [image, setImage] = useState("");

  const getCondomiums = async () => {
    const { data, error } = await supabase
      .from("condominiums")
      .select("id, name");

    if (error) {
      /* Handle error */
    }

    setCondomiums(data);
  };

  // FIXME: This is not working because of the Row Level Security of the Auth schema.
  const checkEmailExists = async (email: string): Promise<boolean | null> => {
    const { data, error } = await supabase.rpc("check_email_exists", {
      email_to_check: email,
    });

    if (error) {
      // TODO: Handle error
    }

    return data;
  };

  const onSubmit = async (values: SignUpSchema) => {
    setLoading(true);

    // const emailExits = await checkEmailExists(values.email);

    // if (emailExits) {
    //   setError("email", { message: "Este correo ya está en uso" });
    //   return;
    // }

    const { error } = await supabase.auth.signUp({
      email: values.email,
      password: values.password,
      phone: values.cellphone,
      options: {
        data: {
          name: values.name,
          surname: values.surname,
          telephone: values.telephone,
          condominium: values.condominium,
          address: values.address,
        },
      },
    });

    setLoading(false);

    if (error) {
      setPopupProps({
        title: "¡Ups! Algo salió mal",
        description: error.message,
        iconProps: { icon: faTriangleExclamation, color: ColorPalette.error },
        buttonOptions: { label: "Entendido" },
      });
      return;
    }

    navigation.navigate("emailConfirmation", {
      email: values.email,
      password: values.password,
    });
  };

  useEffect(() => {
    getCondomiums();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ProfileImagePicker />

      <Field
        name="name"
        control={control}
        label="Nombre"
        placeholder="Jane"
        maxLength={50}
      />
      <Field
        name="surname"
        control={control}
        label="Apellido"
        placeholder="Doe"
        maxLength={50}
      />
      <Field
        name="email"
        control={control}
        label="Correo electrónico"
        keyboardType="email-address"
        autoCapitalize="none"
        placeholder="janedoe@domain.tls"
        maxLength={100}
      />
      <Field
        name="telephone"
        control={control}
        label="Número telefónico"
        keyboardType="phone-pad"
        placeholder="809-000-0000"
        maxLength={50}
      />
      <Field
        name="cellphone"
        control={control}
        label="Número celular"
        keyboardType="phone-pad"
        placeholder="829-000-0000"
        maxLength={50}
      />

      <Menu
        name="condominium"
        control={control}
        placeholder="Seleccione un residencial"
        options={condominiums}
      />

      <Field
        name="address"
        label="Dirección"
        control={control}
        maxLength={100}
      />

      <PasswordEnforcer name="password" label="Contraseña" control={control} />

      <Field
        name="confirmPassword"
        label="Confirmar contraseña"
        control={control}
        secureTextEntry={true}
        autoCapitalize="none"
        maxLength={16}
        placeholder="********"
      />

      <Checkbox name="terms" control={control}>
        He leído y acepto las
        <Link onPress={() => {}}>Políticas de Privacidad</Link>
      </Checkbox>

      <Btn
        disabled={loading}
        onPress={handleSubmit(onSubmit)}
        label="Registrarse"
      />

      <Popup {...popupProps} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: horizontalScale(10),
    backgroundColor: "white",
    display: "flex",
    justifyContent: "center",
    paddingRight: horizontalScale(60),
    paddingLeft: horizontalScale(60),
  },
  headerContainer: {
    marginTop: verticalScale(20),
  },
});

export default SignUpScreen;
