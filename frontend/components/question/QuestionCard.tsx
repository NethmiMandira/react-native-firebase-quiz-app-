import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Card, LetterBadge, NumberBadge } from '../common';
import { colors } from '../../theme/colors';
import type { QuestionData } from '../../type/quiz';
import { optionLetter } from '../../utils/quiz';

interface Props {
  index: number;
  data: QuestionData;
  menuOpen: boolean;
  /** Published quizzes can't be edited. */
  editable: boolean;
  onToggleMenu: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

const QuestionCard: React.FC<Props> = ({ index, data, menuOpen, editable, onToggleMenu, onEdit, onDelete }) => (
  <Card padding={20} style={styles.card}>
    <View style={styles.header}>
      <NumberBadge value={index + 1} />
      <Text style={styles.questionText}>{data.question}</Text>
      <TouchableOpacity onPress={onToggleMenu} style={styles.menuButton} accessibilityLabel="Open menu">
        <Text style={styles.menuIcon}>⋯</Text>
      </TouchableOpacity>
    </View>

    {menuOpen && editable && (
      <View style={styles.menu}>
        <TouchableOpacity style={styles.menuItem} onPress={onEdit}>
          <Text style={styles.menuItemIcon}>✏️</Text>
          <Text style={styles.menuItemText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={onDelete}>
          <Text style={styles.menuItemIcon}>🗑️</Text>
          <Text style={[styles.menuItemText, styles.deleteText]}>Delete</Text>
        </TouchableOpacity>
      </View>
    )}

    <View style={styles.options}>
      {data.options.map((option, idx) => {
        const correct = idx === data.correctOption;
        return (
          <View key={idx} style={[styles.optionRow, correct && styles.correctRow]}>
            <LetterBadge letter={optionLetter(idx)} size={24} fontSize={12} active={correct} activeColor={colors.success} />
            <Text style={[styles.optionText, correct && styles.correctText]}>{option}</Text>
            {correct && <Text style={styles.correctIcon}>✓</Text>}
          </View>
        );
      })}
    </View>
  </Card>
);

const styles = StyleSheet.create({
  card: { marginBottom: 16 },
  header: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 16 },
  questionText: { flex: 1, fontSize: 16, fontWeight: '600', color: colors.textDark, lineHeight: 24, paddingRight: 8 },
  menuButton: { padding: 4 },
  menuIcon: { fontSize: 20, color: colors.textMuted, fontWeight: '700' },
  menu: {
    position: 'absolute',
    top: 50,
    right: 20,
    backgroundColor: colors.white,
    borderRadius: 12,
    paddingVertical: 8,
    width: 140,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
    zIndex: 100,
    borderWidth: 1,
    borderColor: colors.border,
  },
  menuItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, paddingHorizontal: 16 },
  menuItemIcon: { fontSize: 16, marginRight: 8 },
  menuItemText: { fontSize: 14, fontWeight: '500', color: colors.textDark },
  deleteText: { color: colors.danger },
  options: { marginTop: 8 },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 12,
    marginBottom: 8,
    backgroundColor: colors.surface,
  },
  correctRow: {
    backgroundColor: colors.successSoft,
    borderWidth: 1,
    borderColor: 'rgba(52, 211, 153, 0.3)',
  },
  optionText: { flex: 1, fontSize: 14, color: colors.textDark, fontWeight: '500' },
  correctText: { color: colors.successDark, fontWeight: '600' },
  correctIcon: { fontSize: 16, color: colors.success, fontWeight: '700' },
});

export default QuestionCard;
