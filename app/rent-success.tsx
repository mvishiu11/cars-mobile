import React from "react";
import {
	View,
	Text,
	Image,
	FlatList,
	Pressable,
	StyleSheet,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { exampleData } from "@/data/data";
import { FontAwesome5 } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { Car, CarInfo } from "./car-details/[id]";

export default function RentSuccess() {
	const rentedCar = useLocalSearchParams() as unknown as Car;
	const router = useRouter();

	const start = new Date(rentedCar.pickupDate as string);
	const end = new Date(rentedCar.returnDate as string);
	const rentalDays = Math.ceil(
		(end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)
	);
	const totalPrice = rentalDays * Number(rentedCar.price);

	const flatFallbackImage = require("../assets/images/flat-fallback.png");

	const renderFlatItem = ({ item }: any) => (
		<Pressable onPress={() => router.push(`/flat-details/${item.id}`)}>
			<View style={styles.flatCard}>
				<Image
					source={
						item.image ? { uri: item.image } : flatFallbackImage
					}
					style={styles.flatImage}
					resizeMode="cover"
				/>
				<View style={styles.flatDetails}>
					<Text style={styles.flatName}>{item.name}</Text>
					<Text style={styles.flatInfo}>
						<FontAwesome5
							name="map-marker-alt"
							size={12}
							color="#666"
						/>{" "}
						{item.location} • {item.distance}
					</Text>
					<Text style={styles.flatInfo}>
						<FontAwesome5 name="home" size={12} color="#666" />{" "}
						{item.size}
					</Text>
				</View>
				<View style={styles.flatPrice}>
					<Text style={styles.flatPriceText}>
						{item.price} zł / day
					</Text>
				</View>
			</View>
		</Pressable>
	);

	return (
		<SafeAreaView
			edges={["right", "bottom", "left"]}
			style={{ paddingHorizontal: 16 }}
		>
			{/* Success Message */}
			<Text style={styles.successHeader}>Success!</Text>
			<Text style={styles.successMessage}>
				{rentedCar.name} has been successfully rented out to you
			</Text>

			{/* Car Details */}
			<CarInfo car={rentedCar} />

			{/* Rental Period */}
			<Text style={styles.sectionHeader}>Rental Period</Text>
			<Text style={styles.rentalDates}>
				From:
				{new Intl.DateTimeFormat("pl-PL", {
					dateStyle: "short",
					timeStyle: "short",
					timeZone: "Europe/Warsaw",
				}).format(start)}
			</Text>
			<Text style={styles.rentalDates}>
				To:{" "}
				{new Intl.DateTimeFormat("pl-PL", {
					dateStyle: "short",
					timeStyle: "short",
					timeZone: "Europe/Warsaw",
				}).format(end)}
			</Text>

			{/* Total Price */}
			<Text style={styles.totalPrice}>Total: {totalPrice} zł</Text>

			{/* Flat Recommendations */}
			<Text style={styles.recommendationHeader}>
				You rented a car! Would you also like to rent a flat in the
				area?
			</Text>

			<FlatList
				data={exampleData.flats}
				keyExtractor={(item) => item.id.toString()}
				renderItem={renderFlatItem}
				horizontal
				showsHorizontalScrollIndicator
				contentContainerStyle={styles.flatList}
			/>

			{/* OK Button */}
			<Pressable
				style={styles.okButton}
				onPress={() => router.push("/car-browser")}
			>
				<Text style={styles.okButtonText}>OK</Text>
			</Pressable>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	successHeader: {
		fontSize: 32,
		fontWeight: "bold",
		color: "#00246B",
		textAlign: "center",
		marginBottom: 16,
	},
	successMessage: {
		fontSize: 16,
		textAlign: "center",
		marginBottom: 16,
		color: "#00246B",
	},
	carDetails: {
		marginBottom: 16,
	},
	sectionHeader: {
		fontWeight: "bold",
		fontSize: 16,
		marginBottom: 8,
	},
	rentalDates: {
		marginBottom: 16,
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
		marginTop: 16,
	},
	okButtonText: {
		color: "#ffffff",
		fontWeight: "bold",
		fontSize: 16,
	},
});
