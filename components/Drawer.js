import * as React from 'react';
import AboutScreen from '../screens/AboutScreen';
import ColorMode from '../shared/ColorMode';
import HomeScreen from '../screens/HomeScreen';
import LogScreen from '../screens/LogScreen';
import SettingsScreen from '../screens/SettingsScreen';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { StyleSheet, Text } from 'react-native';

// https://snack.expo.io/3vtKkikb7
const D = createDrawerNavigator();

export default class Drawer extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;

    ColorMode.addListener((value) => this.onColorModeChange(value));

    this.state = {
      colorMode: ColorMode.value(),
    };
  }

  onColorModeChange(value) {
    this.setState({ colorMode: value });
  }

  render() {
    return (
      <D.Navigator
        initialRouteName='Home'
        screenOptions={{drawerStyle: {backgroundColor: StyleSheet.flatten(ColorMode.styles().container).backgroundColor}}}
      >
        <D.Screen
          name='Home'
          component={HomeScreen}
          options={this.screenOptions('Home', MaterialCommunityIcons, 'cards')}
        />
        <D.Screen
          name='Log'
          component={LogScreen}
          options={this.screenOptions('Log', MaterialIcons, 'view-list')}
        />
        <D.Screen
          name='Settings'
          component={SettingsScreen}
          options={this.screenOptions('Settings', MaterialIcons, 'settings')}
        />
        <D.Screen
          name='About'
          component={AboutScreen}
          options={this.screenOptions('About', MaterialIcons, 'info')}
        />
      </D.Navigator>
    );
  }

  screenOptions(title, IconClass, iconHandle) {
    return {
      drawerActiveTintColor: ColorMode.primaryLightColor(),
      drawerLabel: ({focused, size}) => (
        <Text style={[styles.label, focused ? {color: ColorMode.primaryColor()} : ColorMode.styles().text]}>{title}</Text>
      ),
      drawerIcon: ({focused, size}) => (
        <IconClass
          name={iconHandle}
          size={size}
          color={StyleSheet.flatten(ColorMode.styles().text).color}
        />
      ),
      headerShown: false,
    };
  }
}

const styles = StyleSheet.create({
  label: {
    fontFamily: 'CrimsonText_400Regular',
    fontSize: 16,
  },
});
