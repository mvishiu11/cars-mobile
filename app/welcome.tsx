import React from 'react'
import { View, Text, Pressable, Image, ImageBackground } from 'react-native'
import { useRouter } from 'expo-router'

export default function WelcomeScreen() {
  const router = useRouter()

  return (
    <ImageBackground
      source={require('../assets/images/background.png')}
      style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
      imageStyle={{ opacity: 0.7 }} // Blue tint via opacity
    >
      {/* Logo Section */}
      <View
        style={{
          flex: 0.3,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Image
          source={require('../assets/images/logo.png')}
          style={{ width: 150, height: 150 }}
          resizeMode="contain"
        />
      </View>

      {/* Text & Button Section */}
      <View
        style={{
          flex: 0.7,
          justifyContent: 'center',
          alignItems: 'center',
          paddingHorizontal: 24,
        }}
      >
        <Text
          style={{
            fontSize: 32,
            fontWeight: 'bold',
            color: 'white',
            textAlign: 'center',
            marginBottom: 16,
          }}
        >
          Wheels?{'\n'}Anywhere, Anytime.
        </Text>
        <Pressable
          onPress={() => router.push('/login-register')}
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
            Get Started
          </Text>
        </Pressable>
      </View>
    </ImageBackground>
  )
}
