import { Stack } from 'expo-router'
import { Text } from 'react-native'

function AdminLayout() {
  return (
    <Stack>
      <Stack.Screen name='index' />
    </Stack>
  )
}

export default AdminLayout