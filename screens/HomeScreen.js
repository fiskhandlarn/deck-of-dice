import * as React from 'react';
import { Button, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AudioPlayer from '../shared/AudioPlayer.js'
import Deck from '../shared/Deck';
import DigitButton from '../components/DigitButton';
import Header from '../components/Header';

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;

    this.digitButton = React.createRef();
    this.deck = new Deck();
  }

  onChangeDigitButton = () => {
    const card = this.deck.draw();
    this.digitButton.current.setValue(card);

    if (card == 7) {
      AudioPlayer.playSound('dice7');
    } else {
      AudioPlayer.playSound('dice');
    }
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
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
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  content: {
    flexGrow: 1,
    justifyContent: 'center',
    // borderColor: '#0f0',
    // borderWidth: StyleSheet.hairlineWidth,
    marginBottom: Header.height,
  },
});
