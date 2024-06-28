import { Image, Linking, StyleSheet, View } from "react-native";
import dayjs from "dayjs";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import Txt from "../info/Txt";
import Tappable from "../controls/Tappable";
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from "../../utilities/metrics";
import { capitalize, timeFormatter } from "../../utilities/utils";
import { router } from "expo-router";
import StatusLabel from "../info/StatusLabel";
import CircleButton from "../controls/CircleButton";
import { ColorPalette } from "../../styles/colorPalette";

export const ServiceRequestCard = (item: any) => {
  return (
    <Tappable
      onPress={() => {
        router.navigate({
          pathname: "/requests/details",
          params: { serviceRequestId: item.id },
        });
      }}>
      <View style={styles.container}>
        <Image source={{ uri: item?.outsourcer.logo }} style={styles.logo} />

        <View style={{ width: "67%" }}>
          <View style={styles.upperContainer}>
            <Txt numberOfLines={1} style={styles.serviceName}>
              {item.service.name}
            </Txt>
          </View>

          <Txt style={styles.outsourcerName}>{item.outsourcer.name}</Txt>

          <StatusLabel status={item.status} />

          <View style={styles.scheduleContainer}>
            <View>
              <Txt style={{ fontSize: moderateScale(12) }}>
                {capitalize(dayjs(item.r_date).format("dddd, MMMM D"))}{" "}
              </Txt>
              <Txt style={{ fontSize: moderateScale(12) }}>
                {timeFormatter(item.r_time)}
              </Txt>
            </View>

            <CircleButton
              icon={faPhone}
              onPress={() => {
                Linking.openURL(`tel:${8090001111}`);
              }}
            />
          </View>
        </View>
      </View>
    </Tappable>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    height: verticalScale(190),
    marginVertical: verticalScale(5),
    borderWidth: moderateScale(0.5),
    borderColor: ColorPalette.tertiary,
    borderRadius: moderateScale(10),
    padding: moderateScale(20),

    justifyContent: "center",
    alignItems: "center",
  },
  upperContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  logo: {
    width: "30%",
    height: "100%",
    borderRadius: moderateScale(10),
    marginRight: horizontalScale(10),
  },
  serviceName: {
    fontSize: moderateScale(14),
  },
  outsourcerName: {
    fontFamily: "ffBold",
    marginTop: verticalScale(10),
  },
  phoneIconContainer: {
    alignSelf: "flex-end",
    color: ColorPalette.primary,
    alignItems: "center",
    justifyContent: "center",
    height: verticalScale(40),
    width: verticalScale(40),
    borderWidth: moderateScale(0.5),
    borderRadius: moderateScale(40) / 2,
    borderColor: ColorPalette.tertiary,
  },
  scheduleContainer: {
    flexDirection: "row",
    marginVertical: verticalScale(10),
    justifyContent: "space-between",
  },
});

export default ServiceRequestCard;
