import * as React from 'react';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { createDrawerNavigator } from '@react-navigation/drawer';
import AboutScreen from '../screens/AboutScreen';
import HomeScreen from '../screens/HomeScreen';
import LogScreen from '../screens/LogScreen';
import SettingsScreen from '../screens/SettingsScreen';

// https://snack.expo.io/3vtKkikb7
const D = createDrawerNavigator();

export default class Drawer extends React.Component {
  render() {
    return (
      <D.Navigator initialRouteName="Home">
        <D.Screen
          name="Home"
          component={HomeScreen}
          options={{
            drawerIcon: ({focused, size}) => (
              <MaterialCommunityIcons
                name='cards'
                size={size}
              />
            ),
            headerShown: false,
          }}
        />
        <D.Screen
          name="Log"
          component={LogScreen}
          options={{
            drawerIcon: ({focused, size}) => (
              <MaterialIcons
                name='view-list'
                size={size}
              />
            ),
            headerShown: false,
          }}
        />
        <D.Screen
          name="Settings"
          component={SettingsScreen}
          options={{
            drawerIcon: ({focused, size}) => (
              <MaterialIcons
                name='settings'
                size={size}
              />
            ),
            headerShown: false,
          }}
        />
        <D.Screen
          name="About"
          component={AboutScreen}
          options={{
            drawerIcon: ({focused, size}) => (
              <MaterialIcons
                name='info'
                size={size}
              />
            ),
            headerShown: false,
          }}
        />
      </D.Navigator>
    );
  }
}
