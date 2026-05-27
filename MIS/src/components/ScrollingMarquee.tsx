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
  const animatedValue = useRef(new Animated.Value(0)).current
  const textWithSpacing = `${text}     ${text}     ${text}     `

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: -screenWidth * 2,
          duration: speed * 2000,
          useNativeDriver: true,
        }),
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: 0,
          useNativeDriver: true,
        }),
      ])
    ).start()

    return () => {
      animatedValue.setValue(0)
    }
  }, [animatedValue, speed, screenWidth])

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
