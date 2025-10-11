import { View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';

export default function QuizCompleteScreen() {
  const score = 750; // Mock score
  const totalQuestions = 10;
  const correctAnswers = 8;
  const accuracy = Math.round((correctAnswers / totalQuestions) * 100);

  return (
    <SafeAreaView className="flex-1 bg-gray-900">
      <View className="flex-1 justify-center items-center px-6">
        <View className="bg-white rounded-3xl p-8 w-full max-w-sm items-center">
          <Text className="text-6xl mb-4">🎉</Text>
          <Text className="text-2xl font-bold text-gray-900 mb-2">Quiz Complete!</Text>
          <Text className="text-gray-600 text-center mb-6">
            Great job! You've completed the Machine Learning quiz.
          </Text>
          
          <View className="w-full bg-gray-100 rounded-2xl p-6 mb-6">
            <View className="flex-row justify-between items-center mb-3">
              <Text className="text-gray-700 font-medium">Final Score</Text>
              <Text className="text-2xl font-bold text-emerald-600">{score}</Text>
            </View>
            <View className="flex-row justify-between items-center mb-3">
              <Text className="text-gray-700 font-medium">Accuracy</Text>
              <Text className="text-lg font-bold text-gray-900">{accuracy}%</Text>
            </View>
            <View className="flex-row justify-between items-center">
              <Text className="text-gray-700 font-medium">Correct Answers</Text>
              <Text className="text-lg font-bold text-gray-900">{correctAnswers}/{totalQuestions}</Text>
            </View>
          </View>
          
          <TouchableOpacity 
            className="bg-emerald-500 py-4 px-8 rounded-xl w-full mb-3"
            onPress={() => router.push('/(tabs)')}
          >
            <Text className="text-white font-bold text-center">Continue Learning</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            className="py-3"
            onPress={() => router.push('/quiz')}
          >
            <Text className="text-emerald-600 font-semibold">Retake Quiz</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}