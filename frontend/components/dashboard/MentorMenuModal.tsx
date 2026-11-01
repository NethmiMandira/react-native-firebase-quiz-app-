import React from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { GradientTitle } from '../common';
import { colors } from '../../theme/colors';

export type MentorMenuOption = 'Quizzes' | 'Settings' | 'Help';

interface Props {
  visible: boolean;
  onClose: () => void;
  onSelect: (option: MentorMenuOption) => void;
}

const ITEMS: { option: MentorMenuOption; icon: string; label: string }[] = [
  { option: 'Quizzes', icon: '📝', label: 'Create Quiz' },
  { option: 'Settings', icon: '⚙️', label: 'Settings' },
  { option: 'Help', icon: '❓', label: 'Help & Support' },
];

/** Bottom-sheet menu opened from the ☰ button. */
const MentorMenuModal: React.FC<Props> = ({ visible, onClose, onSelect }) => (
  <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
    <View style={styles.background}>
      <TouchableOpacity style={styles.overlay} onPress={onClose} activeOpacity={1} />
      <View style={styles.menu}>
        <View style={styles.menuHeader}>
          <GradientTitle first="Smart" second="Quiz" fontSize={24} letterSpacing={0} />
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeIcon}>✕</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.items}>
          {ITEMS.map((item) => (
            <TouchableOpacity key={item.option} style={styles.item} onPress={() => onSelect(item.option)}>
              <Text style={styles.itemIcon}>{item.icon}</Text>
              <Text style={styles.itemText}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  </Modal>
);

const styles = StyleSheet.create({
  background: { flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)', justifyContent: 'flex-end' },
  overlay: { flex: 1 },
  menu: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingBottom: 40,
  },
  menuHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(116, 97, 238, 0.1)',
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(148, 163, 184, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeIcon: { fontSize: 18, color: colors.textMuted, fontWeight: '600' },
  items: { paddingTop: 10 },
  item: { flexDirection: 'row', alignItems: 'center', paddingVertical: 16, paddingHorizontal: 20 },
  itemIcon: { fontSize: 20, marginRight: 16 },
  itemText: { fontSize: 16, fontWeight: '600', color: colors.textDark },
});

export default MentorMenuModal;
