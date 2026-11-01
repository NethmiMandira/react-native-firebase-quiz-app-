import { Dimensions } from 'react-native';

export const { width, height } = Dimensions.get('window');

/** Shared drop-shadow used by cards and buttons. */
export const shadow = (
  color = '#000',
  opacity = 0.1,
  offsetY = 4,
  radius = 12,
  elevation = 5,
) => ({
  shadowColor: color,
  shadowOffset: { width: 0, height: offsetY },
  shadowOpacity: opacity,
  shadowRadius: radius,
  elevation,
});
