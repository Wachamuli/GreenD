import { FlatList, StyleSheet, View } from "react-native";
import Txt from "../../../components/info/Txt";
import { horizontalScale, verticalScale } from "../../../utilities/metrics";
import HomeOutsourcerCard from "../../../components/HomeOutsourcerCard";
import { type Bookings as BookingType } from "../../../lib/supabase.type.alias";
import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabase";

const Bookings = () => {
  const [bookmarks, setBookmarks] = useState<BookingType[]>();

  const getBookmarkedOutsourcers = async () => {
    const {
      data: { user },
      error: userError
    } = await supabase.auth.getUser();

    if (userError) {
      console.log(userError);
      return;
    }

    const { data, error } = await supabase
      .from("bookings")
      .select("outsourcer_id (*)")
      .eq("user_id", user?.id);

    if (error) {
      console.log(error);
      return;
    }

    console.log(data)

    setBookmarks(data);
  };

  useEffect(() => {
    getBookmarkedOutsourcers();
  }, []);

  return (
    <FlatList
      style={styles.listContainer}
      data={bookmarks}
      keyExtractor={item => item.outsourcer_id.id.toString()}
      renderItem={({ item }) => <HomeOutsourcerCard {...item.outsourcer_id} />}
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    paddingHorizontal: horizontalScale(20),
    paddingTop: verticalScale(10),
    backgroundColor: "white",
  },
});

export default Bookings;
