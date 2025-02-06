import React from "react";
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
import { FontAwesome5 } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFlat } from "../../hooks/useFlats";
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
          <FontAwesome5 name="bed" size={14} color="#00246B" /> {flat.roomNumber} room(s)
        </Text>
      </View>
      <View style={{ flexGrow: 1 }}>
        <Pressable
          onPress={() => openGoogleMaps(flat.location)}
          style={{ flexDirection: "row", alignItems: "center", gap: 4 }}
        >
          <FontAwesome5 name="map-marker-alt" size={14} color="#00246B" />
          <Text style={styles.googleMapsText}>Google Maps</Text>
          <FontAwesome5 name="external-link-alt" size={14} color="#044eeb" />
        </Pressable>
      </View>
    </View>
  );
}

export default function RentedFlat() {
  const { id } = useLocalSearchParams();
  const numericId = Number(id);
  const router = useRouter();

  const {
    data: flat,
    isLoading,
    isError,
    error,
  } = useFlat(numericId);

  const flatFallbackImage = require("../../assets/images/flat-fallback.png");

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
          {isError ? `Failed to fetch flat details: ${String(error)}` : "Flat not found!"}
        </Text>
      </SafeAreaView>
    );
  }

  const handleCancel = () => {
    Toast.show({
      type: "info",
      text1: "Rental Canceled",
      text2: `${flat.name} has been removed from your rented flats.`,
    });
    router.push("/dashboard");
  };

  return (
    <SafeAreaView style={{ paddingHorizontal: 32, flex: 1 }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 32 }}>
        <Image
          source={flat.images && flat.images.length > 0 ? { uri: flat.images[0] } : flatFallbackImage}
          style={styles.flatImage}
          resizeMode="cover"
        />
        <Text style={styles.flatName}>{flat.name}</Text>
        <Text style={styles.flatPrice}>{flat.price} zł / day</Text>
        <FlatInfo flat={flat} />

        <Pressable style={styles.cancelButton} onPress={handleCancel}>
          <Text style={styles.cancelButtonText}>Cancel</Text>
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
  rentalDates: {
    marginBottom: 16,
    fontSize: 14,
    color: "#333",
    textAlign: "center",
  },
  cancelButton: {
    backgroundColor: "#EB044E",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    width: "100%",
  },
  cancelButtonText: {
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