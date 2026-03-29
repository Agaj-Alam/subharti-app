import { View, Text, Image } from "react-native";
import React from "react";
import imagePath from "@/src/constraints/imagePath";
import { useSelector } from "react-redux";

const ProfileDetails = () => {
  const user = useSelector((state: any) => state.user);

  return (
    <View className="flex-row mt-8 ml-8">
      <View>
        <Image
          source={imagePath.logo1}
          className="w-16 h-16 rounded-full p-4"
        />
      </View>
      <View className="ml-8">
        <Text className="font-bold text-indigo-900">{user.name}</Text>
        <Text className="text-gray-600">E.No:</Text>
        <Text className="text-gray-600">Course:{user.course}</Text>
      </View>
    </View>
  );
};

export default ProfileDetails;
