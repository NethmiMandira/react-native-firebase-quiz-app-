import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../../theme/colors';

interface Props {
  icon: string;
  title?: string;
  message: string;
  iconSize?: number;
  titleSize?: number;
  paddingVertical?: number;
  /** Center in the whole screen instead of inline. */
  fullScreen?: boolean;
  tone?: 'default' | 'error';
  children?: React.ReactNode;
}

const EmptyState: React.FC<Props> = ({
  icon,
  title,
  message,
  iconSize = 64,
  titleSize = 20,
  paddingVertical = 60,
  fullScreen = false,
  tone = 'default',
  children,
}) => (
  <View style={fullScreen ? styles.full : [styles.inline, { paddingVertical }]}>
    <Text style={[styles.icon, { fontSize: iconSize }]}>{icon}</Text>
    {title ? <Text style={[styles.title, { fontSize: titleSize }]}>{title}</Text> : null}
    <Text style={[styles.message, tone === 'error' && styles.error]}>{message}</Text>
    {children}
  </View>
);

const styles = StyleSheet.create({
  full: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 40, zIndex: 1 },
  inline: { alignItems: 'center' },
  icon: { marginBottom: 16 },
  title: { fontWeight: '700', color: colors.textDark, marginBottom: 8, textAlign: 'center' },
  message: {
    fontSize: 16,
    color: colors.textMuted,
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  error: { color: colors.danger, fontSize: 18, fontWeight: '600' },
});

export default EmptyState;
