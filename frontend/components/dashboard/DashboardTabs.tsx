import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors } from '../../theme/colors';

export type DashboardTab = 'published' | 'unpublished';

interface Props {
  activeTab: DashboardTab;
  onChange: (tab: DashboardTab) => void;
}

const TABS: { key: DashboardTab; label: string }[] = [
  { key: 'published', label: '📚 Published' },
  { key: 'unpublished', label: '📝 Drafts' },
];

const DashboardTabs: React.FC<Props> = ({ activeTab, onChange }) => (
  <View style={styles.container}>
    <View style={styles.bar}>
      {TABS.map((tab) => {
        const active = activeTab === tab.key;
        return (
          <TouchableOpacity
            key={tab.key}
            style={[styles.tab, active && styles.activeTab]}
            onPress={() => onChange(tab.key)}
          >
            <Text style={[styles.tabText, active && styles.activeTabText]}>{tab.label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: { paddingHorizontal: 20, marginBottom: 20 },
  bar: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  tab: { flex: 1, paddingVertical: 12, alignItems: 'center', borderRadius: 12 },
  activeTab: { backgroundColor: colors.primary },
  tabText: { fontSize: 14, fontWeight: '600', color: colors.textMuted },
  activeTabText: { color: colors.white },
});

export default DashboardTabs;
