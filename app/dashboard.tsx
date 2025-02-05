import React, { useState } from "react";
import {
	View,
	Text,
	Image,
	FlatList,
	Pressable,
	StyleSheet,
	TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
import { useRentedFlats } from "@/hooks/useFlats";
import { useAuthContext } from "@/context/AuthContext";
import { exampleData } from "@/data/data";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome5 } from "@expo/vector-icons";
import { Car } from "./car-details/[id]";

export default function Dashboard() {
	const router = useRouter();
	const [carsVisible, setCarsVisible] = useState(false);
	const [flatsVisible, setFlatsVisible] = useState(false);

	const carFallbackImage = require("../assets/images/car-fallback.png");
	const flatFallbackImage = require("../assets/images/flat-fallback.png");

	const { email } = useAuthContext();

	const {
		data: rentedFlats,
		isLoading,
		isError,
		error,
		refetch,
	} = useRentedFlats(email as string);

	const renderCarItem = ({ item }: { item: Car }) => (
		<Pressable onPress={() => router.push(`/rented-car/${item.id}`)}>
			<View style={styles.renderCarItem}>
				<Image
					source={item.image ? { uri: item.image } : carFallbackImage}
					style={styles.renderImg}
					resizeMode="contain"
				/>
				<View style={{ flex: 1 }}>
					<Text style={styles.renderText}>{item.name}</Text>
					<Text style={{ color: "#666" }}>
						Pickup:{" "}
						{new Intl.DateTimeFormat("pl-PL", {
							dateStyle: "short",
							timeStyle: "short",
							timeZone: "Europe/Warsaw",
						}).format(new Date(item.pickupDate as string))}
					</Text>
					<Text style={{ color: "#666" }}>
						Return:{" "}
						{new Intl.DateTimeFormat("pl-PL", {
							dateStyle: "short",
							timeStyle: "short",
							timeZone: "Europe/Warsaw",
						}).format(new Date(item.returnDate as string))}
					</Text>
				</View>
			</View>
		</Pressable>
	);

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

	return (
		<SafeAreaView edges={["bottom"]} style={{ paddingHorizontal: 16 }}>
			<Text style={styles.welcomeText}>
				Welcome, {email}!
			</Text>

			{/* Your Cars Section */}
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
				<FlatList
					data={exampleData.rentedCars}
					keyExtractor={(item) => item.id.toString()}
					renderItem={renderCarItem}
					contentContainerStyle={{ paddingBottom: 16 }}
				/>
			)}

			{/* Browse Cars Button */}
			<Pressable
				style={styles.browseButton}
				onPress={() => router.push("/car-browser")}
			>
				<Text
					style={{
						color: "#ffffff",
						fontWeight: "bold",
						fontSize: 16,
					}}
				>
					Browse cars
				</Text>
			</Pressable>

			{/* Your Flats Section */}
			<TouchableOpacity
				style={styles.sectionHeader}
				onPress={() => setFlatsVisible(!flatsVisible)}
			>
				<Text style={styles.sectionHeaderText}>
					Your Flats (via Flatly)
				</Text>
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
					renderItem={renderFlatItem}
					contentContainerStyle={{ paddingBottom: 16 }}
				/>
			)}

			{/* Browse Flats Button */}
			<Pressable
				style={styles.browseButton}
				onPress={() => router.push("/flat-browser")}
			>
				<Text
					style={{
						color: "#ffffff",
						fontWeight: "bold",
						fontSize: 16,
					}}
				>
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
	renderFlatItem: {
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
