import React, { useState } from "react";
import {
	View,
	Text,
	FlatList,
	Image,
	Pressable,
	StyleSheet,
	TextInput,
} from "react-native";
import { useRouter } from "expo-router";
import { exampleData } from "@/data/data";
import { FontAwesome5 } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { Car } from "./car-details/[id]";
import CarBrowserFilter from "@/components/CarBrowserFilter";
import { getNextAvailableDate } from "@/components/DateTimeSelector";

export default function CarBrowser() {
	const nextAvailableDate = getNextAvailableDate();

	const [isFilterOpen, setIsFilterOpen] = useState(false);
	const [query, setQuery] = useState("");
	const [sortBy, setSortBy] = useState(0);
	const [availableFrom, setAvailableFrom] = useState(nextAvailableDate);
	const [availableTo, setAvailableTo] = useState(nextAvailableDate);
	const [minPrice, setMinPrice] = useState(300);
	const [maxPrice, setMaxPrice] = useState(700);
	const [searchRadius, setSearchRadius] = useState(2500);
	const router = useRouter();
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

	const renderCarItem = ({ item }: { item: Car }) => (
		<Pressable
			style={styles.card}
			onPress={() => router.push(`/car-details/${item.id}`)}
		>
			<Image
				source={item.image ? { uri: item.image } : carFallbackImage}
				style={styles.carImage}
				resizeMode="contain"
			/>
			<View style={styles.carDetails}>
				<Text style={styles.carName}>{item.name}</Text>
				<Text style={styles.carInfo}>
					<FontAwesome5
						name="map-marker-alt"
						size={14}
						color="#00246B"
					/>{" "}
					{item.location}
					{" • "}
					{item.distance}
				</Text>
				<Text style={styles.carInfo}>
					<FontAwesome5 name="users" size={14} color="#00246B" />{" "}
					{item.seats} Seats
				</Text>
			</View>
			<View style={styles.carPrice}>
				<FontAwesome5 name="money-bill" size={20} color="#044EEB" />
				<Text style={styles.priceText}>{item.price} zł / day</Text>
			</View>
		</Pressable>
	);

	return (
		<SafeAreaView
			edges={["bottom"]}
			style={{ flex: 1, paddingHorizontal: 16 }}
		>
			<Text style={styles.header}>Browse Cars</Text>
			<View style={{ flexDirection: "row", gap: 8 }}>
				<TextInput
					style={styles.input}
					placeholder="Porsche 911"
					placeholderTextColor="#888"
					onChange={(e) => setQuery(e.nativeEvent.text)}
				/>

				<Pressable
					style={{
						padding: 12,
						backgroundColor: "#00246B",
						borderRadius: 8,
						alignItems: "center",
						justifyContent: "center",
						height: 42,
						width: 42,
					}}
					onPress={() => {
						if (query.length > 2 || filters !== defaultFilters)
							alert(
								`Searching for \"${query}\" with filters \nSort by: ${sortCategories[filters.sortBy]}\nFrom: ${new Intl.DateTimeFormat(
									"pl-PL",
									{
										dateStyle: "short",
										timeStyle: "short",
										timeZone: "Europe/Warsaw",
									}
								).format(
									filters.availableFrom
								)}\nTo: ${new Intl.DateTimeFormat("pl-PL", {
									dateStyle: "short",
									timeStyle: "short",
									timeZone: "Europe/Warsaw",
								}).format(
									filters.availableTo
								)}\nPrice: ${filters.minPrice} zł - ${filters.maxPrice} zł\nRadius: ${filters.searchRadius / 1000} km`
							);
					}}
				>
					<FontAwesome5 name="search" size={16} color="#fff" />
				</Pressable>
				<Pressable
					style={{
						borderWidth: 1,
						borderColor: "#ddd",
						backgroundColor: "#fff",
						padding: 8,
						borderRadius: 8,
						alignItems: "center",
						justifyContent: "center",
						height: 42,
						width: 42,
					}}
					onPress={() => setIsFilterOpen(!isFilterOpen)}
				>
					<FontAwesome5 name="filter" size={16} color="#00246B" />
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
					data={exampleData.cars}
					keyExtractor={(item) => item.id.toString()}
					renderItem={renderCarItem}
					contentContainerStyle={styles.carList}
					showsVerticalScrollIndicator={false}
				/>
			)}
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
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
