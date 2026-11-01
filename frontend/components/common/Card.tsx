import React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { colors } from '../../theme/colors';
import { shadow } from '../../theme/layout';

const accents = {
  primary: 'rgba(116, 97, 238, 0.1)',
  secondary: 'rgba(255, 107, 107, 0.1)',
  success: 'rgba(52, 211, 153, 0.1)',
} as const;

interface Props {
  children: React.ReactNode;
  accent?: keyof typeof accents;
  padding?: number;
  style?: StyleProp<ViewStyle>;
}

const Card: React.FC<Props> = ({ children, accent = 'primary', padding = 24, style }) => (
  <View style={[styles.card, { padding, borderColor: accents[accent] }, style]}>{children}</View>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: 20,
    marginHorizontal: 20,
    marginBottom: 20,
    borderWidth: 1,
    ...shadow(),
  },
});

export default Card;
