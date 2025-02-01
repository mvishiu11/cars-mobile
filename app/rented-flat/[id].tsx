import React from "react";
import {
	View,
	Text,
	Image,
	Pressable,
	StyleSheet,
	ScrollView,
	Linking,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import SafeLayout from "../../components/SafeLayout";
import Toast from "react-native-toast-message";
import { exampleData } from "@/data/data";
import { FontAwesome5 } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RentedFlat() {
	const { id } = useLocalSearchParams();
	const router = useRouter();
	const flat = exampleData.rentedFlats.find((flat) => flat.id === Number(id)); // Find rented flat by ID

	if (!flat) {
		return (
			<SafeAreaView style={{ paddingHorizontal: 16 }}>
				<Text style={styles.errorText}>Flat not found!</Text>
			</SafeAreaView>
		);
	}

	const handleCancel = () => {
		exampleData.rentedFlats = exampleData.rentedFlats.filter(
			(f) => f.id !== flat.id
		);
		exampleData.flats.push(flat);

		Toast.show({
			type: "info",
			text1: "Rental Canceled",
			text2: `${flat.name} has been removed from your rented flats.`,
		});

		router.push("/dashboard");
	};

	const openGoogleMaps = () => {
		const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${flat.location}`;
		Linking.openURL(googleMapsUrl).catch((err) => {
			console.error("Failed to open Google Maps:", err);
		});
	};

	return (
		<SafeAreaView
			style={{
				paddingHorizontal: 16,
				alignItems: "center",
				flex: 1,
			}}
			edges={["right", "bottom", "left"]}
		>
			{/* Flat Image */}
			<Image
				source={
					flat.image
						? { uri: flat.image }
						: require("../../assets/images/flat-fallback.png")
				}
				style={styles.flatImage}
				resizeMode="cover"
			/>

			{/* Flat Details */}
			<Text style={styles.flatName}>{flat.name}</Text>
			<Text style={styles.flatPrice}>{flat.price} zł / day</Text>

			<View style={styles.flatDetails}>
				<Text>
					<FontAwesome5 name="bed" size={16} color="#00246B" /> 3
					Bedrooms
				</Text>
				<Text>
					<FontAwesome5 name="bath" size={16} color="#00246B" /> 2
					Bathrooms
				</Text>
				<Pressable
					onPress={openGoogleMaps}
					style={styles.googleMapsLink}
				>
					<Text style={styles.googleMapsText}>
						<FontAwesome5
							name="map-marker-alt"
							size={16}
							color="#00246B"
						/>{" "}
						Google Maps
					</Text>
				</Pressable>
			</View>

			{/* Rental Period */}
			<Text style={styles.sectionHeader}>Will Start Renting</Text>
			<Text style={styles.rentalDates}>
				{new Intl.DateTimeFormat("pl-PL", {
					dateStyle: "short",
					timeStyle: "short",
					timeZone: "Europe/Warsaw",
				}).format(new Date(flat.startDate as string))}
			</Text>
			<Text style={styles.sectionHeader}>Until</Text>
			<Text style={styles.rentalDates}>
				{new Intl.DateTimeFormat("pl-PL", {
					dateStyle: "short",
					timeStyle: "short",
					timeZone: "Europe/Warsaw",
				}).format(new Date(flat.endDate as string))}
			</Text>

			{/* Cancel Button */}
			<Pressable style={styles.cancelButton} onPress={handleCancel}>
				<Text style={styles.cancelButtonText}>Cancel</Text>
			</Pressable>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	scrollContent: {
		flexGrow: 1,
		padding: 16,
		alignItems: "center",
	},
	flatImage: {
		width: "100%",
		height: 200,
		marginBottom: 16,
	},
	flatName: {
		fontSize: 24,
		fontWeight: "bold",
		color: "#00246B",
		textAlign: "center",
		marginBottom: 16,
	},
	flatPrice: {
		fontSize: 18,
		fontWeight: "bold",
		color: "#00246B",
		marginBottom: 16,
		textAlign: "center",
	},
	flatDetails: {
		marginBottom: 16,
		alignItems: "center",
	},
	googleMapsLink: {
		marginTop: 8,
	},
	googleMapsText: {
		color: "#007BFF",
		fontWeight: "bold",
		textDecorationLine: "underline",
	},
	sectionHeader: {
		fontWeight: "bold",
		fontSize: 16,
		marginBottom: 8,
		textAlign: "center",
	},
	rentalDates: {
		marginBottom: 16,
		fontSize: 14,
		color: "#333",
		textAlign: "center",
	},
	cancelButton: {
		backgroundColor: "#EB044E",
		paddingVertical: 12,
		borderRadius: 8,
		alignItems: "center",
		width: "100%",
		marginTop: 16,
	},
	cancelButtonText: {
		color: "#ffffff",
		fontWeight: "bold",
		fontSize: 16,
	},
	errorText: {
		fontSize: 18,
		fontWeight: "bold",
		color: "red",
		textAlign: "center",
	},
});
