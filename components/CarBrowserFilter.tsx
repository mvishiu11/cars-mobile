import SegmentedControl from "@react-native-segmented-control/segmented-control";
import { useRef, useState } from "react";
import {
	Button,
	Platform,
	ScrollView,
	StyleSheet,
	Text,
	View,
} from "react-native";
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import { MultipleSelectList } from "react-native-dropdown-select-list";
import DateTimeSelector, { getNextAvailableDate } from "./DateTimeSelector";
import { FontAwesome5 } from "@expo/vector-icons";
import { TextInput } from "react-native-gesture-handler";
import { useLocations } from "@/hooks/useCars";
import { SelectList } from "react-native-dropdown-select-list";

export interface Brand {
	key: number;
	value: string;
}

export interface CarBrowserFilterProps {
	defaultFilters: {
		brandName: string;
		modelName: string;
		productionYear?: number;
		seatCount?: number;
		dailyRate?: number;
		availableFrom?: string;
		availableTo?: string;
		city?: string;
		distance?: number;
	};
	refetch: () => void;
	setFilters: (filters: {
		brandName: string;
		modelName: string;
		productionYear?: number | undefined;
		seatCount?: number | undefined;
		dailyRate?: number | undefined;
		availableFrom?: string;
		availableTo?: string;
		city?: string;
		distance?: number;
	}) => void;
	brandName: string;
	setBrandName: (brandName: string) => void;
    productionYear: number | undefined;
	setProductionYear: (productionYear: number | undefined) => void;
    seatCount: number | undefined;
	setSeatCount: (seatCount: number | undefined) => void;
    dailyRate: number | undefined;
	setDailyRate: (dailyRate: number | undefined) => void;
	availableFrom: string;
	setAvailableFrom: (avalableFrom: string | undefined) => void;
	availableTo: string;
	setAvailableTo: (availableTo: string | undefined) => void;
	city: string | undefined;
	setCity: (city: string | undefined) => void;
	distance: number | undefined;
	setDistance: (distance: number | undefined) => void;
}

const CarBrowserFilter = ({
	defaultFilters,
	setFilters,
	brandName,
	setBrandName,
	productionYear,
	setProductionYear,
	seatCount,
	setSeatCount,
	dailyRate,
	setDailyRate,
	availableFrom,
	setAvailableFrom,
	availableTo,
	setAvailableTo,
	city,
	setCity,
	distance,
	setDistance,
}: CarBrowserFilterProps) => {
	const [isFromDateModalOpen, setIsFromDateModalOpen] = useState(false);
	const [isFromTimeModalOpen, setIsFromTimeModalOpen] = useState(false);
	const [isToDateModalOpen, setIsToDateModalOpen] = useState(false);
	const [isToTimeModalOpen, setIsToTimeModalOpen] = useState(false);
	const [scrollEnabled, setScrollEnabled] = useState(true);
	const ref = useRef<ScrollView | null>(null);

	const locations = useLocations();
	const cities = [...new Set(locations.data?.map((location) => location.city) ?? [])];

	const clearFilters = () => {
		setBrandName(defaultFilters.brandName);
		setProductionYear(defaultFilters.productionYear);
		setSeatCount(defaultFilters.seatCount);
		setDailyRate(defaultFilters.dailyRate);
		setAvailableFrom(defaultFilters.availableFrom);
		setAvailableTo(defaultFilters.availableTo);
		setCity(defaultFilters.city);
		setFilters(defaultFilters);
	};

	return (
		<View style={{ flex: 1 }}>
			<Button
				title="Clear Filters"
				onPress={clearFilters}
				color={Platform.OS === "android" ? "#00246B" : undefined}
			/>
			<ScrollView
				showsVerticalScrollIndicator={false}
				scrollEnabled={scrollEnabled}
				keyboardDismissMode={
					Platform.OS === "ios" ? "interactive" : "on-drag"
				}
				keyboardShouldPersistTaps="always"
				ref={ref}
				// onContentSizeChange={() =>
				// 	ref.current?.scrollToEnd({ animated: true })
				// }
				scrollToOverflowEnabled={true}
				contentInsetAdjustmentBehavior="automatic"
				automaticallyAdjustKeyboardInsets={true}
			>
				{/* Brand Name Input */}
				<View style={styles.inputContainer}>
					<Text style={styles.header}>Brand</Text>
					<View style={styles.inputWrapper}>
						<FontAwesome5 name="car" size={16} color="#00246B" />
						<TextInput
						style={styles.input}
						placeholder="Enter brand (e.g., Tesla)"
						value={brandName}
						onChangeText={setBrandName}
						/>
					</View>
				</View>

				{/* Availability */}
				<Text style={styles.header}>Availability</Text>
				<Text style={styles.h2}>From</Text>
				<DateTimeSelector
					dateTime={new Date(availableFrom)}
					setDateTime={(date) => {
						setAvailableFrom(date.toISOString());
						if (new Date(availableTo) < date) {
							setAvailableTo(date.toISOString());
						}
					}}
					isDateModalOpen={isFromDateModalOpen}
					setDateModalOpen={setIsFromDateModalOpen}
					isTimeModalOpen={isFromTimeModalOpen}
					setTimeModalOpen={setIsFromTimeModalOpen}
				/>
				<Text style={styles.h2}>To</Text>
				<DateTimeSelector
					dateTime={new Date(availableTo)}
					setDateTime={(date) => {
						setAvailableTo(date.toISOString());
					}}
					isDateModalOpen={isToDateModalOpen}
					setDateModalOpen={setIsToDateModalOpen}
					isTimeModalOpen={isToTimeModalOpen}
					setTimeModalOpen={setIsToTimeModalOpen}
				/>

				{/* City */}
				<Text style={styles.header}>City</Text>
				<SelectList
					data={cities}
					setSelected={(val: string) => setCity(val)}
					placeholder="Select city"
					searchPlaceholder="Search cities"
					arrowicon={<FontAwesome5 name="chevron-down" size={16} color="#00246B" />}
					searchicon={<FontAwesome5 name="search" size={16} color="#00246B" />}
					closeicon={<FontAwesome5 name="times" size={16} color="#00246B" />}
					boxStyles={{ borderColor: "#00246B" }}
					inputStyles={{ color: "#888" }}
					dropdownStyles={{ borderColor: "#00246B" }}
				/>

				
				<View
					style={{
						flexDirection: "row",
						alignItems: "center",
						justifyContent: "space-between",
					}}
				>
					<Text style={styles.header}>Search radius</Text>
					<Text style={styles.h2}>{`${(distance ?? 10000) / 1000} km`}</Text>
				</View>
				<View style={{ alignItems: "center" }}>
					<MultiSlider
						min={100}
						max={10000}
						step={100}
						values={[distance ?? 10000]}
						onValuesChange={(values) => {
							setDistance(values[0]);
						}}
						trackStyle={{ backgroundColor: "#00246B" }}
						selectedStyle={{ backgroundColor: "#044eeb" }}
						onValuesChangeStart={() => setScrollEnabled(false)}
						onValuesChangeFinish={() => setScrollEnabled(true)}
						markerStyle={
							Platform.OS === "android"
								? { backgroundColor: "#00246B" }
								: undefined
						}
					/>
				</View>

				{/* Production Year */}
				<View
					style={{
						flexDirection: "row",
						alignItems: "center",
						justifyContent: "space-between",
					}}
				>
					<Text style={styles.header}>Production Year</Text>
					<Text style={styles.h2}>{`${productionYear}`}</Text>
				</View>
				<View style={{ alignItems: "center" }}>
					<MultiSlider
						min={2001}
						max={2022}
						step={1}
						values={[productionYear ?? 2001]}
						onValuesChange={(values) => {
							setProductionYear(values[0]);
						}}
						trackStyle={{ backgroundColor: "#00246B" }}
						selectedStyle={{ backgroundColor: "#044eeb" }}
						onValuesChangeStart={() => setScrollEnabled(false)}
						onValuesChangeFinish={() => setScrollEnabled(true)}
						markerStyle={
							Platform.OS === "android"
								? { backgroundColor: "#00246B" }
								: undefined
						}
					/>
				</View>
				<View
					style={{
						flexDirection: "row",
						alignItems: "center",
						justifyContent: "space-between",
					}}>
					<Text style={styles.header}>Seat Count</Text>
					<Text style={styles.h2}>{`${seatCount}`}</Text>
				</View>
				<View style={{ alignItems: "center" }}>
					<MultiSlider
						min={1}
						max={10}
						step={1}
						values={[seatCount ?? 4]}
						onValuesChange={(values) => {
							setSeatCount(values[0]);
						}}
						trackStyle={{ backgroundColor: "#00246B" }}
						selectedStyle={{ backgroundColor: "#044eeb" }}
						onValuesChangeStart={() => setScrollEnabled(false)}
						onValuesChangeFinish={() => setScrollEnabled(true)}
						markerStyle={
							Platform.OS === "android"
								? { backgroundColor: "#00246B" }
								: undefined
						}
					/>
				</View>
				<View
					style={{
						flexDirection: "row",
						alignItems: "center",
						justifyContent: "space-between",
					}}
				>
					<Text style={styles.header}>Maximum Daily Rate</Text>
					<Text style={styles.h2}>{`${dailyRate} zł`}</Text>
				</View>
				<View style={{ alignItems: "center" }}>
					<MultiSlider
						min={0}
						max={3000}
						step={100}
						values={[0, dailyRate ?? 300]}
						onValuesChange={(values) => {
							setDailyRate(values[1]);
						}}
						trackStyle={{ backgroundColor: "#00246B" }}
						selectedStyle={{ backgroundColor: "#044eeb" }}
						onValuesChangeStart={() => setScrollEnabled(false)}
						onValuesChangeFinish={() => setScrollEnabled(true)}
						markerStyle={
							Platform.OS === "android"
								? { backgroundColor: "#00246B" }
								: undefined
						}
					/>
				</View>
			</ScrollView>
		</View>
	);
};
export default CarBrowserFilter;

const styles = StyleSheet.create({
	header: {
		fontSize: 24,
		fontWeight: "bold",
		marginVertical: 16,
		color: "#00246B",
	},
	h2: {
		fontSize: 16,
		fontWeight: "bold",
		marginVertical: 16,
		color: "#044eeb",
	},
	carList: {},
	card: {
		flexDirection: "row",
		backgroundColor: "#fff",
		padding: 16,
		borderRadius: 8,
		marginBottom: 16,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
		elevation: 2,
	},
	carImage: { width: 60, height: 60, borderRadius: 8, marginRight: 12 },
	carDetails: { flex: 1 },
	carName: { fontWeight: "bold", fontSize: 16, color: "#044EEB" },
	carInfo: { color: "#666", marginBottom: 4 },
	carPrice: {
		alignItems: "center",
		justifyContent: "center",
		flexDirection: "row",
		alignSelf: "flex-end",
		gap: 8,
	},
	priceText: { fontWeight: "bold", color: "#00246B" },
	inputContainer: {
		marginBottom: 16,
	  },
	  inputWrapper: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: "#fff",
		borderWidth: 1,
		borderColor: "#ddd",
		borderRadius: 8,
		paddingHorizontal: 12,
		height: 42,
	  },
	  input: {
		flex: 1,
		marginLeft: 8,
		paddingVertical: 8,
		fontSize: 16,
		color: "#333",
	  },
	  label: {
		fontSize: 18,
		fontWeight: "600",
		color: "#00246B",
		marginBottom: 8,
	  },
});