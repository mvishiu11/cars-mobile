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

export interface FlatType {
	key: number;
	value: string;
}

export interface FlatBrowserFilterProps {
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

const FlatBrowserFilter = ({
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
}: FlatBrowserFilterProps) => {
	const sortCategories = ["Newest ☆", "Popularity ♡", "Price ⭣", "Price ⭡"];
	const [isFromDateModalOpen, setIsFromDateModalOpen] = useState(false);
	const [isFromTimeModalOpen, setIsFromTimeModalOpen] = useState(false);
	const [isToDateModalOpen, setIsToDateModalOpen] = useState(false);
	const [isToTimeModalOpen, setIsToTimeModalOpen] = useState(false);
	const [scrollEnabled, setScrollEnabled] = useState(true);

	const ref = useRef<ScrollView | null>(null);

	const [clear, setClear] = useState(false);

	const clearFilters = () => {
		const nextAvailableDate = getNextAvailableDate();
		setClear(true);
		setSortBy(0);
		setAvailableFrom(nextAvailableDate);
		setAvailableTo(nextAvailableDate);
		setMinPrice(300);
		setMaxPrice(700);
		setSearchRadius(5000);
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
			</ScrollView>
		</View>
	);
};

export default FlatBrowserFilter;

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
});
