# SmartQuizApp

SmartQuizApp is a React Native quiz platform with separate mentor and student
workflows. Mentors create and manage quizzes and questions; students search for
published quizzes, enroll, take timed quizzes, and review attempt history.

> This is my first project developed as an academic project.

## Features

- Email/password authentication with email verification
- Mentor dashboard for creating, editing, publishing, and deleting quizzes
- Question creation, editing, listing, and deletion
- Student quiz search and enrollment
- Timed quiz attempts with configurable attempt limits
- Attempt history and score tracking
- Firebase Authentication and Cloud Firestore persistence
- Express backend health check and quiz API
- Styled loading, empty, error, warning, success, and confirmation popups

## Technology

- React Native `0.88.1`
- React `19.3`
- TypeScript
- React Navigation native stack
- Firebase Web SDK for authentication and Firestore
- Express `5`
- Firebase Admin SDK
- Metro, Gradle, and Hermes

## Project structure

```text
SmartQuizApp/
├── App.tsx                 # React Native entry component
├── frontend/
│   ├── components/         # Shared UI and feature components
│   ├── config/             # Firebase client configuration
│   ├── .env                # Local Firebase client configuration; never commit
│   ├── hooks/              # Reusable form/state hooks
│   ├── navigation/         # Native stack navigation
│   ├── screens/            # Authentication, mentor, student, and quiz screens
│   ├── services/           # Quiz-related Firestore services
│   ├── theme/              # Colors, layout, and shared styling
│   ├── type/               # TypeScript domain and navigation types
│   └── utils/              # User-facing messages and quiz helpers
├── backend/
│   ├── server.js           # Express server
│   └── .env                # Local Firebase Admin configuration; never commit
├── android/                # Android native project
│   └── app/google-services.json # Local Firebase Android config; never commit
├── ios/                    # iOS native project
├── firestore.rules         # Firestore security rules
└── firebase.json           # Firebase CLI configuration
```

Generated directories such as `node_modules`, Android build output, and iOS
Pods should not be edited or committed.

## Requirements

- Node.js `>= 22.11.0`
- npm
- Android Studio and an Android SDK for Android development
- Xcode and CocoaPods for iOS development on macOS
- A Firebase project with Authentication and Firestore enabled
- Firebase CLI for deploying Firestore rules

## Installation

From the repository root:

```powershell
npm install
```

Install backend dependencies:

```powershell
cd backend
npm install
cd ..
```

The backend reads Firebase Admin configuration from `backend/.env`. Copy
`backend/.env.example` to `backend/.env` and fill in the values from a Firebase
service-account key. Never commit or share the completed `.env` file.

The frontend reads its Firebase client values from `frontend/.env` through the
`react-native-dotenv` Babel plugin. Copy `frontend/.env.example` to
`frontend/.env` and fill in the values from the Firebase project settings.
Restart Metro after changing environment values.

## Running the application

### Start the complete development environment

This starts Metro on port `8081` and the backend on port `5000`:

```powershell
npm run dev
```

### Start Metro only

```powershell
npm start
```

### Run the backend only

```powershell
cd backend
npm run dev
```

The backend exposes:

- `GET /` — health check
- `GET /api/quizzes` — returns quizzes from Firestore

### Android

Start an emulator or connect a USB-debugging-enabled device, then run:

```powershell
npm run android
```

On long Windows paths, Android builds may exceed the native path limit. A
temporary drive mapping can be used:

```powershell
subst S: C:\Users\DELL\desktop\projects\SmartQuizApp
Set-Location S:\
npm run android -- --no-packager --device <DEVICE_ID>
subst S: /D
```

### iOS

On macOS:

```sh
bundle install
bundle exec pod install
npm run ios
```

## Firebase setup

1. Create or select a Firebase project.
2. Enable Email/Password under Firebase Authentication.
3. Create a Firestore database.
4. Configure the client values in `frontend/config/firebase.ts`.
5. Copy `backend/.env.example` to `backend/.env` and set the Firebase Admin
   project ID, client email, and private key.
6. Download the Android configuration from Firebase Console and save it as
   `android/app/google-services.json`. A placeholder is available at
   `android/app/google-services.json.template`; replace it with your own
   Firebase project's file after cloning.
7. Deploy the Firestore rules:

```powershell
npx firebase-tools login
npx firebase-tools use <FIREBASE_PROJECT_ID>
npx firebase-tools deploy --only firestore:rules
```

The current rules allow authenticated users to read published quizzes, while
quiz owners can manage their own quizzes and questions. Students can manage
their own enrolled quizzes and attempts.

## Development workflow

- Screens are registered in `frontend/navigation/AppNavigator.tsx`.
- Add new screen route types in `frontend/type/navigation.ts`.
- Reuse components from `frontend/components/common`.
- Use `MessageModal` through the shared status components for user-facing
  errors, warnings, success messages, and confirmations.
- Do not display raw Firebase errors to users; map them to friendly messages
  with `frontend/utils/userMessage.ts`.
- Keep Firestore reads and writes in the existing Firebase/service patterns.

## React Native DevTools

With Metro running, open the React Native developer menu:

- Android device: press `Ctrl+M`, or run `adb shell input keyevent 82`
- Android emulator: press `Ctrl+M`
- iOS simulator: press `Cmd+M`

Choose **Open DevTools** from the developer menu. Metro is available at
`http://localhost:8081`.

## Validation

Type-check the project:

```powershell
npx tsc --noEmit
```

Run the test suite:

```powershell
npm test
```

Build and launch Android:

```powershell
npm run android
```

## Troubleshooting

### Metro or app is using stale code

Stop Metro and restart it with a cleared cache:

```powershell
npx react-native start --reset-cache
```

### Firestore permission denied

Confirm that the user is authenticated, the quiz is published when required,
and the deployed rules belong to the same Firebase project configured in
`frontend/config/firebase.ts`.

### Backend cannot start

Confirm that `backend/.env` exists and contains valid Firebase Admin
configuration. Do not copy credentials into source code or commit them.

### Android build path errors on Windows

Use the temporary `subst` drive mapping described in the Android section and
remove it after the build completes.

### TypeScript reports Jest globals missing

Check that Jest type definitions are installed and included by the project
configuration:

```powershell
npm install
```

## Security

Never commit Firebase Admin credentials, private keys, `.env` files, or other
secrets. If a credential is exposed, revoke it in Firebase/Google Cloud and
generate a replacement immediately.
