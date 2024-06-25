import {
  FlatList,
  Keyboard,
  Modal,
  Pressable,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from "../../utilities/metrics";
import { ColorPalette } from "../../styles/colorPalette";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import Txt from "../info/Txt";
import { useCallback, useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import Tappable from "./Tappable";
import { router } from "expo-router";

const SearchItem = ({ id, name }: { id: string; name: string }) => {

  return (
    <Tappable onPress={() => {
      router.navigate({
        pathname: "/home/details",
        params: { serviceId: id },
      });
    }}>
      <View
        style={{
          borderBottomWidth: moderateScale(0.5),
          borderBottomColor: ColorPalette.tertiary,
          paddingHorizontal: horizontalScale(10),
          paddingVertical: verticalScale(15),
        }}>
        <Txt>{name}</Txt>
      </View>
    </Tappable>
  );
};

const SearchBar = () => {
  const [isSearching, setIsSearching] = useState(false);
  const [services, setServices] = useState([{ id: "", name: "" }]);

  const getServices = async () => {
    const { data } = await supabase.from("services").select("id, name");
    setServices(data);
  };

  useEffect(() => {
    if (isSearching) getServices();
  }, [isSearching]);

  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVisible(true); // or some other action
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false); // or some other action
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  return (
    <View style={styles.container}>
      <View>
        <TextInput
          placeholder="Buscar"
          placeholderTextColor={"#9ca3af"}
          style={styles.textInput}
          onFocus={() => setIsSearching(true)}
          onBlur={() => setIsSearching(false)}
        />
        <View style={styles.iconContainer}>
          <FontAwesomeIcon icon={faMagnifyingGlass} size={20} color="#9ca3af" />
        </View>
      </View>
      <View>
        {/* {isKeyboardVisible && isSearching && ( */}
          <FlatList
            style={{
              position: "absolute",
              backgroundColor: "white",
              width: "100%",
            }}
            data={services}
            renderItem={({ item }) => {
              return <SearchItem {...item} />;
            }}
          />
        {/* )} */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    zIndex: 99,
    marginBottom: verticalScale(5),
    paddingHorizontal: horizontalScale(20),
    width: "100%",
  },
  textInput: {
    backgroundColor: "#f3f4f6",
    borderRadius: moderateScale(10),
    borderColor: ColorPalette.tertiary,
    paddingVertical: verticalScale(15),
    paddingHorizontal: horizontalScale(50),
    fontSize: moderateScale(16),
    width: "100%",
  },
  iconContainer: {
    position: "absolute",
    left: "5%",
    top: "30%",
  },
});

export default SearchBar;
