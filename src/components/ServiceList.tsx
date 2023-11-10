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
        data={Services}
        horizontal={hasRotated}
        keyExtractor={item => item.serviceId.toString()}
        contentContainerStyle={{
          display: "flex",
          flexDirection: hasRotated ? "row" : "column",
        }}
        renderItem={({ item }) => (
          <ServiceCard
            id={item.serviceId.toString()}
            name={item.serviceName}
            description={item.serviceDescription}
            registrationDate={item.serviceRegistrationDate}
            image={item.serviceImage}
          />
        )}
      />
    </View>
  );
};

export default ServiceList;
