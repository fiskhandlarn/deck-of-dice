import * as React from 'react';
import ColorMode from '../shared/ColorMode';
import { Header, HEADER_HEIGHT } from '../components/Header';
import Log from '../shared/Log';
import { Dimensions, FlatList, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const renderItem = ({ item }) => (
  <Text style={[styles.text, ColorMode.styles().text]}>{item.message}</Text>
);

export default class LogScreen extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;

    ColorMode.addListener((value) => this.onColorModeChange(value));

    this.state = {
      colorMode: ColorMode.value(),
      data: Log.get(),
    };
  }

  _onFocus = () => {
    // force re-read from log
    this.setState({data: Log.get()});
  }

  componentDidMount() {
    this.props.navigation.addListener('focus', this._onFocus);
  }

  componentWillUnmount() {
    this.props.navigation.removeListener('focus', this._onFocus);
  }

  onColorModeChange(value) {
    this.setState({ colorMode: value });
  }

  render() {
    return (
      <SafeAreaView style={[styles.container, ColorMode.styles().container]}>
        <Header title="Log" openDrawer={this.props.navigation.openDrawer}/>
        <FlatList
          style={styles.list}
          data={this.state.data}
          extraData={this.state}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      </SafeAreaView>
    );
  }
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
