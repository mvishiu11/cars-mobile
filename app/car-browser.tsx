import React from 'react'
import { View, Text, TextInput, FlatList, Image, Pressable, StyleSheet } from 'react-native'
import SafeLayout from '../components/SafeLayout'

// Example car data
const exampleCars = [
  {
    id: 1,
    name: 'Car Name',
    location: 'Warsaw',
    distance: '2.5 km',
    seats: 5,
    price: 300,
    image: null,
  },
  {
    id: 2,
    name: 'Car Name',
    location: 'Warsaw',
    distance: '2.5 km',
    seats: 5,
    price: 300,
    image: null,
  },
]

export default function CarBrowser() {
  const carFallbackImage = require('../assets/images/car-fallback.png')

  const renderCarItem = ({ item }: any) => (
    <View style={styles.card}>
      {/* Car Image */}
      <Image
        source={item.image ? { uri: item.image } : carFallbackImage}
        style={styles.carImage}
        resizeMode="cover"
      />
      {/* Car Details */}
      <View style={styles.carDetails}>
        <Text style={styles.carName}>{item.name}</Text>
        <Text style={styles.carInfo}>
          <Text>📍 {item.location}</Text> • <Text>{item.distance}</Text>
        </Text>
        <Text style={styles.carInfo}>🚗 {item.seats} Seats</Text>
      </View>
      {/* Price */}
      <View style={styles.carPrice}>
        <Text style={styles.priceText}>{item.price} zł / day</Text>
      </View>
    </View>
  )

  return (
    <SafeLayout>
      {/* Header */}
      <Text style={styles.header}>Browse Cars</Text>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Search Cars"
          style={styles.searchInput}
        />
        <Pressable style={styles.searchButton}>
          <Text style={styles.searchIcon}>🔍</Text>
        </Pressable>
      </View>

      {/* Car List */}
      <FlatList
        data={exampleCars}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderCarItem}
        contentContainerStyle={styles.carList}
        showsVerticalScrollIndicator={false}
      />
    </SafeLayout>
  )
}

const styles = StyleSheet.create({
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#003366',
    marginBottom: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    marginRight: 8,
  },
  searchButton: {
    backgroundColor: '#003366',
    borderRadius: 8,
    padding: 12,
  },
  searchIcon: {
    color: '#ffffff',
    fontSize: 18,
  },
  carList: {
    paddingBottom: 16,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  carImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },
  carDetails: {
    flex: 1,
  },
  carName: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
    color: '#003366',
  },
  carInfo: {
    color: '#666',
    fontSize: 14,
    marginBottom: 4,
  },
  carPrice: {
    alignItems: 'flex-end',
  },
  priceText: {
    color: '#003366',
    fontWeight: 'bold',
    fontSize: 16,
  },
})
