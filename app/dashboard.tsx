import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  ListRenderItemInfo
} from "react-native";
import { useRouter } from "expo-router";
import { useRentedFlats } from "@/hooks/useFlats";
import { useAuthContext } from "@/context/AuthContext";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome5 } from "@expo/vector-icons";
import { Car } from "@/types";
import { useInfiniteRentals } from "@/hooks/useCars";

export default function Dashboard() {
  const router = useRouter();
  const [carsVisible, setCarsVisible] = useState(false);
  const [flatsVisible, setFlatsVisible] = useState(false);

  const carFallbackImage = require("../assets/images/car-fallback.png");
  const flatFallbackImage = require("../assets/images/flat-fallback.png");

  const { email } = useAuthContext();

  const { data: rentedFlats } = useRentedFlats(email as string);

  const {
    data,
    error,
    isError,
    isFetching,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    isLoading,
  } = useInfiniteRentals();

  const rentals = data?.pages.flatMap((page) => page.content) ?? [];
  const cars = rentals.map((rental) => rental.car);

  const renderCarItem = ({ item }: ListRenderItemInfo<Car>) => (
    <Pressable onPress={() => router.push(`/rented-car/${item.id}`)}>
      <View style={styles.renderCarItem}>
        <Image
          source={item.imageUrl ? { uri: item.imageUrl } : carFallbackImage}
          style={styles.renderImg}
          resizeMode="contain"
        />
        <View style={{ flex: 1 }}>
          <Text style={styles.renderText}>{item.model.name}</Text>
          {/* Show some fields if available */}
          <Text style={{ color: "#666" }}>
            Fuel: {item.model.fuelType}, {item.model.fuelCapacity} L
          </Text>
          <Text style={{ color: "#666" }}>
            Daily Rate: {item.model.dailyRate.toFixed(2)} zł
          </Text>
        </View>
      </View>
    </Pressable>
  );

  const handleEndReached = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <SafeAreaView edges={["bottom"]} style={{ paddingHorizontal: 16 }}>
      <Text style={styles.welcomeText}>Welcome, {email}!</Text>

      {/* =========================== */}
      {/* YOUR CARS (Infinite Scroll) */}
      {/* =========================== */}
      <TouchableOpacity
        style={styles.sectionHeader}
        onPress={() => setCarsVisible(!carsVisible)}
      >
        <Text style={styles.sectionHeaderText}>Your Cars</Text>
        <FontAwesome5
          name={carsVisible ? "chevron-up" : "chevron-down"}
          size={16}
          color="#003366"
        />
      </TouchableOpacity>

      {carsVisible && (
        <View style={{ marginBottom: 16 }}>
          {isLoading && <ActivityIndicator size="large" color="#00246B" />}
          {isError && (
            <Text style={{ color: "red" }}>Error: {String(error)}</Text>
          )}

          {!isLoading && !isError && (
            <>
              <FlatList
                data={cars}
                keyExtractor={(item) => item.id}
                renderItem={renderCarItem}
                contentContainerStyle={{ paddingBottom: 16 }}
                onEndReached={handleEndReached}
                onEndReachedThreshold={0.5}
                ListFooterComponent={
                  isFetchingNextPage ? (
                    <ActivityIndicator size="small" color="#00246B" />
                  ) : null
                }
              />
            </>
          )}
        </View>
      )}

      {/* Browse Cars Button */}
      <Pressable style={styles.browseButton} onPress={() => router.push("/car-browser")}>
        <Text style={{ color: "#ffffff", fontWeight: "bold", fontSize: 16 }}>
          Browse cars
        </Text>
      </Pressable>

      {/* ============================= */}
      {/* YOUR FLATS (via Flatly)      */}
      {/* ============================= */}
      <TouchableOpacity
        style={styles.sectionHeader}
        onPress={() => setFlatsVisible(!flatsVisible)}
      >
        <Text style={styles.sectionHeaderText}>Your Flats (via Flatly)</Text>
        <FontAwesome5
          name={flatsVisible ? "chevron-up" : "chevron-down"}
          size={16}
          color="#003366"
        />
      </TouchableOpacity>

      {flatsVisible && (
        <FlatList
          data={rentedFlats}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => {
            return (
              <Pressable style={styles.card} onPress={() => router.push(`/flat-details/${item.id}`)}>
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
                    <FontAwesome5 name="map-marker-alt" size={14} color="#00246B" />{" "}
                    {item.location}
                  </Text>
                  <Text style={styles.flatInfo}>{item.description}</Text>
                </View>
                <View style={styles.flatPrice}>
                  <FontAwesome5 name="money-bill" size={20} color="#044EEB" />
                  <Text style={styles.priceText}>{item.price} zł / day</Text>
                </View>
              </Pressable>
            );
          }}
          contentContainerStyle={{ paddingBottom: 16 }}
        />
      )}

      {/* Browse Flats Button */}
      <Pressable style={styles.browseButton} onPress={() => router.push("/flat-browser")}>
        <Text style={{ color: "#ffffff", fontWeight: "bold", fontSize: 16 }}>
          Browse flats (via Flatly)
        </Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  welcomeText: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 24,
    color: "#00246B",
  },
  browseButton: {
    backgroundColor: "#00246B",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 12,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 12,
  },
  sectionHeaderText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#003366",
  },
  renderCarItem: {
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
  renderImg: { width: 60, height: 60, borderRadius: 8, marginRight: 12 },
  renderText: { fontWeight: "bold", fontSize: 16, marginBottom: 4 },

  card: {
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
  flatImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },
  flatDetails: { flex: 1 },
  flatName: { fontWeight: "bold", fontSize: 16, color: "#044EEB" },
  flatInfo: { color: "#666", marginBottom: 4 },
  flatPrice: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    alignSelf: "flex-end",
    gap: 8,
  },
  priceText: { fontWeight: "bold", color: "#00246B" },
});