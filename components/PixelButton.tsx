import { TouchableOpacity, Text } from 'react-native';

interface PixelButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary';
}

export function PixelButton({ title, onPress, variant = 'primary' }: PixelButtonProps) {
  const baseClasses = "border-2 px-4 py-2 font-bold";
  const variantClasses = variant === 'primary' 
    ? "bg-emerald-700 border-emerald-900 text-white"
    : "bg-emerald-600 border-emerald-800 text-white";

  return (
    <TouchableOpacity 
      className={`${baseClasses} ${variantClasses}`}
      onPress={onPress}
    >
      <Text className="text-white font-bold text-center">{title}</Text>
    </TouchableOpacity>
  );
}