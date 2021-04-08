import React from 'react'
import { Animated, Pressable, StyleSheet, Text, View } from 'react-native';
import { vmin } from 'react-native-expo-viewport-units';

export default class DigitButton extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      digit: '!',
      animation: new Animated.Value(1),
    };
  }

  onPress = () => {
    this.props.onChange();
  };

  setDigit(digit) {
    this.setState({ digit: digit });

    this.state.animation.setValue(1.15);
    Animated.timing(this.state.animation, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }

  render() {
   const animatedStyles = {
      transform: [
        { scale: this.state.animation }
      ]
    }

    return (
      <Pressable onPress={this.onPress} style={styles.button}>
        <Animated.Text style={[styles.buttonText, animatedStyles]}>{this.state.digit}</Animated.Text>
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
    justifyContent: 'center',
    overflow: 'hidden',
    width: vmin(80),
  },
  buttonText: {
    color: '#222',
    fontFamily: 'VnBook-Antiqua',
    fontSize: vmin(70),
    // lineHeight: vmin(70),
    letterSpacing: -vmin(3.5),
    borderColor: '#f00000',
    borderWidth: StyleSheet.hairlineWidth,
  },
});
