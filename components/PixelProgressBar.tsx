import { View } from 'react-native';

interface PixelProgressBarProps {
  progress: number; // 0-100
  width?: number;
}

export function PixelProgressBar({ progress, width = 20 }: PixelProgressBarProps) {
  const blocks = Array.from({ length: width }, (_, i) => {
    const isActive = (i / width) * 100 < progress;
    return (
      <View
        key={i}
        className={`w-2 h-4 border border-emerald-900 ${
          isActive ? 'bg-emerald-600' : 'bg-gray-300'
        }`}
      />
    );
  });

  return <View className="flex-row">{blocks}</View>;
}