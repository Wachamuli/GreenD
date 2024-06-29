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
import {
  faBell,
  faCircleQuestion,
  faLanguage,
  faPerson,
  faRightFromBracket,
  faTrash,
  faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import Link from "../../../components/controls/Link";
import ProfileImagePicker from "../../../components/controls/ProfileImagePicker";
import { useForm } from "react-hook-form";
import SettingsOption from "../../../components/controls/SettingsOptions";
import { useModal } from "../../../hooks/useModal";

const Profile = (): JSX.Element => {
  const modal = useModal();
  const { control, setValue, watch } = useForm();
  const [profile, setProfile] = useState({
    id: "",
    avatar: "",
    name: "",
    surname: "",
    condominium: { name: "" },
  });

  const logout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      modal.open({
        title: "¡Ups! Algo salió mal",
        description: error.message,
        iconProps: { icon: faTriangleExclamation, color: ColorPalette.error },
        buttonOptions: [{ label: "Entendido" }],
      });
    }
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
    console.log(f)

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

  const getProfileInfo = async () => {
    const { data: profileData, error } = await supabase
      .from("profiles")
      .select("id, name, surname, avatar, condominium (name)")
      .single();

    if (error) {
      modal.open({
        title: "¡Ups! Algo salió mal",
        description: error.message,
        iconProps: { icon: faTriangleExclamation, color: ColorPalette.error },
        buttonOptions: [{ label: "Entendido" }],
      });
    }

    setProfile(profileData);
  };

  useEffect(() => {
    getProfileInfo();
  }, []);
  // Dependency array  👀

  const avatar = watch("avatar", profile.avatar);
  useEffect(() => {
    uploadUserAvatar(profile.id, avatar);
  }, [avatar]);

  return (
    <>
      <ScrollView contentContainerStyle={{ backgroundColor: "white" }}>
        <ProfileImagePicker
          name="avatar"
          control={control}
          value={profile.avatar}
          onValueChange={setValue}
        />
        <View style={styles.subContainer}>
          <Txt style={styles.fullname}>
            {profile.name + " " + profile.surname}
          </Txt>
          <Txt style={styles.condominium}>{profile.condominium.name}</Txt>

          <Txt style={styles.subHeader}>Personal</Txt>

          <View style={styles.section}>
            <SettingsOption
              onPress={() => {}}
              label="Editar perfil"
              fontColor={ColorPalette.primary}
              icon={faPerson}
              iconSize={moderateScale(25)}
            />
            <SettingsOption
              onPress={() => {}}
              label="Cambiar idioma"
              fontColor={ColorPalette.primary}
              icon={faLanguage}
              iconSize={moderateScale(25)}
            />
          </View>

          <Txt style={styles.subHeader}>Configuración</Txt>

          <View style={styles.section}>
            <SettingsOption
              onPress={() => {}}
              label="Gestionar notificaciones"
              fontColor={ColorPalette.primary}
              icon={faBell}
              iconSize={moderateScale(21)}
            />
            <SettingsOption
              onPress={() => {}}
              label="Ayuda"
              fontColor={ColorPalette.primary}
              icon={faCircleQuestion}
              iconSize={moderateScale(20)}
            />
          </View>

          <Txt style={styles.subHeader}>Sesión</Txt>

          <View style={styles.section}>
            <SettingsOption
              onPress={logout}
              label="Cerrar sesión"
              fontColor={ColorPalette.primary}
              icon={faRightFromBracket}
              iconSize={moderateScale(21)}
            />
            <SettingsOption
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
  footer: {
    width: "100%",
    alignItems: "center",
    paddingVertical: verticalScale(35),
    alignContent: "space-between",
  },
});

export default Profile;
