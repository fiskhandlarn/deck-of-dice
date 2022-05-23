import 'react-native-gesture-handler';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import AudioPlayer from './shared/AudioPlayer.js';
import ColorMode from './shared/ColorMode';
import Drawer from './components/Drawer';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
    };

    ColorMode.init();
  }

  async _cacheResourcesAsync(app) {
    try {
      const sounds = AudioPlayer.load(
        {
          'dice': require('./assets/sounds/dice.mp3'),
          'dice7': require('./assets/sounds/dice7.mp3'),
        }
      );

      return Promise.all([
        Font.loadAsync({
          'CrimsonText_400Regular': require('@expo-google-fonts/crimson-text/CrimsonText_400Regular.ttf'),
          'CrimsonText_700Bold': require('@expo-google-fonts/crimson-text/CrimsonText_700Bold.ttf'),
          'VnBook-Antiqua': require('./assets/fonts/VnBook-Antiqua.otf'),
        }),
        ...sounds
      ]);
    } catch (error) {
      console.warn(error);
      return false;
    }
  };

  render() {
    if (!this.state.isReady) {
      return (
        <AppLoading
          startAsync={this._cacheResourcesAsync}
          onFinish={() => this.setState({ isReady: true })}
          onError={console.warn}
        />
      );
    }

    return (
      <SafeAreaProvider>
        <NavigationContainer>
          <Drawer />
        </NavigationContainer>
      </SafeAreaProvider>
    );
  }
}
