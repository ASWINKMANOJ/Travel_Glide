import { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  StatusBar,
  TextInput,
  Image,
  Dimensions,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";

export default function Login() {
  const screenWidth = Dimensions.get("screen").width; // Get screen width
  const width = screenWidth * 0.6; // Adjusted image size
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  const validatePassword = (password: string) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?!.*(.)\1{2}).{8,}$/;
    if (!regex.test(password)) {
      setPasswordError(
        "Password must contain upper, lower, digit, no more than 2 consecutive characters, and be at least 8 characters long."
      );
    } else {
      setPasswordError("");
    }
  };

  const handlePasswordChange = (text: string) => {
    setPassword(text);
    validatePassword(text);
  };

  const handleLoginPress = () => {
    if (passwordError) {
      alert("Please fix the password error before proceeding.");
      return;
    }
    router.replace("/(auth)/(tabs)");
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.scrollContainer}>
        <StatusBar hidden={true} />
        <View style={styles.imageContainer}>
          <Image
            source={require("../../assets/images/adaptive-icon.png")}
            style={{ width: width, height: width, resizeMode: "contain" }}
          />
        </View>
        <View style={styles.loginContainer}>
          <TextInput
            style={[styles.loginInputs, { width: screenWidth * 0.8 }]}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            importantForAutofill="no"
            autoComplete="off"
          />
          <View
            style={[styles.passwordContainer, { width: screenWidth * 0.8 }]}
          >
            <TextInput
              style={styles.passwordInput}
              placeholder="Password"
              secureTextEntry={!passwordVisible}
              value={password}
              onChangeText={handlePasswordChange}
              importantForAutofill="no"
              autoComplete="off"
            />
            <TouchableOpacity
              onPress={() => setPasswordVisible(!passwordVisible)}
            >
              <Ionicons
                name={passwordVisible ? "eye" : "eye-off"}
                size={24}
                color="gray"
              />
            </TouchableOpacity>
          </View>
          {passwordError ? (
            <Text style={styles.errorText}>{passwordError}</Text>
          ) : null}
          <TouchableOpacity
            style={[styles.loginButton, { width: screenWidth * 0.8 }]}
            onPress={handleLoginPress}
          >
            <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>
          <View style={styles.forgotPasswordContainer}>
            <Text>forgot password ?</Text>
            <Link style={styles.signUpLink} href={"/(auth)/signup"}>
              Sign Up
            </Link>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    paddingHorizontal: 20,
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  loginContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  loginInputs: {
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 20,
    backgroundColor: "#fff", // Removed to avoid yellow shade
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingHorizontal: 10,
    // backgroundColor: "#fff", // Removed to avoid yellow shade
    height: 50,
  },
  passwordInput: {
    flex: 1,
    height: "100%",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 5,
  },
  loginButton: {
    height: 50,
    backgroundColor: "#2e2e2e",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginTop: 20,
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  forgotPasswordContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  signUpLink: {
    color: "#007BFF",
    fontWeight: "bold",
  },
});
