import { Stack } from 'expo-router'
import { DripsyProvider } from 'dripsy'

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
    <DripsyProvider theme={theme}>
      <Stack />
    </DripsyProvider>
  )
}
