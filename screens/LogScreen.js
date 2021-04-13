import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../components/Header';

export default class LogScreen extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Header title="Log" openDrawer={this.props.navigation.openDrawer}/>
        <View style={styles.content}>
          <Text>Log TODO</Text>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  content: {
    flexGrow: 1,
    justifyContent: 'center',
  },
});
