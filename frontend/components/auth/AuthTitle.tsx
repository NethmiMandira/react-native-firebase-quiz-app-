import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../../theme/colors';
import { width } from '../../theme/layout';
import GradientTitle from '../common/GradientTitle';

interface Props {
  first: string;
  second: string;
  subtitle?: string;
  fontSize?: number;
  subtitleSize?: number;
  marginBottom?: number;
  titleGap?: number;
  letterSpacing?: number;
}

/** Centered two-tone title with optional subtitle, used on the auth screens. */
const AuthTitle: React.FC<Props> = ({
  first,
  second,
  subtitle,
  fontSize = width * 0.1,
  subtitleSize = width * 0.04,
  marginBottom = 0,
  titleGap = 8,
  letterSpacing = -0.5,
}) => (
  <View style={[styles.container, { marginBottom }]}>
    <GradientTitle
      first={first}
      second={second}
      align="center"
      fontSize={fontSize}
      letterSpacing={letterSpacing}
      style={subtitle ? { marginBottom: titleGap } : undefined}
    />
    {subtitle ? <Text style={[styles.subtitle, { fontSize: subtitleSize }]}>{subtitle}</Text> : null}
  </View>
);

const styles = StyleSheet.create({
  container: { alignItems: 'center' },
  subtitle: { color: colors.textSoft, textAlign: 'center', fontWeight: '400' },
});

export default AuthTitle;
