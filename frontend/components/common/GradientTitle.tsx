import React from 'react';
import { StyleProp, StyleSheet, Text, TextStyle } from 'react-native';
import { colors } from '../../theme/colors';
import { width } from '../../theme/layout';

interface Props {
  first: string;
  second?: string;
  firstColor?: string;
  secondColor?: string;
  fontSize?: number;
  align?: 'left' | 'center';
  letterSpacing?: number;
  style?: StyleProp<TextStyle>;
}

/** Two-tone heading, e.g. "Smart" (purple) + "Quiz" (coral). */
const GradientTitle: React.FC<Props> = ({
  first,
  second,
  firstColor = colors.primary,
  secondColor = colors.secondary,
  fontSize = width * 0.08,
  align = 'left',
  letterSpacing = -0.5,
  style,
}) => (
  <Text style={[styles.title, { fontSize, textAlign: align, letterSpacing }, style]}>
    <Text style={{ color: firstColor }}>{first}</Text>
    {second ? <Text style={{ color: secondColor }}>{second}</Text> : null}
  </Text>
);

const styles = StyleSheet.create({
  title: { fontWeight: '800' },
});

export default GradientTitle;
