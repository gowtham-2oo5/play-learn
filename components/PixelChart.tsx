import { View, Text } from 'react-native';

interface PixelChartProps {
  data: number[];
  labels?: string[];
}

export function PixelChart({ data, labels }: PixelChartProps) {
  const maxValue = Math.max(...data);
  
  return (
    <View className="bg-emerald-900 border-2 border-emerald-800 p-4">
      <Text className="text-white font-bold mb-3">Weekly Activity</Text>
      <View className="flex-row items-end justify-between h-32">
        {data.map((value, index) => {
          const height = (value / maxValue) * 100;
          return (
            <View key={index} className="flex-1 items-center">
              <View 
                className="bg-emerald-600 border border-emerald-800 w-6"
                style={{ height: `${height}%` }}
              />
              <Text className="text-emerald-200 text-xs mt-1">
                {labels?.[index] || index + 1}
              </Text>
            </View>
          );
        })}
      </View>
    </View>
  );
}