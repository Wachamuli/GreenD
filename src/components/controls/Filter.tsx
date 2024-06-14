import { useState } from "react";
import {
  FlatList,
  GestureResponderEvent,
  StyleSheet,
  View,
} from "react-native";

import Txt from "../info/Txt";
import Tappable from "./Tappable";
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from "../../utilities/metrics";
import { ColorPalette } from "../../styles/colorPalette";

type Props = {
  data: ArrayLike<any> | null | undefined;
  onPress?: (id: string | number, event: GestureResponderEvent) => void;
  style?: {
    backgroundColor?: string;
    color?: string;
    borderColor?: string;
    selectedBackgroundColor?: string;
    selectedColor?: string;
    selectedBorderColor?: string;
  };
};

const Filter = (props: Props) => {
  const [selected, setSelected] = useState<string | number>(0);

  const FilterTag = ({ name, id }: { name: string; id: string | number }) => {
    return (
      <View
        style={[
          styles.tagContainer,
          {
            backgroundColor:
              selected == id
                ? props.style?.selectedBackgroundColor
                : props.style?.backgroundColor,
          },
        ]}>
        <Tappable
          onPress={e => {
            setSelected(id.toString());
            props.onPress && props.onPress(id, e);
          }}>
          <Txt
            style={{
              color:
                selected == id
                  ? props.style?.selectedColor
                  : props.style?.color,
              borderColor:
                selected == id
                  ? props.style?.selectedBorderColor
                  : props.style?.borderColor,
            }}>
            {name}
          </Txt>
        </Tappable>
      </View>
    );
  };

  return (
    <FlatList
      contentContainerStyle={{
        backgroundColor: "white",
        paddingTop: verticalScale(10),
      }}
      horizontal
      data={props.data}
      renderItem={({ item, index }) => {
        if (index === 0) {
          return (
            <>
              <FilterTag name="Todos" id={0} />
              <FilterTag {...item} />
            </>
          );
        }

        return <FilterTag {...item} />;
      }}
    />
  );
};

const styles = StyleSheet.create({
  tagContainer: {
    alignSelf: "flex-start",
    width: "auto",

    marginBottom: verticalScale(4),
    marginRight: verticalScale(4),
    paddingHorizontal: horizontalScale(10),
    paddingVertical: horizontalScale(5),

    borderWidth: moderateScale(0.5),
    borderColor: ColorPalette.tertiary,
    borderRadius: moderateScale(20),
    overflow: "hidden",
  },
  icon: {
    marginRight: horizontalScale(2),
  },
});

export default Filter;
