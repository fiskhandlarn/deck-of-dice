import * as React from 'react';
import ColorMode from '../shared/ColorMode';
import Header from '../components/Header';
import { Animated, Pressable, StyleSheet, Text, View } from 'react-native';
import { vh, vmin, vw } from 'react-native-expo-viewport-units';

export default class DigitButton extends React.Component {
  static hasShownNagOnce = false;

  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      value: '!',
      animation: new Animated.Value(1),
    };

    this.timer = false;
  }

  clearTimer() {
    if (false !== this.timer) {
      clearInterval(this.timer);
      this.timer = false;
    }
  }

  componentDidMount() {
    if (!this.hasShownNagOnce) {
      this.timer = setInterval(() => this.onTimer(), 3000);
      this.hasShownNagOnce = true;
    }
  }

  componentWillUnmount() {
    this.clearTimer();
  }

  onPress = () => {
    this.clearTimer();
    this.props.onChange();
  };

  onTimer () {
    this.startAnimation();
  }

  setValue(value) {
    this.setState({ value: value });

    this.startAnimation();
  }

  startAnimation() {
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
    flexGrow: 1,
    height: (vh(100) - (Header.height * 2)),
    justifyContent: 'center',
    width: vw(100),
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: Header.height,
  },
  digit: {
    fontFamily: 'VnBook-Antiqua',
    fontSize: vmin(70),
    marginLeft: -vmin(1.75),
    marginRight: -vmin(1.75),
  },
});
