import {
  createContext,
  useContext,
  useState,
  useEffect,
  type PropsWithChildren,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface AuthContextType {
  userData: { name: string; profilePhoto: string } | null;
  loading: boolean;
  isLoggedIn: boolean;
  onboard: boolean;
  setUserData: (data: { name: string; profilePhoto: string }) => Promise<void>;
  setOnboardComplete: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function useAuthProvider() {
  const value = useContext(AuthContext);

  if (!value) {
    throw new Error("useAuthProvider must be wrapped in a <AuthProvider/>");
  }
  return value;
}

export function AuthProvider({ children }: PropsWithChildren) {
  const [userData, setUserDataState] = useState<{
    name: string;
    profilePhoto: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [onboard, setOnboard] = useState(false);

  const isLoggedIn = !!userData;

  useEffect(() => {
    const loadUserData = async () => {
      setLoading(true);
      try {
        const storedUserData = await AsyncStorage.getItem("userProfile");
        const storedOnboard = await AsyncStorage.getItem("@onboarded");
        if (!!storedOnboard) {
          setOnboard(storedOnboard === "true");
        }
        if (storedUserData) {
          setUserDataState(JSON.parse(storedUserData));
        }
      } catch (error) {
        console.error("Failed to load user data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadUserData();
  }, []);

  const setUserData = async (data: { name: string; profilePhoto: string }) => {
    try {
      await AsyncStorage.setItem("userProfile", JSON.stringify(data));
      setUserDataState(data);
    } catch (error) {
      console.error("Failed to save user data:", error);
    }
  };

  const setOnboardComplete = async () => {
    try {
      await AsyncStorage.setItem("@onboarded", "true");
      setOnboard(true);
    } catch (error) {
      console.error("Failed to set onboarding status:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        userData,
        loading,
        isLoggedIn,
        onboard,
        setUserData,
        setOnboardComplete,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
