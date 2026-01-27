import { View, Text,TouchableOpacity } from "react-native";
import React from "react";
import {useRouter} from "expo-router"
type Props = {
  status: "pending" | "approved";
};
const LeaveCard = ({ status }: Props) => {
  const router=useRouter();
  const isPending = status == "pending";
  return (
     <TouchableOpacity
     activeOpacity={0.4}
     onPress={()=>router.push("/leave/details")}
      className={`rounded-2xl p-4 mb-4 border ${
        isPending
          ? "bg-orange-50 border-orange-200"
          : "bg-green-50 border-green-200"
      }`}
    >
      {/* Top row */}
      <View className="flex-row justify-between items-center mb-3">
        <Text className="text-lg font-bold text-gray-900">
          HLA43308
        </Text>

        <View
          className={`px-4 py-1 rounded-full ${
            isPending
              ? "bg-orange-600"
              : "bg-green-600"
          }`}
        >
          <Text className="text-white text-sm font-medium">
            {isPending ? "Pending" : "Approved"}
          </Text>
        </View>
      </View>

      {/* Date */}
      <View className="flex-row items-center mb-2">
        <Text className="text-gray-600 text-sm">
          📅 10-Dec-25 to 12-Dec-25
        </Text>
      </View>

      {/* Authority */}
      <Text className="text-gray-700 font-medium">
        Rep. Authority:
      </Text>
    </TouchableOpacity>
  );
};

export default LeaveCard;


