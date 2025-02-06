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
  
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [productionYear, setProductionYear] = useState<number | undefined>();
  const [seatCount, setSeatCount] = useState<number | undefined>();
  const [dailyRate, setDailyRate] = useState<number | undefined>();
  const [brandName, setBrandName] = useState<string | undefined>();
  const [availableFrom, setAvailableFrom] = useState<string | undefined>();
  const [availableTo, setAvailableTo] = useState<string | undefined>();
  const [city, setCity] = useState<string | undefined>();
  const [distance, setDistance] = useState<number | undefined>();

  const carFallbackImage = require("../assets/images/car-fallback.png");

  const defaultFilters: {
    brandName: string;
    modelName: string;
    productionYear?: number;
    seatCount?: number;
    dailyRate?: number;
    from?: string;
    to?: string;
    city?: string;
    distance?: number;
  } = {
    brandName: "",
    modelName: "",
    productionYear: undefined,
    seatCount: undefined,
    dailyRate: undefined,
    from: undefined,
    to: undefined,
    city: undefined,
    distance: undefined,
  };
  const [filters, setFilters] = useState(defaultFilters);

  const cleanedFilters = Object.fromEntries(
    Object.entries(filters).filter(([_, v]) => v !== undefined)
  );
  
  const {
    data: carsData,
    isLoading,
    isError,
    error,
    refetch
  } = useInfiniteCars(cleanedFilters);  

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
            console.log(city);
            if (query.length > 2 || filters !== defaultFilters) {
              setFilters({
                ...filters,
                modelName: query,
                ...(brandName !== undefined && { brandName: brandName }),
                ...(seatCount !== undefined && { seatCount: seatCount }),
                ...(productionYear !== undefined && { productionYear: productionYear }),
                ...(dailyRate !== undefined && { dailyRate: dailyRate }),
                ...(availableFrom !== undefined && { from: availableFrom }),
                ...(availableTo !== undefined && { to: availableTo }),
                ...(city !== undefined && { city: city }),
                ...(distance !== undefined && { distance: distance }),
              });
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
          defaultFilters={defaultFilters}
          refetch={refetch}
          setFilters={setFilters}
          brandName={brandName ?? ""}
          setBrandName={setBrandName}
          productionYear={productionYear ?? 2001}
          setProductionYear={setProductionYear}
          seatCount={seatCount ?? 4}
          setSeatCount={setSeatCount}
          dailyRate={dailyRate ?? 300}
          setDailyRate={setDailyRate}
          availableFrom={availableFrom ?? getNextAvailableDate().toISOString()}
          setAvailableFrom={setAvailableFrom}
          availableTo={availableTo ?? getNextAvailableDate().toISOString()}
          setAvailableTo={setAvailableTo}
          city={city}
          setCity={setCity}
          distance={distance}
          setDistance={setDistance}
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