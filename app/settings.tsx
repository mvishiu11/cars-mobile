import React, { useState } from "react";
import { View, Text, TextInput, Pressable, StyleSheet } from "react-native";
import SafeLayout from "../components/SafeLayout";
import Toast from "react-native-toast-message";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Settings() {
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");

	const handleUpdate = () => {
		if (!email && !username) {
			Toast.show({
				type: "error",
				text1: "Error",
				text2: "Please fill out at least one field.",
			});
			return;
		}

		console.log(`Updated email: ${email}, username: ${username}`);

		Toast.show({
			type: "success",
			text1: "Success",
			text2: "Your settings have been updated.",
		});

		setEmail("");
		setUsername("");
	};

	return (
			<SafeAreaView style={styles.container}>
				<View style={styles.card}>
					<Text style={styles.header}>User Settings</Text>
					<Text style={styles.subHeader}>
						Enter your new email/username.
						{"\n"}Leave empty to keep it as-is.
					</Text>

					<View style={styles.formGroup}>
						<Text style={styles.label}>Email</Text>
						<TextInput
							style={styles.input}
							placeholder="email@example.com"
							value={email}
							onChangeText={setEmail}
						/>
					</View>

					<View style={styles.formGroup}>
						<Text style={styles.label}>Username</Text>
						<TextInput
							style={styles.input}
							placeholder="Username"
							value={username}
							onChangeText={setUsername}
						/>
					</View>

					<Pressable style={styles.updateButton} onPress={handleUpdate}>
						<Text style={styles.updateButtonText}>Update</Text>
					</Pressable>
				</View>

				<Toast />
			</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 16,
		justifyContent: "center",
		backgroundColor: "#f9f9f9",
	},
	card: {
		backgroundColor: "#ffffff",
		padding: 20,
		borderRadius: 12,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
		elevation: 4,
	},
	header: {
		fontSize: 24,
		fontWeight: "bold",
		color: "#003366",
		textAlign: "center",
		marginBottom: 16,
	},
	subHeader: {
		fontSize: 14,
		color: "#666",
		textAlign: "center",
		marginBottom: 24,
	},
	formGroup: {
		marginBottom: 16,
	},
	label: {
		fontSize: 16,
		fontWeight: "bold",
		color: "#003366",
		marginBottom: 8,
	},
	input: {
		borderWidth: 1,
		borderColor: "#ccc",
		borderRadius: 8,
		paddingHorizontal: 12,
		paddingVertical: 8,
		backgroundColor: "#f7f7f7",
	},
	updateButton: {
		backgroundColor: "#003366",
		paddingVertical: 14,
		borderRadius: 8,
		alignItems: "center",
		marginTop: 16,
	},
	updateButtonText: {
		color: "#ffffff",
		fontWeight: "bold",
		fontSize: 16,
	},
});
