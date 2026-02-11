import imagePath from "@/src/constraints/imagePath";
import { Stack } from "expo-router";
import React from "react";
import { Image, ScrollView, Text, View } from "react-native";
import { useSelector } from "react-redux";

const details = () => {
  const user = useSelector((state: any) => state.user);
  return (
    <>
      <Stack.Screen
        options={{
          title: "Leave Details",
          headerTitleAlign: "center",
          headerShown: true,
        }}
      />

      <View className="flex-1 bg-gray-100 p-4">
        {/* UserCard info */}
        <View className="bg-white rounded-2xl p-4 flex-row items-center mb-4 mx-2">
          <Image
            source={imagePath.logo1}
            className="w-16 h-16 rounded-full mr-4"
          />

          <View className="flex-1">
            <Text className="text-indigo-900 font-bold ">{user.name}</Text>
            <Text className="text-gray-700 font-bold text-sm numberOfLines={2}">
              {user.college_name}
            </Text>
            <Text className="text-lg text-gray-600 mb-1">
              {user.application_id}
            </Text>
          </View>
        </View>

        {/* Application progress  */}
        <View className="bg-white rounded-2xl p-4 mb-4">
          <Text className="text-lg font-semibold mb-3">
            Application progress
          </Text>

          <View className="flex-row rounded-full overflow-hidden ">
            <View className="flex-1 bg-green-600 ">
              <Text className="text-white text-center font-semibold">
                COMPLETED
              </Text>
            </View>
            <View className="flex-1 bg-green-600  border-l-2 border-white">
              <Text className="text-white text-center font-semibold">
                COMPLETED
              </Text>
            </View>
            <View className="flex-1 bg-green-600  border-l-2 border-white">
              <Text className="text-white text-center font-semibold">
                COMPLETED
              </Text>
            </View>
          </View>

          {/* Date cards */}
          <View className="flex-row justify-between mt-4">
            <View className="bg-indigo-100 rounded-2xl p-3 w-[41%] items-center justify-center">
              <Text className=" font-semibold">From date</Text>
              <Text className=" mt-1">29-Jan-26</Text>
            </View>
            <View className="bg-indigo-100 rounded-2xl p-3 w-[41%] items-center justify-center">
              <Text className=" font-semibold">To date</Text>
              <Text className=" mt-1">31-Jan-26</Text>
            </View>
            <View className="bg-indigo-100 rounded-2xl p-3 w-[15%] items-center justify-center">
              <Text className=" font-semibold">Days</Text>
              <Text className=" mt-1 ">3</Text>
            </View>
          </View>
        </View>

        {/* Leave Details  */}
        <View className="bg-white rounded-2xl p-4 ">
          <Text className="font-bold text-lg ml-3">Applied on</Text>
          <Text className="mb-3 text-gray-600 text-lg">29-Jan-26</Text>

          <Text className="font-bold">Leave type</Text>
          <Text className="mb-3 text-gray-600 text-lg">Both</Text>

          <Text className="font-bold">Leave reason</Text>
          <Text className=" text-gray-600 text-lg">
            I have to go to celebrate festival
          </Text>
        </View>

        {/* Authority Table */}
        <View className="bg-white rounded-2xl overflow-hidden mb-6 mt-4 border  border-gray-400">
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {/* 👇 THIS WIDTH IS REQUIRED */}
            <View style={{ minWidth: 535 }}>
              {/* Header  */}
              <View className="flex-row bg-indigo-800 text-lg p-4 border-b border-gray-600">
                <View className="flex-1">
                  <Text className="text-white font-semibold">Authority</Text>
                </View>

                <View className="flex-1">
                  <Text className="text-white text-center font-semibold">
                    Name
                  </Text>
                </View>

                <View className="flex-1">
                  <Text className="text-white text-center font-semibold">
                    Remark Status
                  </Text>
                </View>
              </View>
              {/* Row 1*/}
              <View className="flex-row  p-4 border-b border-gray-400 ">
                <View className="flex-1  ">
                  <Text className="text-black text-lg ">1 Dean/Principal</Text>
                </View>

                <View className="flex-1">
                  <Text className="text-black text-left text-lg">
                    Dr.MANOJ KAPIL
                  </Text>
                </View>

                <View className="flex-1">
                  <Text className="text-black text-right text-lg mr-3 ">
                    Approved
                  </Text>
                </View>
              </View>

              {/* Row  2*/}
              <View className="flex-row  p-4 border-b border-gray-400">
                <View className="flex-1">
                  <Text className="text-black text-lg">2 Warden</Text>
                </View>

                <View className="flex-1">
                  <Text className="text-black text-left text-lg ml-16">
                    Mr.Bipul Kumar Sing
                  </Text>
                </View>

                <View className="flex-1">
                  <Text className="text-black text-right text-lg mr-3">
                    Approved
                  </Text>
                </View>
              </View>

              {/* Row  */}
              <View className="flex-row  p-3 border-b border-gray-400">
                <View className="flex-1">
                  <Text className="text-black text-lg">3 Cheif-Warden</Text>
                </View>

                <View className="flex-1">
                  <Text className="text-black text-left text-lg ml-5">
                    Mr.NARESH KUMAR
                  </Text>
                </View>

                <View className="flex-1">
                  <Text className="text-black text-right text-lg mr-3">
                    Approved
                  </Text>
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    </>
  );
};

export default details;
