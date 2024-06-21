import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

import Txt from "../../../components/info/Txt";
import { supabase } from "../../../lib/supabase";
import { ColorPalette } from "../../../styles/colorPalette";
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from "../../../utilities/metrics";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  IconDefinition,
  faBell,
  faChevronRight,
  faCircleQuestion,
  faLanguage,
  faPerson,
  faRightFromBracket,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import Link from "../../../components/controls/Link";
import Tappable from "../../../components/controls/Tappable";
import ProfileImagePicker from "../../../components/controls/ProfileImagePicker";

const Option = (props: {
  onPress: () => void;
  fontColor: string;
  icon: IconDefinition;
  iconSize: number;
  label: string;
}): JSX.Element => {
  return (
    <Tappable onPress={props.onPress}>
      <View
        style={{
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: "row",
          // borderBottomColor: ColorPalette.tertiary,
          // borderBottomWidth: moderateScale(0.5),
          // paddingHorizontal: horizontalScale(10)
        }}>
        <View style={styles.optionContainer}>
          <FontAwesomeIcon
            style={{ maxWidth: horizontalScale(20) }}
            icon={props.icon}
            color={props.fontColor}
            size={props.iconSize}
          />
          <Txt style={[styles.option, { color: props.fontColor }]}>
            {props.label}
          </Txt>
        </View>
        <FontAwesomeIcon icon={faChevronRight} color={props.fontColor} />
      </View>
    </Tappable>
  );
};

const Profile = (): JSX.Element => {
  const [profile, setProfile] = useState({
    name: "",
    surname: "",
    condominium: { name: "" },
  });

  const logout = async () => {
    // TODO: Handle error
    const { error } = await supabase.auth.signOut();
  };

  const getUser = async () => {
    // TODO: Handle error
    const { data: user, error } = await supabase
      .from("profiles")
      .select("name, surname, condominium (name)")
      .single();

    setProfile(user);
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      <ScrollView contentContainerStyle={{ backgroundColor: "white" }}>
        <ProfileImagePicker />

        <View style={styles.subContainer}>
          <Txt style={styles.fullname}>
            {profile.name + " " + profile.surname}
          </Txt>
          <Txt style={styles.condominium}>{profile.condominium.name}</Txt>

          <Txt style={styles.subHeader}>Personal</Txt>

          <View style={styles.section}>
            <Option
              onPress={() => {}}
              label="Editar perfil"
              fontColor={ColorPalette.primary}
              icon={faPerson}
              iconSize={moderateScale(25)}
            />

            <Option
              onPress={() => {}}
              label="Cambiar idioma"
              fontColor={ColorPalette.primary}
              icon={faLanguage}
              iconSize={moderateScale(25)}
            />
          </View>

          <Txt style={styles.subHeader}>Configuración</Txt>

          <View style={styles.section}>
            <Option
              onPress={() => {}}
              label="Gestionar notificaciones"
              fontColor={ColorPalette.primary}
              icon={faBell}
              iconSize={moderateScale(21)}
            />

            <Option
              onPress={() => {}}
              label="Ayuda"
              fontColor={ColorPalette.primary}
              icon={faCircleQuestion}
              iconSize={moderateScale(20)}
            />
          </View>

          <Txt style={styles.subHeader}>Sesión</Txt>

          <View style={styles.section}>
            <Option
              onPress={logout}
              label="Cerrar sesión"
              fontColor={ColorPalette.primary}
              icon={faRightFromBracket}
              iconSize={moderateScale(21)}
            />

            <Option
              onPress={() => {}}
              label="Eliminar cuenta"
              fontColor={ColorPalette.error}
              icon={faTrash}
              iconSize={moderateScale(21)}
            />
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
    backgroundColor: "white",
    paddingVertical: verticalScale(50),
    marginBottom: verticalScale(50),
  },
  fullname: {
    fontFamily: "ffBold",
    fontSize: moderateScale(20),
  },
  condominium: {
    color: ColorPalette.secondary,
    borderBottomWidth: moderateScale(0.5),
    borderBottomColor: ColorPalette.tertiary,
    paddingBottom: verticalScale(20),
    marginBottom: verticalScale(20),
  },
  subHeader: {
    fontFamily: "ffBold",
    fontSize: moderateScale(18),
    marginBottom: verticalScale(5),
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
  section: {
    marginBottom: verticalScale(20),
  },
  optionContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  option: {
    fontFamily: "ffBold",
    marginLeft: horizontalScale(10),
    paddingVertical: verticalScale(10),
  },
  footer: {
    width: "100%",
    alignItems: "center",
    paddingVertical: verticalScale(35),
    alignContent: "space-between",
  },
});

export default Profile;
