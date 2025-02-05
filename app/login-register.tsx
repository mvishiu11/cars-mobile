import React, { useState } from "react";
import {
	View,
	Text,
	TextInput,
	Pressable,
	Image,
	StyleSheet,
	KeyboardAvoidingView,
	Platform,
	Keyboard,
	TouchableWithoutFeedback,
	Alert,
} from "react-native";
import SegmentedControl from "@react-native-segmented-control/segmented-control";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LoginRegisterScreen() {
	const [activeTab, setActiveTab] = useState(false);
	const [email, setEmail] = useState("");
	const router = useRouter();

	const handleAuth = async () => {
		const endpoint = process.env.EXPO_PUBLIC_API_URL + (activeTab ?  "/customers/login" : "/customers/");
		try {
			const response = await fetch(endpoint, {
				method: activeTab ? "PUT" : "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ email }),
			});

			if (response.status === 200 || response.status === 201) {
				router.push("/dashboard");
			} else if (response.status === 409) {
				Alert.alert("Error", "Email already exists or invalid credentials.");
			} else {
				Alert.alert("Error", "An unexpected error occurred. Please try again.");
			}
		} catch (error) {
			Alert.alert("Error", "Failed to connect to the server.");
		}
	};

	return (
		<SafeAreaView style={styles.container}>
			{/* Logo */}
			<View style={styles.logoContainer}>
				<Image source={require("@/assets/images/logo.png")} style={styles.logo} resizeMode="contain" />
			</View>
			<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
				<KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.keyboardAvoidingView}>
					{/* Tabs */}
					<SegmentedControl values={["Register", "Login"]} selectedIndex={activeTab ? 1 : 0} appearance="light" onChange={() => setActiveTab(!activeTab)} style={{ marginBottom: 16 }} />
					{/* Tab Content */}
					<View>
						<Text style={styles.header}>{activeTab ? "Login" : "Register"}</Text>
						<Text style={{ color: "#888", marginBottom: 16 }}>{activeTab ? "Enter your credentials that you used to register." : "Enter your email address."}</Text>
						<TextInput placeholder="Email" style={styles.input} placeholderTextColor={"#888"} value={email} onChangeText={setEmail} />
						<Pressable style={styles.button} onPress={handleAuth}>
							<Text style={styles.buttonText}>{activeTab ? "Login" : "Register"}</Text>
						</Pressable>
					</View>
				</KeyboardAvoidingView>
			</TouchableWithoutFeedback>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: { flex: 1, paddingHorizontal: 24, backgroundColor: "white" },
	logoContainer: { alignItems: "center" },
	logo: { width: 150, height: undefined, aspectRatio: 929 / 347 },
	keyboardAvoidingView: {
		flex: 1,
		justifyContent: "center",
		backgroundColor: "white",
	},
	header: { fontSize: 18, fontWeight: "bold", marginBottom: 8 },
	button: {
		backgroundColor: "#00246B",
		paddingVertical: 12,
		paddingHorizontal: 24,
		borderRadius: 8,
		alignItems: "center",
	},
	buttonText: { color: "white", fontWeight: "bold", fontSize: 16 },
	input: {
		borderWidth: 1,
		borderColor: "#ddd",
		borderRadius: 8,
		padding: 12,
		marginBottom: 16,
		backgroundColor: "#f9f9f9",
	},
});
