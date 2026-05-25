import React, { useEffect, useRef } from 'react'
import { View, Animated, StyleSheet, Dimensions } from 'react-native'

interface ScrollingMarqueeProps {
  text: string
  speed?: number
  backgroundColor?: string
  textColor?: string
  fontSize?: number
  borderColor?: string
}

export default function ScrollingMarquee({
  text,
  speed = 15,
  backgroundColor = 'white',
  textColor = 'black',
  fontSize = 12,
  borderColor = 'rgba(203, 213, 225, 0.7)',
}: ScrollingMarqueeProps) {
  const screenWidth = Dimensions.get('window').width
  const animatedValue = useRef(new Animated.Value(screenWidth)).current
  const textWithSpacing = `${text}     ${text}     `

  useEffect(() => {
    Animated.loop(
      Animated.timing(animatedValue, {
        toValue: -1500,
        duration: speed * 1000,
        useNativeDriver: true,
      })
    ).start()
  }, [animatedValue, speed])

  return (
    <View style={[styles.container, { backgroundColor, borderColor, borderWidth: 1 }]}>
      <Animated.Text
        style={[
          styles.text,
          {
            color: textColor,
            fontSize,
            transform: [{ translateX: animatedValue }],
          },
        ]}
      >
        {textWithSpacing}
      </Animated.Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 40,
    overflow: 'hidden',
    justifyContent: 'center',
  },
  text: {
    fontWeight: '600',
    paddingHorizontal: 16,
    whiteSpace: 'nowrap',
  },
})
