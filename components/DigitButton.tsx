import { useEffect } from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import Animated, { useSharedValue, withTiming } from 'react-native-reanimated';
import ColorMode from '../shared/ColorMode';
import Header from '../components/Header';
import useUnits from 'rxn-units';

interface DigitButtonProps {
  text: string,
  onTrigger?: () => void;
}

export const DigitButton = ({ text = '!', onTrigger }: DigitButtonProps) => {
  const {vh, vmin, vw} = useUnits();

  const scale = useSharedValue(1);

  const styles = StyleSheet.create({
    button: {
      alignItems: 'center',
      display: 'flex',
      height: (vh(100) - Header.height),
      justifyContent: 'center',
      overflow: 'hidden',
      width: vw(100),
    },
    wrapper: {
      display: 'flex',
      flexDirection: 'row',
      marginBottom: Header.height,
    },
    digit: {
      fontFamily: 'VnBook-Antiqua',
      fontSize: vmin(90),
      marginLeft: -vmin(1.75),
      marginRight: -vmin(1.75),
    },
  });

  useEffect(() => {
    animate();
  }, [text]);

  const animate = () => {
    scale.value = 1.15;
    scale.value = withTiming(1, {
      duration: 200,
    });
  }

  // TODO restore nag
  //static hasShownNagOnce = false;
  //timer: <typeof setInterval> = 0;
  // TODO timer as useRef ? https://www.pluralsight.com/guides/prop-changes-in-react-component

  const onPress = () => {
    // TODO clear nag timer
    onTrigger && onTrigger();
  }

  return (
    <Pressable onPress={onPress} style={styles.button}>
      <Animated.View
        style={[
          styles.wrapper,
          {
            transform: [
              { scale },
            ],
          }
        ]}>
        {
          text.toString().split('').map((digit: string, i: number) => (
            <Text style={[styles.digit, ColorMode.styles().text]} key={i}>{digit}</Text>
          ))
        }
      </Animated.View>
    </Pressable>
  );
}
