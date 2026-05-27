import { StatusBar } from 'expo-status-bar';
import './web.css';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { NavigationContainer, createNavigationContainerRef } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
} from '@expo-google-fonts/poppins';
import { DrawerProvider } from './src/components/DrawerContext';

import AppNavigator from './src/Navigation/AppNavigator';

// Import Firebase to initialize it
import './src/firebase/firebaseconfig';

const navigationRef = createNavigationContainerRef()

export default function App() {
  const [error, setError] = useState(null);
  const [fontsLoaded] = useFonts({
    GoogleSans: Poppins_400Regular,
    'GoogleSans-Medium': Poppins_500Medium,
    'GoogleSans-Bold': Poppins_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded) {
      Text.defaultProps = Text.defaultProps || {};
      Text.defaultProps.style = {
        ...(Text.defaultProps.style || {}),
        fontFamily: 'GoogleSans',
      };
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0EA5E9" />
        <Text style={styles.loadingText}>Loading fonts...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Error initializing app:</Text>
        <Text style={styles.errorMessage}>{error.message}</Text>
      </View>
    );
  }

  return (
    <View style={styles.appContainer}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8FAFC" />
        <NavigationContainer ref={navigationRef}>
          <DrawerProvider navigationRef={navigationRef}>
            <AppNavigator />
          </DrawerProvider>
        </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#64748B',
    fontWeight: '500',
  },
  errorText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#EF4444',
    marginBottom: 8,
  },
  errorMessage: {
    fontSize: 14,
    color: '#991B1B',
    textAlign: 'center',
  },
});
