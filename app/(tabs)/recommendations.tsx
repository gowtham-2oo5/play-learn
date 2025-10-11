import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { mockData } from '@/data/mockData';

export default function RecommendationsScreen() {
  const { recommendations } = mockData;

  const Card = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
    <View className={`bg-white rounded-2xl shadow-lg p-5 ${className}`}>
      {children}
    </View>
  );

  const RecommendationCard = ({ rec }: { rec: any }) => (
    <Card className="mb-6">
      <View className="flex-row items-start mb-5">
        <View className="w-12 h-12 bg-gradient-to-br from-purple-400 to-blue-500 rounded-xl items-center justify-center mr-4">
          <Text className="text-white text-xl">🤖</Text>
        </View>
        <View className="flex-1">
          <View className="flex-row items-center mb-3">
            <View className="bg-purple-100 px-3 py-1 rounded-full mr-3">
              <Text className="text-purple-600 font-semibold text-xs">AI SUGGESTED</Text>
            </View>
            <View className="bg-emerald-100 px-3 py-1 rounded-full">
              <Text className="text-emerald-600 font-semibold text-xs">PERSONALIZED</Text>
            </View>
          </View>
          <Text className="text-xl font-bold text-gray-900 mb-3">{rec.title}</Text>
          <Text className="text-gray-600 leading-relaxed">{rec.description}</Text>
        </View>
      </View>
      
      <View className="flex-row items-center justify-between mb-5">
        <View className="flex-row items-center">
          <Text className="text-gray-500 text-sm mr-6">📚 3 lessons</Text>
          <Text className="text-gray-500 text-sm mr-6">⏱️ 45 min</Text>
          <Text className="text-gray-500 text-sm">🎯 Beginner</Text>
        </View>
        <View className="flex-row items-center">
          <Text className="text-yellow-500 mr-1">⭐</Text>
          <Text className="text-gray-600 font-semibold">4.8</Text>
        </View>
      </View>
      
      <View className="flex-row gap-4">
        <TouchableOpacity 
          className="flex-1 bg-emerald-500 py-4 rounded-xl"
          onPress={() => router.push('/explore')}
        >
          <Text className="text-white font-semibold text-center">Start Learning</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          className="px-5 py-4 border border-gray-200 rounded-xl"
          onPress={() => console.log(`Save: ${rec.title}`)}
        >
          <Text className="text-gray-700">🔖</Text>
        </TouchableOpacity>
      </View>
    </Card>
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
            <View className="flex-row items-center mb-2">
              <Text className="text-2xl font-bold text-gray-900 mr-2">AI Recommendations</Text>
              <View className="bg-gradient-to-r from-purple-500 to-blue-500 w-6 h-6 rounded-full items-center justify-center">
                <Text className="text-white text-xs font-bold">AI</Text>
              </View>
            </View>
            <Text className="text-gray-600">Personalized learning paths just for you</Text>
          </View>
          
          {/* AI Insight Banner */}
          <Card className="mb-8 bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-100">
            <View className="flex-row items-center mb-4">
              <View className="w-10 h-10 bg-gradient-to-br from-purple-400 to-blue-500 rounded-full items-center justify-center mr-4">
                <Text className="text-white text-lg">🧠</Text>
              </View>
              <Text className="text-lg font-bold text-gray-900">AI Insight</Text>
            </View>
            <Text className="text-gray-700 leading-relaxed">
              Based on your learning patterns, you perform best with interactive modules in the morning. 
              These recommendations are optimized for your learning style.
            </Text>
          </Card>
          
          {/* Filter Tabs */}
          <View className="flex-row mb-8 gap-3">
            <TouchableOpacity className="bg-purple-500 px-5 py-3 rounded-xl">
              <Text className="text-white font-semibold">For You</Text>
            </TouchableOpacity>
            <TouchableOpacity className="bg-white border border-gray-200 px-5 py-3 rounded-xl">
              <Text className="text-gray-700 font-semibold">Trending</Text>
            </TouchableOpacity>
            <TouchableOpacity className="bg-white border border-gray-200 px-5 py-3 rounded-xl">
              <Text className="text-gray-700 font-semibold">Quick Wins</Text>
            </TouchableOpacity>
          </View>
          
          {/* Recommendations */}
          {recommendations.map((rec) => (
            <RecommendationCard key={rec.id} rec={rec} />
          ))}
          
          {/* Load More */}
          <TouchableOpacity className="bg-white border border-gray-200 py-4 rounded-2xl">
            <Text className="text-gray-700 font-semibold text-center">Load More Recommendations</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}