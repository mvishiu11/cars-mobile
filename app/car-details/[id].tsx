import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import Checkbox from "expo-checkbox";
import Toast from "react-native-toast-message";
import { FontAwesome5 } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

import DateTimeSelector, {
  getNextAvailableDate,
} from "@/components/DateTimeSelector";
// Hook fetching the car from the API
import { useCarById, useRent } from "@/hooks/useCars";

// A fallback image if none is provided
const carFallbackImage = require("../../assets/images/car-fallback.png");

export default function CarDetails() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const rentMutation = useRent();

  // 1) Fetch the Car from your API
  const { data: car, isLoading, isError, error } = useCarById(id as string);

  // 2) Local UI states
  const [termsAccepted, setTermsAccepted] = useState(false);
  const nextAvailableDate = getNextAvailableDate();
  const [pickupDate, setPickupDate] = useState(nextAvailableDate);
  const [isPickupDateModalOpen, setPickupDateModalOpen] = useState(false);
  const [isPickupTimeModalOpen, setPickupTimeModalOpen] = useState(false);
  const [returnDate, setReturnDate] = useState(nextAvailableDate);
  const [isReturnDateModalOpen, setReturnDateModalOpen] = useState(false);
  const [isReturnTimeModalOpen, setReturnTimeModalOpen] = useState(false);

  // 3) Show loading or error states
  if (isLoading) {
    return (
      <SafeAreaView style={styles.centered}>
        <ActivityIndicator size="large" color="#00246B" />
        <Text style={{ marginTop: 10 }}>Loading car details...</Text>
      </SafeAreaView>
    );
  }
  if (isError || !car) {
    return (
      <SafeAreaView style={styles.centered}>
        <Text style={styles.errorText}>
          {isError ? String(error) : "Car not found!"}
        </Text>
      </SafeAreaView>
    );
  }

  // 4) A small sub-component or inline rendering for the Car’s info
  function CarInfo() {
    return (
      <View style={styles.carInfo}>
        <View style={{ flexGrow: 1 }}>
          {/* Format a long address with multi-line wrap */}
          <Text style={styles.address}>
            <FontAwesome5 name="map-marker-alt" size={14} color="#00246B" />{" "}
            {car?.location?.longitude}, {car?.location?.latitude}
          </Text>

          <Text>
            <FontAwesome5 name="users" size={14} color="#00246B" />{" "}
            {car?.model.seatCount} Seats
          </Text>
          <Text>
            <FontAwesome5 name="gas-pump" size={14} color="#00246B" />{" "}
            {car?.model.fuelType}
          </Text>
        </View>
        <View style={{ flexGrow: 1 }}>
          <Text>
            <FontAwesome5 name="calendar" size={14} color="#00246B" />{" "}
            {car?.model.productionYear}
          </Text>
          <Text>
            <FontAwesome5 name="door-open" size={14} color="#00246B" />{" "}
            {car?.model.doorCount} Doors
          </Text>
          <Text>
            <FontAwesome5 name="box" size={14} color="#00246B" />{" "}
            {car?.model.fuelCapacity} L capacity
          </Text>
        </View>
      </View>
    );
  }

  // 5) Handle "Rent" button
  const handleRent = async () => {
    if (!pickupDate || !returnDate) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Please fill in both pickup and return dates.",
      });
      return;
    }
    if (!termsAccepted) {
      Toast.show({
        type: "error",
        text1: "Terms Not Accepted",
        text2: "You must accept the terms and conditions.",
      });
      return;
    }

    await rentMutation.mutateAsync({
      carId: car.id,
      pickupDate: pickupDate.toISOString(),
      returnDate: returnDate.toISOString(),
    });

    Toast.show({
      type: "success",
      text1: "Car Rented!",
      text2: `${car.model.brandName} ${car.model.name} successfully rented. 🚗`,
    });
    router.push({
      pathname: "/rent-success",
      params: {
        carId: car.id,
        pickupDate: pickupDate.toISOString(),
        returnDate: returnDate.toISOString(),
      },
    });    
  };

  return (
    <SafeAreaView edges={["bottom"]} style={{ flex: 1, paddingHorizontal: 16 }}>
      <Image
        source={car.imageUrl ? { uri: car.imageUrl } : carFallbackImage}
        style={styles.carImage}
        resizeMode="contain"
      />

      <Text style={styles.carName}>
        {car.model.brandName} {car.model.name}
      </Text>
      <Text style={styles.carPrice}>{car.model.dailyRate} zł / day</Text>

      <CarInfo />

      {/* Renting Form */}
      <Text style={styles.sectionHeader}>Start Renting</Text>
      <DateTimeSelector
        dateTime={pickupDate}
        setDateTime={(date: Date) => {
          setPickupDate(date);
          setReturnDate(date);
        }}
        isDateModalOpen={isPickupDateModalOpen}
        setDateModalOpen={setPickupDateModalOpen}
        isTimeModalOpen={isPickupTimeModalOpen}
        setTimeModalOpen={setPickupTimeModalOpen}
      />
      <Text style={styles.sectionHeader}>End Renting</Text>
      <DateTimeSelector
        dateTime={returnDate}
        setDateTime={setReturnDate}
        isDateModalOpen={isReturnDateModalOpen}
        setDateModalOpen={setReturnDateModalOpen}
        isTimeModalOpen={isReturnTimeModalOpen}
        setTimeModalOpen={setReturnTimeModalOpen}
      />

      {/* Terms and Conditions */}
      <View style={styles.checkboxContainer}>
        <Checkbox
          value={termsAccepted}
          onValueChange={() => setTermsAccepted(!termsAccepted)}
          style={{ borderColor: "#00246B" }}
          color={termsAccepted ? "#00246B" : undefined}
        />
        <Text
          onPress={() => setTermsAccepted(!termsAccepted)}
          style={styles.checkboxLabel}
        >
          Accept terms and conditions
        </Text>
      </View>

      {/* Rent Button */}
      <Pressable
        style={[styles.rentButton, !termsAccepted && { backgroundColor: "#999" }]}
        disabled={!termsAccepted}
        onPress={handleRent}
      >
        <Text style={styles.rentButtonText}>Rent</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  carImage: {
    width: "100%",
    height: 200,
    marginBottom: 16,
    borderRadius: 8,
  },
  carName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#00246B",
    marginBottom: 8,
    textAlign: "center",
  },
  carPrice: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#00246B",
    marginBottom: 16,
    textAlign: "center",
  },
  carInfo: {
    flexDirection: "row",
    marginBottom: 16,
  },
  address: {
    // Ensure a multi-line wrap for long addresses
    flexShrink: 1,
    flexWrap: "wrap",
    marginBottom: 4,
  },
  sectionHeader: {
    fontWeight: "bold",
    marginBottom: 8,
    fontSize: 16,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  checkboxLabel: {
    fontSize: 14,
    marginLeft: 8,
    color: "#333",
  },
  rentButton: {
    backgroundColor: "#00246B",
    paddingVertical: 16,
    borderRadius: 8,
  },
  rentButtonText: {
    color: "#ffffff",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 16,
  },
  errorText: {
    color: "red",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 18,
    margin: 16,
  },
});
