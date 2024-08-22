import CatanText from '../components/CatanText';
import ColorMode from '../shared/ColorMode';
import { MaterialIcons } from '@expo/vector-icons';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

export const HEADER_HEIGHT = 64 as const;

interface TextProps {
  openDrawer: () => void;
  title: string;
}

export const Header = ({openDrawer, title}: TextProps) => {
  // TODO check this.props.openDrawer before accessing it

  const styles = StyleSheet.create({
    view: {
      alignItems: 'center',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      padding: 16,
      width: "100%",
      height: HEADER_HEIGHT,
    },
    text: {
      fontSize: 20,
      flexGrow: 1,
      marginRight: 32,
      textAlign: 'center',
    }
  });

  return (
    <View style={styles.view}>
      <TouchableOpacity onPress={()=>openDrawer()} >
        <MaterialIcons name="menu" size={32} style={ColorMode.styles().text} />
      </TouchableOpacity>
      <CatanText style={[styles.text, ColorMode.styles().text]}>{title}</CatanText>
    </View>
  );
}
