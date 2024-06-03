import { GestureResponderEvent, StyleSheet, View } from "react-native";
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from "../utilities/metrics";
import Txt from "./info/Txt";
import Tappable from "./controls/Tappable";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faX, faXmark, faXmarkCircle } from "@fortawesome/free-solid-svg-icons";

const Tag = ({
  name,
  color,
  selected,
  onPress,
}: {
  name: string;
  color: string;
  selected?: boolean;
  onPress?: (event: GestureResponderEvent) => void;
}): JSX.Element => {
  return (
    <View style={[styles.tagContainer, { backgroundColor: "#f8fafc", borderColor: "#6b7280" }]}>
      <Tappable containerStyle={styles.tappableContainer} onPress={onPress}>
        {selected && (
          <FontAwesomeIcon style={styles.icon} icon={faXmark} color={"#6b7280"} />
        )}
        <Txt style={[styles.tag, { color: "#6b7280" }]}>{name}</Txt>
      </Tappable>
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    textAlignVertical: "top",
    width: "100%",
    height: verticalScale(150),
  },
  tagContainer: {
    alignSelf: "flex-start",
    width: "auto",
    marginBottom: verticalScale(4),
    marginRight: verticalScale(4),
    paddingHorizontal: horizontalScale(10),
    paddingVertical: horizontalScale(5),

    borderWidth: moderateScale(2),
    borderRadius: moderateScale(20),
  },
  tappableContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginRight: horizontalScale(2),
  },
  tag: {
    color: "white",
    fontFamily: "ffBold",
  },
});

export default Tag;
