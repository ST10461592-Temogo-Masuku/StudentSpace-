import { useState } from 'react';
import {
    Modal,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { colors } from '../theme/colors';

const categories = ['Food', 'Transport', 'Entertainment', 'Tuition & Fees', 'Other'];

export default function FinanceScreen() {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Food');
  const [showWarning, setShowWarning] = useState(false);
  const [showCategoryPicker, setShowCategoryPicker] = useState(false);
  const [transactions, setTransactions] = useState([
    { desc: 'Groceries', amount: 250, category: 'Food', date: '24 Mar' },
    { desc: 'Bus fare', amount: 45, category: 'Transport', date: '23 Mar' },
    { desc: 'Netflix', amount: 99, category: 'Entertainment', date: '22 Mar' },
  ]);

  const budget = 1500;
  const spent = transactions.reduce((sum, t) => sum + t.amount, 0) + 680;
  const remaining = budget - spent;
  const safetyThreshold = 500;

  const handleAdd = () => {
    const numAmount = parseFloat(amount);
    if (!amount || isNaN(numAmount)) return;
    if (remaining - numAmount < safetyThreshold) {
      setShowWarning(true);
    } else {
      confirmAdd();
    }
  };

  const confirmAdd = () => {
    const numAmount = parseFloat(amount);
    setTransactions(prev => [{
      desc: description || 'Expense',
      amount: numAmount,
      category,
      date: 'Today',
    }, ...prev]);
    setAmount('');
    setDescription('');
    setShowWarning(false);
  };

  return (
    <View style={styles.container}>

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Finance</Text>
        <Text style={styles.headerSub}>Track your spending</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.scroll}>

        {/* Budget Summary */}
        <View style={styles.summaryCard}>
          <Text style={styles.sectionLabel}>MONTHLY OVERVIEW</Text>
          <View style={styles.summaryRow}>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryValue}>R{budget}</Text>
              <Text style={styles.summaryKey}>Budget</Text>
            </View>
            <View style={styles.summaryDivider} />
            <View style={styles.summaryItem}>
              <Text style={[styles.summaryValue, { color: colors.danger }]}>R{spent}</Text>
              <Text style={styles.summaryKey}>Spent</Text>
            </View>
            <View style={styles.summaryDivider} />
            <View style={styles.summaryItem}>
              <Text style={[styles.summaryValue, { color: colors.success }]}>R{remaining}</Text>
              <Text style={styles.summaryKey}>Remaining</Text>
            </View>
          </View>
          <View style={styles.progressBg}>
            <View style={[styles.progressFill, {
              width: `${Math.min((spent / budget) * 100, 100)}%`,
              backgroundColor: remaining < safetyThreshold ? colors.danger : colors.primary,
            }]} />
          </View>
          <Text style={styles.progressLabel}>
            {Math.round((spent / budget) * 100)}% of monthly budget used
          </Text>
        </View>

        {/* Add Expense Form */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>ADD EXPENSE</Text>

          <TextInput
            style={styles.input}
            placeholder="Description (e.g. Groceries)"
            placeholderTextColor={colors.textSecondary}
            value={description}
            onChangeText={setDescription}
            accessible={true}
            accessibilityLabel="Expense description"
          />

          <TextInput
            style={styles.input}
            placeholder="Amount (R)"
            placeholderTextColor={colors.textSecondary}
            keyboardType="numeric"
            value={amount}
            onChangeText={setAmount}
            accessible={true}
            accessibilityLabel="Expense amount in Rands"
          />

          <TouchableOpacity
            style={styles.dropdown}
            onPress={() => setShowCategoryPicker(true)}
            accessible={true}
            accessibilityLabel={`Category: ${category}`}
            accessibilityRole="button"
          >
            <Text style={styles.dropdownText}>{category}</Text>
            <Text style={styles.dropdownArrow}>▼</Text>
          </TouchableOpacity>

          {amount && parseFloat(amount) > 0 && (
            <View style={styles.previewBox}>
              <Text style={styles.previewText}>
                After this expense: R{remaining - parseFloat(amount || 0)} remaining
              </Text>
              {remaining - parseFloat(amount || 0) < safetyThreshold && (
                <Text style={styles.previewWarning}>
                  ⚠️ This will drop below your R{safetyThreshold} safety threshold
                </Text>
              )}
            </View>
          )}

          <TouchableOpacity
            style={styles.addButton}
            onPress={handleAdd}
            accessible={true}
            accessibilityLabel="Add expense"
            accessibilityRole="button"
          >
            <Text style={styles.addButtonText}>Add Expense</Text>
          </TouchableOpacity>
        </View>

        {/* Recent Transactions */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>RECENT TRANSACTIONS</Text>
          {transactions.map((t, i) => (
            <View key={i} style={styles.transactionRow}>
              <View style={styles.transactionLeft}>
                <Text style={styles.transactionDesc}>{t.desc}</Text>
                <Text style={styles.transactionMeta}>{t.category} · {t.date}</Text>
              </View>
              <Text style={styles.transactionAmount}>-R{t.amount}</Text>
            </View>
          ))}
        </View>

        <View style={{ height: 24 }} />
      </ScrollView>

      {/* Warning Modal - Error Prevention Principle */}
      <Modal visible={showWarning} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalIcon}>⚠️</Text>
            <Text style={styles.modalTitle}>Budget Warning</Text>
            <Text style={styles.modalMessage}>
              Adding R{amount} will leave you with R{remaining - parseFloat(amount || 0)}, which is below your R{safetyThreshold} safety threshold. Are you sure you want to continue?
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setShowWarning(false)}
                accessible={true}
                accessibilityLabel="Cancel adding expense"
                accessibilityRole="button"
              >
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.confirmButton}
                onPress={confirmAdd}
                accessible={true}
                accessibilityLabel="Confirm adding expense despite warning"
                accessibilityRole="button"
              >
                <Text style={styles.confirmText}>Add Anyway</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Category Picker Modal */}
      <Modal visible={showCategoryPicker} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.pickerBox}>
            <Text style={styles.pickerTitle}>Select Category</Text>
            {categories.map((cat, i) => (
              <TouchableOpacity
                key={i}
                style={styles.pickerItem}
                onPress={() => { setCategory(cat); setShowCategoryPicker(false); }}
              >
                <Text style={[styles.pickerText,
                  cat === category && styles.pickerTextActive
                ]}>{cat}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: {
    backgroundColor: colors.primary,
    paddingTop: 50, paddingBottom: 20, paddingHorizontal: 20,
  },
  headerTitle: { color: '#fff', fontSize: 24, fontWeight: 'bold' },
  headerSub: { color: 'rgba(255,255,255,0.7)', fontSize: 13, marginTop: 4 },
  scroll: { flex: 1 },
  summaryCard: {
    margin: 20, backgroundColor: colors.cardBg,
    borderRadius: 16, padding: 16,
    shadowColor: '#000', shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06, shadowRadius: 12, elevation: 3,
  },
  sectionLabel: {
    fontSize: 11, fontWeight: '600',
    color: colors.textSecondary, letterSpacing: 1, marginBottom: 12,
  },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 },
  summaryItem: { alignItems: 'center', flex: 1 },
  summaryValue: { fontSize: 20, fontWeight: 'bold', color: colors.textPrimary },
  summaryKey: { fontSize: 12, color: colors.textSecondary, marginTop: 4 },
  summaryDivider: { width: 1, backgroundColor: colors.border },
  progressBg: {
    height: 8, backgroundColor: colors.border,
    borderRadius: 4, overflow: 'hidden',
  },
  progressFill: { height: 8, borderRadius: 4 },
  progressLabel: { fontSize: 11, color: colors.textSecondary, marginTop: 6, textAlign: 'right' },
  section: { paddingHorizontal: 20, marginTop: 8 },
  input: {
    backgroundColor: colors.cardBg, borderRadius: 12,
    borderWidth: 1, borderColor: colors.border,
    padding: 14, fontSize: 14, color: colors.textPrimary, marginBottom: 10,
  },
  dropdown: {
    backgroundColor: colors.cardBg, borderRadius: 12,
    borderWidth: 1, borderColor: colors.border,
    padding: 14, flexDirection: 'row',
    justifyContent: 'space-between', alignItems: 'center', marginBottom: 10,
  },
  dropdownText: { fontSize: 14, color: colors.textPrimary },
  dropdownArrow: { fontSize: 12, color: colors.textSecondary },
  previewBox: {
    backgroundColor: '#FEF9EE', borderRadius: 12,
    padding: 12, marginBottom: 10,
    borderWidth: 1, borderColor: colors.warning,
  },
  previewText: { fontSize: 13, color: colors.textPrimary },
  previewWarning: { fontSize: 12, color: colors.warning, marginTop: 4, fontWeight: '600' },
  addButton: {
    backgroundColor: colors.primary, borderRadius: 12,
    height: 52, alignItems: 'center', justifyContent: 'center', marginBottom: 20,
  },
  addButtonText: { color: '#fff', fontSize: 15, fontWeight: 'bold' },
  transactionRow: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', paddingVertical: 12,
    borderBottomWidth: 1, borderBottomColor: colors.border,
  },
  transactionLeft: { flex: 1 },
  transactionDesc: { fontSize: 14, fontWeight: '500', color: colors.textPrimary },
  transactionMeta: { fontSize: 12, color: colors.textSecondary, marginTop: 2 },
  transactionAmount: { fontSize: 14, fontWeight: '600', color: colors.danger },
  modalOverlay: {
    flex: 1, backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center', alignItems: 'center', padding: 20,
  },
  modalBox: {
    backgroundColor: colors.cardBg, borderRadius: 20,
    padding: 24, width: '100%', alignItems: 'center',
  },
  modalIcon: { fontSize: 40, marginBottom: 12 },
  modalTitle: { fontSize: 18, fontWeight: 'bold', color: colors.textPrimary, marginBottom: 8 },
  modalMessage: {
    fontSize: 14, color: colors.textSecondary,
    textAlign: 'center', lineHeight: 20, marginBottom: 20,
  },
  modalButtons: { flexDirection: 'row', gap: 12, width: '100%' },
  cancelButton: {
    flex: 1, borderRadius: 12, height: 48,
    alignItems: 'center', justifyContent: 'center',
    borderWidth: 1.5, borderColor: colors.border,
  },
  cancelText: { fontSize: 14, fontWeight: '600', color: colors.textPrimary },
  confirmButton: {
    flex: 1, borderRadius: 12, height: 48,
    alignItems: 'center', justifyContent: 'center',
    backgroundColor: colors.danger,
  },
  confirmText: { fontSize: 14, fontWeight: '600', color: '#fff' },
  pickerBox: {
    backgroundColor: colors.cardBg, borderRadius: 20,
    padding: 20, width: '100%', position: 'absolute', bottom: 0,
  },
  pickerTitle: {
    fontSize: 16, fontWeight: 'bold',
    color: colors.textPrimary, marginBottom: 16, textAlign: 'center',
  },
  pickerItem: { paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: colors.border },
  pickerText: { fontSize: 15, color: colors.textPrimary },
  pickerTextActive: { color: colors.primary, fontWeight: '600' },
});