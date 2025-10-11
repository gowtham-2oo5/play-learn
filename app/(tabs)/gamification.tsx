import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { mockData } from '@/data/mockData';

export default function GamificationScreen() {
  const { gamification, profile } = mockData;

  const ProgressBar = ({ progress, color = '#10b981' }: { progress: number; color?: string }) => (
    <View className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
      <View 
        className="h-full rounded-full" 
        style={{ width: `${progress}%`, backgroundColor: color }}
      />
    </View>
  );

  const Card = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
    <View className={`bg-white rounded-2xl shadow-lg p-5 ${className}`}>
      {children}
    </View>
  );

  const getRankEmoji = (rank: number) => {
    switch (rank) {
      case 1: return '🥇';
      case 2: return '🥈';
      case 3: return '🥉';
      default: return '💪';
    }
  };

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1: return 'bg-yellow-100 border-yellow-200';
      case 2: return 'bg-gray-100 border-gray-200';
      case 3: return 'bg-orange-100 border-orange-200';
      default: return 'bg-blue-50 border-blue-100';
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView 
        className="flex-1" 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        <View className="px-6 pt-4">
          <View className="mb-6">
            <Text className="text-2xl font-bold text-gray-900 mb-2">Your Progress</Text>
            <Text className="text-gray-600">Track your achievements and compete with others</Text>
          </View>
          
          {/* Level Progress */}
          <Card className="mb-8">
            <View className="items-center mb-6">
              <View className="w-20 h-20 bg-emerald-100 rounded-full items-center justify-center mb-4">
                <Text className="text-2xl font-bold text-emerald-600">{gamification.levelTrack.level}</Text>
              </View>
              <Text className="text-xl font-bold text-gray-900">Level {gamification.levelTrack.level}</Text>
              <Text className="text-gray-600">Learning Champion</Text>
            </View>
            
            <View className="mb-4">
              <View className="flex-row justify-between items-center mb-3">
                <Text className="text-gray-700 font-medium">Progress to next level</Text>
                <Text className="text-emerald-600 font-bold">
                  {gamification.levelTrack.meter}/{gamification.levelTrack.maxMeter} XP
                </Text>
              </View>
              <ProgressBar progress={(gamification.levelTrack.meter / gamification.levelTrack.maxMeter) * 100} />
            </View>
            
            <Text className="text-center text-gray-500 text-sm">
              {gamification.levelTrack.maxMeter - gamification.levelTrack.meter} XP until Level {gamification.levelTrack.level + 1}
            </Text>
          </Card>

          {/* Stats Grid */}
          <View className="flex-row mb-8 gap-4">
            <Card className="flex-1">
              <Text className="text-2xl font-bold text-emerald-600 mb-2">{profile.streak}</Text>
              <Text className="text-gray-700 font-medium mb-1">Day Streak</Text>
              <Text className="text-gray-500 text-sm">🔥 Keep it up!</Text>
            </Card>
            <Card className="flex-1">
              <Text className="text-2xl font-bold text-blue-600 mb-2">{gamification.badges.length}</Text>
              <Text className="text-gray-700 font-medium mb-1">Badges</Text>
              <Text className="text-gray-500 text-sm">🏆 Earned</Text>
            </Card>
          </View>

          {/* Badges */}
          <Card className="mb-8">
            <Text className="text-lg font-bold text-gray-900 mb-5">Recent Achievements</Text>
            <View className="flex-row flex-wrap gap-4">
              {gamification.badges.map((badge, index) => (
                <View key={index} className="bg-emerald-100 border border-emerald-200 px-4 py-4 rounded-xl">
                  <Text className="text-emerald-700 font-semibold text-center mb-1">🏅</Text>
                  <Text className="text-emerald-700 font-medium text-sm text-center">{badge}</Text>
                </View>
              ))}
            </View>
          </Card>

          {/* Leaderboard */}
          <Card>
            <Text className="text-lg font-bold text-gray-900 mb-4">Leaderboard</Text>
            <View className="gap-4">
              {gamification.leaderboard.map((player) => (
                <View 
                  key={player.rank} 
                  className={`flex-row items-center p-5 rounded-xl border ${
                    player.username === profile.username 
                      ? 'bg-emerald-50 border-emerald-200' 
                      : getRankColor(player.rank)
                  }`}
                >
                  <View className="w-10 h-10 bg-gray-100 rounded-full items-center justify-center mr-4">
                    <Text className="text-lg">{getRankEmoji(player.rank)}</Text>
                  </View>
                  <View className="flex-1">
                    <Text className={`font-bold ${
                      player.username === profile.username ? 'text-emerald-700' : 'text-gray-900'
                    }`}>
                      {player.username} {player.username === profile.username ? '(You)' : ''}
                    </Text>
                    <Text className="text-gray-600 text-sm">{player.xp.toLocaleString()} XP</Text>
                  </View>
                  <View className={`px-3 py-1 rounded-full ${
                    player.rank <= 3 ? 'bg-yellow-100' : 'bg-gray-100'
                  }`}>
                    <Text className={`font-bold text-sm ${
                      player.rank <= 3 ? 'text-yellow-700' : 'text-gray-700'
                    }`}>
                      #{player.rank}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          </Card>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}