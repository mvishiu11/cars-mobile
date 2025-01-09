import React, { useRef, useState } from "react";
import {
	View,
	Text,
	Image,
	Pressable,
	StyleSheet,
	ScrollView,
	Modal,
	Button,
	Platform,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import Checkbox from "expo-checkbox";
import DateTimePicker from "@react-native-community/datetimepicker";

import Toast from "react-native-toast-message";
import { exampleData } from "@/data/data";
import { FontAwesome5 } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CarDetails() {
	const { id } = useLocalSearchParams();
	const car = exampleData.cars.find((car) => car.id === Number(id));
	const [termsAccepted, setTermsAccepted] = useState(false);

	let nextAvailableDate = new Date();
	if (nextAvailableDate.getMinutes() % 15 !== 0) {
		nextAvailableDate.setMinutes(
			nextAvailableDate.getMinutes() +
				15 -
				(nextAvailableDate.getMinutes() % 15)
		);
	}

	const [pickupDate, setPickupDate] = useState(nextAvailableDate);
	const [isPickupDateModalOpen, setPickupDateModalOpen] = useState(false);
	const [isPickupTimeModalOpen, setPickupTimeModalOpen] = useState(false);
	const [returnDate, setReturnDate] = useState(nextAvailableDate);
	const [isReturnDateModalOpen, setReturnDateModalOpen] = useState(false);
	const [isReturnTimeModalOpen, setReturnTimeModalOpen] = useState(false);
	const dateRef = useRef(new Date());
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
			params: {
				carName: car.name,
				startDate: pickupDate.toISOString(),
				endDate: returnDate.toISOString(),
				pricePerDay: car.price,
			},
		});
	};

	return (
		<SafeAreaView style={{ paddingHorizontal: 32 }}>
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
									mode="date"
									display="inline"
									value={pickupDate}
									minimumDate={nextAvailableDate}
									themeVariant="light"
									textColor="#000"
									accentColor="#00246B"
									onChange={(event, date) => {
										if (event.type === "set" && date) {
											dateRef.current = date;
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
							minimumDate={nextAvailableDate}
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
				{Platform.OS === "ios" ? (
					<Modal
						visible={isPickupTimeModalOpen}
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
									mode="time"
									display="spinner"
									minuteInterval={15}
									value={pickupDate}
									minimumDate={nextAvailableDate}
									themeVariant="light"
									textColor="#000"
									accentColor="#00246B"
									onChange={(event, date) => {
										if (event.type === "set" && date) {
											dateRef.current = date;
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
												setPickupTimeModalOpen(false)
											}
											title="Cancel"
											color={"#ff0000"}
										/>
									</View>
									<View style={{ width: "50%" }}>
										<Button
											title="Set"
											onPress={() => {
												setPickupTimeModalOpen(false);
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
					isPickupTimeModalOpen && (
						<DateTimePicker
							value={pickupDate}
							mode="time"
							positiveButton={{ label: "Set" }}
							negativeButton={{
								label: "Cancel",
								textColor: "#ff0000",
							}}
							onChange={(event, date) => {
								if (event.type === "set" && date) {
									if (date < new Date()) {
										alert("Please select a future time.");
									} else {
										if (date.getMinutes() % 15 === 0) {
											dateRef.current = date;
											setPickupDate(dateRef.current);
											setReturnDate(dateRef.current);
										} else {
											alert(
												"Please select a time that is a multiple of 15 minutes."
											);
										}
									}
								}
								setPickupTimeModalOpen(false);
							}}
						/>
					)
				)}
				<View
					style={{
						flexDirection: "row",
						gap: 16,
					}}
				>
					<Pressable
						onPress={() => setPickupDateModalOpen(true)}
						style={{ flex: 1 }}
					>
						<Text style={styles.input}>
							{new Intl.DateTimeFormat("pl-PL", {
								dateStyle: "short",
							}).format(pickupDate)}
						</Text>
					</Pressable>
					<Pressable
						onPress={() => setPickupTimeModalOpen(true)}
						style={{ flex: 1 }}
					>
						<Text style={styles.input}>
							{new Intl.DateTimeFormat("pl-PL", {
								timeZone: "Europe/Warsaw",
								timeStyle: "short",
							}).format(pickupDate)}
						</Text>
					</Pressable>
				</View>
				<Text style={styles.sectionHeader}>End Renting</Text>
				{Platform.OS === "ios" ? (
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
									mode="date"
									display="inline"
									value={returnDate}
									minimumDate={pickupDate}
									themeVariant="light"
									textColor="#000"
									accentColor="#00246B"
									onChange={(event, date) => {
										if (event.type === "set" && date) {
											dateRef.current = date;
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
				) : (
					isReturnDateModalOpen && (
						<DateTimePicker
							value={returnDate}
							minimumDate={pickupDate}
							onChange={(event, date) => {
								if (event.type === "set" && date) {
									dateRef.current = date;
									setReturnDate(dateRef.current);
								}
								setReturnDateModalOpen(false);
							}}
						/>
					)
				)}
				{Platform.OS === "ios" ? (
					<Modal
						visible={isReturnTimeModalOpen}
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
									mode="time"
									display="spinner"
									minuteInterval={15}
									value={returnDate}
									minimumDate={pickupDate}
									themeVariant="light"
									textColor="#000"
									accentColor="#00246B"
									onChange={(event, date) => {
										if (event.type === "set" && date) {
											dateRef.current = date;
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
												setReturnTimeModalOpen(false)
											}
											title="Cancel"
											color={"#ff0000"}
										/>
									</View>
									<View style={{ width: "50%" }}>
										<Button
											title="Set"
											onPress={() => {
												setReturnTimeModalOpen(false);
												setReturnDate(dateRef.current);
											}}
										/>
									</View>
								</View>
							</View>
						</View>
					</Modal>
				) : (
					isReturnTimeModalOpen && (
						<DateTimePicker
							value={returnDate}
							mode="time"
							positiveButton={{ label: "Set" }}
							negativeButton={{
								label: "Cancel",
								textColor: "#ff0000",
							}}
							onChange={(event, date) => {
								if (event.type === "set" && date) {
									if (date < new Date()) {
										alert("Please select a future time.");
									} else {
										if (date.getMinutes() % 15 === 0) {
											dateRef.current = date;
											setReturnDate(dateRef.current);
										} else {
											alert(
												"Please select a time that is a multiple of 15 minutes."
											);
										}
									}
								}
								setReturnTimeModalOpen(false);
							}}
						/>
					)
				)}
				<View
					style={{
						flexDirection: "row",
						gap: 16,
					}}
				>
					<Pressable
						onPress={() => setReturnDateModalOpen(true)}
						style={{ flex: 1 }}
					>
						<Text style={styles.input}>
							{new Intl.DateTimeFormat("pl-PL", {
								dateStyle: "short",
							}).format(returnDate)}
						</Text>
					</Pressable>
					<Pressable
						onPress={() => setReturnTimeModalOpen(true)}
						style={{ flex: 1 }}
					>
						<Text style={styles.input}>
							{new Intl.DateTimeFormat("pl-PL", {
								timeZone: "Europe/Warsaw",
								timeStyle: "short",
							}).format(returnDate)}
						</Text>
					</Pressable>
				</View>
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
