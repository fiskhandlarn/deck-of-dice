import * as React from 'react';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from '../screens/HomeScreen';
import LogScreen from '../screens/LogScreen';

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
                name="cards"
                size={size}
              />
            ),
          }}
        />
        <D.Screen
          name="Log"
          component={LogScreen}
          options={{
            drawerIcon: ({focused, size}) => (
              <MaterialIcons
                name="view-list"
                size={size}
              />
            ),
          }}
        />
      </D.Navigator>
    );
  }
}
