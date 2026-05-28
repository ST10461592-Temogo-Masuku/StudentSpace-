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

export default function MealsScreen() {
  const [meals, setMeals] = useState({
    breakfast: '',
    lunch: '',
    dinner: '',
  });
  const [hydration, setHydration] = useState(3);
  const [saved, setSaved] = useState(false);

  const hydrationLevels = [1, 2, 3, 4, 5];
  const hydrationLabels = ['Very Low', 'Low', 'Moderate', 'Good', 'Excellent'];

  const mealCalories = {
    breakfast: 350,
    lunch: 600,
    dinner: 500,
  };

  const totalCalories = Object.values(mealCalories).reduce((a, b) => a + b, 0);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <View style={styles.container}>

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Meals</Text>
        <Text style={styles.headerSub}>Plan your daily nutrition</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.scroll}>

        {/* Calorie Summary */}
        <View style={styles.calorieCard}>
          <Text style={styles.sectionLabel}>TODAY'S NUTRITION GOAL</Text>
          <View style={styles.calorieRow}>
            <View style={styles.calorieItem}>
              <Text style={styles.calorieValue}>{totalCalories}</Text>
              <Text style={styles.calorieKey}>Total kcal</Text>
            </View>
            <View style={styles.calorieDivider} />
            <View style={styles.calorieItem}>
              <Text style={[styles.calorieValue, { color: colors.success }]}>R80</Text>
              <Text style={styles.calorieKey}>Daily budget</Text>
            </View>
            <View style={styles.calorieDivider} />
            <View style={styles.calorieItem}>
              <Text style={[styles.calorieValue, { color: colors.accent }]}>3</Text>
              <Text style={styles.calorieKey}>Meals planned</Text>
            </View>
          </View>
        </View>

        {/* Meal Cards - Affordance and Closure Principles */}
        {['breakfast', 'lunch', 'dinner'].map((meal, index) => (
          <View key={index} style={styles.mealCard}>
            <View style={styles.mealCardTop}>
              <View>
                <Text style={styles.mealTitle}>
                  {meal.charAt(0).toUpperCase() + meal.slice(1)}
                </Text>
                <Text style={styles.mealCalorie}>
                  ±{mealCalories[meal]} kcal
                </Text>
              </View>
              <View style={styles.mealTimeBadge}>
                <Text style={styles.mealTimeText}>
                  {['7:00 AM', '12:30 PM', '6:00 PM'][index]}
                </Text>
              </View>
            </View>
            <TextInput
              style={styles.mealInput}
              placeholder={`e.g. ${['Oats with banana', 'Rice and chicken', 'Pasta and vegetables'][index]}`}
              placeholderTextColor={colors.textSecondary}
              value={meals[meal]}
              onChangeText={text => setMeals(prev => ({ ...prev, [meal]: text }))}
              accessible={true}
              accessibilityLabel={`${meal} input field`}
              accessibilityHint={`Type your ${meal} meal here`}
            />
          </View>
        ))}

        {/* Hydration Level - Affordance Principle */}
        <View style={styles.section}>
          <View style={styles.rowBetween}>
            <Text style={styles.sectionLabel}>HYDRATION LEVEL</Text>
            <Text style={styles.hydrationValue}>{hydrationLabels[hydration - 1]}</Text>
          </View>
          <View style={styles.hydrationRow}>
            {hydrationLevels.map(level => (
              <TouchableOpacity
                key={level}
                style={[styles.hydrationDot,
                  level <= hydration && styles.hydrationDotActive
                ]}
                onPress={() => setHydration(level)}
                accessible={true}
                accessibilityLabel={`Hydration level ${level}: ${hydrationLabels[level - 1]}`}
                accessibilityRole="button"
              >
                <Text style={styles.hydrationEmoji}>
                  {level <= hydration ? '💧' : '○'}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <Text style={styles.hydrationTip}>
            Aim for 8 glasses of water per day to stay hydrated
          </Text>
        </View>

        {/* Save Button */}
        <TouchableOpacity
          style={styles.saveButton}
          onPress={handleSave}
          accessible={true}
          accessibilityLabel="Save your meal plan"
          accessibilityRole="button"
        >
          <Text style={styles.saveButtonText}>💾  Save Meal Plan</Text>
        </TouchableOpacity>

        {/* Feedback */}
        {saved && (
          <View style={styles.feedbackBox}>
            <Text style={styles.feedbackText}>✓ Meal plan saved successfully!</Text>
          </View>
        )}

        {/* Nutrition Tips */}
        <View style={styles.tipsSection}>
          <Text style={styles.sectionLabel}>NUTRITION TIPS</Text>
          {[
            '🥦 Include vegetables in at least 2 meals',
            '🍌 Start your morning with fruit for energy',
            '💰 Bulk buying saves up to 30% on groceries',
          ].map((tip, i) => (
            <View key={i} style={styles.tipRow}>
              <Text style={styles.tipText}>{tip}</Text>
            </View>
          ))}
        </View>

        <View style={{ height: 24 }} />
      </ScrollView>
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
  calorieCard: {
    margin: 20, backgroundColor: colors.cardBg,
    borderRadius: 16, padding: 16,
    shadowColor: '#000', shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06, shadowRadius: 12, elevation: 3,
  },
  sectionLabel: {
    fontSize: 11, fontWeight: '600',
    color: colors.textSecondary, letterSpacing: 1, marginBottom: 12,
  },
  calorieRow: { flexDirection: 'row', justifyContent: 'space-between' },
  calorieItem: { alignItems: 'center', flex: 1 },
  calorieValue: { fontSize: 20, fontWeight: 'bold', color: colors.textPrimary },
  calorieKey: { fontSize: 11, color: colors.textSecondary, marginTop: 4 },
  calorieDivider: { width: 1, backgroundColor: colors.border },
  mealCard: {
    marginHorizontal: 20, marginBottom: 12,
    backgroundColor: colors.cardBg, borderRadius: 16, padding: 16,
    borderWidth: 1.5, borderStyle: 'dashed', borderColor: colors.border,
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04, shadowRadius: 8, elevation: 2,
  },
  mealCardTop: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'flex-start', marginBottom: 10,
  },
  mealTitle: { fontSize: 15, fontWeight: 'bold', color: colors.textPrimary },
  mealCalorie: { fontSize: 12, color: colors.textSecondary, marginTop: 2 },
  mealTimeBadge: {
    backgroundColor: colors.mealsLight, borderRadius: 8,
    paddingVertical: 4, paddingHorizontal: 8,
  },
  mealTimeText: { fontSize: 11, color: colors.danger, fontWeight: '500' },
  mealInput: {
    backgroundColor: colors.background, borderRadius: 10,
    borderWidth: 1, borderColor: colors.border,
    padding: 12, fontSize: 13, color: colors.textPrimary,
  },
  section: { paddingHorizontal: 20, marginTop: 8 },
  rowBetween: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  hydrationValue: { fontSize: 13, color: colors.accent, fontWeight: '600' },
  hydrationRow: {
    flexDirection: 'row', justifyContent: 'space-between',
    marginBottom: 8,
  },
  hydrationDot: {
    width: 48, height: 48, borderRadius: 24,
    backgroundColor: colors.border,
    alignItems: 'center', justifyContent: 'center',
  },
  hydrationDotActive: { backgroundColor: colors.wellnessLight },
  hydrationEmoji: { fontSize: 20 },
  hydrationTip: { fontSize: 12, color: colors.textSecondary, fontStyle: 'italic' },
  saveButton: {
    marginHorizontal: 20, marginTop: 20,
    backgroundColor: colors.primary, borderRadius: 12,
    height: 52, alignItems: 'center', justifyContent: 'center',
  },
  saveButtonText: { color: '#fff', fontSize: 15, fontWeight: 'bold' },
  feedbackBox: {
    marginHorizontal: 20, marginTop: 12,
    backgroundColor: colors.socialLight, borderRadius: 12,
    padding: 14, borderWidth: 1, borderColor: colors.success,
  },
  feedbackText: { fontSize: 14, color: '#1a7a4a', fontWeight: '600', textAlign: 'center' },
  tipsSection: { paddingHorizontal: 20, marginTop: 20 },
  tipRow: {
    backgroundColor: colors.cardBg, borderRadius: 10,
    padding: 12, marginBottom: 8,
    borderLeftWidth: 3, borderLeftColor: colors.success,
  },
  tipText: { fontSize: 13, color: colors.textPrimary },
});