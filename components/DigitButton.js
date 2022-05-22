import * as React from 'react';
import ColorMode from '../shared/ColorMode';
import { Animated, Pressable, StyleSheet, Text, View } from 'react-native';
import { vmin } from 'react-native-expo-viewport-units';

export default class DigitButton extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      value: '!',
      animation: new Animated.Value(1),
    };
  }

  onPress = () => {
    this.props.onChange();
  };

  setValue(value) {
    this.setState({ value: value });

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
    };

    const digits = this.state.value.toString().split('');

    return (
      <Pressable onPress={this.onPress} style={styles.button}>
        <Animated.View style={[styles.wrapper, animatedStyles]}>
          {
            digits.map((digit, i) => (
              <Text style={[styles.digit, ColorMode.styles().text]} key={i}>{digit}</Text>
            ))
          }
        </Animated.View>
      </Pressable>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    display: 'flex',
    height: vmin(80),
    justifyContent: 'center',
    overflow: 'hidden',
    width: vmin(80),
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
  },
  digit: {
    fontFamily: 'VnBook-Antiqua',
    fontSize: vmin(70),
    marginLeft: -vmin(1.75),
    marginRight: -vmin(1.75),
  },
});
