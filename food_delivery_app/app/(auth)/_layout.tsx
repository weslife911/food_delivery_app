import { Stack } from 'expo-router'
import React from 'react'

function AuthLayout() {
  return (
    <Stack>
      <Stack.Screen name='index' />
      <Stack.Screen name='register' />
    </Stack>
  )
}

export default AuthLayout