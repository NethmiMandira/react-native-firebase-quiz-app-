import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@react-native-vector-icons/material-icons';

import { colors } from '../../theme/colors';
import { width } from '../../theme/layout';

interface Props {
  onPress: () => void;
}

const BackButton: React.FC<Props> = ({ onPress }) => (
  <TouchableOpacity style={styles.button} onPress={onPress}>
    <MaterialIcons name="arrow-back" size={24} color={colors.textDark} />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
});

export default BackButton;
