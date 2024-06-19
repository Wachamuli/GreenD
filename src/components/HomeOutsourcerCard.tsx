import { useEffect, useState } from "react";
import { Image, StyleSheet, View } from "react-native";
import Tappable from "./controls/Tappable";

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faBookmark as faBookmarkRegular } from "@fortawesome/free-regular-svg-icons";

import Txt from "./info/Txt";
import { ColorPalette } from "../styles/colorPalette";
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from "../utilities/metrics";
import { supabase } from "../lib/supabase";
import { faBookmark as faBookmarkSolid } from "@fortawesome/free-solid-svg-icons";

const HomeOutsourcerCard = (item: any) => {
  const [isBookmarked, setIsBookmarked] = useState(false);

  const getBookmark = async (): Promise<string | null> => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { data, error } = await supabase
      .from("bookings")
      .select("*")
      .eq("user_id", user?.id as string)
      .eq("outsourcer_id", item.id);

    if (error) {
      console.log(error.message);
      return null;
    }

    data.length > 0 ? setIsBookmarked(true) : setIsBookmarked(false);

    return data[0].booking_id?.toString();
  };

  // FIXME: It's able to perform multiple bookmarks to the same
  // user and outsourcer. It should to be constraint to only one.
  const bookmark = async (outsourcerId: string, userId: string) => {
    const { data, error } = await supabase.from("bookings").insert({
      outsourcer_id: outsourcerId,
      user_id: userId,
    });

    // console.log(data);

    if (error) {
      console.log(error.message);
      return;
    }

    getBookmark();
  };

  const unbookmark = async (outsourcerId: string, userId: string) => {
    const bookmarkId = await getBookmark();
    const { data, error } = await supabase
      .from("bookings")
      .delete()
      .eq("booking_id", Number(bookmarkId));

    if (error) {
      console.log(error.message);
      return;
    }

    getBookmark();
  };

  const toggleBookmark = async (outsourcerId: string) => {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error || !user) {
      return;
    }

    isBookmarked
      ? unbookmark(outsourcerId, user.id)
      : bookmark(outsourcerId, user.id);
  };

  useEffect(() => {
    getBookmark();
  }, []);

  return (
    <Tappable>
      <View style={styles.container}>
        <Image source={{ uri: item.logo }} style={styles.logo} />

        <View style={{ width: "67%" }}>
          <View style={styles.upperContainer}>
            <Txt style={styles.serviceName}>{item.service.name}</Txt>

            <Tappable
              onPress={() => toggleBookmark(item.id)}
              hitSlop={moderateScale(20)}>
              <FontAwesomeIcon
                icon={isBookmarked ? faBookmarkSolid : faBookmarkRegular}
                size={moderateScale(20)}
              />
            </Tappable>
          </View>

          <Txt style={styles.outsourcerName}>{item.name}</Txt>
          <Txt style={styles.price}>$250</Txt>
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
    height: verticalScale(150),
    marginVertical: verticalScale(5),
    borderWidth: moderateScale(0.5),
    borderColor: ColorPalette.tertiary,
    borderRadius: moderateScale(10),
    padding: moderateScale(20),
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
  price: {
    fontFamily: "ffBold",
    color: ColorPalette.lighterSecondary,
  },
});

export default HomeOutsourcerCard;
