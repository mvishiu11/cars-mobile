import React from "react";
import {
	View,
	Text,
	Pressable,
	Image,
	ImageBackground,
	StyleSheet,
} from "react-native";
import { useRouter } from "expo-router";
import { useNavigation } from "@react-navigation/native";

export default function WelcomeScreen() {
	const router = useRouter();

	return (
		<View style={styles.mainContainer}>
			{/* Logo Section */}
			<View style={styles.logoContainer}>
				<Image
					source={require("@/assets/images/logo.png")}
					style={styles.logo}
					resizeMode="contain"
				/>
			</View>
			<ImageBackground
				source={require("@/assets/images/bg.png")}
				style={styles.imageBg}
			>
				{/* Text & Button Section */}
				<View style={styles.hero}>
					<Text style={styles.headerText}>
						Wheels?{"\n"}Anywhere, Anytime.
					</Text>
					<Pressable
						onPress={() => router.push("/login-register")}
						style={styles.button}
					>
						<Text style={styles.buttonText}>Get Started</Text>
					</Pressable>
				</View>
			</ImageBackground>
		</View>
	);
}

const styles = StyleSheet.create({
	mainContainer: { flex: 1, backgroundColor: "white" },
	logoContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		marginTop: 48,
	},
	logo: { width: 150 },
	buttonText: { color: "white", fontWeight: "bold", fontSize: 16 },
	button: {
		backgroundColor: "#00246B",
		paddingVertical: 12,
		paddingHorizontal: 24,
		borderRadius: 8,
	},
	headerText: {
		fontSize: 32,
		fontWeight: "bold",
		color: "white",
		textAlign: "center",
		marginBottom: 16,
	},
	hero: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		paddingHorizontal: 24,
	},
	imageBg: {
		flex: 9,
		justifyContent: "center",
		alignItems: "center",
	},
});
