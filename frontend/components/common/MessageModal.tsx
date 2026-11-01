import React from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors } from '../../theme/colors';

type Tone = 'error' | 'warning' | 'success' | 'info';

interface Props {
  visible: boolean;
  title: string;
  message: string;
  tone?: Tone;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm?: () => void;
  onCancel: () => void;
}

const MessageModal: React.FC<Props> = ({
  visible,
  title,
  message,
  tone = 'info',
  confirmLabel = 'OK',
  cancelLabel,
  onConfirm,
  onCancel,
}) => (
  <Modal visible={visible} transparent animationType="fade" onRequestClose={onCancel}>
    <View style={styles.overlay}>
      <View style={styles.card}>
        <View style={[styles.icon, { backgroundColor: backgrounds[tone] }]}>
          <Text style={styles.iconText}>{icons[tone]}</Text>
        </View>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.message}>{message}</Text>
        <View style={styles.actions}>
          {cancelLabel ? (
            <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
              <Text style={styles.cancelText}>{cancelLabel}</Text>
            </TouchableOpacity>
          ) : null}
          <TouchableOpacity
            style={[styles.confirmButton, { backgroundColor: colorsForTone[tone] }]}
            onPress={onConfirm || onCancel}
          >
            <Text style={styles.confirmText}>{confirmLabel}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  </Modal>
);

const icons: Record<Tone, string> = { error: '!', warning: '!', success: '✓', info: 'i' };
const colorsForTone: Record<Tone, string> = {
  error: colors.danger,
  warning: colors.warning,
  success: colors.successDark,
  info: colors.primary,
};
const backgrounds: Record<Tone, string> = {
  error: colors.dangerSoft,
  warning: 'rgba(245, 158, 11, 0.12)',
  success: colors.successSoft,
  info: colors.primarySoft,
};

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: 'rgba(15, 23, 42, 0.48)', justifyContent: 'center', padding: 24 },
  card: { backgroundColor: colors.white, borderRadius: 28, padding: 24, alignItems: 'center', elevation: 10 },
  icon: { width: 58, height: 58, borderRadius: 29, justifyContent: 'center', alignItems: 'center', marginBottom: 16 },
  iconText: { color: colors.textDark, fontSize: 30, fontWeight: '800' },
  title: { color: colors.textDark, fontSize: 22, fontWeight: '800', textAlign: 'center', marginBottom: 8 },
  message: { color: colors.textMuted, fontSize: 15, lineHeight: 22, textAlign: 'center', marginBottom: 24 },
  actions: { flexDirection: 'row', width: '100%', justifyContent: 'flex-end', gap: 10 },
  cancelButton: { paddingVertical: 12, paddingHorizontal: 18, borderRadius: 22, backgroundColor: colors.surfaceAlt },
  cancelText: { color: colors.textMuted, fontSize: 14, fontWeight: '700' },
  confirmButton: { paddingVertical: 12, paddingHorizontal: 20, borderRadius: 22 },
  confirmText: { color: colors.white, fontSize: 14, fontWeight: '800' },
});

export default MessageModal;
