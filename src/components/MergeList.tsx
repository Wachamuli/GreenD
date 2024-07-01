import { FlatList, View, FlatListProps } from "react-native";

type Props = Omit<FlatListProps<{}>, "data" | "renderItem">;

const MergeList = (props: Props) => {
  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      data={[]}
      renderItem={() => <></>}
      ListFooterComponent={() => <View>{props.children}</View>}
      {...props}
    />
  );
};

export default MergeList;
