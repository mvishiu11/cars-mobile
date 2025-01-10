import React, { useRef, useState } from "react";
import { View, Text, Image, Pressable, StyleSheet } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import Checkbox from "expo-checkbox";

import Toast from "react-native-toast-message";
import { exampleData } from "@/data/data";
import { FontAwesome5 } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import DateTimeSelector, {
	getNextAvailableDate,
} from "@/components/DateTimeSelector";

export type Fuel = "Gasoline" | "Diesel" | "Electric" | "Hybrid";

export interface Car {
	id: number;
	name: string;
	image: null;
	location: string;
	distance: number;
	seats: number;
	price: number;
	year: number;
	doors: number;
	fuel: Fuel;
	capacity: number;
	pickupDate?: string;
	returnDate?: string;
}

export const CarInfo = ({ car }: { car: Car }) => {
	return (
		<View style={styles.carInfo}>
			<View style={{ flexGrow: 1 }}>
				<Text>
					<FontAwesome5
						name="map-marker-alt"
						size={14}
						color="#00246B"
					/>{" "}
					{car.location} • {car.distance} km
				</Text>
				<Text>
					<FontAwesome5 name="users" size={14} color="#00246B" />{" "}
					{car.seats} Seats
				</Text>
				<Text>
					<FontAwesome5 name="gas-pump" size={14} color="#00246B" />{" "}
					{car.fuel}
				</Text>
			</View>
			<View style={{ flexGrow: 1 }}>
				<Text>
					<FontAwesome5 name="calendar" size={14} color="#00246B" />{" "}
					{car.year}
				</Text>
				<Text>
					<FontAwesome5 name="door-open" size={14} color="#00246B" />{" "}
					{car.doors} Doors
				</Text>
				<Text>
					<FontAwesome5 name="box" size={14} color="#00246B" />{" "}
					{car.capacity} liters
				</Text>
			</View>
		</View>
	);
};

export default function CarDetails() {
	const { id } = useLocalSearchParams();
	const car = exampleData.cars.find((car) => car.id === Number(id)) as Car;
	const [termsAccepted, setTermsAccepted] = useState(false);

	const nextAvailableDate = getNextAvailableDate();

	const [pickupDate, setPickupDate] = useState(nextAvailableDate);
	const [isPickupDateModalOpen, setPickupDateModalOpen] = useState(false);
	const [isPickupTimeModalOpen, setPickupTimeModalOpen] = useState(false);
	const [returnDate, setReturnDate] = useState(nextAvailableDate);
	const [isReturnDateModalOpen, setReturnDateModalOpen] = useState(false);
	const [isReturnTimeModalOpen, setReturnTimeModalOpen] = useState(false);
	const router = useRouter();

	if (!car) {
		return (
			<SafeAreaView style={{ paddingHorizontal: 32 }}>
				<Text style={styles.errorText}>Car not found!</Text>
			</SafeAreaView>
		);
	}

	const carFallbackImage = require("../../assets/images/car-fallback.png");

	const handleRent = () => {
		if (!pickupDate || !returnDate) {
			Toast.show({
				type: "error",
				text1: "Error",
				text2: "Please fill in both pickup and return dates.",
			});
			return;
		}

		exampleData.rentedCars = exampleData.rentedCars || [];
		const rentedCar = {
			...car,
			id: exampleData.rentedCars.length + 1,
			pickupDate: pickupDate.toISOString(),
			returnDate: returnDate.toISOString(),
		};
		exampleData.rentedCars.push(rentedCar);

		Toast.show({
			type: "success",
			text1: "Car Rented!",
			text2: `${car.name} has been successfully rented. 🚗`,
		});

		router.push({
			pathname: "/rent-success",
			params: rentedCar,
		});
	};

	return (
		<SafeAreaView style={{ paddingHorizontal: 32 }}>
			{/* Car Image */}
			<Image
				source={car.image ? { uri: car.image } : carFallbackImage}
				style={styles.carImage}
				resizeMode="contain"
			/>
			{/* Car Info */}
			<Text style={styles.carName}>{car.name}</Text>
			<Text style={styles.carPrice}>{car.price} zł / day</Text>
			<CarInfo car={car} />

			{/* Renting Form */}
			<Text style={styles.sectionHeader}>Start Renting</Text>
			<DateTimeSelector
				dateTime={pickupDate}
				setDateTime={(date: Date) => {
					setPickupDate(date);
					setReturnDate(date);
				}}
				isDateModalOpen={isPickupDateModalOpen}
				setDateModalOpen={setPickupDateModalOpen}
				isTimeModalOpen={isPickupTimeModalOpen}
				setTimeModalOpen={setPickupTimeModalOpen}
			/>
			<Text style={styles.sectionHeader}>End Renting</Text>
			<DateTimeSelector
				dateTime={returnDate}
				setDateTime={setReturnDate}
				isDateModalOpen={isReturnDateModalOpen}
				setDateModalOpen={setReturnDateModalOpen}
				isTimeModalOpen={isReturnTimeModalOpen}
				setTimeModalOpen={setReturnTimeModalOpen}
			/>
			{/* Terms and Conditions */}
			<View style={styles.checkboxContainer}>
				<Checkbox
					value={termsAccepted}
					onValueChange={() => setTermsAccepted(!termsAccepted)}
					style={{ borderColor: "#00246B" }}
					color={"#00246B"}
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
				<Text style={styles.rentButtonText}>Rent</Text>
			</Pressable>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	carImage: {
		width: "100%",
		marginBottom: 16,
		borderRadius: 8,
	},
	carName: {
		fontSize: 24,
		fontWeight: "bold",
		color: "#00246B",
		marginBottom: 8,
		textAlign: "center",
	},
	carPrice: {
		fontSize: 18,
		fontWeight: "bold",
		color: "#00246B",
		marginBottom: 16,
		textAlign: "center",
	},
	carInfo: {
		flexDirection: "row",
		//justifyContent: "space-between",
		marginBottom: 16,
	},
	sectionHeader: {
		fontWeight: "bold",
		marginBottom: 8,
		fontSize: 16,
	},
	input: {
		borderWidth: 1,
		borderColor: "#ddd",
		borderRadius: 8,
		padding: 12,
		marginBottom: 16,
		backgroundColor: "#f9f9f9",
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
		backgroundColor: "#00246B",
		paddingVertical: 16,
		borderRadius: 8,
	},
	rentButtonText: {
		color: "#ffffff",
		fontWeight: "bold",
		textAlign: "center",
		fontSize: 16,
	},
	errorText: {
		color: "red",
		fontWeight: "bold",
		textAlign: "center",
		fontSize: 18,
	},
});
