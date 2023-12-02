import { loadAsync } from "expo-font";

const useFonts = async () =>
  await loadAsync({
    Montserrat: require("../assets/fonts/Montserrat/static/Montserrat-Regular.ttf"),
    MontserratBold: require("../assets/fonts/Montserrat/static/Montserrat-Bold.ttf"),
    MontserratBoldItalic: require("../assets/fonts/Montserrat/static/Montserrat-BoldItalic.ttf"),
    MontserratBlack: require("../assets/fonts/Montserrat/static/Montserrat-Black.ttf"),
  });

export default useFonts;
