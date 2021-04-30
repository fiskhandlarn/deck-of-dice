import * as React from 'react';
import { Dimensions, ScrollView, StyleSheet, Switch, Text, View } from 'react-native';
import { vw } from 'react-native-expo-viewport-units';
import { SafeAreaView } from 'react-native-safe-area-context';
import Slider from '@react-native-community/slider';
import Header from '../components/Header';

export default class SettingsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOption1Enabled: false,
      isOption2Enabled: false,
      isOption3Enabled: true,
      slider1Value: 12,
    }

    this.sliderValue = React.createRef();
  }

  _onChangeSwitch = (option) => {
    this.setState({
      [option]: !this.state[option]
    })
  }

  _onChangeSlider1 = (value) => {
    // TODO save value to store
    this.setState({slider1Value: value})
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Header title="Settings" openDrawer={this.props.navigation.openDrawer}/>
        <ScrollView style={styles.scrollContainer}>
          <View style={styles.content}>
            <View style={styles.switchContainer}>
              <Text style={styles.switchLabel}>Keep screen alive</Text>
              <Switch style={styles.toggle} onValueChange={() => this._onChangeSwitch('isOption1Enabled')} value={this.state.isOption1Enabled} />
            </View>
            <View style={styles.switchContainer}>
              <Text style={styles.switchLabel}>Enable night mode</Text>
              <Switch style={styles.toggle} onValueChange={() => this._onChangeSwitch('isOption2Enabled')} value={this.state.isOption2Enabled} />
            </View>
            <View style={styles.switchContainer}>
              <Text style={styles.switchLabel}>Enable sounds</Text>
              <Switch style={styles.toggle} onValueChange={() => this._onChangeSwitch('isOption3Enabled')} value={this.state.isOption3Enabled} />
            </View>
            <View style={styles.sliderContainer}>
              <Text style={styles.sliderLabel}>Number of cards to set aside when the deck is shuffled</Text>
              <Slider
                minimumValue={0}
                maximumValue={35}
                step={1}
                value={12}
                minimumTrackTintColor="#000"
                thumbTintColor="#000"
                onValueChange={value => this._onChangeSlider1(value)}
              />
              <Text style={styles.sliderValue} ref={this.sliderValue}>
                {this.state.slider1Value}
              </Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'flex-start',
  },
  scrollContainer: {
    flexGrow: 1,
    // flex calculations on Android for ScrollView are whack, let's calc the height instead:
    height: Dimensions.get('window').height - Header.height,
    width: '100%',
  },
  content: {
    padding: 16,
  },
  switchContainer: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  switchLabel: {
    flexGrow: 1,
    maxWidth: vw(75), // fix for Android
  },
  toggle: {
    flexShrink: 1,
  },
  sliderContainer: {
    marginBottom: 16,
  },
  sliderLabel: {
    marginBottom: 8,
  },
  sliderValue: {
    textAlign: 'right',
    color: '#aaa', // TODO variable
  }
});
