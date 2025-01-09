import React, { useRef, useState } from "react";
import {
	View,
	Text,
	Image,
	TextInput,
	Pressable,
	StyleSheet,
	ScrollView,
	Modal,
	Button,
	Platform,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import Checkbox from "expo-checkbox";
import DatePicker from "react-native-date-picker";
import DateTimePicker from "@react-native-community/datetimepicker";

import Toast from "react-native-toast-message";
import { exampleData } from "@/data/data";
import { FontAwesome5 } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { P } from "dripsy";

export default function CarDetails() {
	const { id } = useLocalSearchParams();
	const car = exampleData.cars.find((car) => car.id === Number(id));
	const [termsAccepted, setTermsAccepted] = useState(false);
	const [pickupDate, setPickupDate] = useState(new Date());
	const [isPickupDateModalOpen, setPickupDateModalOpen] = useState(false);
	const [returnDate, setReturnDate] = useState(new Date());
	const [isReturnDateModalOpen, setReturnDateModalOpen] = useState(false);
	const dateRef = useRef(new Date());
	const router = useRouter();

	if (!car) {
		return (
			<SafeAreaView style={{ paddingHorizontal: 16 }}>
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
			params: {
				carName: car.name,
				startDate: pickupDate.toISOString(),
				endDate: returnDate.toISOString(),
				pricePerDay: car.price,
			},
		});
	};

	return (
		<SafeAreaView style={{ paddingHorizontal: 16 }}>
			<ScrollView contentContainerStyle={styles.scrollContent}>
				{/* Car Image */}
				<Image
					source={car.image ? { uri: car.image } : carFallbackImage}
					style={styles.carImage}
					resizeMode="contain"
				/>
				{/* Car Info */}
				<Text style={styles.carName}>{car.name}</Text>
				<Text style={styles.carPrice}>{car.price} zł / day</Text>
				<View style={styles.carDetails}>
					<Text>
						<FontAwesome5 name="map-marker-alt" /> {car.location} •{" "}
						{car.distance}
					</Text>
					<Text>
						<FontAwesome5 name="users" size={14} color="#003366" />{" "}
						{car.seats} Seats
					</Text>
					<Text>
						<FontAwesome5
							name="gas-pump"
							size={14}
							color="#003366"
						/>{" "}
						{car.fuel}
					</Text>
					<Text>
						<FontAwesome5
							name="calendar"
							size={14}
							color="#003366"
						/>{" "}
						{car.year}
					</Text>
					<Text>
						<FontAwesome5
							name="door-open"
							size={14}
							color="#003366"
						/>{" "}
						{car.doors} Doors
					</Text>
					<Text>
						<FontAwesome5 name="box" size={14} color="#003366" />{" "}
						{car.capacity}
					</Text>
				</View>

				{/* Renting Form */}
				<Text style={styles.sectionHeader}>Start Renting</Text>
				{Platform.OS === "ios" ? (
					<Modal
						visible={isPickupDateModalOpen}
						transparent={true}
						animationType="fade"
					>
						<View
							style={{
								flex: 1,
								justifyContent: "center",
								alignItems: "center",
								backgroundColor: "rgba(0, 0, 0, 0.75)",
							}}
						>
							<View
								style={{
									backgroundColor: "#fff",
									borderRadius: 16,
									justifyContent: "center",
									alignItems: "center",
									marginHorizontal: 16,
								}}
							>
								<DateTimePicker
									mode="datetime"
									display="inline"
									value={pickupDate}
									minuteInterval={15}
									minimumDate={new Date()}
									themeVariant="light"
									textColor="#000"
									accentColor="#00246B"
									onChange={(event, date) => {
										if (event.type === "set" && date) {
											dateRef.current = date;
											if (Platform.OS === "android") {
												setPickupDate(dateRef.current);
												setReturnDate(dateRef.current);
											}
										} else {
											if (Platform.OS !== "ios") {
												setPickupDateModalOpen(false);
											}
										}
									}}
								/>
								<View
									style={{
										flexDirection: "row",
										justifyContent: "space-evenly",
										paddingVertical: 8,
									}}
								>
									<View style={{ width: "50%" }}>
										<Button
											onPress={() =>
												setPickupDateModalOpen(false)
											}
											title="Cancel"
											color={"#ff0000"}
										/>
									</View>
									<View style={{ width: "50%" }}>
										<Button
											title="Set"
											onPress={() => {
												setPickupDateModalOpen(false);
												setPickupDate(dateRef.current);
												setReturnDate(dateRef.current);
											}}
										/>
									</View>
								</View>
							</View>
						</View>
					</Modal>
				) : (
					isPickupDateModalOpen && (
						<DateTimePicker
							value={pickupDate}
							minuteInterval={15}
							minimumDate={new Date()}
							textColor="#000"
							accentColor="#00246B"
							onChange={(event, date) => {
								if (event.type === "set" && date) {
									dateRef.current = date;
									setPickupDate(dateRef.current);
									setReturnDate(dateRef.current);
								}
								setPickupDateModalOpen(false);
							}}
						/>
					)
				)}
				<Pressable onPress={() => setPickupDateModalOpen(true)}>
					<TextInput
						placeholder="Start Date (e.g., 2024-11-30T10:00:00)"
						editable={false}
						style={styles.input}
						value={pickupDate.toLocaleString().slice(0, -3)}
					/>
				</Pressable>
				<Text style={styles.sectionHeader}>End Renting</Text>
				<Modal
					visible={isReturnDateModalOpen}
					transparent={true}
					animationType="fade"
				>
					<View
						style={{
							flex: 1,
							justifyContent: "center",
							alignItems: "center",
							backgroundColor: "rgba(0, 0, 0, 0.75)",
						}}
					>
						<View
							style={{
								backgroundColor: "#fff",
								borderRadius: 16,
								justifyContent: "center",
								alignItems: "center",
								marginHorizontal: 16,
							}}
						>
							<DateTimePicker
								mode="datetime"
								display="inline"
								value={returnDate}
								minuteInterval={15}
								minimumDate={pickupDate}
								themeVariant="light"
								textColor="#000"
								accentColor="#00246B"
								onChange={(event, date) => {
									if (event.type === "set" && date) {
										dateRef.current = date;
										if (Platform.OS === "android") {
											setReturnDate(dateRef.current);
										}
									} else {
										if (Platform.OS !== "ios") {
											setReturnDateModalOpen(false);
										}
									}
								}}
							/>
							<View
								style={{
									flexDirection: "row",
									justifyContent: "space-evenly",
									paddingVertical: 8,
								}}
							>
								<View style={{ width: "50%" }}>
									<Button
										onPress={() =>
											setReturnDateModalOpen(false)
										}
										title="Cancel"
										color={"#ff0000"}
									/>
								</View>
								<View style={{ width: "50%" }}>
									<Button
										title="Set"
										onPress={() => {
											setReturnDateModalOpen(false);
											setReturnDate(dateRef.current);
										}}
									/>
								</View>
							</View>
						</View>
					</View>
				</Modal>
				<Pressable>
					<TextInput
						placeholder="Start Date (e.g., 2024-11-30T10:00:00)"
						editable={false}
						style={styles.input}
						value={returnDate.toLocaleString().slice(0, -3)}
						onPress={() => setReturnDateModalOpen(true)}
					/>
				</Pressable>
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
			</ScrollView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	scrollContent: {
		flexGrow: 1,
		padding: 16,
	},
	carImage: {
		width: "100%",
		height: 200,
		marginBottom: 16,
		borderRadius: 8,
	},
	carName: {
		fontSize: 24,
		fontWeight: "bold",
		color: "#003366",
		marginBottom: 8,
		textAlign: "center",
	},
	carPrice: {
		fontSize: 18,
		fontWeight: "bold",
		color: "#003366",
		marginBottom: 16,
		textAlign: "center",
	},
	carDetails: {
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
		backgroundColor: "#003366",
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
