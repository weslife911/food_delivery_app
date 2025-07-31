import { Stack } from 'expo-router'

function AuthLayout() {
  return (
    <Stack screenOptions={{ 
      headerShown: false
     }} >
      <Stack.Screen name='index' />
      <Stack.Screen name='register' />
      <Stack.Screen name='verify' />
      <Stack.Screen name='reset' />
    </Stack>
  )
}

export default AuthLayout