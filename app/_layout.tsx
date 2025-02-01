import { DripsyProvider } from "dripsy";
import { UserProvider } from "../context/UserContext";
import Header from "@/components/Header";
import { Drawer } from "expo-router/drawer";
import { StatusBar } from "expo-status-bar";
import { Text, Image, View } from "react-native";
import SidebarLayout from "@/components/SidebarLayout";
import Toast, { BaseToast } from "react-native-toast-message";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome5, FontAwesome6 } from "@expo/vector-icons";
import CustomDrawerContent from "@/components/CustomDrawerContent";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const theme = {
	colors: {
		primary: "#00246B",
		secondary: "#044EEB",
		success: "#04EB2D",
		info: "#044eeb",
		error: "#EB044E",
		warning: "#EBA104",
	},
};

// Experimental
const toastConfig = {
	success: (props: any) => (
		<BaseToast
			{...props}
			renderLeadingIcon={() => (
				<View
					style={{
						justifyContent: "center",
						paddingLeft: 16,
					}}
				>
					<FontAwesome5
						name="check-circle"
						size={24}
						color="#04EB2D"
					/>
				</View>
			)}
			contentContainerStyle={{
				paddingLeft: 16,
				paddingVertical: 8,
			}}
			text1Style={{
				fontSize: 16,
				fontWeight: "bold",
			}}
			text2Style={{
				fontSize: 14,
				color: "#888",
			}}
			text2NumberOfLines={2}
			style={{
				borderRadius: 16,
				borderWidth: 2,
				borderColor: "#04EB2D",
				borderLeftWidth: 2,
				borderLeftColor: "#04EB2D",
				height: "auto",
			}}
		/>
	),
	info: (props: any) => (
		<BaseToast
			{...props}
			renderLeadingIcon={() => (
				<View
					style={{
						justifyContent: "center",
						paddingLeft: 16,
					}}
				>
					<FontAwesome5
						name="info-circle"
						size={24}
						color="#044eeb"
					/>
				</View>
			)}
			contentContainerStyle={{
				paddingLeft: 16,
				paddingVertical: 8,
			}}
			text1Style={{
				fontSize: 16,
				fontWeight: "bold",
			}}
			text2Style={{
				fontSize: 14,
				color: "#888",
			}}
			text2NumberOfLines={2}
			style={{
				borderRadius: 16,
				borderWidth: 2,
				borderColor: "#044eeb",
				borderLeftWidth: 2,
				borderLeftColor: "#044eeb",
				height: "auto",
			}}
		/>
	),
	error: (props: any) => (
		<BaseToast
			{...props}
			renderLeadingIcon={() => (
				<View
					style={{
						justifyContent: "center",
						paddingLeft: 16,
					}}
				>
					<FontAwesome5
						name="info-circle"
						size={24}
						color="#EB044E"
					/>
				</View>
			)}
			contentContainerStyle={{
				paddingLeft: 16,
				paddingVertical: 8,
			}}
			text1Style={{
				fontSize: 16,
				fontWeight: "bold",
			}}
			text2Style={{
				fontSize: 14,
				color: "#888",
			}}
			text2NumberOfLines={2}
			style={{
				borderRadius: 16,
				borderWidth: 2,
				borderColor: "#EB044E",
				borderLeftWidth: 2,
				borderLeftColor: "#EB044E",
				height: "auto",
			}}
		/>
	),
};

const queryClient = new QueryClient();

export default function Layout() {
	return (
		<QueryClientProvider client={queryClient}>
			<UserProvider>
				<DripsyProvider theme={theme}>
					<StatusBar style="dark" />
					<Drawer
						initialRouteName="dashboard"
						screenOptions={{
							swipeEnabled: false,
							drawerHideStatusBarOnOpen: true,
							header: (props) => <Header {...props} />,
							drawerActiveTintColor: "#044eeb",
							drawerInactiveTintColor: "#00246B",
							drawerItemStyle: { borderRadius: 16 },
						}}
						drawerContent={(props) => (
							<CustomDrawerContent {...props} />
						)}
					>
						<Drawer.Screen
							name="dashboard"
							options={{
								drawerLabel: "Dashboard",
								drawerIcon: ({ color, size }) => (
									<FontAwesome5
										name="home"
										size={size}
										color={color}
									/>
								),
							}}
						/>
						<Drawer.Screen
							name="car-browser"
							options={{
								drawerLabel: "Car Browser",
								drawerIcon: ({ color, size }) => (
									<FontAwesome5
										name="car"
										size={size}
										color={color}
									/>
								),
							}}
						/>
						<Drawer.Screen
							name="flat-browser"
							options={{
								drawerLabel: "Flat Browser",
								drawerIcon: ({ color, size }) => (
									<FontAwesome5
										name="house-user"
										size={size}
										color={color}
									/>
								),
							}}
						/>
						<Drawer.Screen
							name="settings"
							options={{
								drawerLabel: "Settings",
								drawerIcon: ({ color, size }) => (
									<FontAwesome5
										name="cog"
										size={size}
										color={color}
									/>
								),
							}}
						/>
						<Drawer.Screen
							name="rent-success"
							options={{ drawerItemStyle: { display: "none" } }}
						/>
						<Drawer.Screen
							name="login-register"
							options={{
								drawerItemStyle: { display: "none" },
								headerShown: false,
							}}
						/>
						<Drawer.Screen
							name="car-details/[id]"
							options={{ drawerItemStyle: { display: "none" } }}
						/>
						<Drawer.Screen
							name="flat-details/[id]"
							options={{ drawerItemStyle: { display: "none" } }}
						/>
						<Drawer.Screen
							name="rented-car/[id]"
							options={{ drawerItemStyle: { display: "none" } }}
						/>
						<Drawer.Screen
							name="rented-flat/[id]"
							options={{ drawerItemStyle: { display: "none" } }}
						/>
						<Drawer.Screen
							name="+not-found"
							options={{ drawerItemStyle: { display: "none" } }}
						/>
						<Drawer.Screen
							name="index"
							options={{ drawerItemStyle: { display: "none" } }}
						/>
						<Drawer.Screen
							name="welcome"
							options={{
								drawerItemStyle: { display: "none" },
								headerShown: false,
							}}
						/>
					</Drawer>
					<Toast
						config={toastConfig}
						topOffset={54}
						visibilityTime={2000}
					/>
				</DripsyProvider>
			</UserProvider>
		</QueryClientProvider>
	);
}
