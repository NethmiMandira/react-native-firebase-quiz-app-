import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../../theme/colors';

interface Props {
  value: number | string;
  size?: number;
  fontSize?: number;
  color?: string;
  marginRight?: number;
}

/** Solid coloured circle with a number, used for question / attempt numbers. */
const NumberBadge: React.FC<Props> = ({
  value,
  size = 32,
  fontSize = 14,
  color = colors.primary,
  marginRight = 12,
}) => (
  <View
    style={[
      styles.badge,
      { width: size, height: size, borderRadius: size / 2, backgroundColor: color, marginRight },
    ]}
  >
    <Text style={[styles.text, { fontSize }]}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  badge: { justifyContent: 'center', alignItems: 'center', marginTop: 2 },
  text: { color: colors.white, fontWeight: '700' },
});

export default NumberBadge;
