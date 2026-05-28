import { useState } from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { colors } from '../theme/colors';

const events = [
  {
    title: 'Career Fair',
    date: '25 Mar',
    location: 'Main Hall, Block A',
    spots: 70,
    totalSpots: 100,
    tag: 'EVENT',
    tagColor: colors.accent,
    tagBg: colors.wellnessLight,
  },
  {
    title: 'Photography Club',
    date: '27 Mar',
    location: 'Room B14',
    spots: 15,
    totalSpots: 20,
    tag: 'MEETUP',
    tagColor: colors.success,
    tagBg: colors.socialLight,
  },
  {
    title: 'Finance Workshop',
    date: '30 Mar',
    location: 'Auditorium A',
    spots: 45,
    totalSpots: 80,
    tag: 'WORKSHOP',
    tagColor: colors.warning,
    tagBg: colors.financeLight,
  },
  {
    title: 'Coding Bootcamp',
    date: '2 Apr',
    location: 'Computer Lab 3',
    spots: 8,
    totalSpots: 25,
    tag: 'EVENT',
    tagColor: colors.accent,
    tagBg: colors.wellnessLight,
  },
];

export default function SocialScreen() {
  const [joined, setJoined] = useState({});

  const handleJoin = (index) => {
    setJoined(prev => ({ ...prev, [index]: !prev[index] }));
  };

  return (
    <View style={styles.container}>

      {/* Header - same style as all screens - Consistency */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Social</Text>
        <Text style={styles.headerSub}>Campus events and clubs</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.scroll}>

        {/* Events List - Figure-Ground Principle */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>UPCOMING EVENTS</Text>
          {events.map((event, index) => (
            <View
              key={index}
              style={styles.eventCard}
              accessible={true}
              accessibilityLabel={`${event.title} on ${event.date} at ${event.location}`}
            >
              <View style={styles.cardTop}>
                <View style={styles.cardTitleRow}>
                  <Text style={styles.eventTitle}>{event.title}</Text>
                  <View style={[styles.tag, { backgroundColor: event.tagBg }]}>
                    <Text style={[styles.tagText, { color: event.tagColor }]}>
                      {event.tag}
                    </Text>
                  </View>
                </View>
                <View style={styles.eventMeta}>
                  <Text style={styles.metaText}>📅 {event.date}</Text>
                  <Text style={styles.metaText}>📍 {event.location}</Text>
                </View>
                <View style={styles.progressSection}>
                  <View style={styles.progressBg}>
                    <View style={[styles.progressFill, {
                      width: `${(event.spots / event.totalSpots) * 100}%`,
                      backgroundColor: event.tagColor,
                    }]} />
                  </View>
                  <Text style={styles.spotsText}>
                    {event.spots}/{event.totalSpots} spots filled
                  </Text>
                </View>
                <TouchableOpacity
                  style={[styles.joinButton, joined[index] && styles.joinedButton]}
                  onPress={() => handleJoin(index)}
                  accessible={true}
                  accessibilityLabel={joined[index] ? `Leave ${event.title}` : `Join ${event.title}`}
                  accessibilityRole="button"
                >
                  <Text style={[styles.joinText, joined[index] && styles.joinedText]}>
                    {joined[index] ? '✓ Joined' : 'Join Event'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>

        {/* Suggested Peers */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>SUGGESTED PEERS</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {['Alex M.', 'Sarah J.', 'Lebo K.', 'Sipho N.'].map((name, i) => (
              <View key={i} style={styles.peerCard}>
                <View style={styles.peerAvatar}>
                  <Text style={styles.peerInitial}>{name[0]}</Text>
                </View>
                <Text style={styles.peerName}>{name}</Text>
                <Text style={styles.peerCourse}>
                  {['CS','Fine Arts','Commerce','Engineering'][i]}
                </Text>
                <TouchableOpacity
                  style={styles.connectButton}
                  accessible={true}
                  accessibilityLabel={`Connect with ${name}`}
                  accessibilityRole="button"
                >
                  <Text style={styles.connectText}>Connect</Text>
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
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
  eventCard: {
    backgroundColor: colors.cardBg,
    borderRadius: 16, padding: 16,
    marginBottom: 12,
    shadowColor: '#000', shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06, shadowRadius: 12, elevation: 3,
  },
  cardTop: { gap: 8 },
  cardTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between', alignItems: 'flex-start',
  },
  eventTitle: { fontSize: 16, fontWeight: 'bold', color: colors.textPrimary, flex: 1 },
  tag: { borderRadius: 20, paddingVertical: 4, paddingHorizontal: 10 },
  tagText: { fontSize: 10, fontWeight: '700' },
  eventMeta: { gap: 4 },
  metaText: { fontSize: 12, color: colors.textSecondary },
  progressSection: { gap: 4 },
  progressBg: {
    height: 6, backgroundColor: colors.border,
    borderRadius: 3, overflow: 'hidden',
  },
  progressFill: { height: 6, borderRadius: 3 },
  spotsText: { fontSize: 11, color: colors.textSecondary },
  joinButton: {
    backgroundColor: colors.primary,
    borderRadius: 8, paddingVertical: 8,
    alignItems: 'center', marginTop: 4,
  },
  joinedButton: { backgroundColor: colors.socialLight },
  joinText: { color: '#fff', fontSize: 13, fontWeight: '600' },
  joinedText: { color: colors.success },
  peerCard: {
    backgroundColor: colors.cardBg,
    borderRadius: 16, padding: 14,
    marginRight: 12, alignItems: 'center', width: 110,
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04, shadowRadius: 8, elevation: 2,
  },
  peerAvatar: {
    width: 48, height: 48, borderRadius: 24,
    backgroundColor: colors.primary,
    alignItems: 'center', justifyContent: 'center', marginBottom: 8,
  },
  peerInitial: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
  peerName: { fontSize: 13, fontWeight: '600', color: colors.textPrimary },
  peerCourse: { fontSize: 11, color: colors.textSecondary, marginTop: 2 },
  connectButton: {
    marginTop: 8, backgroundColor: colors.wellnessLight,
    borderRadius: 8, paddingVertical: 6, paddingHorizontal: 12,
  },
  connectText: { fontSize: 11, color: colors.accent, fontWeight: '600' },
});