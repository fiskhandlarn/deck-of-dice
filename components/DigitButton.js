import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { vh } from 'react-native-expo-viewport-units';

export default class DigitButton extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      digit: '!',
    };
  }

  onPress = () => {
    this.props.onChange();
  };

  setDigit(digit) {
    this.setState({ digit: digit });
  }

  render() {
    return (
      <View>
        <Pressable onPress={this.onPress} style={styles.button}>
          <Text style={styles.buttonText}>{this.state.digit}</Text>
        </Pressable>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  button: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#f0f0f0',
    paddingHorizontal: vh(5),
  },
  buttonText: {
    fontSize: vh(70),
    lineHeight: vh(70),
    color: '#000',
  },
});
