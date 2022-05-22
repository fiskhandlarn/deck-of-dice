import React from 'react';
import { Appearance, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar'; // automatically switches bar style based on theme!

export default class ColorMode {
  static _value = false;

  static grayColor() {
    return this.value() ? '#939393' : '#b1b1b1'; // https://material.io/design/color/dark-theme.html#ui-application
  }

  static primaryColor() {
    return this.value() ? '#bb86fc' : '#6200ee'; // https://material.io/design/color/dark-theme.html#ui-application
  }

  static primaryLightColor() {
    return this.value() ? '#e7b9ff' : '#B388FF'; // https://material.io/design/color/dark-theme.html#ui-application
  }

  static styles() {
      return StyleSheet.create({
        container: {
          backgroundColor: this.value() ? '#121212' : '#fff', // https://material.io/design/color/dark-theme.html#properties
        },
        text: {
          color: this.value() ? '#e5e5e5' : '#000',
        }
      });
  }

  // true if dark mode
  static systemValue() {
    return (Appearance.getColorScheme() === 'dark');
  }

  // true if dark mode
  static value(value = null) {
    if (null !== value) {
      this._value = value;
    }

    return this._value;
  }
}
