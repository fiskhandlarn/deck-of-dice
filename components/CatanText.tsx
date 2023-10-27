import * as React from 'react';
import { Text, TextProps } from 'react-native';

// https://stackoverflow.com/a/51180107
export default (props: TextProps) => <Text {...props} style={[{fontFamily: 'CrimsonText_400Regular', fontSize: 16}, props.style]}>{props.children}</Text>
