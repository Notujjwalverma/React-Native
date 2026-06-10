import { StatusBar } from 'expo-status-bar';
import './web.css';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { NavigationContainer, createNavigationContainerRef } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { Provider } from 'react-redux'
import { store } from './src/redux/store/store'
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
} from '@expo-google-fonts/poppins';
import {
  SafeAreaProvider,
  SafeAreaView,
} from 'react-native-safe-area-context';

import { DrawerProvider } from './src/components/DrawerContext';
import AppNavigator from './src/Navigation/AppNavigator';

// Firebase initialization
import './src/firebase/firebaseconfig';

const navigationRef = createNavigationContainerRef();

export default function App() {
  const [error, setError] = useState(null); const [fontsLoaded] = useFonts({ GoogleSans: Poppins_400Regular, 'GoogleSans-Medium': Poppins_500Medium, 'GoogleSans-Bold': Poppins_700Bold, });

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
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#0EA5E9" />
        <Text style={styles.loadingText}>Loading fonts...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>
          Error initializing app:
        </Text>

        <Text style={styles.errorMessage}>
          {error.message}
        </Text>
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={styles.safeArea}
        edges={['top', 'left', 'right']}
      >
        <StatusBar
          style="dark"
          backgroundColor="#F8FAFC"
        />
        <Provider store={store}>


          <NavigationContainer ref={navigationRef}>
            <DrawerProvider navigationRef={navigationRef}>
              <AppNavigator />
            </DrawerProvider>
          </NavigationContainer>
        </Provider>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },

  centerContainer: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    justifyContent: 'center',
    alignItems: 'center',
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