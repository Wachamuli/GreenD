import { useEffect, useState } from "react";
import { Image, StyleSheet, View } from "react-native";

import { Control, FieldValue, useController } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faPlus, faUser } from "@fortawesome/free-solid-svg-icons";
import { ColorPalette } from "../../styles/colorPalette";
import * as ImagePicker from "expo-image-picker";

import Tappable from "./Tappable";
import { moderateScale, verticalScale } from "../../utilities/metrics";
import ErrorMessage from "../info/ErrorMessage";

type Props = {
  name: string;
  control: Control<FieldValue<any>>;
  value: string;
  onValueChange: any;
};

const ProfileImagePicker = (props: Props) => {
  const [image, setImage] = useState("");
  const {
    fieldState: { error: fieldError },
  } = useController({
    name: props.name,
    defaultValue: "",
    control: props.control,
  });

  useEffect(() => {
    props.onValueChange(props.name, image);
  }, [image]);

  useEffect(() => {
    setImage(props.value);
  }, [props.value]);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) setImage(result.assets[0].uri);
  };

  return (
    <View style={styles.container}>
      <Tappable onPress={pickImage}>
        <View style={styles.imageContainer}>
          {image ? (
            <Image source={{ uri: image }} style={styles.image} />
          ) : (
            <View style={styles.placeholder}>
              <FontAwesomeIcon
                icon={faUser}
                color="white"
                size={moderateScale(70)}
              />
            </View>
          )}
        </View>
        <View style={styles.squareContainer}>
          <FontAwesomeIcon
            icon={faPlus}
            color="white"
            size={moderateScale(20)}
          />
        </View>
      </Tappable>
      <ErrorMessage error={fieldError} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingVertical: verticalScale(20),
  },
  imageContainer: {
    width: moderateScale(120),
    height: moderateScale(120),
    borderRadius: moderateScale(120) / 2,
    overflow: "hidden",
    zIndex: 3,
  },
  placeholder: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
    backgroundColor: ColorPalette.tertiary,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  squareContainer: {
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
  },
});

export default ProfileImagePicker;
