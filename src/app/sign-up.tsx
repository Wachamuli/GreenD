import { useEffect, useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { router } from "expo-router";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";

import Field from "../components/controls/Field";
import Btn from "../components/controls/Btn";
import Menu from "../components/controls/Menu";
import Link from "../components/controls/Link";
import Checkbox from "../components/controls/Checkbox";
import PasswordEnforcer from "../components/controls/PasswordEnforcer";
import ProfileImagePicker from "../components/controls/ProfileImagePicker";
import { supabase } from "../lib/supabase";
import { horizontalScale, verticalScale } from "../utilities/metrics";
import { ColorPalette } from "../styles/colorPalette";
import {
  type SignUpSchema,
  signUpSchema,
} from "../utilities/validators/SignUpSchema";
import { useModal } from "../hooks/useModal";

const Signup = (): JSX.Element => {
  const [image, setImage] = useState("");
  const { control, handleSubmit, setError, setValue } = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
  });
  const [loading, setLoading] = useState(false);
  const [condominiums, setCondomiums] = useState<
    { id: string; name: string }[] | null
  >();
  const modal = useModal();

  const getCondomiums = async () => {
    const { data, error } = await supabase
      .from("condominiums")
      .select("id, name");

    if (error) {
      modal.open({
        title: "¡Ups! Algo salió mal",
        description: error.message,
        iconProps: { icon: faTriangleExclamation, color: ColorPalette.error },
        buttonOptions: [{ label: "Entendido" }],
      });
    }

    setCondomiums(data);
  };

  const uploadUserAvatar = async (
    userId: string,
    imageUri: string | undefined,
  ) => {
    if (!imageUri) return;

    const imageExtension = imageUri.substring(imageUri.lastIndexOf(".") + 1);
    const imagePath = "avatar." + imageExtension;
    const imageFullPath = userId + "/" + imagePath;

    const formData = new FormData();
    formData.append("files", {
      uri: imageUri,
      name: imageFullPath,
      type: `image/${imageExtension}`,
    });

    const { data, error } = await supabase.storage
      .from("test")
      .upload(imageFullPath, formData, {
        contentType: `image/${imageExtension}`,
        upsert: true,
      });

    if (error) {
      console.log(error);
      return;
    }

    const { data: f } = supabase.storage.from("test").getPublicUrl(data.path);

    // The row is not updated because the user is not authenticated a this point.
    const { error: updateError } = await supabase
      .from("profiles")
      .update({
        avatar: f.publicUrl,
      })
      .eq("id", userId);

    if (updateError) {
      console.error(updateError.message);
      return;
    }
  };

  const onSubmit = async (values: SignUpSchema) => {
    setLoading(true);

    const {
      data: { user },
      error,
    } = await supabase.auth.signUp({
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
      if (error.code === "user_already_exists") {
        setError("email", { message: "Correo ocupado" });
        return;
      }

      modal.open({
        title: "¡Ups! Algo salió mal",
        description: error.message,
        iconProps: { icon: faTriangleExclamation, color: ColorPalette.error },
        buttonOptions: [{ label: "Entendido" }],
      });
      return;
    }

    uploadUserAvatar(user?.id as string, values.avatar);

    router.replace({
      pathname: "/confirmation",
      params: { email: values.email, password: values.password },
    });
  };

  useEffect(() => {
    getCondomiums();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ProfileImagePicker
        name="avatar"
        control={control}
        value={image}
        onValueChange={setValue}
      />

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

export default Signup;
