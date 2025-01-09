import React, { useState } from "react";
import {
	View,
	Text,
	Image,
	TextInput,
	Pressable,
	StyleSheet,
	ScrollView,
	Linking,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import SafeLayout from "../../components/SafeLayout";
import { exampleData } from "@/data/data";
import Toast from "react-native-toast-message";
import { FontAwesome5 } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

export default function FlatDetails() {
	const { id } = useLocalSearchParams();
	const router = useRouter();
	const flat = exampleData.flats.find((flat) => flat.id === Number(id));
	const [termsAccepted, setTermsAccepted] = useState(false);
	const [startDate, setStartDate] = useState("");
	const [endDate, setEndDate] = useState("");

	if (!flat) {
		return (
			<SafeAreaView style={{ paddingHorizontal: 16 }}>
				<Text style={styles.errorText}>Flat not found!</Text>
			</SafeAreaView>
		);
	}

	const handleRent = () => {
		if (!startDate || !endDate) {
			Toast.show({
				type: "error",
				text1: "Error",
				text2: "Please fill in both start and end dates.",
			});
			return;
		}

		const rentedFlat = { ...flat, startDate, endDate };
		exampleData.rentedFlats = exampleData.rentedFlats || [];
		exampleData.rentedFlats.push(rentedFlat);

		Toast.show({
			type: "success",
			text1: "Flat Rented!",
			text2: `${flat.name} has been successfully rented via Flatly. 🏠`,
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
		<SafeAreaView style={{ paddingHorizontal: 16 }}>
			<ScrollView contentContainerStyle={styles.scrollContent}>
				<Image
					source={
						flat.image
							? { uri: flat.image }
							: require("../../assets/images/flat-fallback.png")
					}
					style={styles.flatImage}
					resizeMode="cover"
				/>
				<Text style={styles.flatName}>{flat.name}</Text>
				<Text style={styles.flatPrice}>{flat.price} zł / day</Text>

				<View style={styles.flatDetails}>
					<Text>
						<FontAwesome5 name="bed" size={16} color="#003366" /> 3
						Bedrooms
					</Text>
					<Text>
						<FontAwesome5 name="bath" size={16} color="#003366" /> 2
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
								color="#003366"
							/>{" "}
							Google Maps
						</Text>
					</Pressable>
				</View>

				<Text style={styles.sectionHeader}>Start Renting</Text>
				<TextInput
					placeholder="Start Date (e.g., 2024-11-30T10:00:00)"
					style={styles.input}
					value={startDate}
					onChangeText={setStartDate}
				/>
				<Text style={styles.sectionHeader}>End Renting</Text>
				<TextInput
					placeholder="End Date (e.g., 2024-12-07T18:45:00)"
					style={styles.input}
					value={endDate}
					onChangeText={setEndDate}
				/>

				<View style={styles.checkboxContainer}>
					<Pressable onPress={() => setTermsAccepted(!termsAccepted)}>
						<View
							style={[
								styles.checkbox,
								termsAccepted && styles.checkboxChecked,
							]}
						/>
					</Pressable>
					<Text style={styles.checkboxLabel}>
						Accept terms and conditions
					</Text>
				</View>

				<Pressable
					style={[
						styles.rentButton,
						!termsAccepted && { backgroundColor: "#999" },
					]}
					disabled={!termsAccepted}
					onPress={handleRent}
				>
					<Text style={styles.rentButtonText}>Rent via Flatly</Text>
				</Pressable>

				<Toast />
			</ScrollView>
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
		color: "#003366",
		textAlign: "center",
		marginBottom: 16,
	},
	flatPrice: {
		fontSize: 18,
		fontWeight: "bold",
		color: "#003366",
		marginBottom: 16,
		textAlign: "center",
	},
	flatDetails: {
		marginBottom: 16,
		alignItems: "center",
	},
	sectionHeader: {
		fontWeight: "bold",
		fontSize: 16,
		marginBottom: 8,
		textAlign: "center",
	},
	googleMapsLink: {
		marginTop: 8,
	},
	googleMapsText: {
		color: "#007BFF",
		fontWeight: "bold",
		textDecorationLine: "underline",
	},
	input: {
		borderWidth: 1,
		borderColor: "#ddd",
		borderRadius: 8,
		padding: 12,
		marginBottom: 16,
		backgroundColor: "#f9f9f9",
		width: "100%",
	},
	checkboxContainer: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 16,
	},
	checkbox: {
		width: 20,
		height: 20,
		borderRadius: 4,
		borderWidth: 2,
		borderColor: "#003366",
		marginRight: 8,
	},
	checkboxChecked: {
		backgroundColor: "#003366",
	},
	checkboxLabel: {
		fontSize: 14,
		color: "#333",
	},
	rentButton: {
		backgroundColor: "#003366",
		paddingVertical: 12,
		borderRadius: 8,
		alignItems: "center",
		width: "100%",
	},
	rentButtonText: {
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
