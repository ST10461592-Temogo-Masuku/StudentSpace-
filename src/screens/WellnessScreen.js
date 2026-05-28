import { useState } from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { colors } from '../theme/colors';

const moods = [
  { emoji: '😢', label: 'Very Low' },
  { emoji: '😕', label: 'Low' },
  { emoji: '😐', label: 'Okay' },
  { emoji: '🙂', label: 'Good' },
  { emoji: '😄', label: 'Great' },
];

export default function WellnessScreen() {
  const [selectedMood, setSelectedMood] = useState(2);
  const [intensity, setIntensity] = useState(3);
  const [reflection, setReflection] = useState('');
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <View style={styles.container}>

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Wellness</Text>
        <Text style={styles.headerSub}>Track your daily mood</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.scroll}>

        {/* Mood Selector - Similarity Principle */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>HOW DO YOU FEEL TODAY?</Text>
          <View style={styles.moodRow}>
            {moods.map((mood, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.moodButton,
                  selectedMood === index && styles.moodButtonActive
                ]}
                onPress={() => setSelectedMood(index)}
                accessible={true}
                accessibilityLabel={`Mood: ${mood.label}`}
                accessibilityRole="button"
              >
                <Text style={styles.moodEmoji}>{mood.emoji}</Text>
                <Text style={[styles.moodLabel,
                  selectedMood === index && styles.moodLabelActive
                ]}>{mood.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Intensity Slider */}
        <View style={styles.section}>
          <View style={styles.rowBetween}>
            <Text style={styles.sectionLabel}>INTENSITY</Text>
            <Text style={styles.intensityValue}>
              {['Very Low','Low','Moderate','High','Very High'][intensity - 1]}
            </Text>
          </View>
          <View style={styles.sliderTrack}>
            {[1,2,3,4,5].map(i => (
              <TouchableOpacity
                key={i}
                onPress={() => setIntensity(i)}
                style={[styles.sliderDot,
                  i <= intensity && styles.sliderDotActive
                ]}
                accessible={true}
                accessibilityLabel={`Intensity level ${i}`}
              />
            ))}
          </View>
        </View>

        {/* Daily Reflection */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>DAILY REFLECTION</Text>
          <TextInput
            style={styles.textInput}
            placeholder="What's on your mind?"
            placeholderTextColor={colors.textSecondary}
            multiline
            numberOfLines={4}
            value={reflection}
            onChangeText={setReflection}
            accessible={true}
            accessibilityLabel="Daily reflection input"
          />
        </View>

        {/* Save Button */}
        <TouchableOpacity
          style={styles.saveButton}
          onPress={handleSave}
          accessible={true}
          accessibilityLabel="Save your mood entry"
          accessibilityRole="button"
        >
          <Text style={styles.saveButtonText}>Save Entry</Text>
        </TouchableOpacity>

        {/* Feedback Message - Feedback Principle */}
        {saved && (
          <View style={styles.feedbackBox}>
            <Text style={styles.feedbackIcon}>✓</Text>
            <View>
              <Text style={styles.feedbackTitle}>Mood saved successfully!</Text>
              <Text style={styles.feedbackSub}>Keep tracking — you're doing great 🌟</Text>
            </View>
          </View>
        )}

        {/* Self Care Tip */}
        <View style={styles.tipCard}>
          <Text style={styles.tipLabel}>💡 SELF-CARE TIP FOR TODAY</Text>
          <Text style={styles.tipText}>
            You've been feeling stressed this week. Try a 10-minute walk after your next lecture — it helps clear your mind.
          </Text>
        </View>

        {/* Mood History */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>THIS WEEK</Text>
          <View style={styles.historyRow}>
            {['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].map((day, i) => (
              <View key={i} style={styles.historyItem}>
                <Text style={styles.historyEmoji}>
                  {['😄','😐','😕','🙂','😄','😢','😐'][i]}
                </Text>
                <Text style={styles.historyDay}>{day}</Text>
              </View>
            ))}
          </View>
        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: {
    backgroundColor: colors.primary,
    paddingTop: 50, paddingBottom: 20,
    paddingHorizontal: 20,
  },
  headerTitle: { color: '#fff', fontSize: 24, fontWeight: 'bold' },
  headerSub: { color: 'rgba(255,255,255,0.7)', fontSize: 13, marginTop: 4 },
  scroll: { flex: 1 },
  section: { paddingHorizontal: 20, marginTop: 24 },
  sectionLabel: {
    fontSize: 11, fontWeight: '600',
    color: colors.textSecondary, letterSpacing: 1, marginBottom: 12,
  },
  moodRow: { flexDirection: 'row', justifyContent: 'space-between' },
  moodButton: {
    alignItems: 'center', padding: 10,
    borderRadius: 12, borderWidth: 1.5,
    borderColor: colors.border, width: '18%',
    backgroundColor: colors.cardBg,
  },
  moodButtonActive: {
    borderColor: colors.primary,
    backgroundColor: colors.wellnessLight,
  },
  moodEmoji: { fontSize: 24 },
  moodLabel: { fontSize: 9, color: colors.textSecondary, marginTop: 4 },
  moodLabelActive: { color: colors.primary, fontWeight: '600' },
  rowBetween: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  intensityValue: { fontSize: 13, color: colors.primary, fontWeight: '600' },
  sliderTrack: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', height: 40,
  },
  sliderDot: {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: colors.border,
    alignItems: 'center', justifyContent: 'center',
  },
  sliderDotActive: { backgroundColor: colors.primary },
  textInput: {
    backgroundColor: colors.cardBg,
    borderRadius: 12, borderWidth: 1,
    borderColor: colors.border, padding: 14,
    fontSize: 14, color: colors.textPrimary,
    minHeight: 100, textAlignVertical: 'top',
  },
  saveButton: {
    marginHorizontal: 20, marginTop: 20,
    backgroundColor: colors.primary,
    borderRadius: 12, height: 52,
    alignItems: 'center', justifyContent: 'center',
  },
  saveButtonText: { color: '#fff', fontSize: 15, fontWeight: 'bold' },
  feedbackBox: {
    marginHorizontal: 20, marginTop: 12,
    backgroundColor: '#EAFAF1',
    borderRadius: 12, padding: 16,
    flexDirection: 'row', alignItems: 'center', gap: 12,
    borderWidth: 1, borderColor: colors.success,
  },
  feedbackIcon: {
    fontSize: 20, color: colors.success,
    fontWeight: 'bold',
  },
  feedbackTitle: { fontSize: 14, fontWeight: '600', color: '#1a7a4a' },
  feedbackSub: { fontSize: 12, color: '#2ECC71', marginTop: 2 },
  tipCard: {
    marginHorizontal: 20, marginTop: 16,
    backgroundColor: colors.cardBg,
    borderRadius: 12, padding: 16,
    borderLeftWidth: 4, borderLeftColor: colors.accent,
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04, shadowRadius: 8, elevation: 2,
  },
  tipLabel: { fontSize: 11, fontWeight: '600', color: colors.accent, marginBottom: 6 },
  tipText: { fontSize: 13, color: colors.textPrimary, lineHeight: 20 },
  historyRow: {
    flexDirection: 'row', justifyContent: 'space-between',
    marginBottom: 24,
  },
  historyItem: { alignItems: 'center' },
  historyEmoji: { fontSize: 20 },
  historyDay: { fontSize: 10, color: colors.textSecondary, marginTop: 4 },
});