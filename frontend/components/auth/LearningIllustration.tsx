import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../../theme/colors';
import { width } from '../../theme/layout';

const SUBJECTS = [
  { icon: '🔢', label: 'Math', style: 'bubble1', border: colors.secondary },
  { icon: '🧪', label: 'Science', style: 'bubble2', border: colors.success },
  { icon: '🌍', label: 'Geography', style: 'bubble3', border: colors.warning },
  { icon: '📚', label: 'Literature', style: 'bubble4', border: colors.purple },
] as const;

const STARS = [
  { icon: '⭐', style: 'star1' },
  { icon: '✨', style: 'star2' },
  { icon: '🌟', style: 'star3' },
] as const;

/** Decorative "learning journey" artwork shown on the Get Started screen. */
const LearningIllustration: React.FC = () => (
  <View style={styles.wrapper}>
    <View style={styles.illustration}>
      <View style={styles.hub}>
        <View style={styles.hubCircle}>
          <Text style={styles.hubIcon}>📖</Text>
        </View>
        <Text style={styles.hubLabel}>Learn</Text>
      </View>

      <View style={styles.fill}>
        {SUBJECTS.map((s) => (
          <View key={s.label} style={[styles.bubble, styles[s.style], { borderColor: s.border }]}>
            <Text style={styles.bubbleIcon}>{s.icon}</Text>
            <Text style={styles.bubbleText}>{s.label}</Text>
          </View>
        ))}
      </View>

      <View style={styles.fill}>
        {STARS.map((s) => (
          <View key={s.style} style={[styles.star, styles[s.style]]}>
            <Text style={styles.starText}>{s.icon}</Text>
          </View>
        ))}
      </View>

      <View style={styles.path}>
        <View style={styles.pathDot} />
        <View style={styles.pathLine} />
        <View style={styles.pathDot} />
        <View style={styles.pathLine} />
        <View style={styles.pathDot} />
      </View>

      <View style={styles.badge}>
        <Text style={styles.badgeIcon}>🎯</Text>
        <Text style={styles.badgeText}>Quiz Master</Text>
      </View>
    </View>
  </View>
);

const styles = StyleSheet.create({
  wrapper: { alignItems: 'center', marginBottom: 40, width: width * 0.9, height: 220 },
  illustration: {
    width: '100%',
    height: '100%',
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fill: { position: 'absolute', width: '100%', height: '100%' },
  hub: { position: 'absolute', alignItems: 'center', top: 60 },
  hubCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  hubIcon: { fontSize: 32 },
  hubLabel: { fontSize: 14, fontWeight: '600', color: colors.primary, marginTop: 8 },
  bubble: {
    position: 'absolute',
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    borderWidth: 2,
  },
  bubble1: { top: 20, left: 20 },
  bubble2: { top: 20, right: 20 },
  bubble3: { bottom: 40, left: 30 },
  bubble4: { bottom: 40, right: 30 },
  bubbleIcon: { fontSize: 24, marginBottom: 4 },
  bubbleText: { fontSize: 10, fontWeight: '600', color: colors.textBody },
  star: {
    position: 'absolute',
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(255, 215, 0, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  star1: { top: 10, left: '50%', marginLeft: -15 },
  star2: { top: 40, right: 10 },
  star3: { bottom: 20, left: 10 },
  starText: { fontSize: 16 },
  path: { position: 'absolute', bottom: 10, flexDirection: 'row', alignItems: 'center' },
  pathDot: { width: 12, height: 12, borderRadius: 6, backgroundColor: colors.primary },
  pathLine: { width: 30, height: 2, backgroundColor: '#CBD5E1', marginHorizontal: 4 },
  badge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: colors.secondary,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: colors.secondary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  badgeIcon: { fontSize: 14, marginRight: 4 },
  badgeText: { fontSize: 10, fontWeight: '700', color: colors.white },
});

export default LearningIllustration;
