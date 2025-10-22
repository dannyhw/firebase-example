```
bunx create-expo-app@latest
bunx expo install expo-dev-client
bunx expo install @react-native-firebase/app @react-native-firebase/auth @react-native-firebase/crashlytics

# Note once you have completed the steps below make sure to run bun run expo prebuild and then use run ios to build the app. (or use eas)
# bun run expo prebuild
```

inside firebase console add a ios and android app and download the google-services.json and GoogleService-Info.plist

in app.json add the following:

```json
  "android": {
      "googleServicesFile": "./google-services.json",
      "package": "com.mycorp.myapp"
    },
  "ios": {
      "googleServicesFile": "./GoogleService-Info.plist",
      "bundleIdentifier": "com.mycorp.myapp"
  },
  "plugins": [
      "@react-native-firebase/app",
      "@react-native-firebase/auth",
      "@react-native-firebase/crashlytics",
      [
        "expo-build-properties",
        {
          "ios": {
            "useFrameworks": "static",
              "forceStaticLinking": [
              "RNFBApp",
              "RNFBAuth",
              "RNFBCrashlytics"
            ]
          }
        }
      ]
    ],
```

Note I didn't include my google service files in this repo.
Make sure to enable the features you are going to use (for example anonymous auth)
