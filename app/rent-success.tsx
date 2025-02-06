import React from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  Pressable,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { FontAwesome5 } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

// Hooks
import { useCarById } from "@/hooks/useCars";
import { useFlats } from "@/hooks/useFlats";
import { ScrollView } from "react-native-gesture-handler";

// A fallback image for cars
const carFallbackImage = require("../assets/images/car-fallback.png");
// A fallback image for flats
const flatFallbackImage = require("../assets/images/flat-fallback.png");

export default function RentSuccess() {
  const router = useRouter();

  // 1) Pull params from the route
  const { carId, pickupDate, returnDate } = useLocalSearchParams<{
    carId?: string;
    pickupDate?: string;
    returnDate?: string;
  }>();

  // 2) Fetch the Car from the API
  const {
    data: car,
    isLoading: carLoading,
    isError: carError,
    error: carErrorDetails,
  } = useCarById(carId as string);

  // 3) Fetch recommended Flats
  const {
    data: flats,
    isLoading: flatsLoading,
    isError: flatsError,
    error: flatsErrorDetails,
  } = useFlats(); // from your existing `useFlats()` hook

  // 4) Compute total price, days, etc.
  let startDate: Date | null = null;
  let endDate: Date | null = null;
  let totalDays = 0;
  let totalPrice = 0;

  if (pickupDate && returnDate) {
    startDate = new Date(pickupDate);
    endDate = new Date(returnDate);
    const msBetween = endDate.getTime() - startDate.getTime();
    totalDays = Math.ceil(msBetween / (1000 * 60 * 60 * 24));
  }

  // 5) If the car is loaded, compute total price
  if (car && totalDays > 0) {
    totalPrice = totalDays * car.model.dailyRate;
  }

  // 6) Loading states
  if (carLoading) {
    return (
      <SafeAreaView style={styles.centeredView}>
        <ActivityIndicator size="large" color="#00246B" />
        <Text style={{ marginTop: 12, color: "#00246B" }}>
          Finalizing your rental...
        </Text>
      </SafeAreaView>
    );
  }

  if (carError || !car) {
    return (
      <SafeAreaView style={styles.centeredView}>
        <Text style={styles.errorText}>
          {carError ? String(carErrorDetails) : "Car not found!"}
        </Text>
      </SafeAreaView>
    );
  }

  // 7) Render recommended flats horizontally
  const renderFlatItem = ({ item }: any) => {
    return (
      <Pressable
        style={styles.flatCard}
        onPress={() => router.push(`/flat-details/${item.id}`)}
      >
        <Image
          source={
            item.images && item.images.length > 0
              ? { uri: item.images[0] }
              : flatFallbackImage
          }
          style={styles.flatImage}
          resizeMode="cover"
        />
        <View style={styles.flatDetails}>
          <Text style={styles.flatName}>{item.name}</Text>
          <Text style={styles.flatInfo}>
            <FontAwesome5 name="map-marker-alt" size={12} color="#666" />{" "}
            {item.location}
          </Text>
          <Text style={styles.flatInfo}>{item.description}</Text>
        </View>
        <View style={styles.flatPrice}>
          <Text style={styles.flatPriceText}>{item.price} zł / day</Text>
        </View>
      </Pressable>
    );
  };

  return (
	<ScrollView>	
    <SafeAreaView edges={["right", "bottom", "left"]} style={{ paddingHorizontal: 16 }}>
      {/* Success Message */}
      <Text style={styles.successHeader}>Success!</Text>
      <Text style={styles.successMessage}>
        {car.model.brandName} {car.model.name} has been successfully rented to you.
      </Text>

      {/* Car Details */}
      <View style={styles.carCard}>
        <Image
          source={car.imageUrl ? { uri: car.imageUrl } : carFallbackImage}
          style={styles.carImage}
          resizeMode="contain"
        />
        <View style={{ flex: 1 }}>
          <Text style={styles.carName}>
            {car.model.brandName} {car.model.name}
          </Text>
          <Text style={styles.carDailyRate}>{car.model.dailyRate} zł / day</Text>
        </View>
      </View>

      {/* Rental Period */}
      <Text style={styles.sectionHeader}>Rental Period</Text>
      {startDate && (
        <Text style={styles.rentalDates}>
          From:{" "}
          {new Intl.DateTimeFormat("pl-PL", {
            dateStyle: "short",
            timeStyle: "short",
            timeZone: "Europe/Warsaw",
          }).format(startDate)}
        </Text>
      )}
      {endDate && (
        <Text style={styles.rentalDates}>
          To:{" "}
          {new Intl.DateTimeFormat("pl-PL", {
            dateStyle: "short",
            timeStyle: "short",
            timeZone: "Europe/Warsaw",
          }).format(endDate)}
        </Text>
      )}

      {totalDays > 0 && (
        <Text style={styles.totalPrice}>
          Total: {totalPrice.toFixed(2)} zł ({totalDays} day
          {totalDays > 1 ? "s" : ""})
        </Text>
      )}

      {/* Flat Recommendations */}
      <Text style={styles.recommendationHeader}>
        You rented a car! Would you also like to rent a flat in the area?
      </Text>

      {flatsLoading && (
        <View style={styles.centeredView}>
          <ActivityIndicator size="small" color="#00246B" />
          <Text style={{ marginTop: 8, color: "#00246B" }}>
            Loading recommendations...
          </Text>
        </View>
      )}
      {flatsError && (
        <Text style={{ color: "red", marginVertical: 8 }}>
          Could not load flats: {String(flatsErrorDetails)}
        </Text>
      )}
      {flats && (
        <FlatList
          data={flats}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderFlatItem}
          horizontal
          showsHorizontalScrollIndicator
          contentContainerStyle={styles.flatList}
        />
      )}

      {/* OK Button */}
      <Pressable style={styles.okButton} onPress={() => router.push("/car-browser")}>
        <Text style={styles.okButtonText}>OK</Text>
      </Pressable>
    </SafeAreaView>
	</ScrollView>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  errorText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "red",
    textAlign: "center",
    margin: 16,
  },
  successHeader: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#00246B",
    textAlign: "center",
    marginVertical: 16,
  },
  successMessage: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 16,
    color: "#00246B",
  },
  carCard: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  carImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 16,
  },
  carName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#00246B",
  },
  carDailyRate: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  sectionHeader: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 8,
  },
  rentalDates: {
    marginBottom: 4,
    fontSize: 14,
    color: "#333",
  },
  totalPrice: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#00246B",
    textAlign: "center",
    marginVertical: 16,
  },
  recommendationHeader: {
    fontSize: 16,
    marginBottom: 16,
    fontWeight: "bold",
    textAlign: "center",
    color: "#00246B",
  },
  flatList: {
    paddingBottom: 16,
  },
  flatCard: {
    width: 150,
    marginRight: 16,
    borderRadius: 8,
    backgroundColor: "#ffffff",
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  flatImage: {
    width: "100%",
    height: 100,
  },
  flatDetails: {
    padding: 8,
  },
  flatName: {
    fontWeight: "bold",
    fontSize: 14,
    marginBottom: 4,
  },
  flatInfo: {
    color: "#666",
    fontSize: 12,
    marginBottom: 4,
  },
  flatPrice: {
    padding: 8,
  },
  flatPriceText: {
    fontWeight: "bold",
    color: "#00246B",
    textAlign: "right",
  },
  okButton: {
    backgroundColor: "#00246B",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginVertical: 16,
  },
  okButtonText: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
