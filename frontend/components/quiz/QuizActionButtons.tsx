import React from 'react';
import { StyleSheet, View } from 'react-native';
import { PrimaryButton } from '../common';
import { colors } from '../../theme/colors';

interface Props {
  published: boolean;
  canAddQuestion: boolean;
  canPublish: boolean;
  onEdit: () => void;
  onAddQuestion: () => void;
  onViewQuestions: () => void;
  onPublish: () => void;
}

const QuizActionButtons: React.FC<Props> = ({
  published,
  canAddQuestion,
  canPublish,
  onEdit,
  onAddQuestion,
  onViewQuestions,
  onPublish,
}) => (
  <View style={styles.container}>
    <PrimaryButton label="Edit Quiz" icon="✏️" paddingVertical={16} fontSize={16} style={styles.gap} onPress={onEdit} />
    <PrimaryButton
      label="Add Question"
      icon="➕"
      variant="outline"
      disabled={!canAddQuestion}
      paddingVertical={16}
      fontSize={16}
      style={styles.gap}
      onPress={onAddQuestion}
    />
    <PrimaryButton
      label="View Questions"
      icon="📋"
      color={colors.secondary}
      paddingVertical={16}
      fontSize={16}
      style={styles.gap}
      onPress={onViewQuestions}
    />
    <PrimaryButton
      label={published ? 'Quiz Published' : 'Publish Quiz'}
      icon="🚀"
      color={colors.success}
      disabled={!canPublish}
      paddingVertical={16}
      fontSize={16}
      style={styles.gap}
      onPress={onPublish}
    />
  </View>
);

const styles = StyleSheet.create({
  container: { paddingHorizontal: 20 },
  gap: { marginBottom: 12 },
});

export default QuizActionButtons;
