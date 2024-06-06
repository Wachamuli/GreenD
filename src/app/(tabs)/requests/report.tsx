import { useEffect, useState } from "react";
import { FlatList, ScrollView, StyleSheet, View } from "react-native";
import { zodResolver } from "@hookform/resolvers/zod";

import Txt from "../../../components/info/Txt";
import Btn from "../../../components/controls/Btn";
import Field from "../../../components/controls/Field";
import { useForm } from "react-hook-form";
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from "../../../utilities/metrics";
import Tag from "../../../components/Tag";
import { supabase } from "../../../lib/supabase";
import { type Tag as TagType } from "../../../lib/supabase.type.alias";
import {
  type SuggestionSchema,
  suggestionSchema,
} from "../../../utilities/validators/SuggestionSchema";
import Popup, { type PopupProps } from "../../../components/info/Popup";
import { faCircleCheck } from "@fortawesome/free-regular-svg-icons";
import {
  faPlus,
  faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import { router, useLocalSearchParams } from "expo-router";
import { ColorPalette } from "../../../styles/colorPalette";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

const Report = (): JSX.Element => {
  const params = useLocalSearchParams();
  const { control, handleSubmit } = useForm<SuggestionSchema>({
    resolver: zodResolver(suggestionSchema),
  });
  const [tags, setTags] = useState<TagType[] | null>([]);
  const [selectedTags, setSelectedTags] = useState<
    (TagType & { containerColor: string })[]
  >([]);
  const [popupProps, setPopupProps] = useState<PopupProps>();
  const [username, setUsername] = useState("");

  const onSubmit = async (form: SuggestionSchema) => {
    const { error } = await supabase.rpc("insert_suggestion", {
      service_request_id_param: params.serviceRequestId,
      subject_param: form.subject,
      body_param: form.body,
      tags_param: selectedTags?.map(tag => tag.id),
    });

    if (error) {
      setPopupProps({
        title: "¡Ups! Algo salió mal",
        description: error.message,
        iconProps: { icon: faTriangleExclamation, color: "#FF7D7D" },
        buttonOptions: [{ label: "Entendido" }],
      });
      return;
    }

    setPopupProps({
      title: "¡Enviado exitosamente!",
      description: "Gracias por su sugerencia.",
      iconProps: { icon: faCircleCheck, color: "#5cb85c" },
      buttonOptions: [
        {
          label: "Volver atrás",
          onPress: () =>
            router.navigate({
              pathname: "/requests",
              params: { serviceRequestId: params.serviceRequestId },
            }),
        },
      ],
    });
  };

  const getUser = async () => {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    setUsername(user?.user_metadata.name);
  };

  useEffect(() => {
    getUser();
    getTags();
  }, []);

  const getTags = async () => {
    const { data, error } = await supabase.from("tags").select("*");

    if (error) {
      // TODO: Handle this
    }

    setTags(data);
  };

  const addTag = (
    id: number,
    name: string,
    color: string,
    containerColor: string,
    positive: boolean,
  ) => {
    for (const tag of selectedTags) {
      if (tag.name === name) {
        return;
      }
    }

    setSelectedTags(prevState => [
      ...prevState,
      { id, name, color, containerColor, positive },
    ]);
  };

  const removeTag = (name: string) => {
    setSelectedTags(prevState => prevState.filter(tag => tag.name !== name));
  };

  return (
    <>
      <ScrollView style={styles.container}>
        <Txt>Nos encantaría mejorar nuestros servicios con tu ayuda.</Txt>

        <View style={styles.tagsContainer}>
          <FlatList
            horizontal
            data={tags?.filter(tag => tag.positive)}
            keyExtractor={tag => tag.id.toString()}
            renderItem={({ item: { id, name, color, positive }, index }) => (
              <Tag
                key={index}
                onPress={() =>
                  addTag(id, name, "rgb(111, 146, 240)", "#f3f5ff", positive)
                }
                name={name}
                color={"rgb(111, 146, 240)"}
                containerColor={"#f3f5ff"}
              />
            )}
          />
          <FlatList
            horizontal
            data={tags?.filter(tag => !tag.positive)}
            keyExtractor={tag => tag.id.toString()}
            renderItem={({ item: { id, name, color, positive }, index }) => (
              <Tag
                key={index}
                onPress={() =>
                  addTag(id, name, ColorPalette.error, "#FDF1FF", positive)
                }
                name={name}
                color={ColorPalette.error}
                containerColor={"#FDF1FF"}
              />
            )}
          />
        </View>

        <View
          style={{
            flexDirection: "row",
            width: "70%",
            justifyContent: "space-between",
            marginBottom: verticalScale(10),
          }}>
          <View>
            <Txt style={{ color: ColorPalette.tertiary }}>From:</Txt>
            <Txt style={{ color: ColorPalette.tertiary }}>To:</Txt>
          </View>
          <View>
            <Txt> {username} </Txt>
            <Txt>{params.outsourcerName}</Txt>
          </View>
        </View>

        <Txt style={{ fontFamily: "ffBold", marginBottom: verticalScale(10) }}>
          Asunto
        </Txt>

        <Field
          style={styles.subject}
          name="subject"
          control={control}
          placeholder="¿De qué trata?"
        />

        <View>
          <View style={styles.selectedTagsContainer}>
            {selectedTags.length < 1 && (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                }}>
                <FontAwesomeIcon
                  icon={faPlus}
                  style={{ marginRight: horizontalScale(5) }}
                  color="#9ca3af"
                />
                <Txt style={styles.selectedTagsPlaceholder}>
                  Agregue etiquetas para mejorar su sugerencia
                </Txt>
              </View>
            )}
            {selectedTags.map(({ name, color, containerColor }, index) => (
              <Tag
                key={index}
                name={name}
                color={color}
                containerColor={containerColor}
                selected={true}
                onPress={() => removeTag(name)}
              />
            ))}
          </View>
        </View>

        <Field
          style={styles.body}
          name="body"
          control={control}
          placeholder="Detalles del reporte."
        />

        <Popup {...popupProps} />
      </ScrollView>
      <View
        style={{
          bottom: 0,
          width: "100%",
          position: "absolute",
          paddingHorizontal: horizontalScale(20),
        }}>
        <Btn
          onPress={handleSubmit(onSubmit)}
          style={styles.button}
          label="Enviar"
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: horizontalScale(10),
    backgroundColor: "white",
  },
  tagsContainer: {
    borderBottomWidth: moderateScale(0.5),
    borderColor: ColorPalette.tertiary,
    paddingBottom: verticalScale(20),
    marginVertical: verticalScale(20),
    rowGap: verticalScale(10),
  },
  subject: {
    width: "100%",
  },
  body: {
    textAlignVertical: "top",
    width: "100%",
    height: verticalScale(150),
    marginTop: verticalScale(8),
    marginBottom: verticalScale(140),
  },
  selectedTagsContainer: {
    justifyContent: "center",
    // marginTop: verticalScale(10),
    borderRadius: moderateScale(10),
    borderColor: ColorPalette.tertiary,
    borderStyle: "solid",
    borderWidth: moderateScale(0.5),
    paddingHorizontal: horizontalScale(10),
    paddingVertical: verticalScale(10),
    flexDirection: "row",
    flexWrap: "wrap",
  },
  selectedTagsPlaceholder: {
    color: "#9ca3af",
    fontSize: moderateScale(12),
  },
  button: {
    width: "100%",
  },
});

export default Report;
