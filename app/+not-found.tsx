import React from 'react'
import { View, Text, Pressable, Image } from 'react-native'
import { useRouter, Stack } from 'expo-router'

export default function NotFoundScreen() {
  const router = useRouter()

  return (
    <>
      {/* Screen Title */}
      <Stack.Screen options={{ title: 'Lost in the Lot?' }} />

      {/* Main Container */}
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#f9f9f9',
          padding: 20,
        }}
      >
        {/* Logo */}
        <Image
          source={require('../assets/images/logo.png')}
          style={{ width: 150, height: 150, marginBottom: 20 }}
          resizeMode="contain"
        />

        {/*Error Message */}
        <Text
          style={{
            fontSize: 24,
            fontWeight: 'bold',
            color: '#333',
            marginBottom: 10,
            textAlign: 'center',
          }}
        >
          🚗 Uh-oh, looks like this page is out of gas!
        </Text>
        <Text
          style={{
            fontSize: 16,
            color: '#666',
            textAlign: 'center',
            marginBottom: 20,
          }}
        >
          The road you're trying to take doesn’t exist (or it’s under construction).
        </Text>

        {/* Navigation Button */}
        <Pressable
          onPress={() => router.push('/welcome')}
          style={{
            backgroundColor: '#003366',
            paddingVertical: 12,
            paddingHorizontal: 24,
            borderRadius: 8,
          }}
        >
          <Text
            style={{
              color: 'white',
              fontWeight: 'bold',
              fontSize: 16,
            }}
          >
            🏠 Take Me Home
          </Text>
        </Pressable>
      </View>
    </>
  )
}
