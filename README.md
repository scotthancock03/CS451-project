# CS451-project — Daily Goal Tracker

React Native (Expo) mobile app for managing daily goals with local persistence.

## Features

- **Create** goals with title, date, and time
- **Read** active goals on the Dashboard tab
- **Update** goals via Edit on any goal card
- **Delete** individual goals or clear all completed goals
- **Complete** goals and view them on the Completed tab
- **AsyncStorage** persistence across app restarts
- **Bottom tab navigation** (Goals, Completed, Settings)
- **High contrast** accessibility option in Settings

## Getting started

```bash
cd GoalTracker
npm install
npx expo start
```

Then press `a` for Android emulator, `i` for iOS simulator, or scan the QR code with **Expo Go from the App Store** (SDK 54).

> **Note:** This project uses **Expo SDK 54** so it works with the public App Store / Play Store version of Expo Go. SDK 55 Expo Go is not on the App Store yet ([Expo changelog](https://expo.dev/changelog/expo-go-and-app-store-may-2026)).

## Project structure

```
GoalTracker/
├── App.js                 # App entry (navigation + providers)
├── src/
│   ├── components/        # GoalCard, buttons, modals
│   ├── context/           # GoalContext, ThemeContext
│   ├── navigation/        # Tab + stack navigators
│   └── screens/           # Dashboard, Completed, Settings, Add/Edit
```

## Repository

Based on [scotthancock03/CS451-project](https://github.com/scotthancock03/CS451-project).
