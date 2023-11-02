import React, { useEffect, useState } from "react";
import { Dimensions, FlatList, View } from "react-native";

import { Services } from "../api/mockData";
import ServiceCard from "../components/ServiceCard";

const initialDimension = Dimensions.get("screen");

const ServiceList = (): JSX.Element => {
  const [screenDimensions, setDimension] = useState(initialDimension);
  const hasRotated = screenDimensions.width > screenDimensions.height;

  useEffect(() => {
    const suscription = Dimensions.addEventListener("change", ({ screen }) => {
      setDimension(screen);
    });

    return () => suscription?.remove();
  });

  return (
    <View>
      <FlatList
        horizontal={hasRotated}
        contentContainerStyle={{
          display: "flex",
          flexDirection: hasRotated ? "row" : "column",
        }}
        data={Services}
        renderItem={({ item }) => (
          <ServiceCard
            id={item.serviceId.toString()}
            name={item.serviceName}
            description={item.serviceDescription}
            registrationDate={item.serviceRegistrationDate}
            image={item.serviceImage}
          />
        )}
        keyExtractor={item => item.serviceId.toString()}
      />
    </View>
  );
};

export default ServiceList;
