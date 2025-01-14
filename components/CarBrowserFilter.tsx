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

export interface Brand {
	key: number;
	value: string;
}

export interface CarBrowserFilterProps {
	sortBy: number;
	setSortBy: (sortBy: number) => void;
	availableFrom: Date;
	setAvailableFrom: (avalableFrom: Date) => void;
	availableTo: Date;
	setAvailableTo: (availableTo: Date) => void;
	minPrice: number;
	setMinPrice: (minPrice: number) => void;
	maxPrice: number;
	setMaxPrice: (maxPrice: number) => void;
	searchRadius: number;
	setSearchRadius: (searchRadius: number) => void;
}

const CarBrowserFilter = ({
	sortBy,
	setSortBy,
	availableFrom,
	setAvailableFrom,
	availableTo,
	setAvailableTo,
	minPrice,
	setMinPrice,
	maxPrice,
	setMaxPrice,
	searchRadius,
	setSearchRadius,
}: CarBrowserFilterProps) => {
	const sortCategories = ["Newest ☆", "Popularity ♡", "Price ⭣", "Price ⭡"];
	const [isFromDateModalOpen, setIsFromDateModalOpen] = useState(false);
	const [isFromTimeModalOpen, setIsFromTimeModalOpen] = useState(false);
	const [isToDateModalOpen, setIsToDateModalOpen] = useState(false);
	const [isToTimeModalOpen, setIsToTimeModalOpen] = useState(false);
	const [scrollEnabled, setScrollEnabled] = useState(true);
	const brands: Brand[] = [
		{ key: 1, value: "Audi" },
		{ key: 2, value: "BMW" },
		{ key: 3, value: "Mercedes" },
		{ key: 4, value: "Acura" },
		{ key: 5, value: "Alfa Romeo" },
		{ key: 6, value: "Aston Martin" },
		{ key: 7, value: "Bentley" },
		{ key: 8, value: "Bugatti" },
		{ key: 9, value: "Cadillac" },
		{ key: 10, value: "Chevrolet" },
		{ key: 11, value: "Chrysler" },
		{ key: 12, value: "Dodge" },
		{ key: 13, value: "Ferrari" },
		{ key: 14, value: "Fiat" },
		{ key: 15, value: "Ford" },
		{ key: 16, value: "Honda" },
		{ key: 17, value: "Hyundai" },
		{ key: 18, value: "Jaguar" },
		{ key: 19, value: "Jeep" },
		{ key: 20, value: "Kia" },
		{ key: 21, value: "Lamborghini" },
		{ key: 22, value: "Land Rover" },
		{ key: 23, value: "Lexus" },
		{ key: 24, value: "Maserati" },
		{ key: 25, value: "Mazda" },
		{ key: 26, value: "McLaren" },
		{ key: 27, value: "Nissan" },
		{ key: 28, value: "Porsche" },
		{ key: 29, value: "Rolls-Royce" },
		{ key: 30, value: "Subaru" },
		{ key: 31, value: "Tesla" },
		{ key: 32, value: "Toyota" },
		{ key: 33, value: "Volkswagen" },
		{ key: 34, value: "Volvo" },
	].sort((a, b) => a.value.localeCompare(b.value));

	const [selectedBrands, setSelectedBrands] = useState<Brand[]>([]);
	const ref = useRef<ScrollView | null>(null);
	const [isSelectDropdownOpen, setIsSelectDropdownOpen] = useState(false);

	const [clear, setClear] = useState(false);

	const clearFilters = () => {
		const nextAvailableDate = getNextAvailableDate();
		setClear(true);
		setSortBy(0);
		setAvailableFrom(nextAvailableDate);
		setAvailableTo(nextAvailableDate);
		setMinPrice(300);
		setMaxPrice(700);
		setSearchRadius(2500);
		setSelectedBrands([]);
		setTimeout(() => setClear(false), 1);
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
				<Text style={styles.header}>Sort by</Text>
				<SegmentedControl
					values={sortCategories}
					appearance="light"
					tintColor="#044eeb"
					fontStyle={{ color: "#00246B" }}
					activeFontStyle={{ color: "#fff" }}
					selectedIndex={sortBy}
					onChange={(e) =>
						setSortBy(e.nativeEvent.selectedSegmentIndex)
					}
				/>
				<Text style={styles.header}>Availability</Text>
				<Text style={styles.h2}>From</Text>
				<DateTimeSelector
					dateTime={availableFrom}
					setDateTime={(date) => {
						setAvailableFrom(date);
						setAvailableTo(date);
					}}
					isDateModalOpen={isFromDateModalOpen}
					setDateModalOpen={setIsFromDateModalOpen}
					isTimeModalOpen={isFromTimeModalOpen}
					setTimeModalOpen={setIsFromTimeModalOpen}
				/>
				<Text style={styles.h2}>To</Text>
				<DateTimeSelector
					dateTime={availableTo}
					setDateTime={setAvailableTo}
					isDateModalOpen={isToDateModalOpen}
					setDateModalOpen={setIsToDateModalOpen}
					isTimeModalOpen={isToTimeModalOpen}
					setTimeModalOpen={setIsToTimeModalOpen}
				/>
				<View
					style={{
						flexDirection: "row",
						alignItems: "center",
						justifyContent: "space-between",
					}}
				>
					<Text style={styles.header}>Price range</Text>
					<Text
						style={styles.h2}
					>{`${minPrice} zł - ${maxPrice} zł`}</Text>
				</View>
				<View style={{ alignItems: "center" }}>
					<MultiSlider
						min={0}
						max={1000}
						step={10}
						values={[minPrice, maxPrice]}
						onValuesChange={(values) => {
							setMinPrice(values[0]);
							setMaxPrice(values[1]);
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
					<Text style={styles.header}>Search radius</Text>
					<Text style={styles.h2}>{`${searchRadius / 1000} km`}</Text>
				</View>
				<View style={{ alignItems: "center" }}>
					<MultiSlider
						min={100}
						max={10000}
						step={100}
						values={[searchRadius]}
						onValuesChange={(values) => {
							setSearchRadius(values[0]);
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
				<Text style={styles.header}>Brand</Text>
				<MultipleSelectList
					data={brands}
					save="value"
					label="Selected Brands"
					setSelected={setSelectedBrands}
					arrowicon={
						<FontAwesome5
							name="chevron-down"
							size={16}
							color="#00246B"
						/>
					}
					searchicon={
						<FontAwesome5 name="search" size={16} color="#00246B" />
					}
					closeicon={
						<FontAwesome5 name="times" size={16} color="#00246B" />
					}
					checkicon={
						<FontAwesome5 name="check" size={10} color="#fff" />
					}
					searchPlaceholder="Search brands"
					notFoundText="No brands found"
					boxStyles={{ borderColor: "#00246B" }}
					placeholder="Select brands"
					inputStyles={{ color: "#888" }}
					labelStyles={{ color: "#00246B" }}
					badgeStyles={{ backgroundColor: "#044eeb" }}
					dropdownStyles={{ borderColor: "#00246B" }}
					onShow={() => ref.current?.scrollToEnd({ animated: true })}
					clear={clear}
				/>
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
	input: {
		flex: 1,
		borderWidth: 1,
		borderColor: "#ddd",
		borderRadius: 8,
		padding: 12,
		marginBottom: 16,
		backgroundColor: "#fff",
	},
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
});
