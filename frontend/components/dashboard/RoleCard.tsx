import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors } from '../../theme/colors';
import { width } from '../../theme/layout';

interface Props {
  icon: string;
  title: string;
  description: string;
  accentColor: string;
  onPress: () => void;
  marginBottom?: number;
}

/** Big tappable card used to pick Student / Mentor. */
const RoleCard: React.FC<Props> = ({
  icon,
  title,
  description,
  accentColor,
  onPress,
  marginBottom = 0,
}) => (
  <TouchableOpacity
    style={[
      styles.card,
      {
        marginBottom,
        shadowColor: accentColor,
        borderColor: accentColor === colors.primary ? 'rgba(116, 97, 238, 0.1)' : 'rgba(255, 107, 107, 0.1)',
      },
    ]}
    onPress={onPress}
  >
    <View style={styles.iconWrap}>
      <Text style={styles.icon}>{icon}</Text>
    </View>
    <Text style={styles.title}>{title}</Text>
    <Text style={styles.description}>{description}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: 24,
    width: '85%',
    alignItems: 'center',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
    borderWidth: 2,
  },
  iconWrap: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.primarySoft,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  icon: { fontSize: 28 },
  title: { fontSize: width * 0.055, fontWeight: '700', color: colors.textDark, marginBottom: 8 },
  description: { fontSize: width * 0.035, color: colors.textMuted, textAlign: 'center' },
});

export default RoleCard;
