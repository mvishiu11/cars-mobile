import React from 'react'
import { View, Text, Image, Pressable, StyleSheet, ScrollView, Alert } from 'react-native'
import { useLocalSearchParams, useRouter } from 'expo-router'
import SafeLayout from '../../components/SafeLayout'
import QRCode from 'react-native-qrcode-svg'
import { exampleData } from '@/data/data'
import Toast from 'react-native-toast-message'
import { FontAwesome5 } from '@expo/vector-icons'

export default function RentedCar() {
  const { id } = useLocalSearchParams()
  const router = useRouter()
  const car = exampleData.rentedCars.find((car) => car.id === Number(id))

  if (!car) {
    return (
      <SafeLayout>
        <Text style={styles.errorText}>Car not found!</Text>
      </SafeLayout>
    )
  }

  const handleCancel = () => {
    Toast.show({
      type: 'info',
      text1: 'Are you sure?',
      text2: `Swipe down to dismiss or confirm below.`,
      onPress: () => {
        exampleData.rentedCars = exampleData.rentedCars.filter((c) => c.id !== car.id)
  
        Toast.show({
          type: 'success',
          text1: 'Rental Canceled',
          text2: `${car.name} has been removed from your rented cars. 🚗`,
        })
  
        router.push('/dashboard')
      },
    })
  }

  return (
    <SafeLayout>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Car Image */}
        <Image
          source={car.image ? { uri: car.image } : require('../../assets/images/car-fallback.png')}
          style={styles.carImage}
          resizeMode="contain"
        />

        {/* Car Details */}
        <Text style={styles.carName}>{car.name}</Text>
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


        {/* Rental Period */}
        <Text style={styles.sectionHeader}>Rental Period</Text>
        <Text style={styles.rentalDates}>
          From: {car.pickupDate}
          {'\n'}
          To: {car.returnDate}
        </Text>

        {/* QR Code */}
        <QRCode value={`Rental ID: ${car.id}`} size={150} />

        {/* Buttons */}
        <Pressable style={styles.backButton} onPress={() => router.push('/dashboard')}>
          <Text style={styles.backButtonText}>Back to Your Cars</Text>
        </Pressable>

        <Pressable style={styles.cancelButton} onPress={handleCancel}>
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </Pressable>
      </ScrollView>
    </SafeLayout>
  )
}

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
    padding: 16,
    alignItems: 'center',
  },
  carImage: {
    width: '100%',
    height: 200,
    marginBottom: 16,
  },
  carName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#003366',
    textAlign: 'center',
    marginBottom: 16,
  },
  carDetails: {
    marginBottom: 16,
  },
  sectionHeader: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 8,
  },
  rentalDates: {
    marginBottom: 16,
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
  },
  backButton: {
    backgroundColor: '#003366',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginTop: 16,
  },
  backButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  cancelButton: {
    backgroundColor: '#FF4D4D',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginTop: 16,
  },
  cancelButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  errorText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'red',
    textAlign: 'center',
  },
})
