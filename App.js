import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import DigitButton from './components/DigitButton';
import AudioPlayer from './shared/AudioPlayer.js'
import Deck from './shared/Deck';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.deck = new Deck();
    this.digitButton = React.createRef();
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
    }
  }

  onChangeDigitButton = () => {
    const card = this.deck.draw();
    // TODO log card here
    this.digitButton.current.setValue(card);

    if (card == 7) {
      AudioPlayer.playSound('dice7');
    } else {
      AudioPlayer.playSound('dice');
    }
  }

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
      <View style={styles.container}>
        <DigitButton onChange={this.onChangeDigitButton} ref={this.digitButton}/>
        <StatusBar style="auto" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
