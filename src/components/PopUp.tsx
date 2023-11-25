import { StyleSheet, View } from "react-native";
import Header from "./Header";
import Txt from "./Txt";
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from "../utilities/metrics";
import Btn from "./controls/Btn";
import { Dispatch, SetStateAction } from "react";

type Props = {
  title: string;
  description: string;
  bottonLabel: string;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

const PopUp = (props: Props): JSX.Element => {
  return (
    <View style={styles.containerPopUp}>
      <Header title={props.title} />
      <Txt style={styles.description}>{props.description}</Txt>
      <Btn
        onPress={() => props.setOpen(false)}
        style={styles.button}
        label={props.bottonLabel}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  containerPopUp: {
    position: "absolute",
    backgroundColor: "white",
    width: horizontalScale(250),
    borderWidth: moderateScale(2),
    borderRadius: moderateScale(10),
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: verticalScale(20),
    paddingHorizontal: horizontalScale(20),
  },
  description: {
    textAlign: "center",
    marginTop: verticalScale(10),
    marginBottom: verticalScale(30),
  },
  button: {
    fontSize: moderateScale(14),
    minWidth: horizontalScale(150),
    paddingVertical: verticalScale(15),
  },
});

export default PopUp;
