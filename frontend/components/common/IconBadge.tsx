import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../../theme/colors';

interface Props {
  emoji: string;
  size?: number;
  fontSize?: number;
  backgroundColor?: string;
}

/** Round badge holding a single emoji. */
const IconBadge: React.FC<Props> = ({
  emoji,
  size = 32,
  fontSize = 16,
  backgroundColor = colors.primarySoft,
}) => (
  <View
    style={[styles.badge, { width: size, height: size, borderRadius: size / 2, backgroundColor }]}
  >
    <Text style={{ fontSize }}>{emoji}</Text>
  </View>
);

const styles = StyleSheet.create({
  badge: { justifyContent: 'center', alignItems: 'center' },
});

export default IconBadge;
