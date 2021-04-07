import React from 'react'
import { Animated, Pressable, StyleSheet, Text, View } from 'react-native';
import { vh } from 'react-native-expo-viewport-units';

export default class DigitButton extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      digit: '!',
      animation: new Animated.Value(vh(70)),
    };
  }

  onPress = () => {
    this.props.onChange();
  };

  setDigit(digit) {
    this.setState({ digit: digit });

    Animated.sequence([
      Animated.timing(this.state.animation, {
        toValue: vh(80),
        duration: 0
      }),
      Animated.timing(this.state.animation, {
        toValue: vh(70),
        duration: 200
      }),
    ]).start();
  }

  render() {
    return (
      <Pressable onPress={this.onPress} style={styles.button}>
        <Animated.Text style={[styles.buttonText, { fontSize: this.state.animation }]}>{this.state.digit}</Animated.Text>
      </Pressable>
    )
  }
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    borderColor: '#f0f0f0',
    borderWidth: StyleSheet.hairlineWidth,
    display: 'flex',
    height: vh(80),
    overflow: 'hidden',
    width: vh(80),
  },
  buttonText: {
    color: '#000',
    lineHeight: vh(70),
  },
});
