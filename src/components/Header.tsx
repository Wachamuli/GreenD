import Txt from "./Txt";
import { moderateScale, verticalScale } from "../utilities/metrics";
import { StyleProp, TextStyle } from "react-native";

const Header = ({
  title,
  style,
}: {
  title: string | undefined;
  style?: StyleProp<TextStyle>;
}): JSX.Element => {
  return (
    <Txt
      style={[
        {
          marginBottom: verticalScale(10),
          color: "black",
          fontFamily: "ffBold",
          fontSize: moderateScale(22),
        },
        style,
      ]}>
      {title}
    </Txt>
  );
};

export default Header;
