import { useEffect, useState } from "react";
import { Alert, ScrollView, StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { supabase } from "../lib/supabase";
import { navigationProp } from "../App";
import Txt from "../components/Txt";
import Field from "../components/controls/Field";
import { horizontalScale, verticalScale } from "../utilities/metrics";
import Tappable from "../components/controls/Tappable";
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

const SignUpScreen = (): JSX.Element => {
  const { control, handleSubmit } = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
  });
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation<navigationProp>();
  const [condominiums, setCondomiums] = useState<
    { id: string; name: string }[] | null
  >();

  const getCondomiums = async () => {
    const { data, error } = await supabase
      .from("condominiums")
      .select("id, name");
    if (error) {
      /* Handle error */
    }
    setCondomiums(data);
  };

  useEffect(() => {
    getCondomiums();
  }, []);

  const onSubmit = async (values: SignUpSchema) => {
    setLoading(true);

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

    if (error) {
      Alert.alert(`${error.name} (${error.status}): ${error.message}\n`);
      setLoading(false);
      return;
    }

    setLoading(false);
    navigation.navigate("login");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.headerContainer}>
        <Header title="Solicitar una cuenta" />
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
