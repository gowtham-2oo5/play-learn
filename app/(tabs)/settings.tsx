import { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { mockData } from '@/data/mockData';

export default function SettingsScreen() {
  const [privacy, setPrivacy] = useState(mockData.settings.privacyEnabled);
  const [notifications, setNotifications] = useState(mockData.settings.notificationsEnabled);
  const [darkMode, setDarkMode] = useState(false);

  const Card = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
    <View className={`bg-white rounded-2xl shadow-lg p-5 ${className}`}>
      {children}
    </View>
  );

  const SettingRow = ({ 
    title, 
    subtitle, 
    value, 
    onToggle, 
    icon 
  }: { 
    title: string; 
    subtitle?: string; 
    value: boolean; 
    onToggle: () => void;
    icon: string;
  }) => (
    <View className="flex-row items-center justify-between py-4">
      <View className="flex-row items-center flex-1">
        <Text className="text-2xl mr-4">{icon}</Text>
        <View className="flex-1">
          <Text className="text-gray-900 font-semibold mb-1">{title}</Text>
          {subtitle && <Text className="text-gray-500 text-sm">{subtitle}</Text>}
        </View>
      </View>
      <Switch
        value={value}
        onValueChange={onToggle}
        trackColor={{ false: '#e5e7eb', true: '#10b981' }}
        thumbColor={value ? '#ffffff' : '#ffffff'}
      />
    </View>
  );

  const MenuButton = ({ title, subtitle, icon, onPress }: { 
    title: string; 
    subtitle?: string; 
    icon: string;
    onPress: () => void;
  }) => (
    <TouchableOpacity 
      className="flex-row items-center py-5 border-b border-gray-100 last:border-b-0"
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text className="text-2xl mr-4">{icon}</Text>
      <View className="flex-1">
        <Text className="text-gray-900 font-semibold mb-1">{title}</Text>
        {subtitle && <Text className="text-gray-500 text-sm">{subtitle}</Text>}
      </View>
      <Text className="text-gray-400 text-xl">›</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView 
        className="flex-1" 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        <View className="px-6 pt-4">
          <View className="mb-6">
            <Text className="text-2xl font-bold text-gray-900 mb-2">Settings</Text>
            <Text className="text-gray-600">Customize your learning experience</Text>
          </View>
          
          {/* Profile Card */}
          <Card className="mb-8">
            <View className="flex-row items-center mb-5">
              <View className="w-16 h-16 bg-emerald-100 rounded-full items-center justify-center mr-5">
                <Text className="text-emerald-600 font-bold text-xl">{mockData.profile.username[0]}</Text>
              </View>
              <View className="flex-1">
                <Text className="text-xl font-bold text-gray-900 mb-1">{mockData.profile.username}</Text>
                <Text className="text-gray-600">Level {mockData.profile.level} • {mockData.profile.streak} day streak</Text>
              </View>
            </View>
            <TouchableOpacity className="bg-emerald-500 py-4 rounded-xl">
              <Text className="text-white font-semibold text-center">Edit Profile</Text>
            </TouchableOpacity>
          </Card>

          {/* Preferences */}
          <Card className="mb-8">
            <Text className="text-lg font-bold text-gray-900 mb-5">Preferences</Text>
            <SettingRow
              title="Privacy Mode"
              subtitle="Hide your progress from others"
              value={privacy}
              onToggle={() => setPrivacy(!privacy)}
              icon="🔒"
            />
            <SettingRow
              title="Push Notifications"
              subtitle="Get reminders and updates"
              value={notifications}
              onToggle={() => setNotifications(!notifications)}
              icon="🔔"
            />
            <SettingRow
              title="Dark Mode"
              subtitle="Switch to dark theme"
              value={darkMode}
              onToggle={() => setDarkMode(!darkMode)}
              icon="🌙"
            />
          </Card>

          {/* Learning */}
          <Card className="mb-8">
            <Text className="text-lg font-bold text-gray-900 mb-5">Learning</Text>
            <MenuButton
              title="Study Reminders"
              subtitle="Set daily learning goals"
              icon="⏰"
              onPress={() => console.log('Study reminders')}
            />
            <MenuButton
              title="Difficulty Level"
              subtitle="Adjust content difficulty"
              icon="🎯"
              onPress={() => console.log('Difficulty')}
            />
            <MenuButton
              title="Language"
              subtitle="Change app language"
              icon="🌍"
              onPress={() => console.log('Language')}
            />
          </Card>

          {/* Support */}
          <Card className="mb-8">
            <Text className="text-lg font-bold text-gray-900 mb-5">Support</Text>
            <MenuButton
              title="Help Center"
              subtitle="Get help and support"
              icon="❓"
              onPress={() => console.log('Help')}
            />
            <MenuButton
              title="Send Feedback"
              subtitle="Help us improve the app"
              icon="💬"
              onPress={() => console.log('Feedback')}
            />
            <MenuButton
              title="Privacy Policy"
              subtitle="Read our privacy policy"
              icon="📋"
              onPress={() => console.log('Privacy')}
            />
          </Card>

          {/* Sign Out */}
          <TouchableOpacity className="bg-red-50 border border-red-200 rounded-2xl p-6">
            <Text className="text-red-600 font-semibold text-center">Sign Out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}