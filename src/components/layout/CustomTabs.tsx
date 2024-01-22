import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { StyleSheet, TouchableOpacity, View, ViewStyle } from "react-native";

import Txt from "../Txt";
import { moderateScale, verticalScale } from "../../utilities/metrics";
import { ColorPalette } from "../../styles/colorPalette";
import { StyleProp } from "react-native";

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
                  size: 25,
                  color: isFocused
                    ? ColorPalette.primary
                    : ColorPalette.tertiary,
                })}
              {options.tabBarBadge && (
                <View
                  style={{
                    backgroundColor: "red",
                    paddingHorizontal: 5,
                    borderRadius: moderateScale(50),
                    position: "absolute",
                    left: 55,
                    bottom: 30,
                  }}>
                  <Txt style={{ color: "white", fontSize: moderateScale(12) }}>
                    {options.tabBarBadge}
                  </Txt>
                </View>
              )}
              <Txt
                style={{
                  fontSize: moderateScale(12),
                  color: isFocused
                    ? ColorPalette.primary
                    : ColorPalette.tertiary,
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
    paddingVertical: verticalScale(20),
    borderTopWidth: verticalScale(1),
    borderRightWidth: verticalScale(1),
    borderLeftWidth: verticalScale(1),
    borderColor: ColorPalette.tertiary,
    borderTopStartRadius: moderateScale(20),
    borderTopEndRadius: moderateScale(20),
  },
  bottomTabItemContainer: {
    alignItems: "center",
  },
});

export default BottomTab;
