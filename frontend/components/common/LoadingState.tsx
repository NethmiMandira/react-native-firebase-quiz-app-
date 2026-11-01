import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { colors } from '../../theme/colors';

interface Props {
  message: string;
  /** Fill the whole screen (default) or render inline inside a list/section. */
  fullScreen?: boolean;
}

const LoadingState: React.FC<Props> = ({ message, fullScreen = true }) => (
  <View style={fullScreen ? styles.full : styles.inline}>
    <ActivityIndicator size="large" color={colors.primary} />
    <Text style={styles.text}>{message}</Text>
  </View>
);

const styles = StyleSheet.create({
  full: { flex: 1, justifyContent: 'center', alignItems: 'center', zIndex: 1 },
  inline: { alignItems: 'center', paddingVertical: 40 },
  text: { marginTop: 12, color: colors.primary, fontSize: 16, fontWeight: '500' },
});

export default LoadingState;
