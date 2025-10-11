import { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';

const { width, height } = Dimensions.get('window');

export default function QuizScreen() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState(30);
  const [showResult, setShowResult] = useState(false);
  const [generatingNext, setGeneratingNext] = useState(false);
  const [questionStartTime, setQuestionStartTime] = useState(Date.now());
  const [adaptiveQuestions, setAdaptiveQuestions] = useState<any[]>([]);
  const [userPerformance, setUserPerformance] = useState({ avgResponseTime: 15, correctRate: 0.7, streak: 0 });
  const [score, setScore] = useState(0);

  const mlQuestions = {
    easy: [
      {
        question: "What does ML stand for?",
        options: ["Machine Learning", "Manual Labor", "Memory Loss", "Math Logic"],
        correct: 0,
        explanation: "ML stands for Machine Learning - a method of data analysis that automates analytical model building."
      },
      {
        question: "Which of these is a type of machine learning?",
        options: ["Supervised Learning", "Cooking", "Dancing", "Singing"],
        correct: 0,
        explanation: "Supervised Learning is one of the main types of machine learning where algorithms learn from labeled training data."
      },
      {
        question: "What is data in machine learning?",
        options: ["Information used to train models", "Computer hardware", "Software code", "Internet connection"],
        correct: 0,
        explanation: "Data is the information or examples used to train machine learning models to make predictions or decisions."
      }
    ],
    medium: [
      {
        question: "What is the primary purpose of machine learning?",
        options: [
          "To replace human intelligence",
          "To find patterns in data and make predictions",
          "To create robots",
          "To store large amounts of data"
        ],
        correct: 1,
        explanation: "Machine learning's main goal is to identify patterns in data and use them to make accurate predictions on new, unseen data."
      },
      {
        question: "Which algorithm is commonly used for classification?",
        options: ["Linear Regression", "K-Means Clustering", "Decision Trees", "PCA"],
        correct: 2,
        explanation: "Decision Trees are widely used for classification tasks as they can handle both categorical and numerical data effectively."
      },
      {
        question: "What is overfitting in machine learning?",
        options: [
          "When a model performs too well on training data but poorly on new data",
          "When a model is too simple",
          "When there's too much data",
          "When the computer overheats"
        ],
        correct: 0,
        explanation: "Overfitting occurs when a model learns the training data too specifically, including noise, making it perform poorly on new data."
      }
    ],
    hard: [
      {
        question: "Which regularization technique prevents overfitting by adding L1 penalty?",
        options: ["Ridge Regression", "Lasso Regression", "Elastic Net", "Dropout"],
        correct: 1,
        explanation: "Lasso Regression uses L1 regularization, which adds a penalty equal to the sum of absolute values of parameters, often leading to sparse models."
      },
      {
        question: "What is the curse of dimensionality?",
        options: [
          "When algorithms become slower with more features",
          "When data becomes sparse in high-dimensional spaces",
          "When models become too complex",
          "When computers run out of memory"
        ],
        correct: 1,
        explanation: "The curse of dimensionality refers to various phenomena that arise when analyzing data in high-dimensional spaces, where data becomes increasingly sparse."
      },
      {
        question: "Which technique is used to reduce dimensionality while preserving variance?",
        options: ["K-Means", "Decision Trees", "Principal Component Analysis", "Linear Regression"],
        correct: 2,
        explanation: "PCA (Principal Component Analysis) reduces dimensionality by finding principal components that capture the maximum variance in the data."
      }
    ]
  };

  const generateAdaptiveQuestion = (responseTime: number, isCorrect: boolean) => {
    let difficulty: 'easy' | 'medium' | 'hard' = 'medium';
    
    if (responseTime < 8 && isCorrect && userPerformance.streak >= 2) {
      difficulty = 'hard';
    } else if (responseTime > 20 || !isCorrect || userPerformance.correctRate < 0.5) {
      difficulty = 'easy';
    }
    
    const questions = mlQuestions[difficulty];
    const availableQuestions = questions.filter(q => 
      !adaptiveQuestions.some(aq => aq.question === q.question)
    );
    
    if (availableQuestions.length === 0) {
      return questions[Math.floor(Math.random() * questions.length)];
    }
    
    return availableQuestions[Math.floor(Math.random() * availableQuestions.length)];
  };

  useEffect(() => {
    setAdaptiveQuestions([mlQuestions.medium[0]]);
    setQuestionStartTime(Date.now());
  }, []);

  useEffect(() => {
    if (timeLeft > 0 && !showResult && !generatingNext) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !showResult) {
      handleAnswer(-1); // Time's up
    }
  }, [timeLeft, showResult, generatingNext]);

  const handleAnswer = (answerIndex: number) => {
    const responseTime = (Date.now() - questionStartTime) / 1000;
    const isCorrect = answerIndex === adaptiveQuestions[currentQuestion]?.correct;
    const isTimeout = answerIndex === -1;
    
    setSelectedAnswer(answerIndex);
    setShowResult(true);
    
    if (isCorrect) {
      setScore(prev => prev + (timeLeft > 20 ? 100 : timeLeft > 10 ? 80 : 60));
    }
    
    setUserPerformance(prev => ({
      avgResponseTime: (prev.avgResponseTime + responseTime) / 2,
      correctRate: isCorrect ? Math.min(1, prev.correctRate + 0.1) : Math.max(0, prev.correctRate - 0.1),
      streak: isCorrect ? prev.streak + 1 : 0
    }));
    
    setTimeout(() => {
      if (currentQuestion >= 9) {
        router.push('/quiz-complete');
        return;
      }
      
      setGeneratingNext(true);
      
      setTimeout(() => {
        const nextQuestion = generateAdaptiveQuestion(responseTime, isCorrect);
        setAdaptiveQuestions(prev => [...prev, nextQuestion]);
        
        setCurrentQuestion(prev => prev + 1);
        setSelectedAnswer(null);
        setShowResult(false);
        setGeneratingNext(false);
        setTimeLeft(30);
        setQuestionStartTime(Date.now());
      }, 1500);
    }, isTimeout ? 1000 : 2500);
  };

  const currentQ = adaptiveQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / 10) * 100;

  if (generatingNext) {
    return (
      <SafeAreaView className="flex-1 bg-gray-900">
        <View className="flex-1 justify-center items-center px-6">
          <View className="bg-white rounded-3xl p-8 w-full max-w-sm items-center">
            <View className="w-16 h-16 bg-emerald-100 rounded-full items-center justify-center mb-4">
              <ActivityIndicator size="large" color="#10b981" />
            </View>
            <Text className="text-xl font-bold text-gray-900 mb-2">Analyzing Performance</Text>
            <Text className="text-gray-600 text-center mb-4">
              Generating next question based on your learning pattern...
            </Text>
            <View className="w-full bg-gray-200 rounded-full h-2">
              <View className="bg-emerald-500 h-2 rounded-full" style={{ width: '70%' }} />
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-900">
      <View className="flex-1">
        {/* Header */}
        <View className="px-6 pt-4 pb-6">
          <View className="flex-row items-center justify-between mb-4">
            <TouchableOpacity onPress={() => router.back()}>
              <Text className="text-white font-semibold">✕ Exit</Text>
            </TouchableOpacity>
            <Text className="text-white font-bold">ML Quiz</Text>
            <Text className="text-emerald-400 font-bold">{score} pts</Text>
          </View>
          
          <View className="flex-row items-center justify-between mb-4">
            <Text className="text-white">Question {currentQuestion + 1}/10</Text>
            <View className={`px-3 py-1 rounded-full ${timeLeft <= 10 ? 'bg-red-500' : 'bg-emerald-500'}`}>
              <Text className="text-white font-bold">{timeLeft}s</Text>
            </View>
          </View>
          
          <View className="w-full h-2 bg-gray-700 rounded-full">
            <View className="h-full bg-emerald-500 rounded-full" style={{ width: `${progress}%` }} />
          </View>
        </View>

        {/* Question */}
        <View className="flex-1 px-6">
          <View className="bg-white rounded-3xl p-6 mb-6">
            <View className="mb-4">
              <Text className="text-sm text-gray-500 mb-2">
                🧠 {userPerformance.avgResponseTime < 10 ? 'Advanced' : userPerformance.avgResponseTime > 20 ? 'Beginner' : 'Intermediate'} Level
              </Text>
              {userPerformance.streak > 0 && (
                <Text className="text-emerald-600 font-semibold">🔥 {userPerformance.streak} streak!</Text>
              )}
            </View>
            
            <Text className="text-2xl font-bold text-gray-900 mb-6 leading-relaxed">
              {currentQ?.question}
            </Text>
            
            <View className="gap-4">
              {currentQ?.options.map((option: string, index: number) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => !showResult && handleAnswer(index)}
                  className={`p-5 rounded-2xl border-2 ${
                    selectedAnswer === index
                      ? showResult
                        ? index === currentQ.correct
                          ? 'bg-green-50 border-green-500'
                          : 'bg-red-50 border-red-500'
                        : 'bg-emerald-50 border-emerald-500'
                      : showResult && index === currentQ.correct
                        ? 'bg-green-50 border-green-500'
                        : 'bg-gray-50 border-gray-200'
                  }`}
                  disabled={showResult}
                >
                  <View className="flex-row items-center justify-between">
                    <Text className="font-semibold flex-1 text-lg">{option}</Text>
                    {showResult && index === currentQ.correct && (
                      <Text className="text-green-600 text-2xl">✓</Text>
                    )}
                    {showResult && selectedAnswer === index && index !== currentQ.correct && (
                      <Text className="text-red-600 text-2xl">✗</Text>
                    )}
                  </View>
                </TouchableOpacity>
              ))}
            </View>
            
            {showResult && (
              <View className="mt-6 p-5 bg-blue-50 rounded-2xl">
                <Text className="text-blue-800 font-bold text-lg mb-2">
                  {selectedAnswer === currentQ.correct 
                    ? "🎉 Correct!" 
                    : selectedAnswer === -1
                      ? "⏰ Time's up!"
                      : "❌ Incorrect"}
                </Text>
                <Text className="text-blue-700 leading-relaxed">
                  {currentQ.explanation}
                </Text>
              </View>
            )}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}