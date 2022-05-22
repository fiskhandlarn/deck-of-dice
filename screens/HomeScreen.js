import * as React from 'react';
import AudioPlayer from '../shared/AudioPlayer.js';
import ColorMode from '../shared/ColorMode';
import Deck from '../shared/Deck';
import DigitButton from '../components/DigitButton';
import Header from '../components/Header';
import Storage from '../shared/Storage';
import { Button, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;

    this.digitButton = React.createRef();

    ColorMode.addListener((value) => this.onColorModeChange(value));

    this.state = {
      colorMode: ColorMode.value(),
    };
  }

  onColorModeChange(value) {
    this.setState({ colorMode: value });
  }

  onChangeDigitButton = async () => {
    const deck = await Deck.instance();
    const card = deck.draw();
    this.digitButton.current.setValue(card);

    let isSoundEnabled = await Storage.get('isSoundEnabled');
    isSoundEnabled = ('true' === isSoundEnabled || null === isSoundEnabled);

    if (isSoundEnabled) {
      if (card == 7) {
        AudioPlayer.playSound('dice7');
      } else {
        AudioPlayer.playSound('dice');
      }
    }
  }

  render() {
    return (
      <SafeAreaView style={[styles.container, ColorMode.styles().container]}>
        <Header title="Home" openDrawer={this.props.navigation.openDrawer}/>
        <View style={styles.content}>
          <DigitButton onChange={this.onChangeDigitButton} ref={this.digitButton}/>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexGrow: 1,
    justifyContent: 'flex-start',
    overflow: 'hidden',
  },
  content: {
    flexGrow: 1,
    justifyContent: 'center',
  },
});
