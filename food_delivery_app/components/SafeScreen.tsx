import { useSafeAreaInsets } from "react-native-safe-area-context"
import { StyleSheet, View } from "react-native"
import React from "react"

type SafeScreenProps = {
    children: React.ReactNode
}

function SafeScreen({ children }: SafeScreenProps) {

    const insets = useSafeAreaInsets();

  return (
    <View style={[ styles.container, { paddingTop: insets.top } ]}>
        {children}
    </View>
  )
}

export default SafeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});