import { PropsWithChildren, useCallback } from "react";
import { Text, TextProps } from "react-native";

import { moderateScale } from "../utilities/metrics";
import { useFonts } from "expo-font";

type Props = TextProps & PropsWithChildren;

const Txt = (props: Props): JSX.Element => {
  // TODO: Move the font logic to the root
  const [fontsLoaded, fontError] = useFonts({
    "Montserrat": require("../assets/fonts/Montserrat/Montserrat-VariableFont_wght.ttf"),
    "Montserrat-Bold": require("../assets/fonts/Montserrat/static/Montserrat-Bold.ttf"),
    "Montserrat-BoldItalic": require("../assets/fonts/Montserrat/static/Montserrat-BoldItalic.ttf"),
    "Montserrat-Black": require("../assets/fonts/Montserrat/static/Montserrat-Black.ttf")
  })

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      // await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return <></>;
  }

  return (
    <Text
      {...props}
      onLayout={onLayoutRootView}
      style={[
        {
          fontFamily: "Montserrat",
          fontSize: moderateScale(16),
          color: "black",
        },
        props.style,
      ]}>
      {props.children}
    </Text>
  );
};

export default Txt;
