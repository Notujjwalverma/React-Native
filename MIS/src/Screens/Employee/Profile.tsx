import { Text, View, StyleSheet } from 'react-native'
import React from 'react'
import Navbar from '../../components/Navbar'

export default function Profile() {
  return (
    <View style={styles.screenContainer}>
      <Navbar />
      <View style={styles.container}>
        <Text style={styles.text}>Profile Screen</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0F172A',
  },
})