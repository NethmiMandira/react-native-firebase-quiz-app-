import React from 'react';
import { StyleProp, StyleSheet, Text, TouchableOpacity, ViewStyle } from 'react-native';
import { colors } from '../../theme/colors';
import { shadow } from '../../theme/layout';

interface Props {
  label: string;
  onPress: () => void;
  icon?: string;
  color?: string;
  variant?: 'solid' | 'outline';
  disabled?: boolean;
  paddingVertical?: number;
  fontSize?: number;
  style?: StyleProp<ViewStyle>;
  accessibilityLabel?: string;
}

const PrimaryButton: React.FC<Props> = ({
  label,
  onPress,
  icon,
  color = colors.primary,
  variant = 'solid',
  disabled = false,
  paddingVertical = 18,
  fontSize = 18,
  style,
  accessibilityLabel,
}) => {
  const outline = variant === 'outline';
  const bg = disabled ? colors.border : outline ? colors.white : color;
  const textColor = disabled ? colors.placeholder : outline ? color : colors.white;
  const borderColor = disabled ? colors.border : color;

  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor: bg, paddingVertical },
        outline && { borderWidth: 2, borderColor },
        !disabled && !outline && shadow(color, 0.3, 4, 8, 5),
        style,
      ]}
      onPress={onPress}
      disabled={disabled}
      accessibilityLabel={accessibilityLabel ?? label}
    >
      {icon ? <Text style={styles.icon}>{icon}</Text> : null}
      <Text style={[styles.text, { color: textColor, fontSize }]}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
  },
  icon: { fontSize: 18, marginRight: 8 },
  text: { fontWeight: '700' },
});

export default PrimaryButton;
