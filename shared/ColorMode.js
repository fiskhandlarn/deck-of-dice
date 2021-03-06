import * as React from 'react';
import Storage from '../shared/Storage';
import { Appearance, StyleSheet } from 'react-native';

export default class ColorMode {
  static _value = false;
  static _listeners = [];

  static addListener(listener) {
    this._listeners.push(listener);
  }

  static init = async() => {
    let isNightModeEnabled = await Storage.get('isNightModeEnabled');

    if (isNightModeEnabled === null) {
      this.value(this.systemValue());
    } else {
      this.value('true' === isNightModeEnabled);
    }
  };

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
          color: this.value() ? '#e5e5e5' : '#222',
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
      const currentValue = this._value;

      if (currentValue !== value) {
        this._value = value;

        if (this._listeners && this._listeners.length > 0) {
          this._listeners.forEach(listener => listener(value));
        }
      }
    }

    return this._value;
  }
}
