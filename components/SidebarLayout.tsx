import React from "react";
import {
	View,
	Text,
	StyleSheet,
	Image,
	Pressable,
	Dimensions,
} from "react-native";
import {
	DrawerContentScrollView,
	DrawerItemList,
} from "@react-navigation/drawer";
import { FontAwesome5 } from "@expo/vector-icons";
import { exampleData } from "@/data/data";
import { useRouter } from "expo-router";

export default function Sidebar(props: any) {
	const screenHeight = Dimensions.get("window").height;
	const router = useRouter();

	return (
		<DrawerContentScrollView {...props}>
			{/* User Info */}
			<View style={styles.userInfo}>
				<Text style={styles.username}>{exampleData.username}</Text>
			</View>

			{/* Navigation Links */}
			<View style={styles.navLinks}>
				<DrawerItemList {...props} />
			</View>

			{/* Footer Buttons */}
			<View style={[styles.footer, { top: screenHeight * 0.9 }]}>
				{/* Logout Button */}
				<Pressable
					style={[styles.iconButton, styles.logoutButton]}
					onPress={() => {
						console.log("Logged out");
						router.replace("/login-register");
					}}
				>
					<FontAwesome5 name="sign-out-alt" size={18} color="#fff" />
				</Pressable>

				{/* Close Drawer Button */}
				<Pressable
					style={[styles.iconButton, styles.closeButton]}
					onPress={() => props.navigation.closeDrawer()}
				>
					<FontAwesome5 name="times" size={18} color="#fff" />
				</Pressable>
			</View>
		</DrawerContentScrollView>
	);
}

const styles = StyleSheet.create({
	userInfo: {
		alignItems: "center",
		marginBottom: 20,
		paddingTop: 16,
		borderBottomWidth: 1,
		borderBottomColor: "#ddd",
		paddingBottom: 16,
	},
	avatar: {
		width: 80,
		height: 80,
		borderRadius: 40,
		backgroundColor: "#ddd",
		marginBottom: 8,
	},
	username: {
		fontSize: 18,
		fontWeight: "bold",
		color: "#003366",
	},
	navLinks: {
		marginVertical: 16,
	},
	footer: {
		position: "absolute",
		flexDirection: "row",
		justifyContent: "space-between",
		left: 16,
		right: 16,
	},
	iconButton: {
		backgroundColor: "#003366",
		padding: 12,
		borderRadius: 50,
		alignItems: "center",
		justifyContent: "center",
	},
	logoutButton: {
		position: "absolute",
		left: 16,
	},
	closeButton: {
		position: "absolute",
		right: 16,
	},
});
