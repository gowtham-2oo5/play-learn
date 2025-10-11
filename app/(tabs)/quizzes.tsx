import { View, Text, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { PixelButton } from '@/components/PixelButton';
import { mockData } from '@/data/mockData';

export default function QuizzesScreen() {
  const { quizzes } = mockData;

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-600';
      case 'medium': return 'bg-yellow-600';
      case 'hard': return 'bg-red-600';
      default: return 'bg-gray-600';
    }
  };

  return (
    <ScrollView className="flex-1 bg-black">
      <View className="p-4">
        <Text className="mb-4 text-2xl font-bold text-white">All Quizzes</Text>
        
        {quizzes.map((quiz) => (
          <View key={quiz.id} className="p-4 mb-4 border-2 bg-emerald-600 border-emerald-900">
            <View className="flex-row items-start justify-between mb-2">
              <Text className="flex-1 text-lg font-bold text-white">{quiz.title}</Text>
              <View className="flex-row items-center">
                <View className={`px-2 py-1 border border-emerald-900 mr-2 ${getDifficultyColor(quiz.difficulty)}`}>
                  <Text className="text-xs font-bold text-white uppercase">{quiz.difficulty}</Text>
                </View>
                {quiz.locked && (
                  <View className="w-6 h-6 bg-gray-600 border border-gray-800">
                    <Text className="text-xs text-center text-white">🔒</Text>
                  </View>
                )}
              </View>
            </View>
            
            <View className="flex-row justify-between mb-3">
              <Text className="text-sm text-emerald-200">📝 {quiz.questions} questions</Text>
              <Text className="text-sm text-emerald-200">⏱️ {Math.floor(quiz.timeLimit / 60)} min</Text>
            </View>
            
            {quiz.completed && quiz.score && (
              <View className="p-2 mb-3 border bg-emerald-700 border-emerald-800">
                <Text className="font-bold text-center text-white">Score: {quiz.score}%</Text>
              </View>
            )}
            
            <PixelButton 
              title={quiz.locked ? "Locked" : quiz.completed ? "Retake" : "Start Quiz"}
              onPress={() => {
                if (!quiz.locked) {
                  router.push('/quiz');
                }
              }}
              variant={quiz.locked ? 'secondary' : 'primary'}
            />
          </View>
        ))}
      </View>
    </ScrollView>
  );
}