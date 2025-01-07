import React from 'react'
import { View, Text, Image, FlatList, Pressable } from 'react-native'
import SafeLayout from '../components/SafeLayout'

// Example data
const exampleData = {
  username: 'JohnDoe',
  cars: [
    {
      id: 1,
      name: 'Car Name',
      image: null, // No image provided
      pickupDate: 'November 30th, 2024 | 10:00',
      returnDate: 'December 7th, 2024 | 18:45',
    },
    {
      id: 2,
      name: 'Car Name',
      image: null,
      pickupDate: 'November 30th, 2024 | 10:00',
      returnDate: 'December 7th, 2024 | 18:45',
    },
  ],
  flats: [
    {
      id: 1,
      name: 'Flat Data',
      image: null, // No image provided
      checkInDate: 'November 30th, 2024 | 10:00',
      checkOutDate: 'December 7th, 2024 | 18:45',
    },
  ],
}

export default function Dashboard() {
  const carFallbackImage = require('../assets/images/car-fallback.png')
  const flatFallbackImage = require('../assets/images/flat-fallback.png')

  const renderCarItem = ({ item }: any) => (
    <View
      style={{
        flexDirection: 'row',
        backgroundColor: '#f9f9f9',
        padding: 16,
        borderRadius: 8,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
      }}
    >
      <Image
        source={item.image ? { uri: item.image } : carFallbackImage}
        style={{
          width: 60,
          height: 60,
          borderRadius: 8,
          marginRight: 12,
        }}
        resizeMode="cover"
      />
      <View style={{ flex: 1 }}>
        <Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 4 }}>
          {item.name}
        </Text>
        <Text style={{ color: '#666' }}>Pickup: {item.pickupDate}</Text>
        <Text style={{ color: '#666' }}>Return: {item.returnDate}</Text>
      </View>
    </View>
  )

  const renderFlatItem = ({ item }: any) => (
    <View
      style={{
        flexDirection: 'row',
        backgroundColor: '#f9f9f9',
        padding: 16,
        borderRadius: 8,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
      }}
    >
      <Image
        source={item.image ? { uri: item.image } : flatFallbackImage}
        style={{
          width: 60,
          height: 60,
          borderRadius: 8,
          marginRight: 12,
        }}
        resizeMode="cover"
      />
      <View style={{ flex: 1 }}>
        <Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 4 }}>
          {item.name}
        </Text>
        <Text style={{ color: '#666' }}>Check-in: {item.checkInDate}</Text>
        <Text style={{ color: '#666' }}>Check-out: {item.checkOutDate}</Text>
      </View>
    </View>
  )

  return (
    <SafeLayout>
      <Text
        style={{
          fontSize: 24,
          fontWeight: 'bold',
          textAlign: 'center',
          marginBottom: 24,
          color: '#003366',
        }}
      >
        Welcome, {exampleData.username}
      </Text>

      {/* Your Cars Section */}
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 8 }}>
        Your cars
      </Text>
      <FlatList
        data={exampleData.cars}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderCarItem}
        contentContainerStyle={{ paddingBottom: 16 }}
      />

      {/* Your Flats Section */}
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 8 }}>
        Your flats (courtesy of Flatly)
      </Text>
      <FlatList
        data={exampleData.flats}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderFlatItem}
        contentContainerStyle={{ paddingBottom: 16 }}
      />

      {/* Browse Cars Button */}
      <Pressable
        style={{
          backgroundColor: '#003366',
          paddingVertical: 12,
          paddingHorizontal: 16,
          borderRadius: 8,
          alignItems: 'center',
          marginTop: 16,
        }}
        onPress={() => console.log('Browse cars pressed!')}
      >
        <Text style={{ color: '#ffffff', fontWeight: 'bold', fontSize: 16 }}>
          Browse cars
        </Text>
      </Pressable>
    </SafeLayout>
  )
}
