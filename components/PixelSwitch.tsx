import { TouchableOpacity, View, Text } from 'react-native';

interface PixelSwitchProps {
  value: boolean;
  onToggle: () => void;
  label: string;
}

export function PixelSwitch({ value, onToggle, label }: PixelSwitchProps) {
  return (
    <View className="flex-row items-center justify-between py-3">
      <Text className="text-white font-bold flex-1">{label}</Text>
      <TouchableOpacity 
        className={`w-12 h-6 border-2 border-emerald-900 ${value ? 'bg-emerald-600' : 'bg-gray-600'}`}
        onPress={onToggle}
      >
        <View className={`w-4 h-4 bg-white border border-emerald-900 ${value ? 'ml-6' : 'ml-0'}`} />
      </TouchableOpacity>
    </View>
  );
}