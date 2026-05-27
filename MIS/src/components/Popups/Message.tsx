import { View, Text } from 'react-native'
import React from 'react'

export default function Message(props: { type: string }) {
  return (
    <View>
      <Text> Hi, This is a {props.type} Message</Text>
    </View>
  )
}