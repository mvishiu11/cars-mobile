import React, { useState } from "react";
import {
	View,
	Text,
	Image,
	Pressable,
	ScrollView,
	StyleSheet,
	Linking,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { exampleData } from "@/data/data";
import Toast from "react-native-toast-message";
import DateTimeSelector, { getNextAvailableDate } from "@/components/DateTimeSelector";
import Checkbox from "expo-checkbox";
import { FontAwesome5 } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

export interface Flat {
	id: number;
	name: string;
	image: null | string;
	location: string;
	price: number;
	startDate?: string;
	endDate?: string;
	bedrooms: number;
	bathrooms: number;
}

export const FlatInfo = ({ flat }: { flat: Flat }) => {
	return (
		<View style={styles.flatInfo}>
			<View style={{ flexGrow: 1 }}>
				<Text>
					<FontAwesome5 name="bed" size={14} color="#003366" /> {flat.bedrooms} Bedrooms
				</Text>
				<Text>
					<FontAwesome5 name="bath" size={14} color="#003366" /> {flat.bathrooms} Bathrooms
				</Text>
			</View>
			<View style={{ flexGrow: 1 }}>
				<Pressable onPress={() => openGoogleMaps(flat.location)}>
					<Text style={styles.googleMapsText}>
						<FontAwesome5 name="map-marker-alt" size={14} color="#003366" /> Google Maps
					</Text>
				</Pressable>
			</View>
		</View>
	);
};

const openGoogleMaps = (location: string) => {
	const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${location}`;
	Linking.openURL(googleMapsUrl).catch((err) => {
		console.error("Failed to open Google Maps:", err);
	});
};

export default function FlatDetails() {
	const { id } = useLocalSearchParams();
	const router = useRouter();
	const flat = exampleData.flats.find((flat) => flat.id === Number(id)) as Flat;

	const nextAvailableDate = getNextAvailableDate();
	const [startDate, setStartDate] = useState(nextAvailableDate);
	const [isStartDateModalOpen, setStartDateModalOpen] = useState(false);
	const [isStartTimeModalOpen, setStartTimeModalOpen] = useState(false);
	const [endDate, setEndDate] = useState(nextAvailableDate);
	const [isEndDateModalOpen, setEndDateModalOpen] = useState(false);
	const [isEndTimeModalOpen, setEndTimeModalOpen] = useState(false);
	const [termsAccepted, setTermsAccepted] = useState(false);

	if (!flat) {
		return (
			<SafeAreaView style={{ paddingHorizontal: 16 }}>
				<Text style={styles.errorText}>Flat not found!</Text>
			</SafeAreaView>
		);
	}

	const flatFallbackImage = require("../../assets/images/flat-fallback.png");

	const handleRent = () => {
		if (!startDate || !endDate) {
			Toast.show({
				type: "error",
				text1: "Error",
				text2: "Please fill in both start and end dates.",
			});
			return;
		}

		const rentedFlat = {
			...flat,
			startDate: startDate.toISOString(),
			endDate: endDate.toISOString(),
		};
		exampleData.rentedFlats = exampleData.rentedFlats || [];
		exampleData.rentedFlats.push(rentedFlat);

		Toast.show({
			type: "success",
			text1: "Flat Rented!",
			text2: `${flat.name} has been successfully rented via Flatly. 🏠`,
		});

		router.push("/dashboard");
	};

	return (
		<SafeAreaView style={{ paddingHorizontal: 32 }}>
			{/* Flat Image */}
			<Image
				source={flat.image ? { uri: flat.image } : flatFallbackImage}
				style={styles.flatImage}
				resizeMode="cover"
			/>
			{/* Flat Info */}
			<Text style={styles.flatName}>{flat.name}</Text>
			<Text style={styles.flatPrice}>{flat.price} zł / day</Text>
			<FlatInfo flat={flat} />

			{/* Renting Form */}
			<Text style={styles.sectionHeader}>Start Renting</Text>
			<DateTimeSelector
				dateTime={startDate}
				setDateTime={setStartDate}
				isDateModalOpen={isStartDateModalOpen}
				setDateModalOpen={setStartDateModalOpen}
				isTimeModalOpen={isStartTimeModalOpen}
				setTimeModalOpen={setStartTimeModalOpen}
			/>
			<Text style={styles.sectionHeader}>End Renting</Text>
			<DateTimeSelector
				dateTime={endDate}
				setDateTime={setEndDate}
				isDateModalOpen={isEndDateModalOpen}
				setDateModalOpen={setEndDateModalOpen}
				isTimeModalOpen={isEndTimeModalOpen}
				setTimeModalOpen={setEndTimeModalOpen}
			/>

			{/* Terms and Conditions */}
			<View style={styles.checkboxContainer}>
				<Checkbox
					value={termsAccepted}
					onValueChange={() => setTermsAccepted(!termsAccepted)}
					style={{ borderColor: "#003366" }}
					color="#003366"
				/>
				<Text
					onPress={() => setTermsAccepted(!termsAccepted)}
					style={styles.checkboxLabel}
				>
					Accept terms and conditions
				</Text>
			</View>

			{/* Rent Button */}
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
		borderRadius: 8,
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
	flatInfo: {
		flexDirection: "row",
		marginBottom: 16,
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
	checkboxContainer: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 16,
	},
	checkboxLabel: {
		fontSize: 14,
		marginLeft: 8,
		color: "#333",
	},
	rentButton: {
		backgroundColor: "#003366",
		paddingVertical: 16,
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
		color: "red",
		fontWeight: "bold",
		fontSize: 18,
		textAlign: "center",
	},
});
