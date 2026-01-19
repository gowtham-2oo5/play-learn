import { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Screen } from "@/components/ui/Screen";
import { ThemedText } from "@/components/themed-text";
import { router } from "expo-router";

export default function CourseScreen() {
  const [activeTab, setActiveTab] = useState("overview");
  const [completedItems, setCompletedItems] = useState<string[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState(30);
  const [loading, setLoading] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [generatingNext, setGeneratingNext] = useState(false);
  const [questionStartTime, setQuestionStartTime] = useState(Date.now());
  const [adaptiveQuestions, setAdaptiveQuestions] = useState<any[]>([]);
  const [userPerformance, setUserPerformance] = useState({
    avgResponseTime: 15,
    correctRate: 0.7,
  });

  const courseContent = {
    videos: [
      {
        id: "v1",
        title: "Introduction to Machine Learning",
        duration: "12:30",
        completed: false,
      },
      {
        id: "v2",
        title: "Types of ML Algorithms",
        duration: "18:45",
        completed: false,
      },
      {
        id: "v3",
        title: "Data Preprocessing",
        duration: "15:20",
        completed: false,
      },
    ],
    readings: [
      { id: "r1", title: "ML Fundamentals PDF", pages: 25, completed: false },
      {
        id: "r2",
        title: "Algorithm Comparison Chart",
        pages: 8,
        completed: false,
      },
      {
        id: "r3",
        title: "Case Study: Netflix Recommendations",
        pages: 12,
        completed: false,
      },
    ],
    quizzes: [
      { id: "q1", title: "Week 1 Quiz", questions: 10, completed: false },
      {
        id: "q2",
        title: "Algorithm Types Quiz",
        questions: 8,
        completed: false,
      },
    ],
  };

  const questionBank = {
    easy: [
      {
        question: "What does ML stand for?",
        options: [
          "Machine Learning",
          "Manual Labor",
          "Memory Loss",
          "Math Logic",
        ],
        correct: 0,
      },
    ],
    medium: [
      {
        question: "What is the primary purpose of machine learning?",
        options: [
          "To replace human intelligence",
          "To find patterns in data and make predictions",
          "To create robots",
          "To store large amounts of data",
        ],
        correct: 1,
      },
    ],
    hard: [
      {
        question:
          "Which regularization technique prevents overfitting by adding L1 penalty?",
        options: ["Ridge", "Lasso", "Elastic Net", "Dropout"],
        correct: 1,
      },
    ],
  };

  const generateAdaptiveQuestion = (
    responseTime: number,
    isCorrect: boolean
  ) => {
    let difficulty = "medium";

    if (responseTime < 10 && isCorrect) {
      difficulty = "hard";
    } else if (responseTime > 20 || !isCorrect) {
      difficulty = "easy";
    }

    const questions = questionBank[difficulty as keyof typeof questionBank];
    return questions[Math.floor(Math.random() * questions.length)];
  };

  useEffect(() => {
    if (activeTab === "quiz" && adaptiveQuestions.length === 0) {
      setAdaptiveQuestions([questionBank.medium[0]]);
      setQuestionStartTime(Date.now());
    }
  }, [activeTab]);

  useEffect(() => {
    if (timeLeft > 0 && !showResult && activeTab === "quiz") {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft, showResult, activeTab]);

  const handleAnswer = (answerIndex: number) => {
    const responseTime = (Date.now() - questionStartTime) / 1000;
    const isCorrect =
      answerIndex === adaptiveQuestions[currentQuestion]?.correct;

    setSelectedAnswer(answerIndex);
    setShowResult(true);

    // Update user performance metrics
    setUserPerformance((prev) => ({
      avgResponseTime: (prev.avgResponseTime + responseTime) / 2,
      correctRate: isCorrect
        ? Math.min(1, prev.correctRate + 0.1)
        : Math.max(0, prev.correctRate - 0.1),
    }));

    setTimeout(() => {
      setGeneratingNext(true);

      // Generate next adaptive question
      setTimeout(() => {
        const nextQuestion = generateAdaptiveQuestion(responseTime, isCorrect);
        setAdaptiveQuestions((prev) => [...prev, nextQuestion]);

        setCurrentQuestion((prev) => prev + 1);
        setSelectedAnswer(null);
        setShowResult(false);
        setGeneratingNext(false);
        setTimeLeft(30);
        setQuestionStartTime(Date.now());
      }, 1200);
    }, 2000);
  };

  const toggleComplete = (id: string) => {
    setCompletedItems((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const ResourceItem = ({ item, type }: { item: any; type: string }) => (
    <TouchableOpacity
      className="p-4 mb-3 bg-white border border-gray-100 shadow-sm rounded-xl"
      onPress={() =>
        type === "quiz" ? router.push("/quiz") : toggleComplete(item.id)
      }
    >
      <View className="flex-row items-center justify-between">
        <View className="flex-1">
          <View className="flex-row items-center mb-2">
            <Text className="mr-2 text-lg">
              {type === "video" ? "🎥" : type === "reading" ? "📖" : "❓"}
            </Text>
            <Text className="flex-1 font-semibold text-gray-900">
              {item.title}
            </Text>
          </View>
          <Text className="text-sm text-gray-600">
            {type === "video"
              ? item.duration
              : type === "reading"
              ? `${item.pages} pages`
              : `${item.questions} questions`}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => toggleComplete(item.id)}
          className={`w-6 h-6 rounded-full border-2 items-center justify-center ${
            completedItems.includes(item.id)
              ? "bg-emerald-500 border-emerald-500"
              : "border-gray-300"
          }`}
        >
          {completedItems.includes(item.id) && (
            <Text className="text-xs text-white">✓</Text>
          )}
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <Screen scroll contentContainerStyle={{ paddingBottom: 20 }}>
      {/* Header */}
      <View className="px-6 pt-4 pb-6">
        <View className="flex-row items-center justify-between mb-4">
          <TouchableOpacity onPress={() => router.back()}>
            <ThemedText type="defaultSemiBold" style={{ color: "#0ea86f" }}>
              ← Back
            </ThemedText>
          </TouchableOpacity>
          <ThemedText type="title">Machine Learning Basics</ThemedText>
          <View />
        </View>
        <ThemedText type="subtitle" style={{ marginTop: 4, color: "#6b7280" }}>
          A friendly pace with adaptive quizzes — take your time.
        </ThemedText>

        {/* Course Progress */}
        <View className="p-4 bg-white shadow-lg rounded-2xl">
          <View className="flex-row items-center justify-between mb-3">
            <Text className="font-medium text-gray-700">Course Progress</Text>
            <Text className="font-bold text-emerald-600">3/12 completed</Text>
          </View>
          <View className="w-full h-2 bg-gray-200 rounded-full">
            <View
              className="h-full rounded-full bg-emerald-500"
              style={{ width: "25%" }}
            />
          </View>
        </View>
      </View>

      {/* Tabs */}
      <View className="px-6 mb-6">
        <View className="flex-row p-1 bg-white shadow-sm rounded-xl">
          {["overview", "resources", "quiz"].map((tab) => (
            <TouchableOpacity
              key={tab}
              onPress={() => setActiveTab(tab)}
              className={`flex-1 py-3 rounded-lg ${
                activeTab === tab ? "bg-emerald-500" : "bg-transparent"
              }`}
            >
              <Text
                className={`text-center font-semibold capitalize ${
                  activeTab === tab ? "text-white" : "text-gray-600"
                }`}
              >
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Content */}
      <View className="px-6">
        {activeTab === "overview" && (
          <View className="p-6 bg-white shadow-lg rounded-2xl">
            <Text className="mb-4 text-xl font-bold text-gray-900">
              About This Course
            </Text>
            <Text className="mb-4 leading-relaxed text-gray-700">
              Learn the fundamentals of machine learning, including supervised
              and unsupervised learning algorithms.
            </Text>
            <Text className="mb-2 font-semibold text-gray-700">
              What you'll learn:
            </Text>
            <View className="gap-2">
              <Text className="text-gray-700">
                • Core ML concepts and terminology
              </Text>
              <Text className="text-gray-700">
                • Popular algorithms and their applications
              </Text>
              <Text className="text-gray-700">
                • Data preprocessing techniques
              </Text>
              <Text className="text-gray-700">• Model evaluation methods</Text>
            </View>
          </View>
        )}

        {activeTab === "resources" && (
          <View>
            <Text className="mb-4 text-lg font-bold text-gray-900">
              📹 Videos
            </Text>
            {courseContent.videos.map((video) => (
              <ResourceItem key={video.id} item={video} type="video" />
            ))}

            <Text className="mt-6 mb-4 text-lg font-bold text-gray-900">
              📚 Readings
            </Text>
            {courseContent.readings.map((reading) => (
              <ResourceItem key={reading.id} item={reading} type="reading" />
            ))}

            <Text className="mt-6 mb-4 text-lg font-bold text-gray-900">
              🧠 Quizzes
            </Text>
            {courseContent.quizzes.map((quiz) => (
              <ResourceItem key={quiz.id} item={quiz} type="quiz" />
            ))}
          </View>
        )}

        {activeTab === "quiz" && (
          <View className="p-6 bg-white shadow-lg rounded-2xl">
            <Text className="mb-4 text-xl font-bold text-gray-900">
              Ready for the Quiz?
            </Text>
            <Text className="mb-6 text-gray-700">
              Test your knowledge with 10 adaptive questions that adjust to your
              skill level.
            </Text>
            <TouchableOpacity
              className="py-4 bg-emerald-500 rounded-xl"
              onPress={() => router.push("/quiz")}
            >
              <Text className="text-lg font-bold text-center text-white">
                Start Quiz
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </Screen>
  );
}
