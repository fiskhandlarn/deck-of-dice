import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AudioPlayer from './shared/AudioPlayer.js'
import Drawer from './components/Drawer';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
    };
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
