import { FlatList, View } from "react-native";

import { Services } from "../api/mockData";
import ServiceCard from "./serviceCard";

const ServiceList = (): JSX.Element => {
  return (
    <View>
      <FlatList
        data={Services}
        keyExtractor={item => item.serviceId.toString()}
        renderItem={({ item }) => (
          <ServiceCard
            serviceId={item.serviceId.toString()}
          />
        )}
      />
    </View>
  );
};

export default ServiceList;
