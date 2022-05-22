import * as React from 'react';
import { CrimsonText_400Regular } from '@expo-google-fonts/crimson-text';
import { Text } from 'react-native';

// https://stackoverflow.com/a/51180107
export default props => <Text {...props} style={[{fontFamily: 'CrimsonText_400Regular'}, props.style]}>{props.children}</Text>
