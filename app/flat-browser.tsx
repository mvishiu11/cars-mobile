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
import FlatBrowserFilter from "@/components/FlatBrowserFilter";
import { getNextAvailableDate } from "@/components/DateTimeSelector";
import { useFlats } from "../hooks/useFlats";

export default function FlatBrowser() {
  const router = useRouter();
  
  // Grab the query result, including a refetch function
  const {
    data: flats,
    isLoading,
    isError,
    error,
    refetch,
  } = useFlats();
  
  // Local states for filters
  const nextAvailableDate = getNextAvailableDate();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState(0);
  const [availableFrom, setAvailableFrom] = useState(nextAvailableDate);
  const [availableTo, setAvailableTo] = useState(nextAvailableDate);
  const [minPrice, setMinPrice] = useState(300);
  const [maxPrice, setMaxPrice] = useState(700);
  const [searchRadius, setSearchRadius] = useState(5000);

  const flatFallbackImage = require("../assets/images/flat-fallback.png");

  // Filter definitions
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
    searchRadius: 5000,
  };

  const renderFlatItem = ({ item }: any) => (
    <Pressable
      style={styles.card}
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

  // Loading indicator
  if (isLoading) {
    return (
      <SafeAreaView edges={["bottom"]} style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#00246B" />
        <Text style={styles.loadingText}>Loading flats...</Text>
      </SafeAreaView>
    );
  }

  // Error screen
  if (isError) {
    return (
      <SafeAreaView edges={["bottom"]} style={styles.errorContainer}>
        <Text style={styles.errorTitle}>Oops!</Text>
        <Text style={styles.errorMessage}>
          Something went wrong while fetching flats:
        </Text>
        <Text style={styles.errorDetails}>{String(error)}</Text>
        <Pressable style={styles.retryButton} onPress={() => refetch()}>
          <Text style={styles.retryButtonText}>Retry</Text>
        </Pressable>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView edges={["bottom"]} style={styles.container}>
      <Text style={styles.header}>Browse Flats</Text>
      <View style={styles.searchFilterContainer}>
        <TextInput
          style={styles.input}
          placeholder="Modern Apartment"
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
        <FlatBrowserFilter
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
          data={flats}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderFlatItem}
          contentContainerStyle={styles.flatList}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: "#F8F9FB",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 16,
    color: "#00246B",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F8F9FB",
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: "#00246B",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F8F9FB",
    paddingHorizontal: 20,
  },
  errorTitle: {
    fontSize: 24,
    marginBottom: 12,
    color: "#ff3333",
    fontWeight: "bold",
  },
  errorMessage: {
    fontSize: 16,
    color: "#222",
    marginBottom: 8,
    textAlign: "center",
  },
  errorDetails: {
    fontSize: 14,
    color: "#555",
    marginBottom: 16,
    textAlign: "center",
  },
  retryButton: {
    backgroundColor: "#00246B",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  retryButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  searchFilterContainer: {
    flexDirection: "row",
    gap: 8,
  },
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

  // List & Cards
  flatList: {
    // paddingBottom: 16, etc.
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
  flatImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },
  flatDetails: {
    flex: 1,
  },
  flatName: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#044EEB",
  },
  flatInfo: {
    color: "#666",
    marginBottom: 4,
  },
  flatPrice: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    alignSelf: "flex-end",
    gap: 8,
  },
  priceText: {
    fontWeight: "bold",
    color: "#00246B",
  },
});
