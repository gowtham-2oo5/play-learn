import { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { mockData } from '@/data/mockData';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const { profile, dashboard, stats } = mockData;
  const [showModal, setShowModal] = useState(false);

  const ProgressBar = ({ progress, color = '#10b981' }: { progress: number; color?: string }) => (
    <View className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
      <View 
        className="h-full rounded-full" 
        style={{ width: `${progress}%`, backgroundColor: color }}
      />
    </View>
  );

  const Card = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
    <View className={`bg-white rounded-2xl shadow-lg p-4 ${className}`}>
      {children}
    </View>
  );

  const Button = ({ title, onPress, variant = 'primary' }: { title: string; onPress: () => void; variant?: 'primary' | 'secondary' }) => (
    <TouchableOpacity 
      onPress={onPress}
      className={`rounded-xl py-3 px-6 ${variant === 'primary' ? 'bg-emerald-500' : 'bg-gray-100'}`}
      activeOpacity={0.8}
    >
      <Text className={`text-center font-semibold ${variant === 'primary' ? 'text-white' : 'text-gray-700'}`}>
        {title}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView 
        className="flex-1" 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        {/* Header with Profile */}
        <View className="px-6 pt-4 pb-6">
          <View className="flex-row items-center justify-between mb-6">
            <View>
              <Text className="text-2xl font-bold text-gray-900">Welcome back,</Text>
              <Text className="text-2xl font-bold text-emerald-600">{profile.username}! 👋</Text>
            </View>
            <View className="w-12 h-12 bg-emerald-100 rounded-full items-center justify-center">
              <Text className="text-emerald-600 font-bold text-lg">{profile.username[0]}</Text>
            </View>
          </View>

          {/* Level & XP Card */}
          <Card className="mb-6">
            <View className="flex-row items-center justify-between mb-3">
              <View>
                <Text className="text-lg font-bold text-gray-900">Level {profile.level}</Text>
                <Text className="text-gray-600">{profile.xp}/1000 XP</Text>
              </View>
              <View className="bg-orange-100 px-3 py-1 rounded-full">
                <Text className="text-orange-600 font-semibold">🔥 {profile.streak} days</Text>
              </View>
            </View>
            <ProgressBar progress={(profile.xp / 1000) * 100} />
            <Text className="text-xs text-gray-500 mt-2">{1000 - profile.xp} XP to next level</Text>
          </Card>
        </View>

        {/* Quick Actions */}
        <View className="px-6 mb-8">
          <Text className="text-lg font-bold text-gray-900 mb-4">Continue Learning</Text>
          <View className="gap-4">
            <Button 
              title="Start Learning" 
              onPress={() => router.push('/explore')}
              variant="primary"
            />
            <Button 
              title="View Progress" 
              onPress={() => router.push('/gamification')}
              variant="secondary"
            />
          </View>
        </View>

        {/* Recent Progress */}
        <View className="px-6 mb-8">
          <Card>
            <View className="flex-row items-center justify-between mb-4">
              <Text className="text-lg font-bold text-gray-900">Current Module</Text>
              <Text className="text-emerald-600 font-semibold">{dashboard.recentProgress.progressPercent}%</Text>
            </View>
            <Text className="text-gray-700 mb-4">{dashboard.recentProgress.currentModule}</Text>
            <ProgressBar progress={dashboard.recentProgress.progressPercent} />
            <Text className="text-xs text-gray-500 mt-3">
              Last active: {dashboard.recentProgress.lastActive}
            </Text>
          </Card>
        </View>

        {/* Stats Grid */}
        <View className="px-6 mb-8">
          <Text className="text-lg font-bold text-gray-900 mb-4">This Week</Text>
          <Card>
            <View className="flex-row justify-between items-end px-2 py-4" style={{ height: 120 }}>
              {stats.weeklyActivity.map((value, index) => {
                const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
                const maxValue = Math.max(...stats.weeklyActivity);
                const height = Math.max(8, (value / maxValue) * 60);
                
                return (
                  <View key={index} className="items-center flex-1">
                    <Text className="text-xs font-semibold text-emerald-600 mb-2">{value}h</Text>
                    <View 
                      className="bg-emerald-500 rounded-t-md w-8 mb-3"
                      style={{ height }}
                    />
                    <Text className="text-xs text-gray-600 font-medium">{days[index]}</Text>
                  </View>
                );
              })}
            </View>
          </Card>
        </View>

        {/* Achievements */}
        <View className="px-6 mb-8">
          <Text className="text-lg font-bold text-gray-900 mb-4">Recent Achievements</Text>
          <View className="flex-row flex-wrap gap-3">
            {profile.badges.slice(0, 4).map((badge, index) => (
              <View key={index} className="bg-emerald-100 px-4 py-3 rounded-full">
                <Text className="text-emerald-700 font-medium text-sm">{badge}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}