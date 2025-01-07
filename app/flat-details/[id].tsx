import React, { useState } from 'react'
import { View, Text, Image, TextInput, Pressable, StyleSheet, ScrollView } from 'react-native'
import { useLocalSearchParams, useRouter } from 'expo-router'
import SafeLayout from '../../components/SafeLayout'
import { exampleData } from '@/data/data'
import Toast from 'react-native-toast-message'

export default function FlatDetails() {
  const { id } = useLocalSearchParams()
  const router = useRouter()
  const flat = exampleData.flats.find((flat) => flat.id === Number(id))
  const [termsAccepted, setTermsAccepted] = useState(false)

  if (!flat) {
    return (
      <SafeLayout>
        <Text style={styles.errorText}>Flat not found!</Text>
      </SafeLayout>
    )
  }

  const handleRent = () => {
    exampleData.rentedFlats.push(flat)
    
    Toast.show({
      type: 'success',
      text1: 'Flat Rented!',
      text2: `${flat.name} has been successfully rented via Flatly. 🏠`,
    })

    router.push('/dashboard')
  }

  return (
    <SafeLayout>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Image
          source={flat.image ? { uri: flat.image } : require('../../assets/images/flat-fallback.png')}
          style={styles.flatImage}
          resizeMode="cover"
        />
        <Text style={styles.flatName}>{flat.name}</Text>
        <Text style={styles.flatPrice}>{flat.price} zł / day</Text>

        <View style={styles.flatDetails}>
          <Text>🛏️ 3 Bedrooms</Text>
          <Text>🛁 2 Bathrooms</Text>
          <Text>📍 Google Maps</Text>
        </View>

        <Text style={styles.sectionHeader}>Start Renting</Text>
        <TextInput placeholder="Start Date" style={styles.input} />
        <Text style={styles.sectionHeader}>End Renting</Text>
        <TextInput placeholder="End Date" style={styles.input} />

        <View style={styles.checkboxContainer}>
          <Pressable onPress={() => setTermsAccepted(!termsAccepted)}>
            <View style={[styles.checkbox, termsAccepted && styles.checkboxChecked]} />
          </Pressable>
          <Text style={styles.checkboxLabel}>Accept terms and conditions</Text>
        </View>

        <Pressable
          style={[
            styles.rentButton,
            !termsAccepted && { backgroundColor: '#999' },
          ]}
          disabled={!termsAccepted}
          onPress={handleRent}
        >
          <Text style={styles.rentButtonText}>Rent via Flatly</Text>
        </Pressable>

        <Toast />
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
  flatImage: {
    width: '100%',
    height: 200,
    marginBottom: 16,
  },
  flatName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#003366',
    textAlign: 'center',
    marginBottom: 16,
  },
  flatPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#003366',
    marginBottom: 16,
    textAlign: 'center',
  },
  flatDetails: {
    marginBottom: 16,
    alignItems: 'center',
  },
  sectionHeader: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 8,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    backgroundColor: '#f9f9f9',
    width: '100%',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#003366',
    marginRight: 8,
  },
  checkboxChecked: {
    backgroundColor: '#003366',
  },
  checkboxLabel: {
    fontSize: 14,
    color: '#333',
  },
  rentButton: {
    backgroundColor: '#003366',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    width: '100%',
  },
  rentButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  errorText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'red',
    textAlign: 'center',
  },
})
