import { useEffect, useState } from "react";
import { FlatList, ScrollView, StyleSheet, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

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
import { zodResolver } from "@hookform/resolvers/zod";
import {
  type SuggestionSchema,
  suggestionSchema,
} from "../utilities/validators/SuggestionSchema";
import { supabase } from "../lib/supabase";
import { type Tag as TagType } from "../lib/supabase.type.alias";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

type ScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "activeServicesDetails"
>;

// { name: "impuntualidad", color: "#D80032" },
// { name: "mal servicio", color: "#5F8670" },
// { name: "precio inesperado", color: "#FF9800" },
// { name: "retrasos", color: "#FF9800" },
// { name: "robo", color: "#5F8670" },
// { name: "baja calidad", color: "#8B1874" },
// { name: "trabajo incompleto", color: "#331D2C" },
// { name: "problema no resuelto", color: "#FF9800" },
// { name: "error al limpiar", color: "red" },
// { name: "poco flexible", color: "red" },

const ActiveServiceDetailsScreen = ({
  route,
  navigation,
}: ScreenProps): JSX.Element => {
  const { control, handleSubmit } = useForm<SuggestionSchema>({
    resolver: zodResolver(suggestionSchema),
  });
  const [positiveTags, setPositiveTags] = useState<TagType[] | null>([]);
  const [negativeTags, setNegativeTags] = useState<TagType[] | null>([]);
  const [selectedTags, setSelectedTags] = useState<TagType[]>([]);

  const onSubmit = async (form: SuggestionSchema) => {
    const { error } = await supabase.rpc("insert_suggestion", {
      service_request_id_param: route.params.serviceRequestId,
      subject_param: form.subject,
      body_param: form.body,
      tags_param: selectedTags?.map(tag => tag.id),
    });

    if (error) {
      console.error(error.message);
      console.error("Unable to submit suggestion");
      return;
    }
  };

  useEffect(() => {
    getTags();
  }, []);

  const getTags = async () => {
    const { data: positiveTags, error: errorPositiveTags } = await supabase
      .from("tags")
      .select("*")
      .eq("positive", true);
    const { data: negativeTags, error: errorNegativeTags } = await supabase
      .from("tags")
      .select("*")
      .eq("positive", false);

    if (errorPositiveTags || errorNegativeTags) {
      // TODO: Handle this
    }

    setPositiveTags(positiveTags);
    setNegativeTags(negativeTags);
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
      {/* <Txt>{route.params.serviceRequestId}</Txt> */}
      <Header title="Reportar" />

      <View style={styles.tagsContainer}>
        <Txt>Positivos</Txt>
        <FlatList
          horizontal
          data={positiveTags}
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
          data={negativeTags}
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
              onPress={() => removeTag(name)}
              key={index}
              name={name}
              color={color}
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

export default ActiveServiceDetailsScreen;
