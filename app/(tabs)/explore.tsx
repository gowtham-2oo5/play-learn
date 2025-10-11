import { View, Text, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { PixelButton } from '@/components/PixelButton';
import { PixelProgressBar } from '@/components/PixelProgressBar';
import { mockData } from '@/data/mockData';

export default function ModulesScreen() {
  const { courses } = mockData;

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
        <Text className="text-white font-bold text-2xl mb-4">Courses</Text>
        
        {courses.map((course) => (
          <View key={course.id} className="bg-emerald-600 border-2 border-emerald-900 p-4 mb-4">
            <View className="flex-row justify-between items-start mb-2">
              <Text className="text-white font-bold text-lg flex-1">{course.title}</Text>
              <View className="flex-row items-center">
                <View className={`px-2 py-1 border border-emerald-900 mr-2 ${getDifficultyColor(course.difficulty)}`}>
                  <Text className="text-white font-bold text-xs uppercase">{course.difficulty}</Text>
                </View>
                {course.locked && (
                  <View className="w-6 h-6 bg-gray-600 border border-gray-800">
                    <Text className="text-white text-center text-xs">🔒</Text>
                  </View>
                )}
              </View>
            </View>
            
            <Text className="text-emerald-200 text-sm mb-2">{course.description}</Text>
            <Text className="text-emerald-300 text-xs mb-3">⏱️ {course.estimatedTime}</Text>
            
            <View className="mb-3">
              <Text className="text-emerald-200 mb-1">Progress: {course.progress}%</Text>
              <PixelProgressBar progress={course.progress} />
            </View>
            
            <PixelButton 
              title={course.locked ? "Locked" : course.progress > 0 ? "Continue" : "Start"}
              onPress={() => course.locked ? null : router.push('/quizzes')}
              variant={course.locked ? 'secondary' : 'primary'}
            />
          </View>
        ))}
      </View>
    </ScrollView>
  );
}