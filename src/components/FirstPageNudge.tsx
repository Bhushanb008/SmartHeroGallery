import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  Dimensions,
  View,
} from 'react-native';

interface Props {
  onPress: () => void;
  visible: boolean;
}

const { height } = Dimensions.get('window');

const FirstPageNudge: React.FC<Props> = ({ onPress, visible }) => {
  if (!visible) return null;

  return (
    <View style={styles.wrapper}>
      <TouchableOpacity
        style={styles.container}
        onPress={onPress}
        activeOpacity={0.85}
      >
        <Text style={styles.arrow}>›</Text>
      </TouchableOpacity>
    </View>
  );
};

export default React.memo(FirstPageNudge);

const SIZE = 52;

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    right: 18,
    top: height / 3 - SIZE,
  },

  container: {
    width: SIZE,
    height: SIZE,
    borderRadius: SIZE / 2,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    elevation: 9,
  },
  arrow: {
    fontSize: 36,
    color: '#eb6a3b',
    fontWeight: '600',
    marginLeft: 2,
  },
});
