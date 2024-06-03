import { memo, useEffect, useState } from "react";
import { GestureResponderEvent, Modal, StyleSheet, View } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";

import Header from "./Header";
import Txt from "./Txt";
import Btn from "../controls/Btn";
import { horizontalScale, verticalScale } from "../../utilities/metrics";

export type PopupProps = {
  title?: string;
  description?: string;
  iconProps?: { icon: IconDefinition; color: string };
  buttonOptions?: {
    label: string;
    onPress?: (event: GestureResponderEvent) => void;
  };
};

const Popup = (props: PopupProps) => {
  const [visible, setVisible] = useState(false);
  const isAnyPropAvailable =
    props.title || props.description || props.buttonOptions || props.iconProps;

  useEffect(() => {
    setVisible(true);
  }, [props]);

  if (!isAnyPropAvailable) return <></>;

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={() => {
        setVisible(visible => !visible);
      }}>
      <View style={styles.modalContainer}>
        <View style={styles.modalView}>
          {props.iconProps && (
            <FontAwesomeIcon
              style={styles.icon}
              icon={props.iconProps.icon}
              color={props.iconProps.color}
              size={80}
            />
          )}
          {props.title && <Header title={props.title} />}
          {props.description && (
            <Txt style={styles.modalText}>{props.description}</Txt>
          )}
          {props.buttonOptions && (
            <Btn
              style={styles.button}
              label={props.buttonOptions.label}
              onPress={event => {
                if (props.buttonOptions?.onPress)
                  props.buttonOptions.onPress(event);

                setVisible(visible => !visible);
              }}
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
    paddingVertical: verticalScale(15),
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
  icon: {
    marginBottom: verticalScale(5),
  },
  modalText: {
    marginBottom: 15,
  },
  button: {
    width: "auto",
    paddingHorizontal: horizontalScale(50),
  },
});

export default memo(Popup);
