import { Tabs } from 'expo-router';
import { Text } from 'react-native';

export default function Layout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopColor: '#E5E7EB',
          height: 64,
          paddingBottom: 8,
        },
        tabBarActiveTintColor: '#1B2CC1',
        tabBarInactiveTintColor: '#9CA3AF',
        tabBarLabelStyle: { fontSize: 10, fontWeight: '600' },
      }}
    >
      <Tabs.Screen name="index" options={{ href: null }} />
      <Tabs.Screen name="home" options={{ title: 'Home', tabBarIcon: () => <Text style={{fontSize:20}}>🏠</Text> }} />
      <Tabs.Screen name="wellness" options={{ title: 'Wellness', tabBarIcon: () => <Text style={{fontSize:20}}>💚</Text> }} />
      <Tabs.Screen name="social" options={{ title: 'Social', tabBarIcon: () => <Text style={{fontSize:20}}>👥</Text> }} />
      <Tabs.Screen name="finance" options={{ title: 'Finance', tabBarIcon: () => <Text style={{fontSize:20}}>💰</Text> }} />
      <Tabs.Screen name="meals" options={{ title: 'Meals', tabBarIcon: () => <Text style={{fontSize:20}}>🍽️</Text> }} />
      <Tabs.Screen name="explore" options={{ href: null }} />
    </Tabs>
  );
}