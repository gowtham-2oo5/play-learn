import { useState, useMemo } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { mockData } from "@/data/mockData";
import { Screen } from "@/components/ui/Screen";
import { ThemedText } from "@/components/themed-text";

export default function RecommendationsScreen() {
  const { recommendations } = mockData;

  const Card = ({
    children,
    className = "",
  }: {
    children: React.ReactNode;
    className?: string;
  }) => (
    <View className={`bg-white rounded-2xl shadow-lg p-5 ${className}`}>
      {children}
    </View>
  );

  const RecommendationCard = ({ item }: { item: any }) => {
    const isCourse = !!item.lessons;
    const lessonsCount = isCourse
      ? item.lessons.length
      : item.lessonsCount || 3;
    const timeText = isCourse
      ? item.estimatedTime ||
        (item.durationMinutes ? `${item.durationMinutes} min` : "—")
      : item.time || "45 min";
    const difficulty = isCourse
      ? item.difficulty
      : item.difficulty || "Beginner";

    return (
      <Card className="mb-6">
        <View className="flex-row items-start mb-5">
          <View className="w-12 h-12 bg-gradient-to-br from-purple-400 to-blue-500 rounded-xl items-center justify-center mr-4">
            <Text className="text-white text-xl">{isCourse ? "📘" : "🤖"}</Text>
          </View>
          <View className="flex-1">
            <View className="flex-row items-center mb-3">
              {!isCourse && (
                <View className="bg-purple-100 px-3 py-1 rounded-full mr-3">
                  <Text className="text-purple-600 font-semibold text-xs">
                    AI SUGGESTED
                  </Text>
                </View>
              )}
              <View className="bg-emerald-100 px-3 py-1 rounded-full">
                <Text className="text-emerald-600 font-semibold text-xs">
                  PERSONALIZED
                </Text>
              </View>
            </View>
            <Text className="text-xl font-bold text-gray-900 mb-3">
              {item.title}
            </Text>
            <Text className="text-gray-600 leading-relaxed">
              {item.description}
            </Text>
          </View>
        </View>

        <View className="flex-row items-center justify-between mb-5">
          <View className="flex-row items-center">
            <Text className="text-gray-500 text-sm mr-6">
              📚 {lessonsCount} lessons
            </Text>
            <Text className="text-gray-500 text-sm mr-6">⏱️ {timeText}</Text>
            <Text className="text-gray-500 text-sm">🎯 {difficulty}</Text>
          </View>
          <View className="flex-row items-center">
            <Text className="text-yellow-500 mr-1">⭐</Text>
            <Text className="text-gray-600 font-semibold">
              {item.rating ?? "4.7"}
            </Text>
          </View>
        </View>

        <View className="flex-row gap-4">
          <TouchableOpacity
            className="flex-1 bg-emerald-500 py-4 rounded-xl"
            onPress={() => router.push("/explore")}
          >
            <Text className="text-white font-semibold text-center">
              Start Learning
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="px-5 py-4 border border-gray-200 rounded-xl"
            onPress={() => console.log(`Save: ${item.title}`)}
          >
            <Text className="text-gray-700">🔖</Text>
          </TouchableOpacity>
        </View>
      </Card>
    );
  };

  const [activeFilter, setActiveFilter] = useState<
    "for-you" | "trending" | "quick"
  >("for-you");

  const displayed = useMemo(() => {
    const courses = mockData.courses || [];
    if (activeFilter === "for-you") {
      // show AI recommendations first, then some curated courses
      const recs = (mockData.recommendations || []).map((r: any) => ({
        ...r,
        kind: "rec",
      }));
      const curated = courses
        .filter((c: any) => !c.locked)
        .slice(0, 6)
        .map((c: any) => ({ ...c, kind: "course" }));
      return [...recs, ...curated];
    }

    if (activeFilter === "trending") {
      return courses
        .slice()
        .sort((a: any, b: any) => (b.progress || 0) - (a.progress || 0))
        .map((c: any) => ({ ...c, kind: "course" }));
    }

    // quick wins: short duration <= 60 minutes
    return courses
      .filter((c: any) => (c.durationMinutes ?? 999) <= 60)
      .map((c: any) => ({ ...c, kind: "course" }));
  }, [activeFilter]);

  return (
    <Screen scroll contentContainerStyle={{ paddingBottom: 20 }}>
      <View className="px-6 pt-4">
        <View className="mb-6">
          <View className="flex-row items-center mb-2">
            <ThemedText type="title" style={{ marginRight: 8 }}>
              AI Recommendations
            </ThemedText>
            <View className="bg-gradient-to-r from-purple-500 to-blue-500 w-6 h-6 rounded-full items-center justify-center">
              <Text className="text-white text-xs font-bold">AI</Text>
            </View>
          </View>
          <ThemedText style={{ color: "#6b7280" }}>
            Personalized learning paths just for you
          </ThemedText>
        </View>

        {/* AI Insight Banner */}
        <Card className="mb-8 bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-100">
          <View className="flex-row items-center mb-4">
            <View className="w-10 h-10 bg-gradient-to-br from-purple-400 to-blue-500 rounded-full items-center justify-center mr-4">
              <Text className="text-white text-lg">🧠</Text>
            </View>
            <ThemedText type="subtitle">AI Insight</ThemedText>
          </View>
          <ThemedText style={{ color: "#374151" }}>
            Based on your learning patterns, you perform best with interactive
            modules in the morning. These recommendations are optimized for your
            learning style.
          </ThemedText>
        </Card>

        {/* Filter Tabs */}
        <View className="flex-row mb-8 gap-3">
          <TouchableOpacity
            onPress={() => setActiveFilter("for-you")}
            className={`px-5 py-3 rounded-xl ${
              activeFilter === "for-you"
                ? "bg-purple-500"
                : "bg-white border border-gray-200"
            }`}
          >
            <Text
              className={`${
                activeFilter === "for-you" ? "text-white" : "text-gray-700"
              } font-semibold`}
            >
              For You
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setActiveFilter("trending")}
            className={`px-5 py-3 rounded-xl ${
              activeFilter === "trending"
                ? "bg-purple-500"
                : "bg-white border border-gray-200"
            }`}
          >
            <Text
              className={`${
                activeFilter === "trending" ? "text-white" : "text-gray-700"
              } font-semibold`}
            >
              Trending
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setActiveFilter("quick")}
            className={`px-5 py-3 rounded-xl ${
              activeFilter === "quick"
                ? "bg-purple-500"
                : "bg-white border border-gray-200"
            }`}
          >
            <Text
              className={`${
                activeFilter === "quick" ? "text-white" : "text-gray-700"
              } font-semibold`}
            >
              Quick Wins
            </Text>
          </TouchableOpacity>
        </View>

        {/* Recommendations / Courses */}
        {displayed.map((item: any) => (
          <RecommendationCard
            key={`${item.kind ?? "c"}-${item.id}-${item.title}`}
            item={item}
          />
        ))}

        {/* Load More (no-op for now) */}
        <TouchableOpacity className="bg-white border border-gray-200 py-4 rounded-2xl mt-2">
          <Text className="text-gray-700 font-semibold text-center">
            Load More Recommendations
          </Text>
        </TouchableOpacity>
      </View>
    </Screen>
  );
}
