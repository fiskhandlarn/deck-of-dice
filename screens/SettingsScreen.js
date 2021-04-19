import * as React from 'react';
import { StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../components/Header';

export default class SettingsScreen extends React.Component {
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Header title="Settings" openDrawer={this.props.navigation.openDrawer}/>
        <Text>Settings TODO</Text>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'flex-start',
  },
});
