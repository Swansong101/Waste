# WasteSmart ♻️

WasteSmart is a smart waste management solution combining a mobile app, smart bins, and a chatbot. This project is built collaboratively to promote efficient recycling and environmental awareness.

## 📱 Tech Stack
- React Native (Expo)
- GitHub for collaboration
- Chatbot (Planned)
- Smart Bin IoT Integration (Planned)

## 🚀 Getting Started

### Clone the Repository
```bash
git clone https://github.com/Swansong101/Waste.git
cd Waste
npm install
npx expo start
```

### Prerequisites
- Node.js and npm installed
- Expo CLI: `npm install -g expo-cli`
- Git installed

## 🌿 Collaboration Workflow

### Branching Strategy
| Branch        | Purpose                          |
|---------------|----------------------------------|
| `main`        | Stable production code           |
| `dev`         | All feature branches merge here  |
| `feature/*`   | New features                     |
| `fix/*`       | Bug fixes                        |
| `chore/*`     | Maintenance & refactor work      |

### Steps to Contribute
1. Pull latest changes:
   ```bash
   git checkout dev
   git pull origin dev
   ```
2. Create a new branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Push your branch:
   ```bash
   git push origin feature/your-feature-name
   ```
4. Open a Pull Request (PR) into `dev`
5. Request a review before merging

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
