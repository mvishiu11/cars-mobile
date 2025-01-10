import { DripsyProvider } from "dripsy";
import { UserProvider } from "../context/UserContext";
import Header from "@/components/Header";
import { Drawer } from "expo-router/drawer";
import { StatusBar } from "expo-status-bar";
import Toast from "react-native-toast-message";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const theme = {
	colors: {
		primary: "#00246B",
		secondary: "#CADCFC",
		blue: {
			50: "#ebf8ff",
			600: "#3182ce",
			800: "#2c5282",
		},
		white: "#ffffff",
	},
};

// Experimental
const toastConfig = {
	success: (props: any) => (
		<SafeAreaView style={{ backgroundColor: "#009900" }}>
			<Text>{props.text1}</Text>
		</SafeAreaView>
	),
};

export default function Layout() {
	return (
		<UserProvider>
			<DripsyProvider theme={theme}>
				<StatusBar style="dark" />
				<Drawer
					initialRouteName="dashboard"
					screenOptions={{
						swipeEnabled: false,
						drawerHideStatusBarOnOpen: true,
						header: (props) => <Header {...props} />,
					}}
				>
					<Drawer.Screen
						name="dashboard"
						options={{ drawerLabel: "Dashboard" }}
					/>
					<Drawer.Screen
						name="car-browser"
						options={{ drawerLabel: "Car Browser" }}
					/>
					<Drawer.Screen
						name="settings"
						options={{ drawerLabel: "Settings" }}
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
						name="welcome"
						options={{
							drawerItemStyle: { display: "none" },
							headerShown: false,
						}}
					/>
				</Drawer>
				{/* <Toast config={toastConfig} /> */}
			</DripsyProvider>
		</UserProvider>
	);
}
