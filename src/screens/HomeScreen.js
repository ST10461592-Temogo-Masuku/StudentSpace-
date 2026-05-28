import {
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { colors } from '../theme/colors';

const FeatureCard = ({ title, status, statusColor, tagText, tagBg, iconBg, iconColor }) => (
  <TouchableOpacity
    style={styles.card}
    accessible={true}
    accessibilityLabel={`${title} module. ${status}`}
    accessibilityRole="button"
  >
    <View style={[styles.iconCircle, { backgroundColor: iconBg }]}>
      <Text style={[styles.iconText, { color: iconColor }]}>●</Text>
    </View>
    <Text style={styles.cardTitle}>{title}</Text>
    <Text style={styles.cardStatus}>{status}</Text>
    <View style={[styles.tag, { backgroundColor: tagBg }]}>
      <Text style={[styles.tagText, { color: statusColor }]}>{tagText} →</Text>
    </View>
  </TouchableOpacity>
);

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={colors.primary} barStyle="light-content" />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>T</Text>
        </View>
        <Text style={styles.headerTitle}>StudentSpace</Text>
        <View style={styles.contrastToggle}>
          <Text style={styles.contrastIcon}>◑</Text>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.scroll}>

        {/* Greeting */}
        <View style={styles.greetingSection}>
          <Text style={styles.greeting}>Good morning, Temogo 👋</Text>
          <Text style={styles.greetingSub}>Here's your overview for today</Text>
        </View>

        {/* Feature Cards - Visibility Principle */}
        <Text style={styles.sectionLabel}>YOUR MODULES</Text>
        <View style={styles.cardGrid}>
          <FeatureCard
            title="Wellness"
            status="Mood: Not logged"
            statusColor={colors.accent}
            tagText="Log now"
            tagBg={colors.wellnessLight}
            iconBg={colors.wellnessLight}
            iconColor={colors.accent}
          />
          <FeatureCard
            title="Social"
            status="2 events today"
            statusColor={colors.success}
            tagText="View"
            tagBg={colors.socialLight}
            iconBg={colors.socialLight}
            iconColor={colors.success}
          />
          <FeatureCard
            title="Finance"
            status="Balance: R820"
            statusColor={colors.warning}
            tagText="Track"
            tagBg={colors.financeLight}
            iconBg={colors.financeLight}
            iconColor={colors.warning}
          />
          <FeatureCard
            title="Meals"
            status="No plan set"
            statusColor={colors.danger}
            tagText="Plan"
            tagBg={colors.mealsLight}
            iconBg={colors.mealsLight}
            iconColor={colors.danger}
          />
        </View>

        {/* Action Buttons */}
        <TouchableOpacity
          style={styles.primaryButton}
          accessible={true}
          accessibilityLabel="Log your mood"
          accessibilityRole="button"
        >
          <Text style={styles.primaryButtonText}>✏️  Log Mood</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryButton}
          accessible={true}
          accessibilityLabel="Add a new expense"
          accessibilityRole="button"
        >
          <Text style={styles.secondaryButtonText}>➕  Add Expense</Text>
        </TouchableOpacity>

        {/* Academic Progress */}
        <View style={styles.progressCard}>
          <Text style={styles.progressLabel}>SEMESTER PROGRESS</Text>
          <View style={styles.progressBarBg}>
            <View style={[styles.progressBarFill, { width: '65%' }]} />
          </View>
          <Text style={styles.progressText}>65% complete</Text>
        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: {
    backgroundColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 16,
  },
  avatar: {
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: colors.accent,
    alignItems: 'center', justifyContent: 'center',
  },
  avatarText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  headerTitle: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
  contrastToggle: {
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center', justifyContent: 'center',
  },
  contrastIcon: { color: '#fff', fontSize: 18 },
  scroll: { flex: 1 },
  greetingSection: { paddingHorizontal: 20, paddingTop: 24, paddingBottom: 8 },
  greeting: { fontSize: 22, fontWeight: 'bold', color: colors.textPrimary },
  greetingSub: { fontSize: 14, color: colors.textSecondary, marginTop: 4 },
  sectionLabel: {
    fontSize: 11, fontWeight: '600', color: colors.textSecondary,
    letterSpacing: 1, paddingHorizontal: 20, marginTop: 16, marginBottom: 8,
  },
  cardGrid: {
    flexDirection: 'row', flexWrap: 'wrap',
    paddingHorizontal: 12, gap: 12,
  },
  card: {
    width: '46%', backgroundColor: colors.cardBg,
    borderRadius: 16, padding: 16,
    shadowColor: '#000', shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06, shadowRadius: 12, elevation: 3,
  },
  iconCircle: {
    width: 40, height: 40, borderRadius: 20,
    alignItems: 'center', justifyContent: 'center', marginBottom: 10,
  },
  iconText: { fontSize: 16 },
  cardTitle: { fontSize: 14, fontWeight: 'bold', color: colors.textPrimary },
  cardStatus: { fontSize: 12, color: colors.textSecondary, marginTop: 4, marginBottom: 8 },
  tag: { borderRadius: 20, paddingVertical: 4, paddingHorizontal: 10, alignSelf: 'flex-start' },
  tagText: { fontSize: 11, fontWeight: '500' },
  primaryButton: {
    marginHorizontal: 20, marginTop: 20,
    backgroundColor: colors.primary,
    borderRadius: 12, height: 52,
    alignItems: 'center', justifyContent: 'center',
  },
  primaryButtonText: { color: '#fff', fontSize: 15, fontWeight: 'bold' },
  secondaryButton: {
    marginHorizontal: 20, marginTop: 12,
    backgroundColor: colors.cardBg,
    borderRadius: 12, height: 52,
    alignItems: 'center', justifyContent: 'center',
    borderWidth: 1.5, borderColor: colors.primary,
  },
  secondaryButtonText: { color: colors.primary, fontSize: 15, fontWeight: 'bold' },
  progressCard: {
    margin: 20, backgroundColor: colors.cardBg,
    borderRadius: 16, padding: 16,
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04, shadowRadius: 8, elevation: 2,
  },
  progressLabel: {
    fontSize: 11, fontWeight: '600',
    color: colors.textSecondary, letterSpacing: 1, marginBottom: 10,
  },
  progressBarBg: {
    height: 8, backgroundColor: colors.border,
    borderRadius: 4, overflow: 'hidden',
  },
  progressBarFill: {
    height: 8, backgroundColor: colors.primary, borderRadius: 4,
  },
  progressText: {
    fontSize: 12, color: colors.textSecondary, marginTop: 6, textAlign: 'right',
  },
});