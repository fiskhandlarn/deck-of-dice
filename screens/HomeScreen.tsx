//import * as React from 'react';
import { useState } from 'react';
import AudioPlayer from '../shared/AudioPlayer.js';
import ColorMode from '../shared/ColorMode';
import Deck from '../shared/Deck';
import { DigitButton } from '../components/DigitButton';
import { Header } from '../components/Header';
import Storage from '../shared/Storage';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { DrawerScreenProps } from '@react-navigation/drawer';

// TODO move to types.tsx
// https://github.com/react-navigation/react-navigation/blob/main/example/src/Screens/MasterDetail.tsx
type DrawerParams = {
  Home: undefined,
  Log: undefined,
  Settings: undefined,
  About: undefined,
};

export const HomeScreen = ({
  navigation,
}: DrawerScreenProps<DrawerParams, 'Home'>) => {
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

  const [displayCard, setDisplayCard] = useState('!');

  // TODO ColorMode

  // TODO needs async if Deck.instance needs to be async?
  const onChangeDigitButton = () => {
    const card = Deck.instance().draw();

    setDisplayCard(card);

    // TODO restore sound
    //   let isSoundEnabled = await Storage.get('isSoundEnabled');
    //   isSoundEnabled = ('true' === isSoundEnabled || null === isSoundEnabled);

    //   if (isSoundEnabled) {
    //     if (displayCard == 7) {
    //       AudioPlayer.playSound('dice7');
    //     } else {
    //       AudioPlayer.playSound('dice');
    //     }
    //   }
    // }
  }

  return (
    <SafeAreaView style={[styles.container, ColorMode.styles().container]}>
      <Header openDrawer={navigation.openDrawer} />
      <View style={styles.content}>
        <DigitButton text={displayCard} onTrigger={onChangeDigitButton} />
      </View>
    </SafeAreaView>
  );
}
