import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import DigitButton from './components/DigitButton';
import Deck from './shared/Deck';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.deck = new Deck();
    this.digitButton = React.createRef();
  }

  onChangeDigitButton = () => {
    const card = this.deck.draw();
    // TODO log card here
    this.digitButton.current.setDigit(card);
  }

  render() {
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
