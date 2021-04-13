import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from '../screens/HomeScreen';
import LogScreen from '../screens/LogScreen';

// https://snack.expo.io/3vtKkikb7
const D = createDrawerNavigator();

export default class Drawer extends React.Component {
  render() {
    return (
      <D.Navigator initialRouteName="Home">
        <D.Screen name="Home" component={HomeScreen}/>
        <D.Screen name="Log" component={LogScreen} />
      </D.Navigator>
    );
  }
}
