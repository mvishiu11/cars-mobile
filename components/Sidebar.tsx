import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Modal,
} from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { exampleData } from '@/data/data'

export default function Sidebar({ visible, onClose }: { visible: boolean; onClose: () => void }) {
  const router = useRouter()

  return (
    <Modal
      animationType="slide"
      transparent
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.sidebar}>
          {/* User Info */}
          <View style={styles.userInfo}>
            <Text style={styles.username}>{exampleData.username}</Text>
          </View>

          {/* Navigation Links */}
          <Pressable
            style={styles.navItem}
            onPress={() => {
              onClose()
              router.push('/dashboard')
            }}
          >
            <FontAwesome5 name="home" size={18} color="#003366" />
            <Text style={styles.navText}>Dashboard</Text>
          </Pressable>

          <Pressable
            style={styles.navItem}
            onPress={() => {
              onClose()
              router.push('/car-browser')
            }}
          >
            <FontAwesome5 name="car" size={18} color="#003366" />
            <Text style={styles.navText}>Car Browser</Text>
          </Pressable>

          <Pressable
            style={styles.navItem}
            onPress={() => {
              onClose()
              router.push('/settings')
            }}
          >
            <FontAwesome5 name="cog" size={18} color="#003366" />
            <Text style={styles.navText}>Settings</Text>
          </Pressable>

          {/* Close Button */}
          <Pressable style={styles.closeButton} onPress={onClose}>
            <FontAwesome5 name="times" size={18} color="#fff" />
          </Pressable>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-start',
  },
  sidebar: {
    width: '70%',
    backgroundColor: '#ffffff',
    height: '100%',
    padding: 16,
  },
  userInfo: {
    alignItems: 'center',
    marginBottom: 24,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 8,
  },
  username: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#003366',
  },
  navItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    marginBottom: 8,
  },
  navText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: '500',
    color: '#003366',
  },
  closeButton: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    backgroundColor: '#003366',
    padding: 8,
    borderRadius: 16,
  },
})
