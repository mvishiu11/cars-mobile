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
} from "react-native";
import SegmentedControl from "@react-native-segmented-control/segmented-control";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LoginRegisterScreen() {
	const [activeTab, setActiveTab] = useState(false);
	const router = useRouter();

	return (
		<SafeAreaView style={styles.container}>
			{/* Logo */}
			<View style={styles.logoContainer}>
				<Image
					source={require("../assets/images/logo.png")}
					style={styles.logo}
					resizeMode="contain"
				/>
			</View>

			<KeyboardAvoidingView
				behavior={Platform.OS === "ios" ? "padding" : undefined}
				style={styles.keyboardAvoidingView}
			>
				{/* Tabs */}
				<SegmentedControl
					values={["Register", "Login"]}
					selectedIndex={activeTab ? 1 : 0}
					appearance="light"
					onChange={() => setActiveTab(!activeTab)}
					style={{ marginBottom: 16 }}
				/>

				{/* Tab Content */}
				{activeTab ? (
					<View>
						<Text style={styles.header}>Login</Text>
						<Text style={{ color: "#888", marginBottom: 16 }}>
							Enter your credentials that you used to register.
						</Text>
						<TextInput
							placeholder="Username or Email"
							style={styles.input}
							placeholderTextColor={"#888"}
						/>
						<TextInput
							placeholder="Password"
							secureTextEntry
							style={styles.input}
							placeholderTextColor={"#888"}
						/>
						<Pressable
							style={styles.button}
							onPress={() => router.push("/dashboard")}
						>
							<Text style={styles.buttonText}>Login</Text>
						</Pressable>
					</View>
				) : (
					<View>
						<Text style={styles.header}>Register</Text>
						<Text style={{ color: "#888", marginBottom: 16 }}>
							Enter your email address and choose your username.
						</Text>
						<TextInput
							placeholder="Email"
							style={styles.input}
							placeholderTextColor={"#888"}
						/>
						<TextInput
							placeholder="Username"
							style={styles.input}
							placeholderTextColor={"#888"}
						/>
						<TextInput
							placeholder="Password"
							secureTextEntry
							style={styles.input}
							placeholderTextColor={"#888"}
						/>
						<Pressable style={styles.button}>
							<Text style={styles.buttonText}>Register</Text>
						</Pressable>
					</View>
				)}
			</KeyboardAvoidingView>
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
		marginBottom: 96,
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
