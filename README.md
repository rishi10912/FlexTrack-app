# FlexTrack AI

FlexTrack AI is a modern, high-performance fitness tracking web application inspired by the "Strong" app. It is designed for serious lifters who want a clean, dark-themed interface to log their workouts, track progress, and get intelligent coaching insights powered by Google's Gemini AI.

## 🚀 Features

- **Intuitive Workout Logging**: Easily add exercises, track sets, reps, and weight. Mark sets as complete with a single tap.
- **Progress Visualization**: View your total training volume over time with interactive charts powered by Recharts.
- **Comprehensive Exercise Library**: Browse or search through a curated list of exercises across different muscle groups and equipment types.
- **AI Coach (Gemini Powered)**:
  - **Daily Briefing**: Get personalized analysis of your recent workout history and suggestions on what to train next.
  - **Routine Generator**: Input your fitness goals and frequency to receive a custom-tailored workout plan.
- **Workout History**: Review all your past sessions, complete with duration and weight personal records.
- **Persistence**: Your data is automatically saved to your browser's local storage.

## 🛠️ Tech Stack

- **Frontend**: React (ES6+ Modules)
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Charts**: Recharts
- **AI Engine**: Google Gemini API (`@google/genai`)
- **Fonts**: Inter

## 🚦 Getting Started

### Prerequisites

To use the AI features, you need a Google Gemini API Key. The application expects this key to be available via the environment.

### Installation & Running

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/flextrack-ai.git
   cd flextrack-ai
   ```

2. **Environment Setup**:
   Ensure your environment is configured with your `API_KEY`.

3. **Development**:
   The app is structured as a standard React application. You can serve the root directory using any local web server (e.g., `npx serve .` or through a build tool like Vite/Parcel if you choose to wrap it).

## 📱 UI/UX Design

The app features a "Mobile-First" design philosophy:
- **Dark Mode**: High-contrast dark theme for better readability in gym environments.
- **Floating Action Button**: Quick-start a workout from any main screen.
- **Responsive Layout**: Optimized for mobile devices while maintaining a clean look on desktop (max-width container).

## 📄 License

MIT License - feel free to use this for your own personal fitness journey!
