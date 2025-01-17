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
import FlatBrowserFilter from "@/components/FlatBrowserFilter";
import { getNextAvailableDate } from "@/components/DateTimeSelector";

export default function FlatBrowser() {
	const nextAvailableDate = getNextAvailableDate();

	const [isFilterOpen, setIsFilterOpen] = useState(false);
	const [query, setQuery] = useState("");
	const [sortBy, setSortBy] = useState(0);
	const [availableFrom, setAvailableFrom] = useState(nextAvailableDate);
	const [availableTo, setAvailableTo] = useState(nextAvailableDate);
	const [minPrice, setMinPrice] = useState(300);
	const [maxPrice, setMaxPrice] = useState(700);
	const [searchRadius, setSearchRadius] = useState(5000);
	const router = useRouter();
	const flatFallbackImage = require("../assets/images/flat-fallback.png");

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
				source={item.image ? { uri: item.image } : flatFallbackImage}
				style={styles.flatImage}
				resizeMode="cover"
			/>
			<View style={styles.flatDetails}>
				<Text style={styles.flatName}>{item.name}</Text>
				<Text style={styles.flatInfo}>
					<FontAwesome5
						name="map-marker-alt"
						size={14}
						color="#00246B"
					/>{" "}
					{item.location}
				</Text>
				<Text style={styles.flatInfo}>
					<FontAwesome5 name="bed" size={14} color="#00246B" />{" "}
					{item.bedrooms} Bedrooms
				</Text>
				<Text style={styles.flatInfo}>
					<FontAwesome5 name="bath" size={14} color="#00246B" />{" "}
					{item.bathrooms} Bathrooms
				</Text>
			</View>
			<View style={styles.flatPrice}>
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
			<Text style={styles.header}>Browse Flats</Text>
			<View style={{ flexDirection: "row", gap: 8 }}>
				<TextInput
					style={styles.input}
					placeholder="Modern Apartment"
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
					data={exampleData.flats}
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
	header: {
		fontSize: 24,
		fontWeight: "bold",
		marginVertical: 16,
		color: "#00246B",
	},
	flatList: {},
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
	flatImage: { width: 60, height: 60, borderRadius: 8, marginRight: 12 },
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
