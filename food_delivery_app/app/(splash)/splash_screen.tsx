import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Svg, Circle, Path } from 'react-native-svg';


function splash_screen() {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.text}>F</Text>
        <View style={styles.cloche}>
          <Svg height="48" width="48" viewBox="0 0 24 24">
            {/* Cloche shape */}
            <Path
              d="M4 12 C4 8, 20 8, 20 12 Z"
              fill="orange"
            />
            {/* Handle */}
            <Circle cx="12" cy="6" r="2" fill="orange" />
          </Svg>
        </View>
        <Text style={styles.text}>od</Text>
      </View>

      {/* Motion lines */}
      <Svg height="10" width="100" viewBox="0 0 100 10">
        <Path
          d="M10 2 H90"
          stroke="orange"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <Path
          d="M20 8 H80"
          stroke="orange"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </Svg>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingTop: 50,
    backgroundColor: '#fff',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#001F54',
  },
  cloche: {
    marginHorizontal: 4,
  },
});

export default splash_screen