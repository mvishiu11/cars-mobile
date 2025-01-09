import { DripsyProvider } from "dripsy";
import { UserProvider } from "../context/UserContext";
import Toast from "react-native-toast-message";
import { createDrawerNavigator, DrawerItem } from "@react-navigation/drawer";
import Dashboard from "./dashboard";
import CarBrowser from "./car-browser";
import Settings from "./settings";
import WelcomeScreen from "./welcome";
import Header from "@/components/Header";

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

import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";
import { StatusBar } from "expo-status-bar";

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
						options={{ drawerItemStyle: { display: "none" } }}
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
			</DripsyProvider>
		</UserProvider>
	);
}

//const Drawer = createDrawerNavigator();

// export default function Layout() {
// 	return (
// 		<UserProvider>
// 			<DripsyProvider theme={theme}>
// 				<Drawer.Navigator
// 					initialRouteName="Dashboard"
// 					screenOptions={{
// 						headerShown: true,
// 						drawerHideStatusBarOnOpen: true,
// 						header: (props) => {
// 							return <Header {...props} />;
// 						},
// 					}}
// 				>
// 					<Drawer.Screen
// 						name="Welcome"
// 						component={WelcomeScreen}
// 						options={{
// 							drawerItemStyle: { display: "none" },
// 							swipeEnabled: false,
// 							headerShown: false,
// 						}}
// 					/>
// 					<Drawer.Screen name="Dashboard" component={Dashboard} />
// 					<Drawer.Screen name="Car Browser" component={CarBrowser} />
// 					<Drawer.Screen name="Settings" component={Settings} />
// 				</Drawer.Navigator>
// 				<Toast />
// 			</DripsyProvider>
// 		</UserProvider>
// 	);
// }

/* <Stack
		initialRouteName="welcome"
		screenOptions={{
			headerShown: false,
			gestureEnabled: false,
		}}
	>
		<Stack.Screen
			name="welcome"
			options={{ title: "Welcome" }}
		/>
		<Stack.Screen
			name="login-register"
			options={{ title: "Login & Register" }}
		/>
		<Stack.Screen
			name="dashboard"
			options={{ title: "Dashboard" }}
		/>
		<Stack.Screen
			name="car-browser"
			options={{ title: "Browse Cars" }}
		/>
		<Stack.Screen
			name="+not-found"
			options={{ title: "Not Found" }}
		/>
	</Stack> */
