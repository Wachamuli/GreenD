import React, { useEffect, useState } from "react";
import { Dimensions, FlatList, View } from "react-native";

import { Services } from "../api/mockData";
import ServiceCard from "./serviceCard";

const initialDimension = Dimensions.get("screen");

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
