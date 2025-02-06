import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Linking,
  ActivityIndicator,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import Toast from "react-native-toast-message";
import DateTimeSelector, {
  getNextAvailableDate,
} from "@/components/DateTimeSelector";
import Checkbox from "expo-checkbox";
import { FontAwesome5 } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFlat, useRentFlat } from "../../hooks/useFlats";
import { useAuthContext } from "@/context/AuthContext";

function openGoogleMaps(location: string) {
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${location}`;
  Linking.openURL(googleMapsUrl).catch((err) => {
    console.error("Failed to open Google Maps:", err);
  });
}

function FlatInfo({ flat }: { flat: any }) {
  return (
    <View style={styles.flatInfo}>
      <View style={{ flexGrow: 1 }}>
        <Text>
          <FontAwesome5 name="bed" size={14} color="#00246B" /> {flat.roomNumber}{" "}
          room(s)
        </Text>
      </View>
      <View style={{ flexGrow: 1 }}>
        <Pressable
          onPress={() => openGoogleMaps(flat.location)}
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 4,
          }}
        >
          <FontAwesome5 name="map-marker-alt" size={14} color="#00246B" />
          <Text style={styles.googleMapsText}>Google Maps</Text>
          <FontAwesome5 name="external-link-alt" size={14} color="#044eeb" />
        </Pressable>
      </View>
    </View>
  );
}

export default function FlatDetails() {
  const { id } = useLocalSearchParams();
  const numericId = Number(id);

  const router = useRouter();
  const nextAvailableDate = getNextAvailableDate();

  // Get the flat
  const {
    data: flat,
    isLoading,
    isError,
    error,
  } = useFlat(numericId);

  // Rent flat mutation
  const rentFlat = useRentFlat();

  // Get email from context
  const { email } = useAuthContext();

  // State for renting form
  const [startDate, setStartDate] = useState(nextAvailableDate);
  const [isStartDateModalOpen, setStartDateModalOpen] = useState(false);
  const [isStartTimeModalOpen, setStartTimeModalOpen] = useState(false);
  const [endDate, setEndDate] = useState(nextAvailableDate);
  const [isEndDateModalOpen, setEndDateModalOpen] = useState(false);
  const [isEndTimeModalOpen, setEndTimeModalOpen] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);

  // Provide a fallback image
  const flatFallbackImage = require("../../assets/images/flat-fallback.png");

  // Render loading & error states first
  if (isLoading) {
    return (
      <SafeAreaView style={styles.centeredView}>
        <ActivityIndicator size="large" color="#00246B" />
        <Text style={{ marginTop: 12, color: "#00246B" }}>Loading...</Text>
      </SafeAreaView>
    );
  }

  if (isError || !flat) {
    return (
      <SafeAreaView style={{ paddingHorizontal: 16, marginTop: 32 }}>
        <Text style={styles.errorText}>
          {isError
            ? `Failed to fetch flat details: ${String(error)}`
            : "Flat not found!"}
        </Text>
      </SafeAreaView>
    );
  }

  // Handler for renting the flat
  const handleRent = async () => {
    if (!startDate || !endDate || !email) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Please fill in both start and end dates.",
      });
      return;
    }

    if (!termsAccepted) {
      Toast.show({
        type: "error",
        text1: "Terms Not Accepted",
        text2: "You must accept terms & conditions to proceed.",
      });
      return;
    }

    try {
      // Call the rentFlat mutation
      await rentFlat.mutateAsync({
        flatId: flat.id,
        userEmail: email!,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
      });
      
      // Show success message
      Toast.show({
        type: "success",
        text1: "Flat Rented!",
        text2: `${flat.name} has been successfully rented via Flatly. 🏠`,
      });

      // Navigate to dashboard
      router.push("/dashboard");
    } catch (err: any) {
      Toast.show({
        type: "error",
        text1: "Rent Error",
        text2: err?.message ?? "Unknown error occurred.",
      });
    }
  };

  return (
    <SafeAreaView style={{ paddingHorizontal: 32, flex: 1 }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 32 }}>
        {/* Flat Image */}
        <Image
          source={
            flat.images && flat.images.length > 0
              ? { uri: flat.images[0] }
              : flatFallbackImage
          }
          style={styles.flatImage}
          resizeMode="cover"
        />
        {/* Flat Info */}
        <Text style={styles.flatName}>{flat.name}</Text>
        <Text style={styles.flatPrice}>{flat.price} zł / day</Text>
        <FlatInfo flat={flat} />

        {/* Renting Form */}
        <Text style={styles.sectionHeader}>Start Renting</Text>
        <DateTimeSelector
          dateTime={startDate}
          setDateTime={setStartDate}
          isDateModalOpen={isStartDateModalOpen}
          setDateModalOpen={setStartDateModalOpen}
          isTimeModalOpen={isStartTimeModalOpen}
          setTimeModalOpen={setStartTimeModalOpen}
        />
        <Text style={styles.sectionHeader}>End Renting</Text>
        <DateTimeSelector
          dateTime={endDate}
          setDateTime={setEndDate}
          isDateModalOpen={isEndDateModalOpen}
          setDateModalOpen={setEndDateModalOpen}
          isTimeModalOpen={isEndTimeModalOpen}
          setTimeModalOpen={setEndTimeModalOpen}
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
          style={[
            styles.rentButton,
            !termsAccepted && { backgroundColor: "#999" },
          ]}
          disabled={!termsAccepted}
          onPress={handleRent}
        >
          <Text style={styles.rentButtonText}>Rent via Flatly</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  flatImage: {
    width: "100%",
    height: 200,
    marginBottom: 16,
    borderRadius: 8,
  },
  flatName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#00246B",
    textAlign: "center",
    marginBottom: 16,
  },
  flatPrice: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#00246B",
    marginBottom: 16,
    textAlign: "center",
  },
  flatInfo: {
    flexDirection: "row",
    marginBottom: 16,
  },
  googleMapsText: {
    color: "#044eeb",
    fontWeight: "bold",
  },
  sectionHeader: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 8,
    textAlign: "center",
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
    alignItems: "center",
    width: "100%",
  },
  rentButtonText: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 16,
  },
  errorText: {
    color: "red",
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
  },
});
