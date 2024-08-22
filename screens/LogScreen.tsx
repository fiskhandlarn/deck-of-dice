import * as React from 'react';
import ColorMode from '../shared/ColorMode';
import { Header, HEADER_HEIGHT } from '../components/Header';
import Log from '../shared/Log';
import { Dimensions, FlatList, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useEffect, useState } from 'react';

const renderItem = ({ item }) => (
  <Text style={[styles.text, ColorMode.styles().text]}>{item.message}</Text>
);

export const LogScreen = ({
  navigation,
}: DrawerScreenProps<DrawerParams, 'Log'>) => {

  // TODO ColorMode
  //    ColorMode.addListener((value) => this.onColorModeChange(value));
  // onColorModeChange(value) {
  //   this.setState({ colorMode: value });
  // }

  const [data, setData] = useState('');

  useEffect(() => {
    setData(Log.get());
  }, []);

  return (
    <SafeAreaView style={[styles.container, ColorMode.styles().container]}>
      <Header title="Log" openDrawer={navigation.openDrawer}/>
      <FlatList
        style={styles.list}
        data={data}
        //extraData={this.state}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'flex-start',
  },
  list: {
    // flex calculations on Android for FlatList are whack, let's calc the height instead:
    height: Dimensions.get('window').height - HEADER_HEIGHT,
    paddingHorizontal: 16,
  },
  text: {
    fontFamily: 'monospace',
  }
});
