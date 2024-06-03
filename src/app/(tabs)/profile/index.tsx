import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

import Txt from "../../../components/Txt";
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
        <FontAwesomeIcon
          icon={faChevronRight}
          color={props.fontColor}
          // size={props.iconSize}
        />
      </View>
    </Tappable>
  );
};

const Profile = (): JSX.Element => {
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
        <ProfileImagePicker />

        <View style={styles.subContainer}>
          <Txt style={styles.fullname}>{fullname}</Txt>
          <Txt style={styles.condominium}>{condominium?.name}</Txt>

          <Option
            onPress={logout}
            label="Cerrar sesión"
            fontColor={ColorPalette.primary}
            icon={faRightFromBracket}
            iconSize={moderateScale(21)}
          />

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

          <Option
            onPress={() => {}}
            label="Eliminar cuenta"
            fontColor={ColorPalette.error}
            icon={faTrash}
            iconSize={moderateScale(21)}
          />
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
    // backgroundColor: ColorPalette.tertiary,
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
  },
  footer: {
    width: "100%",
    alignItems: "center",
    paddingVertical: verticalScale(35),
    alignContent: "space-between",
  },
});

export default Profile;
