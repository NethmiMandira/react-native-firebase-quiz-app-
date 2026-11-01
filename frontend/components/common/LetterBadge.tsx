import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../../theme/colors';

interface Props {
  letter: string;
  size?: number;
  fontSize?: number;
  active?: boolean;
  activeColor?: string;
}

/** A/B/C/D option badge that highlights when selected / correct. */
const LetterBadge: React.FC<Props> = ({
  letter,
  size = 28,
  fontSize = 14,
  active = false,
  activeColor = colors.primary,
}) => (
  <View
    style={[
      styles.badge,
      { width: size, height: size, borderRadius: size / 2 },
      active && { backgroundColor: activeColor },
    ]}
  >
    <Text style={[styles.text, { fontSize }, active && styles.textActive]}>{letter}</Text>
  </View>
);

const styles = StyleSheet.create({
  badge: {
    backgroundColor: colors.border,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  text: { fontWeight: '700', color: colors.textMuted },
  textActive: { color: colors.white },
});

export default LetterBadge;
