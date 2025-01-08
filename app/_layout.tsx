import { Stack } from 'expo-router'
import { DripsyProvider } from 'dripsy'
import { UserProvider } from '../context/UserContext'
import Toast from 'react-native-toast-message'

const theme = {
  colors: {
    blue: {
      50: '#ebf8ff',
      600: '#3182ce',
      800: '#2c5282',
    },
    white: '#ffffff',
  },
}

export default function Layout() {
  return (
    <UserProvider>
      <DripsyProvider theme={theme}>
        <Stack initialRouteName="welcome">
          <Stack.Screen name="welcome" options={{ title: 'Welcome' }} />
          <Stack.Screen name="login-register" options={{ title: 'Login & Register' }} />
          <Stack.Screen name="dashboard" options={{ title: 'Dashboard' }} />
          <Stack.Screen name="car-browser" options={{ title: 'Browse Cars' }} />
          <Stack.Screen name="+not-found" options={{ title: 'Not Found' }} />
        </Stack>
        <Toast />
      </DripsyProvider>
    </UserProvider>
  )
}
