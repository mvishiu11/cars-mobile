import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import { FontAwesome5 } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import CarBrowserFilter from "@/components/CarBrowserFilter";
import { getNextAvailableDate } from "@/components/DateTimeSelector";
import { useInfiniteCars } from "@/hooks/useCars";
import { Car } from "@/types";

export default function CarBrowser() {
  const router = useRouter();
  const nextAvailableDate = getNextAvailableDate();

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState(0);
  const [availableFrom, setAvailableFrom] = useState(nextAvailableDate);
  const [availableTo, setAvailableTo] = useState(nextAvailableDate);
  const [minPrice, setMinPrice] = useState(300);
  const [maxPrice, setMaxPrice] = useState(700);
  const [searchRadius, setSearchRadius] = useState(2500);

  const carFallbackImage = require("../assets/images/car-fallback.png");

  const filters = {
    sortBy,
    availableFrom,
    availableTo,
    minPrice,
    maxPrice,
    searchRadius,
  };
  const sortCategories = ["Newest ☆", "Popularity ♡", "Price ⭣", "Price ⭡"];
  const defaultFilters = {
    sortBy: 0,
    availableFrom: nextAvailableDate,
    availableTo: nextAvailableDate,
    minPrice: 300,
    maxPrice: 700,
    searchRadius: 2500,
  };

  const {
    data: carsData,
    isLoading,
    isError,
    error,
  } = useInfiniteCars();

  const cars = carsData?.pages.flatMap((page) => page.content) ?? [];

  const renderCarItem = ({ item }: { item: Car }) => (
    <Pressable
      style={styles.card}
      onPress={() => router.push(`/car-details/${item.id}`)}
    >
      <Image
        source={
          item.imageUrl
            ? { uri: item.imageUrl }
            : carFallbackImage
        }
        style={styles.carImage}
        resizeMode="contain"
      />
      <View style={styles.carDetails}>
        <Text style={styles.carName}>
          {item.model.brandName} {item.model.name}
        </Text>
        <Text style={styles.carInfo}>
          <FontAwesome5 name="map-marker-alt" size={14} color="#00246B" />{" "}
          {item.location?.fullAddress}
        </Text>
        <Text style={styles.carInfo}>
          <FontAwesome5 name="users" size={14} color="#00246B" />{" "}
          {item.model.seatCount} Seats
        </Text>
      </View>
      <View style={styles.carPrice}>
        <FontAwesome5 name="money-bill" size={20} color="#044EEB" />
        <Text style={styles.priceText}>
          {item.model.dailyRate.toFixed(2)} zł / day
        </Text>
      </View>
    </Pressable>
  );

  if (isLoading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#00246B" />
        <Text style={{ marginTop: 12, color: "#00246B" }}>
          Loading cars...
        </Text>
      </SafeAreaView>
    );
  }

  if (isError) {
    return (
      <SafeAreaView style={{ padding: 16 }}>
        <Text style={{ color: "red" }}>
          Failed to load cars: {String(error)}
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView edges={["bottom"]} style={{ flex: 1, paddingHorizontal: 16 }}>
      <Text style={styles.header}>Browse Cars</Text>
      <View style={{ flexDirection: "row", gap: 8 }}>
        <TextInput
          style={styles.input}
          placeholder="Porsche 911"
          placeholderTextColor="#888"
          onChange={(e) => setQuery(e.nativeEvent.text)}
        />
        <Pressable
          style={styles.searchButton}
          onPress={() => {
            if (query.length > 2 || filters !== defaultFilters) {
              alert(
                `Searching for \"${query}\" with filters\n` +
                  `Sort by: ${sortCategories[filters.sortBy]}\n` +
                  `From: ${new Intl.DateTimeFormat("pl-PL", {
                    dateStyle: "short",
                    timeStyle: "short",
                    timeZone: "Europe/Warsaw",
                  }).format(filters.availableFrom)}\n` +
                  `To: ${new Intl.DateTimeFormat("pl-PL", {
                    dateStyle: "short",
                    timeStyle: "short",
                    timeZone: "Europe/Warsaw",
                  }).format(filters.availableTo)}\n` +
                  `Price: ${filters.minPrice} zł - ${filters.maxPrice} zł\n` +
                  `Radius: ${filters.searchRadius / 1000} km`
              );
            }
          }}
        >
          <FontAwesome5 name="search" size={16} color="#fff" />
        </Pressable>
        <Pressable
          style={styles.filterButton}
          onPress={() => setIsFilterOpen(!isFilterOpen)}
        >
          <FontAwesome5
            name={isFilterOpen ? "times" : "filter"}
            size={16}
            color="#00246B"
          />
        </Pressable>
      </View>

      {isFilterOpen ? (
        <CarBrowserFilter
          sortBy={sortBy}
          setSortBy={setSortBy}
          availableFrom={availableFrom}
          setAvailableFrom={setAvailableFrom}
          availableTo={availableTo}
          setAvailableTo={setAvailableTo}
          minPrice={minPrice}
          setMinPrice={setMinPrice}
          maxPrice={maxPrice}
          setMaxPrice={setMaxPrice}
          searchRadius={searchRadius}
          setSearchRadius={setSearchRadius}
        />
      ) : (
        <FlatList
          data={cars}
          keyExtractor={(item) => item.id}
          renderItem={renderCarItem}
          contentContainerStyle={styles.carList}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 16,
    color: "#00246B",
  },
  carList: {},
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    backgroundColor: "#fff",
  },
  searchButton: {
    padding: 12,
    backgroundColor: "#00246B",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    height: 42,
    width: 42,
  },
  filterButton: {
    borderWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#fff",
    padding: 8,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    height: 42,
    width: 42,
  },
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
  carImage: { width: 60, height: 60, borderRadius: 8, marginRight: 12 },
  carDetails: { flex: 1 },
  carName: { fontWeight: "bold", fontSize: 16, color: "#044EEB" },
  carInfo: { color: "#666", marginBottom: 4 },
  carPrice: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    alignSelf: "flex-end",
    gap: 8,
  },
  priceText: { fontWeight: "bold", color: "#00246B" },
});