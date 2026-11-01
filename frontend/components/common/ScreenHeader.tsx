import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../../theme/colors';
import { height } from '../../theme/layout';
import GradientTitle from './GradientTitle';

interface Props {
  first: string;
  second?: string;
  subtitle?: string;
  /** Optional element on the right (e.g. a menu button). */
  right?: React.ReactNode;
}

const ScreenHeader: React.FC<Props> = ({ first, second, subtitle, right }) => (
  <View style={styles.header}>
    <View style={styles.row}>
      <View style={styles.titleWrap}>
        <GradientTitle first={first} second={second} style={subtitle ? styles.titleGap : undefined} />
        {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      </View>
      {right}
    </View>
  </View>
);

const styles = StyleSheet.create({
  header: { paddingHorizontal: 20, paddingTop: height * 0.06, paddingBottom: 20 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  titleWrap: { flex: 1 },
  titleGap: { marginBottom: 8 },
  subtitle: { fontSize: 16, color: colors.textMuted, fontWeight: '500' },
});

export default ScreenHeader;
