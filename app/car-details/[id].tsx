import React, { useState } from 'react'
import {
  View,
  Text,
  Image,
  TextInput,
  Pressable,
  StyleSheet,
  ScrollView,
} from 'react-native'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { Checkbox } from 'react-native-paper'
import SafeLayout from '../../components/SafeLayout'
import Toast from 'react-native-toast-message'
import { exampleData } from '@/data/data'
import { FontAwesome5 } from '@expo/vector-icons'

export default function CarDetails() {
  const { id } = useLocalSearchParams()
  const car = exampleData.cars.find((car) => car.id === Number(id))
  const [termsAccepted, setTermsAccepted] = useState(false)
  const [pickupDate, setPickupDate] = useState('')
  const [returnDate, setReturnDate] = useState('')
  const router = useRouter()

  if (!car) {
    return (
      <SafeLayout>
        <Text style={styles.errorText}>Car not found!</Text>
      </SafeLayout>
    )
  }

  const carFallbackImage = require('../../assets/images/car-fallback.png')

  const handleRent = () => {
    if (!pickupDate || !returnDate) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Please fill in both pickup and return dates.',
      })
      return
    }

    const rentedCar = { ...car, pickupDate, returnDate }

    exampleData.rentedCars = exampleData.rentedCars || []
    exampleData.rentedCars.push(rentedCar)

    Toast.show({
      type: 'success',
      text1: 'Car Rented!',
      text2: `${car.name} has been successfully rented. 🚗`,
    })

    router.push({
      pathname: '/rent-success',
      params: {
        carName: car.name,
        startDate: pickupDate,
        endDate: returnDate,
        pricePerDay: car.price,
      },
    })
  }

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
          <Text>
            <FontAwesome5 name="map-marker-alt" /> {car.location} • {car.distance}
          </Text>
          <Text>
            <FontAwesome5 name="users" size={14} color="#003366" /> {car.seats} Seats
          </Text>
          <Text>
            <FontAwesome5 name="gas-pump" size={14} color="#003366" /> {car.fuel}
          </Text>
          <Text>
            <FontAwesome5 name="calendar" size={14} color="#003366" /> {car.year}
          </Text>
          <Text>
            <FontAwesome5 name="door-open" size={14} color="#003366" /> {car.doors} Doors
          </Text>
          <Text>
            <FontAwesome5 name="box" size={14} color="#003366" /> {car.capacity}
          </Text>
        </View>

        {/* Renting Form */}
        <Text style={styles.sectionHeader}>Start Renting</Text>
        <TextInput
          placeholder="Start Date (e.g., 2024-11-30T10:00:00)"
          style={styles.input}
          value={pickupDate}
          onChangeText={setPickupDate}
        />
        <Text style={styles.sectionHeader}>End Renting</Text>
        <TextInput
          placeholder="End Date (e.g., 2024-12-07T18:45:00)"
          style={styles.input}
          value={returnDate}
          onChangeText={setReturnDate}
        />

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
          onPress={handleRent}
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
