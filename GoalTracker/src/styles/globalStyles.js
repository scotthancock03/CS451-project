import { StyleSheet } from 'react-native';

export const getGlobalStyles = (colors) => StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: colors.background },
  centered: { justifyContent: 'center', alignItems: 'center' },
  header: { fontSize: 24, fontWeight: 'bold', color: colors.text, marginBottom: 4, textAlign: 'center' },
  subheader: { fontSize: 14, color: colors.text, textAlign: 'center', marginBottom: 16 },
  list: { width: '100%' },
  emptyText: { textAlign: 'center', marginTop: 40, fontSize: 16, color: colors.text, paddingHorizontal: 20 },
  button: { padding: 16, borderRadius: 12, marginTop: 12, alignItems: 'center', backgroundColor: colors.secondary },
  buttonText: { color: colors.text, fontSize: 18, fontWeight: 'bold' },
  statBox: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 12, borderBottomWidth: 1, borderColor: colors.neutral },
  statLabel: { fontSize: 16, color: colors.text },
  statValue: { fontSize: 16, fontWeight: 'bold', color: colors.text },
  settingRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 15, marginTop: 20, borderTopWidth: 1, borderColor: colors.neutral },
  input: { width: '90%', height: 55, borderWidth: 1, borderColor: colors.neutral, borderRadius: 12, marginBottom: 20, textAlign: 'center', backgroundColor: colors.background, color: colors.text, fontSize: 16 },
  inputWithIcon: { width: '90%', height: 55, borderWidth: 1, borderColor: colors.neutral, borderRadius: 12, marginBottom: 20, backgroundColor: colors.background, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 15, gap: 12 },
  info: { marginTop: 20, color: colors.text, fontStyle: 'italic', fontSize: 12, opacity: 0.7 }
});