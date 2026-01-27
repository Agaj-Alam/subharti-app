import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";

import { loginUser } from "../../redux/auth/authSlice";

export default function Login() {
  const dispatch = useDispatch<any>();
  const router = useRouter();

  const { user, loading, error } = useSelector((state: any) => state.auth);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    dispatch((loginUser as any)({ username, password }));
  };

  useEffect(() => {
    if (user) {
      router.replace("/(main)/(drawer)/(tabs)");
    }
  }, [user]);

  return (
    <ImageBackground
      // source={require("../../assets/images/university.jpg")}
      className="flex-1 justify-center"
    >
      {/* Dark overlay */}
      <View className="absolute inset-0 bg-black/40" />

      {/* Card */}
      <View className="mx-5 rounded-3xl bg-white px-6 py-8">
        <Text className="mb-6 text-center text-xl font-semibold">
          Student
        </Text>

        {/* Student ID */}
        <TextInput
          placeholder="Student ID or Enrollment No."
          placeholderTextColor="#9ca3af"
          value={username}
          onChangeText={setUsername}
          className="mb-4 rounded-xl border border-gray-300 px-4 py-4 text-base"
        />

        {/* Password */}
        <View className="mb-6 flex-row items-center rounded-xl border border-gray-300 px-4">
          <TextInput
            placeholder="Password (DOB: DDMMYYYY)"
            placeholderTextColor="#9ca3af"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
            className="flex-1 py-4 text-base"
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Ionicons
              name={showPassword ? "eye-off-outline" : "eye-outline"}
              size={22}
              color="#6b7280"
            />
          </TouchableOpacity>
        </View>

        {/* Login Button */}
        <TouchableOpacity
          onPress={handleLogin}
          className="rounded-xl bg-indigo-800 py-4"
        >
          <Text className="text-center text-base font-semibold text-white">
            {loading ? "Logging in..." : "Login as Student"}
          </Text>
        </TouchableOpacity>

        {error && (
          <Text className="mt-3 text-center text-red-500">
            {error}
          </Text>
        )}
      </View>

      {/* Footer */}
      <View className="absolute bottom-8 w-full items-center">
        <Text className="text-blue-500">Privacy Policy</Text>
        <Text className="mt-1 text-gray-300">Version 2.1.0</Text>
      </View>
    </ImageBackground>
  );
}


//username and password as enroll and dob 
//username: emilys
// password: emilyspass
