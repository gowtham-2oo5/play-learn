### **Instructions for AI Agent: React Native + NativeWind (TailwindCSS)**

**Project Goal:**  
Build a pixelated UI prototype for PlayLearnAI using React Native and NativeWind. The theme is emerald green, and all visual elements should draw from pixel art styles.

#### **1. Theme Styling**
- **Primary Color:** Emerald Green (`#27ae60` or Tailwind's `emerald-600`)
- **Secondary Color:** Deep Green (`#145c13` or Tailwind's `emerald-900`)
- **UI Style:** Pixelated borders, icons, avatars, progress bars, and backgrounds
- **Font:** Use a pixel/retro font (if available); else, bold monospace styles

#### **2. UI Layout Instructions**
Create the following main screens/components:

**A. Dashboard/Home Screen**
- Profile banner with pixel avatar
- Level, XP bar (pixel block style, emerald gradient)
- Quick action buttons: Start Learning, Continue, View Achievements (pixel buttons, green)
- Recent progress summary panel

**B. Learning Modules Screen**
- Grid/list of module cards (pixel outline, emerald and green background variation)
- Module title, difficulty tag, lock/open status (icon: pixelated padlock)
- Progress bar (chunky, pixel blocks)

**C. Gamification Panel**
- Badges as pixel icons
- Leaderboard: pixel avatars, XP, rank (highlight user)
- Level meter (blocky progress with emerald fill)

**D. Recommendations Feed**
- AI-suggested modules as card list (emerald pixel border)
- Preview icons (pixel glyphs), action button

**E. Engagement & Stats**
- Pixelated chart for weekly activity (`bg-emerald-200`, grid/block dots)
- Session completion and percentage meter

**F. Feedback/Intervention Popup**
- Modal or bottom sheet: pixel border, emerald background, bold font
- Prompt with Yes/No pixel buttons

**G. Settings**
- Theme picker (pixel selector highlighting emerald)
- Privacy and notification toggles (pixel switches)

#### **3. Style Guide (NativeWind/Tailwind Classes)**
- Use `bg-emerald-600`, `border-2 border-emerald-800`, `rounded-none` or custom pixel grid corners
- Example:  
  ```jsx
  <View className="bg-emerald-600 border-2 border-emerald-900 p-4 rounded-none shadow-lg" />
  ```
- Buttons:  
  ```jsx
  <TouchableOpacity className="bg-emerald-700 border-2 border-emerald-900 px-4 py-2 rounded-none font-bold" />
  ```
- Progress bars:  
  - Stack `View` elements horizontally, each representing a chunk/block

#### **4. Data Instructions**
Use this sample JSON as mock data to populate the UI:
```json
{
  "profile": {
    "username": "PixelLearner",
    "avatar": "pixel_avatar_1.png",
    "level": 7,
    "xp": 512,
    "streak": 14,
    "badges": ["Starter", "Explorer", "QuizMaster"]
  },
  "dashboard": {
    "recentProgress": {
      "currentModule": "AI Fundamentals",
      "progressPercent": 75,
      "lastActive": "2025-10-07"
    },
    "quickLinks": [
      {"label": "Start Learning"},
      {"label": "Continue Module"},
      {"label": "Achievements"}
    ]
  },
  "modules": [
    {"id": 1, "title": "AI Fundamentals", "difficulty": "easy", "locked": false, "progress": 75},
    {"id": 2, "title": "Gamification Theory", "difficulty": "medium", "locked": false, "progress": 40},
    {"id": 3, "title": "Reinforcement Learning", "difficulty": "hard", "locked": true, "progress": 0}
  ],
  "gamification": {
    "badges": ["Starter", "Explorer", "QuizMaster"],
    "leaderboard": [
      {"rank": 1, "username": "PixelLearner", "xp": 512},
      {"rank": 2, "username": "GreenMage", "xp": 476},
      {"rank": 3, "username": "BlockBoss", "xp": 453}
    ],
    "levelTrack": {"level": 7, "meter": 512, "maxMeter": 1000}
  },
  "recommendations": [
    {"id": 10, "title": "AI and You", "description": "Discover how AI impacts everyday life."},
    {"id": 11, "title": "Game Design Basics", "description": "Key principles for gamifying learning."}
  ],
  "stats": {
    "weeklyActivity": [35, 40, 50, 45, 55, 60, 42],
    "completionRate": 82
  },
  "settings": {
    "themeSelected": "Pixel Emerald Green",
    "privacyEnabled": true,
    "notificationsEnabled": true
  }
}
```

#### **5. Pixelated Details**
- Use 8-bit icons and avatars (custom SVGs or PNGs).
- Progress bars and charts must be built from individual block Views, colored emerald.
- No rounded corners; use sharp edges for blocks.

#### **6. Accessibility & Responsiveness**
- Ensure easily readable font sizes
- High contrast: Emerald green (primary), white/black (text), gray for backgrounds

***

**Summary for AI Agent:**
- Assemble UI using React Native components styled with NativeWind (TailwindCSS)
- Use emerald green, pixelated theme throughout, as described
- Fill UI with provided JSON mock data and pixel-style elements
- All elements must look retro/pixel, sharp, and match the color palette
