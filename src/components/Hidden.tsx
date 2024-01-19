import { useState, PropsWithChildren } from "react";
import { View } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faChevronCircleDown } from "@fortawesome/free-solid-svg-icons";

import Tappable from "./controls/Tappable";

const Hidden = ({ children }: PropsWithChildren): JSX.Element => {
  const [open, setOpen] = useState(false);
  return (
    <View style={{ maxHeight: open ? 90 : 0 }}>
      <Tappable onPress={() => setOpen(open => !open)}>
        <FontAwesomeIcon icon={faChevronCircleDown} size={40} />
      </Tappable>
      {children}
    </View>
  );
};

export default Hidden;
