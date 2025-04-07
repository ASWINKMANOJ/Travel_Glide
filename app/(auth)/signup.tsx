import { useAuthProvider } from "@/context/AuthContext";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  StatusBar,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Platform,
  Dimensions,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";

export default function SignUp() {
  const screenWidth = Dimensions.get("screen").width; // Get screen width
  const width = screenWidth * 0.6;
  const router = useRouter();
  const { setUserData } = useAuthProvider();
  const [userName, setUserName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirm, setConfirm] = useState<string>("");
  const [profilePicture, setProfilePicture] = useState<string | null>(null);
  const [error, setError] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  const validatePassword = (password: string) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?!.*(.)\1{2}).{8,}$/;
    if (!regex.test(password)) {
      setError(
        "Password must contain upper, lower, digit, no more than 2 consecutive characters, and be at least 8 characters long."
      );
    } else {
      setError("");
    }
  };

  const handleConfirmPassword = (text: string) => {
    setConfirm(text);
    if (text !== password) {
      setError("Password Must be the same as the one above.");
    } else {
      setError("");
    }
  };

  const handlePasswordChange = (text: string) => {
    setPassword(text);
    validatePassword(text);
  };

  const handleProfilePicture = async () => {
    try {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("Permission to access media library is required!");
        return;
      }
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"], // Updated to use an array of MediaType
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });
      if (!result.canceled) {
        setProfilePicture(result.assets[0].uri);
      }
    } catch (error) {
      alert(
        "Error picking an image: " +
          (error instanceof Error ? error.message : "Unknown error")
      );
    }
  };

  const handleSignUp = async () => {
    if (!userName || !email || !password || !confirm) {
      setError("All fields must be completed.");
      return;
    }
    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }
    try {
      const userData = {
        name: userName,
        profilePhoto: profilePicture,
        email: email,
      };
      await setUserData(userData);
      router.replace("/(auth)/(tabs)");
    } catch (error) {
      alert(error);
    }
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword(!showConfirmPassword);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.scrollContainer}>
        <StatusBar hidden={true} />
        <Text style={styles.title}>Sign Up</Text>
        <TextInput
          style={[styles.input, { width: width }]}
          placeholder="Username"
          value={userName}
          onChangeText={setUserName}
        />
        <TextInput
          style={[styles.input, , { width: width }]}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
        <View style={[styles.inputContainer, { width: width }]}>
          <TextInput
            style={[styles.input, { width: "100%" }]}
            placeholder="Password"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={handlePasswordChange}
          />
          <TouchableOpacity onPress={togglePasswordVisibility}>
            <Ionicons
              name={showPassword ? "eye-off" : "eye"}
              size={24}
              color="gray"
            />
          </TouchableOpacity>
        </View>
        <View style={[styles.inputContainer, { width: width }]}>
          <TextInput
            style={[styles.input, { width: "100%" }]}
            placeholder="Confirm Password"
            secureTextEntry={!showConfirmPassword}
            value={confirm}
            onChangeText={handleConfirmPassword}
          />
          <TouchableOpacity onPress={toggleConfirmPasswordVisibility}>
            <Ionicons
              name={showConfirmPassword ? "eye-off" : "eye"}
              size={24}
              color="gray"
            />
          </TouchableOpacity>
        </View>
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
        <TouchableOpacity
          style={[styles.button, { width: width }]}
          onPress={handleProfilePicture}
        >
          <Text style={styles.buttonText}>Pick Profile Picture</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, , { width: width }]}
          onPress={handleSignUp}
        >
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: "#ffffff",
    paddingVertical: 30,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    marginBottom: 20,
    backgroundColor: "#fff",
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    marginBottom: 20,
  },
  button: {
    width: "100%",
    height: 50,
    backgroundColor: "#2e2e2e",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginBottom: 10,
  },
});
