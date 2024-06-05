import { memo, useEffect, useState } from "react";
import {
  GestureResponderEvent,
  Modal,
  StyleSheet,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";

import Header from "./Header";
import Txt from "./Txt";
import Btn from "../controls/Btn";
import { horizontalScale, moderateScale, verticalScale } from "../../utilities/metrics";
import { StyleProp } from "react-native";

export type PopupProps = {
  title?: string;
  description?: string;
  iconProps?: { icon: IconDefinition; color: string };
  buttonOptions?: {
    label: string;
    onPress?: (event: GestureResponderEvent) => void;
    style?: StyleProp<TextStyle>;
    containerStyle?: StyleProp<ViewStyle>;
  }[];
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
          {props.title && <Header style={styles.header} title={props.title} />}
          {props.description && (
            <Txt style={styles.modalText}>{props.description}</Txt>
          )}
          <View style={styles.buttonsContainer}>
            {props.buttonOptions?.map((button, index) => (
              <Btn
                key={index}
                style={[styles.button, button.style]}
                containerStyle={button.containerStyle}
                label={button.label}
                onPress={event => {
                  if (button.onPress) button.onPress(event);

                  setVisible(visible => !visible);
                }}
              />
            ))}
          </View>
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
    width: "90%",
    marginHorizontal: horizontalScale(20),
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
  header: {
    textAlign: "center",
    fontSize: moderateScale(20)
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: moderateScale(14)
  },
  buttonsContainer: {
    flexDirection: "row",
    width: "100%",
    columnGap: moderateScale(30),
  },
  button: {
    width: "auto",
    paddingHorizontal: horizontalScale(50),
  },
});

export default memo(Popup);
