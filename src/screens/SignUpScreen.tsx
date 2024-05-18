import { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Image,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { supabase } from "../lib/supabase";
import { navigationProp } from "../App";
import Field from "../components/controls/Field";
import {
  height,
  horizontalScale,
  moderateScale,
  verticalScale,
} from "../utilities/metrics";
import Btn from "../components/controls/Btn";
import Checkbox from "../components/controls/Checkbox";
import Header from "../components/Header";
import PasswordEnforcer from "../components/controls/PasswordEnforcer";
import {
  SignUpSchema,
  signUpSchema,
} from "../utilities/validators/SignUpSchema";
import Menu from "../components/controls/Menu";
import Link from "../components/controls/Link";
import {
  faCamera,
  faPlus,
  faTriangleExclamation,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { ColorPalette } from "../styles/colorPalette";
import Popup, { PopupProps } from "../components/Popup";
import * as ImagePicker from "expo-image-picker";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import Tappable from "../components/controls/Tappable";

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

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  useEffect(() => {
    getCondomiums();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* <View style={styles.headerContainer}>
        <Header title="Solicitar una cuenta" />
      </View> */}

      {/* TODO: Move to its own component */}
      <View
        style={{ alignItems: "center", paddingVertical: verticalScale(20) }}>
        <Tappable onPress={pickImage}>
          <View
            style={{
              width: moderateScale(120),
              height: moderateScale(120),
              borderRadius: moderateScale(120) / 2,
              overflow: "hidden",
              zIndex: 3,
            }}>
            {image ? (
              <Image
                source={{ uri: image }}
                style={{ width: "100%", height: "100%" }}
              />
            ) : (
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                  height: "100%",
                  backgroundColor: ColorPalette.tertiary,
                }}>
                <FontAwesomeIcon
                  icon={faUser}
                  color="white"
                  size={moderateScale(70)}
                />
              </View>
            )}
          </View>
          <View
            style={{
              position: "absolute",
              bottom: 0,
              right: 0,
              zIndex: 3,
              backgroundColor: ColorPalette.primary,
              height: moderateScale(40),
              width: moderateScale(40),
              borderRadius: moderateScale(10),
              justifyContent: "center",
              alignItems: "center",
            }}>
            <FontAwesomeIcon
              icon={faPlus}
              color="white"
              size={moderateScale(20)}
            />
          </View>
        </Tappable>
      </View>

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
