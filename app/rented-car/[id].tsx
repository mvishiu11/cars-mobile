import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { FontAwesome5 } from "@expo/vector-icons";
import QRCode from "react-native-qrcode-svg";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

import { useRentalById } from "@/hooks/useCars";
const carFallbackImage = require("../../assets/images/car-fallback.png");

export default function RentedCar() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const {
    data: rental,
    isLoading,
    isError,
    error,
  } = useRentalById(id as string);

  if (isLoading) {
    return (
      <SafeAreaView style={styles.centered}>
        <ActivityIndicator size="large" color="#00246B" />
        <Text style={{ marginTop: 10 }}>Loading rental details...</Text>
      </SafeAreaView>
    );
  }

  if (isError || !rental) {
    return (
      <SafeAreaView style={styles.centered}>
        <Text style={styles.errorText}>
          {isError ? String(error) : "Rental not found!"}
        </Text>
      </SafeAreaView>
    );
  }

  const { car } = rental;

  const handleCancel = () => {
    Alert.alert(
      "Are you sure?",
      `Do you want to cancel the rental of ${car.model.brandName} ${car.model.name}?`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Confirm",
          style: "destructive",
          onPress: async () => {
            Toast.show({
              type: "success",
              text1: "Rental Canceled",
              text2: `${car.model.brandName} ${car.model.name} has been removed from your rented cars. 🚗`,
            });
            router.push("/dashboard");
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView edges={["bottom"]} style={{ flex: 1, paddingHorizontal: 16 }}>
      {/* Car Image */}
      <Image
        source={car.imageUrl ? { uri: car.imageUrl } : carFallbackImage}
        style={styles.carImage}
        resizeMode="contain"
      />

      {/* Car Name and Price */}
      <Text style={styles.carName}>
        {car.model.brandName} {car.model.name}
      </Text>

      {/* Car Info */}
      <View style={styles.carInfo}>
        <View style={{ flexGrow: 1 }}>
          <Text style={styles.address}>
            <FontAwesome5 name="map-marker-alt" size={14} color="#00246B" /> {car.location.fullAddress}
          </Text>
          <Text>
            <FontAwesome5 name="users" size={14} color="#00246B" /> {car.model.seatCount} Seats
          </Text>
          <Text>
            <FontAwesome5 name="door-open" size={14} color="#00246B" /> {car.model.doorCount} Doors
          </Text>
        </View>
      </View>

      {/* Rental Period */}
      <Text style={styles.sectionHeader}>Rental Period</Text>
      <Text>
        From: {new Intl.DateTimeFormat("pl-PL", { dateStyle: "short", timeStyle: "short", timeZone: "Europe/Warsaw" }).format(new Date(rental.startAt))}
      </Text>
      <Text>
        To: {new Intl.DateTimeFormat("pl-PL", { dateStyle: "short", timeStyle: "short", timeZone: "Europe/Warsaw" }).format(new Date(rental.endAt))}
      </Text>

      {/* QR Code */}
      <View style={{ marginVertical: 24, alignItems: "center" }}>
        <QRCode value={`Rental ID: ${rental.id}`} size={150} />
      </View>

      {/* Buttons */}
      <View style={styles.buttonRow}>
        <Pressable style={styles.backButton} onPress={() => router.push("/dashboard")}>
          <Text style={styles.backButtonText}>Back to Your Cars</Text>
        </Pressable>
        <Pressable style={styles.cancelButton} onPress={handleCancel}>
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </Pressable>
      </View>
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
    textAlign: "center",
    marginBottom: 8,
  },
  carInfo: {
    flexDirection: "row",
    marginBottom: 16,
  },
  address: {
    flexShrink: 1,
    flexWrap: "wrap",
    marginBottom: 4,
  },
  sectionHeader: {
    fontWeight: "bold",
    marginBottom: 8,
    fontSize: 16,
  },
  buttonRow: {
    flexDirection: "row",
    gap: 16,
    width: "100%",
    justifyContent: "space-evenly",
  },
  backButton: {
    flex: 1,
    backgroundColor: "#00246B",
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 16,
  },
  backButtonText: {
    color: "#ffffff",
    fontWeight: "bold",
    textAlign: "center",
  },
  cancelButton: {
    flex: 1,
    backgroundColor: "#EB044E",
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 16,
  },
  cancelButtonText: {
    color: "#ffffff",
    fontWeight: "bold",
    textAlign: "center",
  },
  errorText: {
    color: "red",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 18,
    margin: 16,
  },
});
