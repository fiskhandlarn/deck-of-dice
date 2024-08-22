import * as React from 'react';
import AboutScreen from '../screens/AboutScreen';
import ColorMode from '../shared/ColorMode';
import { HomeScreen } from '../screens/HomeScreen';
import LogScreen from '../screens/LogScreen';
import SettingsScreen from '../screens/SettingsScreen';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Icon, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { StyleSheet, Text } from 'react-native';

type StackParams = {
  Home: undefined;
  Log: undefined;
  Settings: undefined;
  About: undefined;
};

export const Drawer = () => {
  const styles = StyleSheet.create({
    label: {
      fontFamily: 'CrimsonText_400Regular',
      fontSize: 16,
    },
  });

  const Drawer = createDrawerNavigator<StackParams>();

  const screenOptions = (title: string, IconClass: Icon, iconHandle: string) => {
    return {
      drawerActiveTintColor: ColorMode.primaryLightColor(),
      drawerLabel: ({focused, size}) => (
        <Text style={[styles.label, focused ? {color: ColorMode.primaryColor()} : ColorMode.styles().text]}>{title}</Text>
      ),
      drawerIcon: ({size}) => (
        <IconClass
          name={iconHandle}
          size={size}
          color={StyleSheet.flatten(ColorMode.styles().text).color}
        />
      ),
      headerShown: false,
    };
  }

  return (
    <Drawer.Navigator
      initialRouteName='Home'
      screenOptions={{drawerStyle: {backgroundColor: StyleSheet.flatten(ColorMode.styles().container).backgroundColor}}}
    >
      <Drawer.Screen
        name='Home'
        component={HomeScreen}
        options={screenOptions('Home', MaterialCommunityIcons, 'cards')}
      />
      <Drawer.Screen
        name='Log'
        component={LogScreen}
        options={screenOptions('Log', MaterialIcons, 'view-list')}
      />
      <Drawer.Screen
        name='Settings'
        component={SettingsScreen}
        options={screenOptions('Settings', MaterialIcons, 'settings')}
      />
      <Drawer.Screen
        name='About'
        component={AboutScreen}
        options={screenOptions('About', MaterialIcons, 'info')}
      />
    </Drawer.Navigator>
  );
}
