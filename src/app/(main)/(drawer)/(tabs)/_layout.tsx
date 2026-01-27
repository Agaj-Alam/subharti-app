import { View, Text,Image } from "react-native";
import React from "react";
import { Tabs } from "expo-router/tabs";
import { Ionicons } from "@expo/vector-icons";
import imagePath from "@/src/constraints/imagePath";

const _layout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: 70,
          paddingBottom: 10,
          marginBottom: 23,
        },
        tabBarActiveTintColor: "#4f46e5",
      }}
    >
       <Tabs.Screen
        name="payment"
        options={{
          title: "Payment",
          tabBarIcon: () => (
            <Image
              source={imagePath.payment}
              className="w-8 h-9"
              resizeMode='stretch'
            />
          ),
        }}
      />
      <Tabs.Screen
        name="learn"
        options={{
          title: "Learn",
          tabBarIcon: () => (
            <Image
              source={imagePath.learn}
              className="w-11 h-11"
              resizeMode='stretch'
            />
          ),
        }}
      />
      <Tabs.Screen
       name="index"
        options={{ 
          title: "" ,
          tabBarIcon:()=>(
            <View className="bg-indigo-700 w-16 h-16 rounded-full items-center justify-center -mt-8">
              <Ionicons name="home" size={28} color="white" />
            </View>
          )
          }} />
      <Tabs.Screen
       name="exam"
        options={{
           title: "Exam" ,
           tabBarIcon: () => (
            <Image
              source={imagePath.exam}
              className="w-11 h-11"
              resizeMode='stretch'
            />
          ),
           }}
          />
      <Tabs.Screen
       name="profile" 
       options={{
         title: "Profile",
         tabBarIcon: () => (
            <Image
              source={imagePath.profile}
              className="w-8 h-9"
              resizeMode='stretch'
            />
          ),
          }} />
    </Tabs>
  );
};

export default _layout;
