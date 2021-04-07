import React from 'react'
import { Animated, Pressable, StyleSheet, Text, View } from 'react-native';
import { vmin } from 'react-native-expo-viewport-units';

export default class DigitButton extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      digit: '!',
      animation: new Animated.Value(vmin(70)),
    };
  }

  onPress = () => {
    this.props.onChange();
  };

  setDigit(digit) {
    this.setState({ digit: digit });

    Animated.sequence([
      Animated.timing(this.state.animation, {
        toValue: vmin(80),
        duration: 0
      }),
      Animated.timing(this.state.animation, {
        toValue: vmin(70),
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
    height: vmin(80),
    overflow: 'hidden',
    width: vmin(80),
  },
  buttonText: {
    color: '#222',
    lineHeight: vmin(70),
    letterSpacing: -vmin(3.5),
  },
});
