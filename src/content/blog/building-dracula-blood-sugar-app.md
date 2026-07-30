---
title: "Building Dracula: A Privacy-First Blood Sugar Tracking App"
description: "I built a Flutter app to track blood sugar and meals without sending my health data to anyone else's server. Here's the full dev journey."
pubDate: "2026-07-30"
heroImage: "/CyberPunkLogo2.jpg"
tags: ["flutter", "health-tech", "privacy", "mobile-development", "app-development", "diabetes", "nutrition"]
---

# Building Dracula: A Privacy-First Blood Sugar Tracking App

I wanted an app that tracked blood sugar and meals without phoning home to some cloud server. Everything I found either required an account, sold data, or was ugly. So I built Dracula in Flutter.

The whole thing runs offline. SQLite on device, no telemetry, no signup. The Dracula theme was a bonus — I like dark UIs and the color scheme stuck.

## What is Dracula?

Cross-platform Flutter app for logging blood sugar and meals. Android and iOS. Zero data leaves the device unless you export a CSV.

The app started as a simple logger and grew into a full nutrition-blood sugar correlation tool as I kept needing features.

## MVP 1: Core Offline Functionality

MVP 1 was bare bones:

- **Blood Sugar Logging**: Add, edit, delete readings with before/after meal flags
- **Custom Categories**: Fasting, post-meal, random — whatever made sense
- **Smart Settings**: Unit conversion (mg/dL vs mmol/L), timezone, CSV export
- **Secure Storage**: SQLite, no cloud, no sync
- **Privacy by Design**: Nothing leaves the device

Stack was Flutter with Provider for state, sqflite for storage. Clean architecture with models, services, screens:

```dart
class BloodSugarLog {
 final int? id;
 final double bloodSugar;
 final bool isBeforeMeal;
 final DateTime createdAt;
 // ... more fields
}
```

## MVP 2: Analytics & User Experience

Once logging worked, I made it useful:

- **Interactive Charts**: fl_chart for trends over days and weeks
- **Statistical Insights**: Averages, highs, lows, trends
- **Daily Reminders**: flutter_local_notifications
- **Security**: Biometric app lock with local_auth
- **Enhanced UI**: Material 3, animations, responsive layout

This phase taught me Flutter's animation system and notification scheduling. Charts were the hardest part — getting data aggregation right while keeping the UI smooth.

## MVP 3 & The Nutrition Revolution

The biggest update added meal tracking, turning Dracula from a blood sugar logger into a correlation tool:

### Meal Tracking System
- **Macro Nutrients**: Carbs, protein, fat, calories
- **Micro Nutrients**: Fiber, sugar, sodium, vitamins, minerals
- **Premade Meals**: Quick-select common foods
- **Custom Entries**: Full nutrition data input

### Blood Sugar-Meal Correlation

The feature I actually wanted: log blood sugar "before meal," pick the meal you're about to eat, and see the correlation later.

```dart
// Database schema evolution
if (oldVersion < 4) {
 // Create meals table with all nutrient fields
}
if (oldVersion < 5) {
 // Add mealId to blood sugar logs
}
```

## Technical Deep Dive: Challenges & Solutions

### Database Evolution

Managing schema changes across app versions meant proper migration logic:

```dart
Future _upgradeDB(Database db, int oldVersion, int newVersion) async {
 if (oldVersion < 2) {
   await db.execute('DROP TABLE IF EXISTS blood_sugar_logs');
   await _createDB(db, newVersion);
 }
 // ... more migrations
}
```

### Testing Strategy

Followed TDD:

- **Unit Tests**: Model serialization, business logic
- **Widget Tests**: UI interactions, form validation 
- **Integration Tests**: End-to-end workflows

The meal-blood sugar correlation needed careful testing of linked data relationships.

### Cross-Platform Headaches

Android and iOS each had their own quirks:
- File pickers work differently per platform
- Notification permissions are different
- Biometric auth APIs are not the same

## Lessons Learned

1. **Start Simple, Scale Smart**: MVP 1 proved the concept. Each iteration added value without overcomplicating things.

2. **Privacy Matters**: Health data is sensitive. Building offline-first from day one was the right call.

3. **Testing Saves Time**: Caught bugs early that would have been nasty in production.

4. **Database Design is Forever**: Schema migrations are painful. Plan ahead.

5. **UX is Everything**: The app works because it feels good to use, not because of any single feature.

## What's Next?

Dracula is feature-complete for core use cases. Roadmap includes:
- Sync with wearables
- AI-powered insights (offline, on-device)
- Multi-language support
- Performance optimization

## Conclusion

Building Dracula taught me Flutter, health app patterns, and that most health apps are overengineered data collectors. You don't need cloud sync, accounts, or telemetry to build something useful.

The app is offline, private, and does what it says. That's the bar.

---

*Not medical advice. Consult a professional for actual diabetes management.*
