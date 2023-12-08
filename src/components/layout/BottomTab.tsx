import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { StyleSheet, TouchableOpacity, View } from "react-native";

import Txt from "../Txt";
import { moderateScale, verticalScale } from "../../utilities/metrics";

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
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{ flex: 1 }}>
            <View style={styles.bottomTabItemContainer}>
              {options.tabBarIcon &&
                options.tabBarIcon({
                  focused: isFocused,
                  color: isFocused ? "#3b82f6" : "#9ca3af",
                  size: 25,
                })}
              <Txt
                style={{
                  fontSize: moderateScale(12),
                  color: isFocused ? "#3b82f6" : "#9ca3af",
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
    borderColor: "#9ca3af",
    borderTopStartRadius: moderateScale(20),
    borderTopEndRadius: moderateScale(20),
  },
  bottomTabItemContainer: {
    alignItems: "center",
  },
});

export default BottomTab;
