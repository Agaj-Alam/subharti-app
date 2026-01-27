import { View, Text, Image, TouchableOpacity,ScrollView } from "react-native";

const filters = ["All", "Pending", "Approved", "Rejected", "Cancelled","Accepted"];

const LeaveFilters = () => {
  return (
    <View  className="  min-h-30 start-5">
      <View className="bg-white rounded-3xl pt-3 shadow-sm">
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          {filters.map((item, index) => (
            <TouchableOpacity
              key={item}
              className={`px-5 py-2 mr-3 rounded-full ${
                index === 0
                  ? "bg-indigo-800"
                  : "bg-gray-200"
              }`}
            >
              <Text
                className={`font-medium ${
                  index === 0
                    ? "text-white"
                    : "text-gray-700"
                }`}
              >
                {item}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};
export default LeaveFilters;
