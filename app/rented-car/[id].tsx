import React from "react";
import { Text, Image, Pressable, StyleSheet, Alert } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import QRCode from "react-native-qrcode-svg";
import { exampleData } from "@/data/data";
import Toast from "react-native-toast-message";
import { SafeAreaView } from "react-native-safe-area-context";
import { Car, CarInfo } from "../car-details/[id]";

export default function RentedCar() {
	const { id } = useLocalSearchParams();
	const router = useRouter();
	const car = exampleData.rentedCars.find(
		(car) => car.id === Number(id)
	) as Car;

	if (!car) {
		return (
			<SafeAreaView style={{ paddingHorizontal: 16 }}>
				<Text style={styles.errorText}>Car not found!</Text>
			</SafeAreaView>
		);
	}

	const handleCancel = () => {
		Alert.alert(
			"Are you sure?",
			`Do you want to cancel the rental of ${car.name}?`,
			[
				{
					text: "Cancel",
					style: "cancel",
				},
				{
					text: "Confirm",
					style: "destructive",
					onPress: () => {
						exampleData.rentedCars = exampleData.rentedCars.filter(
							(c) => c.id !== car.id
						);
						router.push("/dashboard");
					},
				},
			]
		);
		Toast.show({
			type: "success",
			text1: "Rental Canceled",
			text2: `${car.name} has been removed from your rented cars. 🚗`,
		});
	};

	return (
		<SafeAreaView
			style={{ paddingHorizontal: 16, alignItems: "center" }}
			edges={["right", "bottom", "left"]}
		>
			{/* Car Image */}
			<Image
				source={
					car.image
						? { uri: car.image }
						: require("../../assets/images/car-fallback.png")
				}
				style={styles.carImage}
				resizeMode="contain"
			/>

			{/* Car Details */}
			<Text style={styles.carName}>{car.name}</Text>
			<CarInfo car={car} />

			{/* Rental Period */}
			<Text style={styles.sectionHeader}>Rental Period</Text>
			<Text style={styles.rentalDates}>
				From: {car.pickupDate}
				{"\n"}
				To: {car.returnDate}
			</Text>

			{/* QR Code */}
			<QRCode value={`Rental ID: ${car.id}`} size={150} />

			{/* Buttons */}
			<Pressable
				style={styles.backButton}
				onPress={() => router.push("/dashboard")}
			>
				<Text style={styles.backButtonText}>Back to Your Cars</Text>
			</Pressable>

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
	carImage: {
		width: "100%",
		marginVertical: 16,
	},
	carName: {
		fontSize: 24,
		fontWeight: "bold",
		color: "#00246B",
		textAlign: "center",
		marginBottom: 16,
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
		textAlign: "center",
	},
	backButton: {
		backgroundColor: "#00246B",
		paddingVertical: 12,
		paddingHorizontal: 16,
		borderRadius: 8,
		marginTop: 16,
	},
	backButtonText: {
		color: "#ffffff",
		fontWeight: "bold",
		textAlign: "center",
	},
	cancelButton: {
		backgroundColor: "#FF4D4D",
		paddingVertical: 12,
		paddingHorizontal: 16,
		borderRadius: 8,
		marginTop: 16,
	},
	cancelButtonText: {
		color: "#ffffff",
		fontWeight: "bold",
		textAlign: "center",
	},
	errorText: {
		fontSize: 18,
		fontWeight: "bold",
		color: "red",
		textAlign: "center",
	},
});
