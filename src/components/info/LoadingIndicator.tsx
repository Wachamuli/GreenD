import { ActivityIndicator, View } from "react-native";
import { ColorPalette } from "../../styles/colorPalette";

const LoadingIndicator = () => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "white",
      }}>
      <ActivityIndicator size={"large"} color={ColorPalette.accent} />
    </View>
  );
};

export default LoadingIndicator;
