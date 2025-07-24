import { Stack } from "expo-router"


function SplashLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }} >
        <Stack.Screen name="splash_screen" />
    </Stack>
  )
}

export default SplashLayout