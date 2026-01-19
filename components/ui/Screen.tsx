import React from "react";
import { ScrollView, ViewStyle } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { ThemedView } from "@/components/themed-view";

type ScreenProps = {
  children: React.ReactNode;
  /** make the screen scrollable */
  scroll?: boolean;
  /** style passed to the internal ScrollView contentContainerStyle when scroll is true */
  contentContainerStyle?: any;
  style?: ViewStyle;
};

/**
 * Screen is a small convenience wrapper that applies the app background color (via ThemedView)
 * and a SafeAreaView. Use `scroll` when the content needs to scroll.
 */
export function Screen({
  children,
  scroll = false,
  contentContainerStyle,
  style,
}: ScreenProps) {
  if (scroll) {
    return (
      <ThemedView style={[{ flex: 1 }, style]}>
        <ScrollView
          contentContainerStyle={[{ paddingBottom: 20 }, contentContainerStyle]}
          showsVerticalScrollIndicator={false}
        >
          <SafeAreaView style={{ flex: 1 }}>{children}</SafeAreaView>
        </ScrollView>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={[{ flex: 1 }, style]}>
      <SafeAreaView style={{ flex: 1 }}>{children}</SafeAreaView>
    </ThemedView>
  );
}
