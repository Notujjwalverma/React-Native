import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function Header(props: { title: string }) {
  return (
    <View>
      <Text>{props.title}</Text>
    </View>
  )
}

const styles = StyleSheet.create({})