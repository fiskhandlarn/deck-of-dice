import 'react-native-gesture-handler';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import AudioPlayer from './shared/AudioPlayer.js';
import ColorMode from './shared/ColorMode';
import Drawer from './components/Drawer';
import React, { useCallback, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function App() {
  ColorMode.init();

  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Keep the splash screen visible while we fetch resources
        await SplashScreen.preventAutoHideAsync();

        const sounds = AudioPlayer.load({
          'dice': require('./assets/sounds/dice.mp3'),
          'dice7': require('./assets/sounds/dice7.mp3'),
        });

        await Promise.all([sounds]);

        await Font.loadAsync({
          'CrimsonText_400Regular': require('@expo-google-fonts/crimson-text/CrimsonText_400Regular.ttf'),
          'CrimsonText_700Bold': require('@expo-google-fonts/crimson-text/CrimsonText_700Bold.ttf'),
          'VnBook-Antiqua': require('./assets/fonts/VnBook-Antiqua.otf'),
        });
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);

        // TODO move to onLayoutRootView instead?
        await SplashScreen.hideAsync();
      }
    }

    prepare();
  }, []);

  if (!appIsReady) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Drawer />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
