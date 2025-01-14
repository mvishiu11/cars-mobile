import React from "react";
import {
	View,
	Text,
	Image,
	FlatList,
	Pressable,
	StyleSheet,
} from "react-native";
import { useRouter } from "expo-router";
import { exampleData } from "@/data/data";
import { SafeAreaView } from "react-native-safe-area-context";
import { Car } from "./car-details/[id]";

export default function Dashboard() {
	const router = useRouter();
	const carFallbackImage = require("../assets/images/car-fallback.png");
	const flatFallbackImage = require("../assets/images/flat-fallback.png");

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
		<Pressable onPress={() => router.push(`/rented-flat/${item.id}`)}>
			<View style={styles.renderFlatItem}>
				<Image
					source={
						item.image ? { uri: item.image } : flatFallbackImage
					}
					style={styles.renderImg}
					resizeMode="cover"
				/>
				<View style={{ flex: 1 }}>
					<Text style={styles.renderText}>{item.name}</Text>
					<Text style={{ color: "#666" }}>
						Check-in:{" "}
						{new Intl.DateTimeFormat("pl-PL", {
							dateStyle: "short",
							timeStyle: "short",
							timeZone: "Europe/Warsaw",
						}).format(new Date(item.startDate))}
					</Text>
					<Text style={{ color: "#666" }}>
						Check-out:{" "}
						{new Intl.DateTimeFormat("pl-PL", {
							dateStyle: "short",
							timeStyle: "short",
							timeZone: "Europe/Warsaw",
						}).format(new Date(item.endDate))}
					</Text>
				</View>
			</View>
		</Pressable>
	);

	return (
		<SafeAreaView edges={["bottom"]} style={{ paddingHorizontal: 16 }}>
			<Text style={styles.welcomeText}>
				Welcome, {exampleData.username}
			</Text>

			{/* Your Cars Section */}
			<Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 8 }}>
				Your cars
			</Text>
			<FlatList
				data={exampleData.rentedCars}
				keyExtractor={(item) => item.id.toString()}
				renderItem={renderCarItem}
				contentContainerStyle={{ paddingBottom: 16 }}
			/>

			{/* Your Flats Section */}
			<Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 8 }}>
				Your flats (courtesy of Flatly)
			</Text>
			<FlatList
				data={exampleData.rentedFlats}
				keyExtractor={(item) => item.id.toString()}
				renderItem={renderFlatItem}
				contentContainerStyle={{ paddingBottom: 16 }}
			/>

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
		marginTop: 16,
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
});
