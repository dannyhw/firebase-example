import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import crashlytics from "@react-native-firebase/crashlytics";
import {
  FirebaseAuthTypes,
  getAuth,
  onAuthStateChanged,
  signInAnonymously,
} from "@react-native-firebase/auth";

const signIn = () => {
  signInAnonymously(getAuth())
    .then(() => {
      console.log("User signed in anonymously");
    })
    .catch((error) => {
      if (error.code === "auth/operation-not-allowed") {
        console.log("Enable anonymous in your firebase console.");
      }

      console.error(error);
    });
};

export default function App() {
  useEffect(() => {
    crashlytics().log("App mounted.");
  }, []);

  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);

  useEffect(() => {
    const subscriber = onAuthStateChanged(
      getAuth(),
      (user: FirebaseAuthTypes.User | null) => {
        if (user) {
          setUser(user);
        } else {
          setUser(null);
        }
        if (initializing) setInitializing(false);
      }
    );
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  if (!user) {
    return (
      <View style={styles.container}>
        <Button title="Sign In" onPress={signIn} />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <Text>Welcome anonymous user</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
