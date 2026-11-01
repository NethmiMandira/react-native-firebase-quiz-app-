import React from 'react';
import { StyleSheet, View } from 'react-native';
import { height } from '../../theme/layout';

interface Props {
  /** `form` places the circles slightly lower, used on long form screens. */
  variant?: 'default' | 'form';
}

const BackgroundCircles: React.FC<Props> = ({ variant = 'default' }) => {
  const form = variant === 'form';
  return (
    <View style={styles.container} pointerEvents="none">
      <View style={styles.circle1} />
      <View style={[styles.circle2, { top: height * (form ? 0.4 : 0.3) }]} />
      <View style={[styles.circle3, { bottom: form ? 150 : 100 }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 0 },
  circle1: {
    position: 'absolute',
    top: -100,
    right: -50,
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'rgba(116, 97, 238, 0.1)',
  },
  circle2: {
    position: 'absolute',
    left: -80,
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: 'rgba(255, 107, 107, 0.08)',
  },
  circle3: {
    position: 'absolute',
    right: -60,
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(52, 211, 153, 0.1)',
  },
});

export default BackgroundCircles;
