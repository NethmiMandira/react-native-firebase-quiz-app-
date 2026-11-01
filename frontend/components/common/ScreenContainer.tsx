import React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { colors } from '../../theme/colors';
import BackgroundCircles from './BackgroundCircles';

interface Props {
  children: React.ReactNode;
  variant?: 'default' | 'form';
  style?: StyleProp<ViewStyle>;
}

const ScreenContainer: React.FC<Props> = ({ children, variant, style }) => (
  <View style={[styles.container, style]}>
    <BackgroundCircles variant={variant} />
    {children}
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
});

export default ScreenContainer;
