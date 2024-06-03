import { View } from "react-native";

import dayjs from "dayjs";

import Txt from "../info/Txt";
import { capitalize } from "../../utilities/utils";
import { ColorPalette } from "../../styles/colorPalette";
import { horizontalScale, moderateScale } from "../../utilities/metrics";

type Props = {
  date: Date;
  time: string;
};

const DateTimeDisplayer = (props: Props) => {
  return (
    <View
      style={{
        borderBottomWidth: moderateScale(0.5),
        borderColor: ColorPalette.tertiary,
        padding: moderateScale(8),
      }}>
      <Txt
        style={{
          // fontFamily: "ffBold",
          fontSize: moderateScale(14),
          width: horizontalScale(100),
        }}>
        {capitalize(dayjs(props.date).format("dddd, MMMM D").replace(" ", "\n"))}{" "}
      </Txt>
    </View>
  );
};

export default DateTimeDisplayer;
