import React from "react";
import {
	View,
	Text,
	FlatList,
	Image,
	Pressable,
	StyleSheet,
} from "react-native";
import { useRouter } from "expo-router";
import { exampleData } from "@/data/data";
import { FontAwesome5 } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CarBrowser() {
	const router = useRouter();
	const carFallbackImage = require("../assets/images/car-fallback.png");

	const renderCarItem = ({ item }: any) => (
		<Pressable
			style={styles.card}
			onPress={() => router.push(`/car-details/${item.id}`)}
		>
			<Image
				source={item.image ? { uri: item.image } : carFallbackImage}
				style={styles.carImage}
				resizeMode="cover"
			/>
			<View style={styles.carDetails}>
				<Text style={styles.carName}>{item.name}</Text>
				<Text style={styles.carInfo}>
					<FontAwesome5 name="map-marker-alt" /> {item.location} •{" "}
					{item.distance}
				</Text>
				<Text style={styles.carInfo}>
					<FontAwesome5 name="users" size={14} color="#003366" />{" "}
					{item.seats} Seats
				</Text>
			</View>
			<View style={styles.carPrice}>
				<Text style={styles.priceText}>
					<FontAwesome5 name="money-bill" size={14} color="#003366" />{" "}
					{item.price} zł / day
				</Text>
			</View>
		</Pressable>
	);

	return (
		<SafeAreaView style={{ paddingHorizontal: 16 }}>
			<Text style={styles.header}>Browse Cars</Text>
			<FlatList
				data={exampleData.cars}
				keyExtractor={(item) => item.id.toString()}
				renderItem={renderCarItem}
				contentContainerStyle={styles.carList}
				showsVerticalScrollIndicator={false}
			/>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	header: { fontSize: 24, fontWeight: "bold", marginBottom: 16 },
	carList: { paddingBottom: 16 },
	card: {
		flexDirection: "row",
		alignItems: "center",
		padding: 16,
		marginBottom: 16,
	},
	carImage: { width: 60, height: 60, borderRadius: 8, marginRight: 12 },
	carDetails: { flex: 1 },
	carName: { fontWeight: "bold", fontSize: 16 },
	carInfo: { color: "#666", marginBottom: 4 },
	carPrice: { alignItems: "flex-end" },
	priceText: { fontWeight: "bold", color: "#003366" },
});
