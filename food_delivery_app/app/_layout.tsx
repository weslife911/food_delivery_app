import SafeScreen from "@/components/SafeScreen";
import { useAuthStore } from "@/store/useAuthStore";
import { Stack, useSegments, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, View, StyleSheet, Text } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Toast from 'react-native-toast-message';

export default function RootLayout() {
  const { user, getUser, token } = useAuthStore();
  const segments = useSegments();
  const router = useRouter();
  const [isAuthLoaded, setIsAuthLoaded] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      await getUser();
      setIsAuthLoaded(true);
    };
    checkAuth();
  }, []);

  useEffect(() => {
    if (!isAuthLoaded) return;

    const isAuthenticated = !!token && !!user;
    const currentRouteGroup = segments[0];
    const isAdmin = user?.role === "admin";

    if (!isAuthenticated && currentRouteGroup !== "(auth)") {
      router.replace("/(auth)");
      return;
    }

    if (isAuthenticated) {
      if (currentRouteGroup === "(auth)") {
        router.replace(isAdmin ? "/(admin)" : "/(dashboard)");
        return;
      }

      if (currentRouteGroup === "(admin)" && !isAdmin) {
        router.replace("/(dashboard)");
        return;
      }

      if (currentRouteGroup === "(dashboard)" && isAdmin) {
        // Optional: You might want to keep admins out of user dashboard
        // router.replace("/(admin)");
      }
    }
  }, [user, token, segments, router, isAuthLoaded]);

  if (!isAuthLoaded) {
    return (
      <SafeAreaProvider>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#FF7F39" />
          <Text style={styles.loadingText}>Loading app...</Text>
        </View>
      </SafeAreaProvider>
    );
  }

  return (
    <>
      <SafeAreaProvider>
        <SafeScreen>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(auth)" />
            <Stack.Screen name="(dashboard)" />
            <Stack.Screen name="(admin)" />
          </Stack>
        </SafeScreen>
      </SafeAreaProvider>
      <Toast />
    </>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#555',
  },
});