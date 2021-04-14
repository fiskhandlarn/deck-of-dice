import * as React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default class Header extends React.Component {
  static height = 64;

  constructor(props) {
    super(props);
    this.props = props;
  }

  render() {
    return (
      <View style={styles.view}>
        <TouchableOpacity onPress={()=>this.props.openDrawer()} style={styles.button}>
          <MaterialIcons name="menu" size={32} />
        </TouchableOpacity>
        <Text style={styles.text}>{this.props.title}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  view: {
    alignItems: 'center',
    // borderColor: '#0000f0',
    // borderWidth: StyleSheet.hairlineWidth,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 16,
    width: "100%",
    height: Header.height,
  },
  button: {
    // borderColor: '#0f0',
    // borderWidth: StyleSheet.hairlineWidth,
  },
  text: {
    // borderColor: '#f00',
    // borderWidth: StyleSheet.hairlineWidth,
    flexGrow: 1,
    marginRight: 32,
    textAlign: 'center',
  }

});
