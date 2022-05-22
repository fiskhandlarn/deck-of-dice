import * as React from 'react';
import ColorMode from '../shared/ColorMode';
import Deck from '../shared/Deck';
import Header from '../components/Header';
import Slider from '@react-native-community/slider';
import Storage from '../shared/Storage';
import { activateKeepAwake, deactivateKeepAwake } from 'expo-keep-awake';
import { Dimensions, ScrollView, StyleSheet, Switch, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { vw } from 'react-native-expo-viewport-units';

export default class SettingsScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isScreenAlive: false,
      isNightModeEnabled: ColorMode.systemValue(),
      isSoundEnabled: true,
      nrCardsSetAside: 12,
    };

    this.populateFromStorage();

    this.sliderValue = React.createRef();
  }

  _onChangeSwitch = (option) => {
    let value = !this.state[option];

    Storage.set(option, value);
    this.setState({[option]: value});

    if ('isScreenAlive' === option) {
      this.updateKeepScreenAlive(value);
    }

    if ('isNightModeEnabled' === option) {
      this.updateNightModeEnabled(value);
    }
  }

  _onChangeNrCardsSetAside = async (value) => {
    Storage.set('nrCardsSetAside', value);
    this.setState({nrCardsSetAside: value});

    const deck = await Deck.instance();
    deck.setCardsSetAside(value);
  }

  populateFromStorage = () => {
    Object.keys(this.state).map(async (option) => {
      let value = await Storage.get(option);

      if (value !== null) {
        // value is previously stored, let's use it

        if (!isNaN(parseInt(value))) {
          value = parseInt(value);
        } else if ('false' === value) {
          value = false;
        } else if ('true' === value) {
          value = true;
        }

        this.setState({
          [option]: value,
        });

        if ('isScreenAlive' === option) {
          this.updateKeepScreenAlive(value);
        }

        if ('isNightModeEnabled' === option) {
          this.updateNightModeEnabled(value);
        }
      }
    });
  };

  updateKeepScreenAlive = (value)  => {
    if (value) {
      activateKeepAwake();
    } else {
      deactivateKeepAwake();
    }
  }

  updateNightModeEnabled = (value)  => {
    ColorMode.value(value);
  }

  render() {
    return (
      <SafeAreaView style={[styles.container, ColorMode.styles().container]}>
        <Header title="Settings" openDrawer={this.props.navigation.openDrawer}/>
        <ScrollView style={styles.scrollContainer}>
          <View style={styles.content}>
            <View style={styles.switchContainer}>
              <Text style={[styles.switchLabel, ColorMode.styles().text]}>Keep screen alive</Text>
              <Switch
                style={styles.toggle}
                onValueChange={() => this._onChangeSwitch('isScreenAlive')}
                value={this.state.isScreenAlive}
                trackColor={{false: ColorMode.grayColor(), true: ColorMode.primaryLightColor()}}
                thumbColor={ColorMode.primaryColor()}
                activeThumbColor={ColorMode.primaryColor()} // https://github.com/facebook/react-native/issues/30429#issuecomment-752745032
              />
            </View>
            <View style={styles.switchContainer}>
              <Text style={[styles.switchLabel, ColorMode.styles().text]}>Enable dark mode</Text>
              <Switch
                style={styles.toggle}
                onValueChange={() => this._onChangeSwitch('isNightModeEnabled')}
                value={this.state.isNightModeEnabled}
                trackColor={{false: ColorMode.grayColor(), true: ColorMode.primaryLightColor()}}
                thumbColor={ColorMode.primaryColor()}
                activeThumbColor={ColorMode.primaryColor()} // https://github.com/facebook/react-native/issues/30429#issuecomment-752745032
              />
            </View>
            <View style={styles.switchContainer}>
              <Text style={[styles.switchLabel, ColorMode.styles().text]}>Enable sounds</Text>
              <Switch
                style={styles.toggle}
                onValueChange={() => this._onChangeSwitch('isSoundEnabled')}
                value={this.state.isSoundEnabled}
                trackColor={{false: ColorMode.grayColor(), true: ColorMode.primaryLightColor()}}
                thumbColor={ColorMode.primaryColor()}
                activeThumbColor={ColorMode.primaryColor()} // https://github.com/facebook/react-native/issues/30429#issuecomment-752745032
              />
            </View>
            <View style={styles.sliderContainer}>
              <Text style={[styles.sliderLabel, ColorMode.styles().text]}>Number of cards to set aside when the deck is shuffled</Text>
              <Slider
                minimumValue={0}
                maximumValue={35}
                step={1}
                value={this.state.nrCardsSetAside}
                minimumTrackTintColor={ColorMode.primaryLightColor()}
                thumbTintColor={ColorMode.primaryColor()}
                maximumTrackTintColor={ColorMode.grayColor()}
                onValueChange={value => this._onChangeNrCardsSetAside(value)}
              />
              <Text style={[styles.sliderValue, ColorMode.styles().text]} ref={this.sliderValue}>
                {this.state.nrCardsSetAside}
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
  }
});
