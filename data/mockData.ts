import coursesData from './courses.json';
import quizzesData from './quizzes.json';

export const mockData = {
  profile: {
    username: "PixelLearner",
    avatar: "pixel_avatar_1.png",
    level: 7,
    xp: 512,
    streak: 14,
    badges: ["Starter", "Explorer", "QuizMaster"]
  },
  dashboard: {
    recentProgress: {
      currentModule: "AI Fundamentals",
      progressPercent: 75,
      lastActive: "2025-10-07"
    },
    quickLinks: [
      { label: "Start Learning" },
      { label: "Continue Module" },
      { label: "Achievements" }
    ]
  },
  courses: coursesData.courses,
  quizzes: quizzesData.quizzes,
  gamification: {
    badges: ["Starter", "Explorer", "QuizMaster"],
    leaderboard: [
      { rank: 1, username: "PixelLearner", xp: 512 },
      { rank: 2, username: "GreenMage", xp: 476 },
      { rank: 3, username: "BlockBoss", xp: 453 }
    ],
    levelTrack: { level: 7, meter: 512, maxMeter: 1000 }
  },
  recommendations: [
    { id: 10, title: "AI and You", description: "Discover how AI impacts everyday life." },
    { id: 11, title: "Game Design Basics", description: "Key principles for gamifying learning." }
  ],
  stats: {
    weeklyActivity: [35, 40, 50, 45, 55, 60, 42],
    completionRate: 82
  },
  settings: {
    themeSelected: "Pixel Emerald Green",
    privacyEnabled: true,
    notificationsEnabled: true
  }
};

export { coursesData, quizzesData };