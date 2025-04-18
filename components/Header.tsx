import React from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useFonts } from "expo-font";
import Feather from "@expo/vector-icons/Feather";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuthProvider } from "../context/AuthContext";

const Header: React.FC = () => {
  const router = useRouter();
  const { userData } = useAuthProvider();

  const handleNav = async () => {
    try {
      await AsyncStorage.clear();
      console.log("AsyncStorage cleared");
      router.replace("/(auth)/onboard");
    } catch (error) {
      console.error("Error clearing AsyncStorage:", error);
    }
  };

  const [fontsLoaded] = useFonts({
    "Montserrat-SemiBold": require("../assets/fonts/Montserrat-SemiBold.ttf"),
    "Montserrat-Thin": require("../assets/fonts/Montserrat-Thin.ttf"),
    "Montserrat-Regular": require("../assets/fonts/Montserrat-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <View>
          <Text style={styles.profileText}>
            Hello{" "}
            {userData?.name
              ? userData?.name.charAt(0).toUpperCase() + userData?.name.slice(1)
              : "User"}
            ,
          </Text>
          <Text style={{ fontFamily: "Montserrat-Regular", color: "#5F5F5F" }}>
            Welcome to TripGlide
          </Text>
        </View>
        <View style={styles.profileIcon}>
          <TouchableOpacity onLongPress={handleNav}>
            <Image
              source={
                userData?.profilePhoto
                  ? { uri: userData.profilePhoto }
                  : require("../assets/images/profile.png")
              }
              style={{ width: "100%", height: "100%" }}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.searchBar}>
        <Pressable
          style={{ ...styles.searchBarIcon, backgroundColor: "transparent" }}
        >
          <Feather name="search" size={24} color="#212529" />
        </Pressable>
        <TextInput
          style={{ flex: 1, paddingHorizontal: 8, fontSize: 16 }}
          placeholder="Search"
        />
        <Pressable style={styles.searchBarIcon}>
          <Feather name="list" size={24} color="white" />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 22,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  profileIcon: {
    height: 60,
    aspectRatio: 1,
    borderRadius: 30,
    overflow: "hidden",
    backgroundColor: "#eddffe",
    elevation: 5,
  },
  profileContainer: {
    height: 100,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  profileText: {
    fontSize: 28,
    fontFamily: "Montserrat-SemiBold",
    color: "#212529",
  },
  searchBar: {
    borderRadius: 30,
    width: "100%",
    height: 60,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    marginVertical: 6,
    elevation: 10,
    backgroundColor: "#fefefe",
  },
  searchBarIcon: {
    height: 60,
    aspectRatio: 1,
    borderRadius: 30,
    backgroundColor: "#212529",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Header;
