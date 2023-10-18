import React from "react";
import { FlatList, ScrollView, StyleSheet } from "react-native";

import { Services } from "../api/mockData";
import ServiceCard from "./ServiceCard";
import { horizontalScale, verticalScale } from "../utilities/metrics";

const ServiceList = (): JSX.Element => {
  return (
      <FlatList
        style={styles.serviceCardListContainer}
        data={Services}
        renderItem={({ item }) => (
          <ServiceCard
            name={item.serviceName}
            description={item.serviceDescription}
            registrationDate={item.serviceRegistrationDate}
            image={item.serviceImage}
          />
        )}
        keyExtractor={item => item.serviceId.toString()}
      />
  );
};

const styles = StyleSheet.create({
  serviceCardListContainer: {
    marginVertical: verticalScale(10),
    marginHorizontal: horizontalScale(10)
  }
})

export default ServiceList;
