import { useAuthStore } from '@/store/useAuthStore'
import { useRouter } from 'expo-router';
import { Text, TouchableOpacity, View } from 'react-native'

function DashBoardPage() {

  const { logoutUser } = useAuthStore();
  const router = useRouter();

  const handleLogoutUser = async() => {
    await logoutUser();
    router.push("/(auth)");
  };

  return (
    <View>
      <TouchableOpacity onPress={handleLogoutUser} >
        <Text>
          Logout
        </Text>
      </TouchableOpacity>
    </View>
  )
}

export default DashBoardPage