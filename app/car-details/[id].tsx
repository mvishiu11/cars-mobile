import React, { useState } from 'react'
import { View, Text, Image, TextInput, Pressable, StyleSheet, ScrollView } from 'react-native'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { Checkbox } from 'react-native-paper'
import SafeLayout from '../../components/SafeLayout'
import { exampleData } from '@/data/data'

export default function CarDetails() {
  const { id } = useLocalSearchParams()
  const car = exampleData.cars.find((car) => car.id === Number(id))
  const [termsAccepted, setTermsAccepted] = useState(false)
  const router = useRouter()

  if (!car) {
    return (
      <SafeLayout>
        <Text style={styles.errorText}>Car not found!</Text>
      </SafeLayout>
    )
  }

  const carFallbackImage = require('../../assets/images/car-fallback.png')

  return (
    <SafeLayout>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Car Image */}
        <Image
          source={car.image ? { uri: car.image } : carFallbackImage}
          style={styles.carImage}
          resizeMode="cover"
        />
        {/* Car Info */}
        <Text style={styles.carName}>{car.name}</Text>
        <Text style={styles.carPrice}>{car.price} zł / day</Text>
        <View style={styles.carDetails}>
          <Text>📍 {car.location} • {car.distance}</Text>
          <Text>🚗 {car.seats} Seats</Text>
          <Text>⛽ {car.fuel}</Text>
          <Text>📅 {car.year}</Text>
          <Text>🚪 {car.doors} Doors</Text>
          <Text>📦 {car.capacity}</Text>
        </View>

        {/* Renting Form */}
        <Text style={styles.sectionHeader}>Start Renting</Text>
        <TextInput placeholder="Start Date" style={styles.input} />
        <Text style={styles.sectionHeader}>End Renting</Text>
        <TextInput placeholder="End Date" style={styles.input} />

        {/* Terms and Conditions */}
        <View style={styles.checkboxContainer}>
          <Checkbox
            status={termsAccepted ? 'checked' : 'unchecked'}
            onPress={() => setTermsAccepted(!termsAccepted)}
            color="#003366"
          />
          <Text style={styles.checkboxLabel}>Accept terms and conditions</Text>
        </View>

        {/* Rent Button */}
        <Pressable
          style={[
            styles.rentButton,
            !termsAccepted && { backgroundColor: '#999' },
          ]}
          disabled={!termsAccepted}
          onPress={() => router.push({
            pathname: '/rent-success',
            params: {
              carName: 'Car Name',
              startDate: '2024-11-30T10:00:00',
              endDate: '2024-12-07T18:45:00',
              pricePerDay: 300,
            },
          })}
        >
          <Text style={styles.rentButtonText}>Rent</Text>
        </Pressable>
      </ScrollView>
    </SafeLayout>
  )
}

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
    padding: 16,
  },
  carImage: {
    width: '100%',
    height: 200,
    marginBottom: 16,
    borderRadius: 8,
  },
  carName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#003366',
    marginBottom: 8,
    textAlign: 'center',
  },
  carPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#003366',
    marginBottom: 16,
    textAlign: 'center',
  },
  carDetails: {
    marginBottom: 16,
  },
  sectionHeader: {
    fontWeight: 'bold',
    marginBottom: 8,
    fontSize: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    backgroundColor: '#f9f9f9',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  checkboxLabel: {
    fontSize: 14,
    marginLeft: 8,
    color: '#333',
  },
  rentButton: {
    backgroundColor: '#003366',
    paddingVertical: 16,
    borderRadius: 8,
  },
  rentButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 18,
  },
})
