import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

import Txt from "../components/Txt";
import Btn from "../components/controls/Btn";
import { supabase } from "../lib/supabase";
import { ColorPalette } from "../styles/colorPalette";
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from "../utilities/metrics";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faBell,
  faCamera,
  faCircleQuestion,
  faLanguage,
  faPerson,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import Link from "../components/controls/Link";

const MyProfileScreen = (): JSX.Element => {
  const [fullname, setFullname] = useState("");
  const [condominium, setCondominium] = useState<{ name: string } | null>();

  const logout = async () => {
    // TODO: Manage error
    const { error } = await supabase.auth.signOut();
  };

  const getUser = async () => {
    const { data, error: userError } = await supabase.auth.getUser();

    if (userError) {
    }

    const { data: condominiumData, error: condominiumError } = await supabase
      .from("condominiums")
      .select("name")
      .eq("id", data.user?.user_metadata.condominium)
      .single();

    console.log(condominiumData?.name);

    if (condominiumError) {
    }

    setCondominium(condominiumData);
    setFullname(
      data.user?.user_metadata.name + " " + data.user?.user_metadata.surname,
    );
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      <ScrollView>
        <View style={styles.container}>
          {/* Image: maybe? */}
          <View style={styles.profilePic}>
            <FontAwesomeIcon
              icon={faCamera}
              color="white"
              size={moderateScale(25)}
            />
          </View>
        </View>
        <View style={styles.subContainer}>
          <Txt style={styles.fullname}>{fullname}</Txt>
          <Txt style={{ color: ColorPalette.secondary }}>
            {condominium?.name}
          </Txt>
          <Btn
            containerStyle={styles.btn}
            onPress={logout}
            label="Cerrar sesión"
          />

          <View style={styles.optionContainer}>
            <FontAwesomeIcon
              icon={faPerson}
              color={ColorPalette.primary}
              size={moderateScale(25)}
            />
            <Txt style={styles.option}>Modificar información personal</Txt>
          </View>

          <View style={styles.optionContainer}>
            <FontAwesomeIcon
              icon={faLanguage}
              color={ColorPalette.primary}
              size={moderateScale(25)}
            />
            <Txt style={styles.option}>Cambiar Idioma</Txt>
          </View>

          <View style={styles.optionContainer}>
            <FontAwesomeIcon
              icon={faBell}
              color={ColorPalette.primary}
              size={moderateScale(21)}
            />
            <Txt style={styles.option}>Gestionar notificaciones</Txt>
          </View>

          <View style={styles.optionContainer}>
            <FontAwesomeIcon
              icon={faCircleQuestion}
              color={ColorPalette.primary}
              size={moderateScale(20)}
            />
            <Txt style={styles.option}>Ayuda</Txt>
          </View>

          <View style={styles.optionContainer}>
            <FontAwesomeIcon
              icon={faTrash}
              color={ColorPalette.primary}
              size={moderateScale(18)}
            />
            <Txt style={styles.option}>Eliminar cuenta</Txt>
          </View>
        </View>

        <View style={styles.footer}>
          <Link onPress={() => {}}>Políticas de Privacidad</Link>
          <Txt>Version 1.0.0</Txt>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: ColorPalette.tertiary,
    paddingVertical: verticalScale(50),
    marginBottom: verticalScale(50),
  },
  fullname: {
    fontFamily: "ffBold",
    fontSize: moderateScale(20),
  },
  subContainer: {
    width: "100%",
    paddingHorizontal: horizontalScale(30),
  },
  btn: {
    alignItems: "center",
    marginTop: verticalScale(15),
  },
  profilePic: {
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: verticalScale(-40),
    left: horizontalScale(20),
    width: moderateScale(90),
    height: moderateScale(90),
    backgroundColor: ColorPalette.primary,
    borderRadius: moderateScale(90) / 2,
  },
  optionContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: verticalScale(10),
  },
  option: {
    fontFamily: "ffBold",
    marginLeft: horizontalScale(10),
    paddingVertical: verticalScale(10),
    color: ColorPalette.primary,
  },
  footer: {
    width: "100%",
    backgroundColor: "#f3f4f6",
    alignItems: "center",
    paddingVertical: verticalScale(35),
    alignContent: "space-between",
  },
});

export default MyProfileScreen;
