import { exampleData } from "@/data/data";
import { FontAwesome5 } from "@expo/vector-icons";
import {
	DrawerContentComponentProps,
	DrawerItemList,
	useDrawerStatus,
} from "@react-navigation/drawer";
import { router } from "expo-router";
import {
	Image,
	Platform,
	Pressable,
	StyleSheet,
	Text,
	View,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

const CustomDrawerContent = (props: DrawerContentComponentProps) => {
	const isDrawerOpen = useDrawerStatus() === "open";
	return (
		(isDrawerOpen || Platform.OS !== "android") && (
			<SafeAreaProvider>
				<SafeAreaView style={{ flex: 1 }}>
					<View style={styles.container}>
						<View style={styles.userInfo}>
							<Image
								source={require("@/assets/images/adaptive-icon.png")}
								resizeMode="contain"
								style={styles.avatar}
							/>
							<Text style={styles.username}>
								{exampleData.username}
							</Text>
						</View>
						<DrawerItemList {...props} />
						<View style={styles.footer}>
							<Pressable
								onPress={() => router.push("/login-register")}
								style={styles.logoutButton}
							>
								<FontAwesome5
									name="sign-out-alt"
									size={24}
									color="#fff"
								/>
								<Text style={styles.buttonText}>Log Out</Text>
							</Pressable>
						</View>
					</View>
				</SafeAreaView>
			</SafeAreaProvider>
		)
	);
};
export default CustomDrawerContent;

const styles = StyleSheet.create({
	container: { flex: 1, paddingHorizontal: 16 },
	userInfo: {
		flexDirection: "row",
		alignItems: "center",
		gap: 16,
		marginBottom: 16,
		borderBottomWidth: 1,
		borderBottomColor: "#00246B",
		paddingBottom: 8,
	},
	avatar: {
		width: 64,
		height: 64,
		borderRadius: 40,
		borderWidth: 1,
		borderColor: "#00246B",
		marginBottom: 8,
	},
	username: {
		fontSize: 18,
		fontWeight: "bold",
		color: "#00246B",
	},
	footer: {
		alignItems: "flex-end",
		flex: 1,
		flexDirection: "row",
	},
	logoutButton: {
		flexDirection: "row",
		alignItems: "center",
		gap: 8,
		backgroundColor: "#00246B",
		padding: 8,
		borderRadius: 8,
	},
	buttonText: {
		color: "#fff",
		fontWeight: "bold",
	},
});
