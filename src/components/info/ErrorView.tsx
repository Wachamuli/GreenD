import { View } from "react-native";

import ErrorMessage from "./ErrorMessage";

const ErroView = () => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
      }}>
      <ErrorMessage error={{ message: "Un error ha ocurrido" }} />
    </View>
  );
};

export default ErroView;
