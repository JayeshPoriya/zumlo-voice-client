# 🎙️ ZUMLO Voice Client

This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

---

## 🚀 Getting Started

> **Note:** Make sure you have completed the [Set Up Your Environment](https://reactnative.dev/docs/set-up-your-environment) guide before proceeding.

### Step 1: Start Metro

Metro is the JavaScript bundler for React Native.  
To start the Metro dev server, run:

```bash
# Using npm
npm start

# OR using Yarn
yarn start
```

---

### Step 2: Build and Run Your App

With Metro running, open a new terminal and use one of the following commands to build and run your app:

#### 🟢 Android

```bash
# Using npm
npm run android

# OR using Yarn
yarn android
```

#### 🍎 iOS

For iOS, install CocoaPods dependencies (only needed initially or after dependency changes):

```bash
bundle install
bundle exec pod install
```

Then run:

```bash
# Using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is configured correctly, your app should run in an emulator or connected device.

---

## 🧩 Project Structure

Below is an overview of the folder and file structure for the **ZUMLO Voice Client** project.

```
ZUMLO-VOICE-CLIENT/
│
├── __tests__/                # Unit & integration test files
│
├── android/                  # Native Android project files (Gradle, Java, manifests)
├── ios/                      # Native iOS project files (Xcode, Swift/Obj-C)
│
├── node_modules/             # Auto-generated npm dependencies
│
├── src/                      # All main source code lives here
│   ├── assets/               # Static assets such as images and icons
│   │   ├── back.png
│   │   ├── profile.png
│   │   ├── speak.png
│   │   ├── splash.png
│   │   └── workInProgress.png
│   │
│   ├── components/           # Reusable UI components
│   │   ├── Header.tsx        # Common header component
│   │   └── MyLoader.tsx      # Custom loader animation component
│   │
│   ├── config/               # Configuration and API-related files
│   │   ├── ApiCall.ts        # Handles generic API call abstraction
│   │   ├── ApiConfig.ts      # Base configuration for all APIs
│   │   ├── BaseApiCall.ts    # Core API base functions
│   │   ├── CallApi.ts        # Wrapper functions for making API requests
│   │   └── EndPoint.ts       # Centralized API endpoint definitions
│   │
│   ├── navigation/           # Navigation setup (React Navigation)
│   │   ├── InitialRouter.tsx # App entry router logic
│   │   └── RootNavigation.ts # Root navigation container
│   │
│   ├── redux/                # Redux Toolkit store and slices
│   │   ├── slices/           # Feature-based slices for state management
│   │   └── Store.ts          # Redux store configuration
│   │
│   ├── screens/              # Main app screens and pages
│   │                         # (Example: Home, Profile, Settings, etc.)
│   │
│   ├── theme/                # Global theme, colors, fonts, and styles
│   │
│   └── utils/                # Helper and utility functions
│
├── .gitignore                # Files/folders ignored by Git
├── app.json                  # Application metadata and name configuration
├── App.tsx                   # Root React Native component (entry point)
├── babel.config.js           # Babel transpiler configuration
├── Gemfile                   # Ruby gem dependencies for iOS (CocoaPods)
├── index.js                  # Main entry file for React Native runtime
├── jest.config.js            # Jest configuration for testing
├── metro.config.js           # Metro bundler configuration
├── package.json              # Project dependencies and scripts
├── package-lock.json         # Lockfile for dependency versions
├── react-native.config.js    # React Native CLI configuration
└── README.md                 # Project documentation (this file)
```

---

## 🧠 Key Concepts

- **TypeScript:** Adds static typing and improves development experience.
- **Redux Toolkit:** Simplified and powerful state management.
- **React Navigation:** For smooth navigation between app screens.
- **Custom Components:** Modular and reusable UI elements.
- **API Layer:** Centralized and clean API integration structure.
- **Theming:** Consistent color and style management.

---

## 🎉 Congratulations!

You've successfully run and understood the structure of your React Native app. 🎊

### Next Steps

- Explore the `src/screens/` folder to add new screens or features.
- Add new endpoints in `config/EndPoint.ts` and handle API calls via `ApiCall.ts`.
- Customize your UI components under `src/components/`.

---

## 🧰 Troubleshooting

If you encounter issues getting started, visit the official [Troubleshooting Guide](https://reactnative.dev/docs/troubleshooting).

---

## 📚 Learn More

To learn more about React Native, check out these resources:

- [React Native Website](https://reactnative.dev)
- [Getting Started](https://reactnative.dev/docs/environment-setup)
- [Learn the Basics](https://reactnative.dev/docs/getting-started)
- [Blog](https://reactnative.dev/blog)
- [`@facebook/react-native`](https://github.com/facebook/react-native)

---

## 💡 Author

**Jayesh Poriya**  
📍 Surat, India  
📧 [jayeshporiya01@gmail.com](mailto:jayeshporiya01@gmail.com)

---

Made with ❤️ using **React Native** and **TypeScript**
