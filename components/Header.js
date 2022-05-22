import * as React from 'react';
import CatanText from '../components/CatanText';
import ColorMode from '../shared/ColorMode';
import { MaterialIcons } from '@expo/vector-icons';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default class Header extends React.Component {
  static height = 64;

  constructor(props) {
    super(props);
    this.props = props;
  }

  render() {
    return (
      <View style={styles.view}>
        <TouchableOpacity onPress={()=>this.props.openDrawer()} >
          <MaterialIcons name="menu" size={32} style={ColorMode.styles().text} />
        </TouchableOpacity>
        <CatanText style={[styles.text, ColorMode.styles().text]}>{this.props.title}</CatanText>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  view: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 16,
    width: "100%",
    height: Header.height,
  },
  text: {
    fontSize: 18,
    flexGrow: 1,
    marginRight: 32,
    textAlign: 'center',
  }
});
