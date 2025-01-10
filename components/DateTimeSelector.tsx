import React, { useRef } from "react";
import DateTimePicker, {
	DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import {
	Button,
	Modal,
	Platform,
	Pressable,
	StyleSheet,
	Text,
	View,
} from "react-native";

export const getNextAvailableDate = () => {
	let nextAvailableDate = new Date();
	if (nextAvailableDate.getMinutes() % 15 !== 0) {
		nextAvailableDate.setMinutes(
			nextAvailableDate.getMinutes() +
				15 -
				(nextAvailableDate.getMinutes() % 15)
		);
	}
	return nextAvailableDate;
};

export interface DateTimeSelectorProps {
	dateTime: Date;
	setDateTime: (date: Date) => void;
	isDateModalOpen: boolean;
	setDateModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
	isTimeModalOpen: boolean;
	setTimeModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const DateTimeSelector = ({
	dateTime,
	setDateTime,
	isDateModalOpen,
	setDateModalOpen,
	isTimeModalOpen,
	setTimeModalOpen,
}: DateTimeSelectorProps) => {
	const dateRef = useRef<Date>(new Date());

	let nextAvailableDate = new Date();
	if (nextAvailableDate.getMinutes() % 15 !== 0) {
		nextAvailableDate.setMinutes(
			nextAvailableDate.getMinutes() +
				15 -
				(nextAvailableDate.getMinutes() % 15)
		);
	}

	// Common Handlers
	const closeDateModal = () => {
		setDateModalOpen(false);
	};
	const closeTimeModal = () => {
		setTimeModalOpen(false);
	};
	const openDateModal = () => {
		setDateModalOpen(true);
	};
	const openTimeModal = () => {
		setTimeModalOpen(true);
	};
	// IOS Handlers
	const iosChangeHandler = (event: DateTimePickerEvent, date?: Date) => {
		if (event.type === "set" && date) {
			dateRef.current = date;
		}
	};
	const iosSetDateHandler = () => {
		closeDateModal();
		setDateTime(dateRef.current);
	};
	const iosSetTimeHandler = () => {
		closeTimeModal();
		setDateTime(dateRef.current);
	};
	// Android Handlers
	const androidDateChangeHandler = (
		event: DateTimePickerEvent,
		date?: Date
	) => {
		closeDateModal();
		if (event.type === "set" && date) {
			dateRef.current = date;
			setDateTime(dateRef.current);
		}
	};
	const androidTimeChangeHandler = (
		event: DateTimePickerEvent,
		date?: Date
	) => {
		closeTimeModal();
		if (event.type === "set" && date) {
			if (date < new Date()) {
				alert("Please select a future time.");
			} else {
				if (date.getMinutes() % 15 === 0) {
					dateRef.current = date;
					setDateTime(dateRef.current);
				} else {
					alert(
						"Please select a time that is a multiple of 15 minutes."
					);
				}
			}
		}
	};

	return (
		<>
			{Platform.OS === "ios" ? (
				<Modal
					visible={isDateModalOpen}
					transparent={true}
					animationType="fade"
				>
					<View style={styles.modalBackground}>
						<View style={styles.modal}>
							<DateTimePicker
								mode="date"
								display="inline"
								value={dateTime}
								minimumDate={nextAvailableDate}
								themeVariant="light"
								textColor="#000"
								accentColor="#00246B"
								onChange={iosChangeHandler}
							/>
							<View style={styles.buttonGroup}>
								<View style={{ width: "50%" }}>
									<Button
										onPress={closeDateModal}
										title="Cancel"
										color={"#ff0000"}
									/>
								</View>
								<View style={{ width: "50%" }}>
									<Button
										title="Set"
										onPress={iosSetDateHandler}
									/>
								</View>
							</View>
						</View>
					</View>
				</Modal>
			) : (
				isDateModalOpen && (
					<DateTimePicker
						value={dateTime}
						minimumDate={nextAvailableDate}
						onChange={androidDateChangeHandler}
					/>
				)
			)}
			{Platform.OS === "ios" ? (
				<Modal
					visible={isTimeModalOpen}
					transparent={true}
					animationType="fade"
				>
					<View style={styles.modalBackground}>
						<View style={styles.modal}>
							<DateTimePicker
								mode="time"
								display="spinner"
								minuteInterval={15}
								value={dateTime}
								minimumDate={nextAvailableDate}
								themeVariant="light"
								textColor="#000"
								accentColor="#00246B"
								onChange={iosChangeHandler}
							/>
							<View style={styles.buttonGroup}>
								<View style={{ width: "50%" }}>
									<Button
										onPress={closeTimeModal}
										title="Cancel"
										color={"#ff0000"}
									/>
								</View>
								<View style={{ width: "50%" }}>
									<Button
										title="Set"
										onPress={iosSetTimeHandler}
									/>
								</View>
							</View>
						</View>
					</View>
				</Modal>
			) : (
				isTimeModalOpen && (
					<DateTimePicker
						value={dateTime}
						mode="time"
						positiveButton={{ label: "Set" }}
						negativeButton={{
							label: "Cancel",
							textColor: "#ff0000",
						}}
						onChange={androidTimeChangeHandler}
					/>
				)
			)}
			<View
				style={{
					flexDirection: "row",
					gap: 16,
				}}
			>
				<Pressable onPress={openDateModal} style={{ flex: 1 }}>
					<Text style={styles.input}>
						{new Intl.DateTimeFormat("pl-PL", {
							dateStyle: "short",
						}).format(dateTime)}
					</Text>
				</Pressable>
				<Pressable onPress={openTimeModal} style={{ flex: 1 }}>
					<Text style={styles.input}>
						{new Intl.DateTimeFormat("pl-PL", {
							timeZone: "Europe/Warsaw",
							timeStyle: "short",
						}).format(dateTime)}
					</Text>
				</Pressable>
			</View>
		</>
	);
};
export default DateTimeSelector;

const styles = StyleSheet.create({
	modalBackground: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "rgba(0, 0, 0, 0.75)",
	},
	modal: {
		backgroundColor: "#fff",
		borderRadius: 16,
		justifyContent: "center",
		alignItems: "center",
		marginHorizontal: 16,
	},
	buttonGroup: {
		flexDirection: "row",
		justifyContent: "space-evenly",
		paddingVertical: 8,
	},
	input: {
		borderWidth: 1,
		borderColor: "#ddd",
		borderRadius: 8,
		padding: 12,
		marginBottom: 16,
		backgroundColor: "#f9f9f9",
	},
});
