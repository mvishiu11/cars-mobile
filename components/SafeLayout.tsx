import React, { useContext } from 'react'
import { View, Pressable, Image, StyleSheet } from 'react-native'
import { useRouter, useSegments } from 'expo-router'
import { UserContext } from '../context/UserContext'
import { FontAwesome5 } from '@expo/vector-icons'

export default function SafeLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const segments = useSegments()
  const { logout } = useContext(UserContext)

  const isDashboard = segments[0] === 'dashboard'

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        {/* Sidebar Button */}
        <Pressable
          onPress={() => console.log('Sidebar opened')}
          style={styles.iconButton}
        >
          <FontAwesome5 name="bars" size={24} color="#003366" />
        </Pressable>

        {/* Logo */}
        <Image
          source={require('../assets/images/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />

        {/* Logout/Back Button */}
        <Pressable
          onPress={() => {
            if (isDashboard) {
              logout()
              router.replace('/login-register')
            } else {
              router.back()
            }
          }}
          style={styles.iconButton}
        >
          <FontAwesome5
            name={isDashboard ? 'sign-out-alt' : 'arrow-left'}
            size={24}
            color="#003366"
          />
        </Pressable>
      </View>

      {/* Content */}
      <View style={styles.content}>{children}</View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#f9f9f9',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  logo: {
    width: 120,
    height: 40,
  },
  iconButton: {
    padding: 8,
  },
  content: {
    flex: 1,
    padding: 16,
  },
})