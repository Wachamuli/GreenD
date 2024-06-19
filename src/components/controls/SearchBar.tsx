import { StyleSheet, TextInput, View } from "react-native";
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from "../../utilities/metrics";
import { ColorPalette } from "../../styles/colorPalette";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const SearchBar = () => {
  return (
    <View style={styles.container}>
      <View>
        <TextInput
          placeholder="Buscar"
          placeholderTextColor={"#9ca3af"}
          style={styles.textInput}
        />
        <View style={styles.iconContainer}>
          <FontAwesomeIcon icon={faMagnifyingGlass} size={20} color="#9ca3af" />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
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