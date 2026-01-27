import { Stack } from "expo-router";
import React from "react";
import { ScrollView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ApplyButton from "./_components/ApplyButton";
import LeaveCard from "./_components/LeaveCard";
import LeaveFilters from "./_components/LeaveFilters";
import HeaderTitle from "@/src/components/atoms/HeaderTitle";
const index = () => {
  // const insets = useSafeAreaInsets();

  return (
    <>
      <Stack.Screen
        options={{
          title: "Leave Application",
          headerTitleAlign: "center",
          headerShown:true
        }}
      />
      
      {/* <HeaderTitle title="Leave Application"/> */}
      <View
        // style={{ borderRadius: 10, paddingTop: insets.top }}
        className="flex-1 bg-white "
      >
        <LeaveFilters />

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            padding: 16,
            paddingTop: 24,
            paddingBottom: 120,
          }}
        >
          <LeaveCard status="pending" />
          <LeaveCard status="approved" />
          <LeaveCard status="approved" />
          <LeaveCard status="approved" />
        </ScrollView>

        <ApplyButton />
      </View>
    </>
  );
};

export default index;
