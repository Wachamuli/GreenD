import { useEffect, useState } from "react";
import { FlatList, ScrollView, StyleSheet, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { zodResolver } from "@hookform/resolvers/zod";

import Txt from "../components/Txt";
import { RootStackParamList } from "./ServiceRequestsStack";
import Btn from "../components/controls/Btn";
import Field from "../components/controls/Field";
import { useForm } from "react-hook-form";
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from "../utilities/metrics";
import Tag from "../components/Tag";
import Header from "../components/Header";
import { supabase } from "../lib/supabase";
import { type Tag as TagType } from "../lib/supabase.type.alias";
import {
  type SuggestionSchema,
  suggestionSchema,
} from "../utilities/validators/SuggestionSchema";
import Popup, { type PopupProps } from "../components/Popup";
import { faCircleCheck } from "@fortawesome/free-regular-svg-icons";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";

type ScreenProps = NativeStackScreenProps<RootStackParamList, "report">;

const ReportScreen = ({ navigation, route }: ScreenProps): JSX.Element => {
  const { control, handleSubmit } = useForm<SuggestionSchema>({
    resolver: zodResolver(suggestionSchema),
  });
  const [tags, setTags] = useState<TagType[] | null>([]);
  const [selectedTags, setSelectedTags] = useState<TagType[]>([]);
  const [popupProps, setPopupProps] = useState<PopupProps>();

  const onSubmit = async (form: SuggestionSchema) => {
    const { error } = await supabase.rpc("insert_suggestion", {
      service_request_id_param: route.params.serviceRequestId,
      subject_param: form.subject,
      body_param: form.body,
      tags_param: selectedTags?.map(tag => tag.id),
    });

    if (error) {
      setPopupProps({
        title: "¡Ups! Algo salió mal",
        description: error.message,
        iconProps: { icon: faTriangleExclamation, color: "#FF7D7D" },
        buttonOptions: { label: "Entendido" },
      });
      return;
    }

    setPopupProps({
      title: "¡Enviado exitosamente!",
      description: "Gracias por su sugerencia.",
      iconProps: { icon: faCircleCheck, color: "#5cb85c" },
      buttonOptions: {
        label: "Volver atrás",
        onPress: () =>
          navigation.navigate("activeServicesDetails", {
            serviceRequestId: route.params.serviceRequestId,
          }),
      },
    });
  };

  useEffect(() => {
    getTags();
  }, []);

  const getTags = async () => {
    const { data, error } = await supabase.from("tags").select("*");

    if (error) {
      // TODO: Handle this
    }

    setTags(data);
  };

  const addTag = (id: number, name: string, color: string) => {
    for (const tag of selectedTags) {
      if (tag.name === name) {
        return;
      }
    }

    setSelectedTags(prevState => [...prevState, { id, name, color }]);
  };

  const removeTag = (name: string) => {
    setSelectedTags(prevState => prevState.filter(tag => tag.name !== name));
  };

  return (
    <ScrollView style={styles.container}>
      <Header title="Reportar" />
      <Txt>¿Es esta una sugerencia o queja?</Txt>
      <Txt>Sugerencia 😊</Txt>
      <Txt>Queja 😡</Txt>

      <View style={styles.tagsContainer}>
        <Txt>Positivos</Txt>
        <FlatList
          horizontal
          data={tags?.filter(tag => tag.positive)}
          keyExtractor={tag => tag.id.toString()}
          renderItem={({ item: { id, name, color }, index }) => (
            <Tag
              key={index}
              onPress={() => addTag(id, name, color)}
              name={name}
              color={color}
            />
          )}
        />
        <Txt>Negativos</Txt>
        <FlatList
          horizontal
          data={tags?.filter(tag => !tag.positive)}
          keyExtractor={tag => tag.id.toString()}
          renderItem={({ item: { id, name, color }, index }) => (
            <Tag
              key={index}
              onPress={() => addTag(id, name, color)}
              name={name}
              color={color}
            />
          )}
        />
      </View>

      <Field
        style={styles.subject}
        name="subject"
        label="Asunto"
        control={control}
        placeholder="¿De qué trata?"
      />

      <View>
        <Txt>Etiquetas</Txt>
        <View style={styles.selectedTagsContainer}>
          {selectedTags.length < 1 && (
            <Txt
              style={{
                color: "#9ca3af",
                fontSize: moderateScale(12),
              }}>
              Agregue etiquetas para mejorar su sugerencia
            </Txt>
          )}
          {selectedTags.map(({ name, color }, index) => (
            <Tag
              key={index}
              name={name}
              color={color}
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
        placeholder="Tu reporte"
      />

      <Btn
        onPress={handleSubmit(onSubmit)}
        style={styles.button}
        label="Enviar"
      />

      <Popup {...popupProps} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: horizontalScale(10),
    marginTop: verticalScale(10),
  },
  tagsContainer: {
    marginBottom: verticalScale(20),
  },
  subject: {
    width: "100%",
  },
  body: {
    marginTop: verticalScale(20),
    textAlignVertical: "top",
    width: "100%",
    height: verticalScale(150),
  },
  selectedTagsContainer: {
    justifyContent: "center",
    marginTop: verticalScale(10),
    borderRadius: moderateScale(10),
    borderColor: "#9ca3af",
    borderStyle: "dashed",
    borderWidth: moderateScale(2),
    paddingHorizontal: horizontalScale(10),
    paddingVertical: verticalScale(10),
    flexDirection: "row",
    flexWrap: "wrap",
  },
  button: {
    width: "100%",
  },
});

export default ReportScreen;
