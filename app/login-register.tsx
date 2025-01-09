import React, { useState } from "react";
import { View, Text, TextInput, Pressable, Image } from "react-native";
import { useRouter } from "expo-router";

export default function LoginRegisterScreen() {
	const [activeTab, setActiveTab] = useState<"login" | "register">("login");
	const router = useRouter();

	const TabButton = ({ label, isActive, onPress }: any) => (
		<Pressable
			onPress={onPress}
			style={{
				flex: 1,
				alignItems: "center",
				paddingVertical: 12,
				borderBottomWidth: 2,
				borderBottomColor: isActive ? "#003366" : "transparent",
			}}
		>
			<Text
				style={{
					color: isActive ? "#003366" : "#888",
					fontWeight: "bold",
				}}
			>
				{label}
			</Text>
		</Pressable>
	);

	return (
		<View
			style={{
				flex: 1,
				backgroundColor: "white",
				paddingHorizontal: 24,
			}}
		>
			{/* Logo */}
			<View
				style={{
					alignItems: "center",
					marginTop: 40,
					marginBottom: 24,
				}}
			>
				<Image
					source={require("../assets/images/logo.png")}
					style={{ width: 150, height: 150 }}
					resizeMode="contain"
				/>
			</View>

			{/* Tabs */}
			<View
				style={{
					flexDirection: "row",
					borderBottomWidth: 1,
					borderBottomColor: "#ddd",
					marginBottom: 16,
				}}
			>
				<TabButton
					label="Register"
					isActive={activeTab === "register"}
					onPress={() => setActiveTab("register")}
				/>
				<TabButton
					label="Login"
					isActive={activeTab === "login"}
					onPress={() => setActiveTab("login")}
				/>
			</View>

			{/* Tab Content */}
			{activeTab === "login" && (
				<View>
					<Text
						style={{
							fontSize: 18,
							fontWeight: "bold",
							marginBottom: 8,
						}}
					>
						Login
					</Text>
					<Text style={{ color: "#888", marginBottom: 16 }}>
						Enter your credentials that you used to register.
					</Text>
					<TextInput
						placeholder="Username or Email"
						style={{
							backgroundColor: "#f9f9f9",
							borderColor: "#ddd",
							borderWidth: 1,
							borderRadius: 8,
							padding: 12,
							marginBottom: 16,
						}}
					/>
					<TextInput
						placeholder="Password"
						secureTextEntry
						style={{
							backgroundColor: "#f9f9f9",
							borderColor: "#ddd",
							borderWidth: 1,
							borderRadius: 8,
							padding: 12,
							marginBottom: 16,
						}}
					/>
					<Pressable
						style={{
							backgroundColor: "#003366",
							paddingVertical: 12,
							paddingHorizontal: 24,
							borderRadius: 8,
							alignItems: "center",
						}}
						onPress={() => router.push("/dashboard")}
					>
						<Text
							style={{
								color: "white",
								fontWeight: "bold",
								fontSize: 16,
							}}
						>
							Login
						</Text>
					</Pressable>
				</View>
			)}
			{activeTab === "register" && (
				<View>
					<Text
						style={{
							fontSize: 18,
							fontWeight: "bold",
							marginBottom: 8,
						}}
					>
						Register
					</Text>
					<Text style={{ color: "#888", marginBottom: 16 }}>
						Enter your email address and choose your username.
					</Text>
					<TextInput
						placeholder="Email"
						style={{
							backgroundColor: "#f9f9f9",
							borderColor: "#ddd",
							borderWidth: 1,
							borderRadius: 8,
							padding: 12,
							marginBottom: 16,
						}}
					/>
					<TextInput
						placeholder="Username"
						style={{
							backgroundColor: "#f9f9f9",
							borderColor: "#ddd",
							borderWidth: 1,
							borderRadius: 8,
							padding: 12,
							marginBottom: 16,
						}}
					/>
					<TextInput
						placeholder="Password"
						secureTextEntry
						style={{
							backgroundColor: "#f9f9f9",
							borderColor: "#ddd",
							borderWidth: 1,
							borderRadius: 8,
							padding: 12,
							marginBottom: 16,
						}}
					/>
					<Pressable
						style={{
							backgroundColor: "#003366",
							paddingVertical: 12,
							paddingHorizontal: 24,
							borderRadius: 8,
							alignItems: "center",
						}}
					>
						<Text
							style={{
								color: "white",
								fontWeight: "bold",
								fontSize: 16,
							}}
						>
							Register
						</Text>
					</Pressable>
				</View>
			)}
		</View>
	);
}
