import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { colors } from '../../theme/colors';
import { shadow } from '../../theme/layout';

interface Props {
  onPress: () => void;
}

const FloatingCreateButton: React.FC<Props> = ({ onPress }) => (
  <TouchableOpacity style={styles.button} onPress={onPress}>
    <Text style={styles.icon}>📝</Text>
    <Text style={styles.text}>Create Quiz</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    right: 20,
    bottom: 30,
    backgroundColor: colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 25,
    flexDirection: 'row',
    alignItems: 'center',
    ...shadow(colors.primary, 0.3, 8, 16, 8),
  },
  icon: { fontSize: 20, marginRight: 8 },
  text: { color: colors.white, fontSize: 16, fontWeight: '700' },
});

export default FloatingCreateButton;
