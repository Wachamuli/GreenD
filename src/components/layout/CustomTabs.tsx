import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { StyleSheet, TouchableOpacity, View } from "react-native";

import Txt from "../Txt";
import { moderateScale, verticalScale } from "../../utilities/metrics";
import { ColorPalette } from "../../styles/colorPalette";

const BottomTab = ({ state, descriptors, navigation }: BottomTabBarProps) => {
  return (
    <View style={styles.bottomTabContainer}>
      {state.routes.map((route, index) => {
        const isFocused = state.index === index;
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={index}
            style={{ flex: 1 }}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}>
            <View style={styles.bottomTabItemContainer}>
              {options.tabBarIcon &&
                options.tabBarIcon({
                  focused: isFocused,
                  size: moderateScale(20),
                  color: isFocused ? ColorPalette.primary : "#9ca3af",
                })}
              {options.tabBarBadge && (
                <View style={styles.badge}>
                  <Txt
                    style={{
                      color: "white",
                      fontSize: moderateScale(10),
                      fontFamily: "ffBold",
                    }}>
                    {options.tabBarBadge}
                  </Txt>
                </View>
              )}
              <Txt
                style={{
                  fontFamily: "ffBold",
                  fontSize: moderateScale(10),
                  color: isFocused ? ColorPalette.primary : "#9ca3af",
                }}>
                {label.toString()}
              </Txt>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  bottomTabContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "white",
    bottom: 0,
    paddingVertical: verticalScale(10),
    borderColor: ColorPalette.tertiary,
    borderTopWidth: verticalScale(0.5),
  },
  badge: {
    position: "absolute",
    left: 45,
    bottom: 25,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: moderateScale(17),
    height: moderateScale(17),
    borderRadius: moderateScale(17) / 2,
    backgroundColor: "red",
  },
  bottomTabItemContainer: {
    alignItems: "center",
  },
});

export default BottomTab;
