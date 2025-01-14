import { UserContext } from "@/context/UserContext";
import { FontAwesome5 } from "@expo/vector-icons";
import { DrawerHeaderProps } from "@react-navigation/drawer";
import { useNavigation } from "@react-navigation/native";
import { useRouter, useSegments } from "expo-router";
import { useContext } from "react";
import { View, Pressable, Image, StyleSheet } from "react-native";

const Header = (props: DrawerHeaderProps) => {
	const router = useRouter();
	const segments = useSegments();

	const isDashboard = segments[0] === "dashboard";

	return (
		<View style={styles.header}>
			{/* Sidebar Button */}
			<Pressable
				onPress={() => props.navigation.openDrawer()}
				style={styles.iconButton}
			>
				<FontAwesome5 name="bars" size={24} color="#00246B" />
			</Pressable>

			{/* Logo */}
			<Image
				source={require("@/assets/images/logo.png")}
				style={styles.logo}
				resizeMode="contain"
			/>

			{/* Logout/Back Button */}
			{!isDashboard ? (
				<Pressable
					onPress={() => router.back()}
					style={styles.iconButton}
				>
					<FontAwesome5 name="arrow-left" size={24} color="#00246B" />
				</Pressable>
			) : (
				<View style={styles.iconButton}>
					<FontAwesome5 name="arrow-left" size={24} color="#fff" />
				</View>
			)}
		</View>
	);
};
export default Header;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	header: {
		flexDirection: "row",
		alignItems: "flex-end",
		justifyContent: "space-between",
		padding: 16,
		backgroundColor: "#fff",
		borderBottomWidth: 1,
		borderBottomColor: "#ddd",
		height: 120,
	},
	logo: {
		width: 120,
		height: undefined,
		aspectRatio: 929 / 347,
	},
	iconButton: {
		padding: 8,
	},
	content: {
		flex: 1,
		padding: 16,
	},
});
