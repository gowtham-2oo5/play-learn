import { View, Text, Modal } from 'react-native';
import { PixelButton } from './PixelButton';

interface FeedbackModalProps {
  visible: boolean;
  onClose: () => void;
  title: string;
  message: string;
}

export function FeedbackModal({ visible, onClose, title, message }: FeedbackModalProps) {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View className="flex-1 bg-black/50 justify-center items-center p-4">
        <View className="bg-emerald-600 border-4 border-emerald-900 p-6 w-full max-w-sm">
          <Text className="text-white font-bold text-xl mb-3">{title}</Text>
          <Text className="text-emerald-200 mb-6">{message}</Text>
          <View className="flex-row justify-between">
            <View className="flex-1 mr-2">
              <PixelButton title="No" onPress={onClose} variant="secondary" />
            </View>
            <View className="flex-1 ml-2">
              <PixelButton title="Yes" onPress={onClose} variant="primary" />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}