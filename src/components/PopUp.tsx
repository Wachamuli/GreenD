import { Modal, StyleSheet, View } from "react-native";
import { Dispatch, SetStateAction } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";

import Header from "./Header";
import Txt from "./Txt";
import Btn from "./controls/Btn";
import { horizontalScale, verticalScale } from "../utilities/metrics";

type Props = {
  title?: string;
  description?: string;
  buttonLabel?: string;
  icon?: IconDefinition;
  setVisible: Dispatch<SetStateAction<boolean>>;
  visible: boolean;
};

const Popup = (props: Props) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={props.visible}
      onRequestClose={() => {
        props.setVisible(visible => !visible);
      }}>
      <View style={styles.modalContainer}>
        <View style={styles.modalView}>
          {props.icon && (
            <FontAwesomeIcon icon={props.icon} color="#FF7D7D" size={80} />
          )}
          {props.title && <Header title={props.title} />}
          {props.description && (
            <Txt style={styles.modalText}>{props.description}</Txt>
          )}
          {props.buttonLabel && (
            <Btn
              style={styles.button}
              label={props.buttonLabel}
              onPress={() => props.setVisible(visible => !visible)}
            />
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 20,
    paddingHorizontal: horizontalScale(25),
    paddingVertical: verticalScale(35),
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  modalText: {
    marginBottom: 15,
  },
  button: {
    width: "auto",
    paddingHorizontal: horizontalScale(20),
  },
});

export default Popup;
