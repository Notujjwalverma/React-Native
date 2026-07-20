import React, { createContext, useContext, useState, useEffect } from 'react'
import { View, StyleSheet, BackHandler, Platform } from 'react-native'
import LeftDrawer from './LeftDrawer'

type DrawerContextValue = {
  openDrawer: () => void
  closeDrawer: () => void
  currentRouteName: string
}

type DrawerProviderProps = {
  children: React.ReactNode
  navigationRef: any
}

const DrawerContext = createContext<DrawerContextValue | undefined>(undefined)

export function useDrawer() {
  const context = useContext(DrawerContext)
  return context
}

export function DrawerProvider({ children, navigationRef }: DrawerProviderProps) {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [currentRouteName, setCurrentRouteName] = useState('')

  const openDrawer = () => setDrawerOpen(true)
  const closeDrawer = () => setDrawerOpen(false)

  useEffect(() => {
    if (!navigationRef) return

    const unsubscribe = navigationRef?.addEventListener?.('state', (state: any) => {
      const currentRoute = state?.data?.state?.routes?.[state.data.state.index]?.name
      if (currentRoute) {
        setCurrentRouteName(currentRoute)
      }
    })

    return () => {
      unsubscribe?.()
    }
  }, [navigationRef])

  useEffect(() => {
    if (Platform.OS !== 'android' || !navigationRef) return

    const onBackPress = () => {
      if (drawerOpen) {
        setDrawerOpen(false)
        return true
      }

      if (navigationRef.isReady() && navigationRef.canGoBack()) {
        navigationRef.goBack()
        return true
      }

      return false
    }

    const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress)
    return () => subscription.remove()
  }, [drawerOpen, navigationRef])

  return (
    <DrawerContext.Provider value={{ openDrawer, closeDrawer, currentRouteName }}>
      <View style={styles.container}>
        {children}
        <LeftDrawer open={drawerOpen} onClose={closeDrawer} />
      </View>
    </DrawerContext.Provider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
