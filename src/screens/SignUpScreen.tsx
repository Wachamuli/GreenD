import React, { useState } from "react";
import Header from "../components/Header";
import { Pressable, StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { navigationProp } from "../App";
import Txt from "../components/Txt";
import { useForm } from "react-hook-form";
import Field from "../components/controls/Field";
import { horizontalScale } from "../utilities/metrics";
import Tappable from "../components/controls/Tappable";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { supabase } from "../lib/supabase";
import Btn from "../components/controls/Btn";
import Checkbox from "../components/controls/Checkbox";

const signUpSchema = z.object({});

const SignUp = (): JSX.Element => {
  const { control, handleSubmit, getValues } = useForm({
    resolver: zodResolver(signUpSchema),
  });
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation<navigationProp>();

  const signUp = async () => {
    // const { error } = await supabase.auth.signUp({
    //   email: getValues("email"),
    // })
  };

  return (
    <View style={styles.container}>
      <Header title="Solicitar una cuenta" />
      <Field name="name" control={control} label="Nombre" placeholder="Jane" />
      <Field
        name="surname"
        control={control}
        label="Apellido"
        placeholder="Doe"
      />
      <Field
        name="email"
        control={control}
        label="Correo electrónico"
        placeholder="janedoe@domain.tls"
      />
      <Field
        name="telephone"
        control={control}
        label="Número telefónico"
        placeholder="809-000-0000"
      />
      <Field
        name="cellphone"
        control={control}
        label="Número celular"
        placeholder="829-000-0000"
      />
      <Field name="address" control={control} label="Dirección" />
      <Field name="condominium" control={control} label="Residencial" />

      <Checkbox name="terms" control={control}>
        <Txt>Al registrarme acepto las </Txt>
        <Tappable label="Políticas de Privacidad" />
        <Txt> y </Txt>
        <Tappable label="Términos de Uso" />
      </Checkbox>

      <Btn onPress={handleSubmit(signUp)} label="Registrarse" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: horizontalScale(10),
    backgroundColor: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SignUp;
