import { Stack } from "expo-router";
import React, { useState } from "react";
import {
  View, Text, ScrollView, TouchableOpacity, TextInput, Platform, Modal,
} from "react-native";
import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";

const DROPDOWN_OPTIONS = {
  dean: [
    "Prof. Subhash Chandra Tiwari",
    "Dr. Manoj Kapil",
    "Dr. Ravindra Kumar Jain",
  ],
  warden: ["Mr. Bipul Kumar Singh"],
  chiefWarden: ["Mr. Naresh Kumar"],
};

const FloatingLabelBox = ({
  label, children, required = false,
}: {
  label: string; children: React.ReactNode; required?: boolean;
}) => (
  <View className="border border-gray-300 rounded-xl px-4 pt-5 pb-3 bg-white mt-1 relative">
    <Text className="absolute -top-2.5 left-3 bg-white px-1 text-xs text-gray-500 font-bold">
      {label}{required && <Text className="text-red-500"> *</Text>}
    </Text>
    {children}
  </View>
);

type DropdownKey = "dean" | "warden" | "chiefWarden" | null;

const DropdownModal = ({
  visible, options, onSelect, onClose,
}: {
  visible: boolean;
  options: string[];
  onSelect: (val: string) => void;
  onClose: () => void;
}) => (
  <Modal transparent animationType="fade" visible={visible} onRequestClose={onClose}>
    <TouchableOpacity
      className="flex-1 bg-black/40 justify-center px-8"
      activeOpacity={1}
      onPress={onClose}
    >
      <View className="bg-white rounded-2xl overflow-hidden">
        {options.map((option, index) => (
          <TouchableOpacity
            key={index}
            className={`px-5 py-4 ${index !== options.length - 1 ? "border-b border-gray-100" : ""}`}
            onPress={() => onSelect(option)}
          >
            <Text className="text-sm text-gray-800">{option}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </TouchableOpacity>
  </Modal>
);

const formatDate = (date: Date) => {
  const day = String(date.getDate()).padStart(2, "0");
  const month = date.toLocaleString("en-GB", { month: "short" });
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

const getDatesInRange = (start: Date, end: Date) => {
  const dates: Date[] = [];
  const current = new Date(start);
  while (current <= end) {
    dates.push(new Date(current));
    current.setDate(current.getDate() + 1);
  }
  return dates;
};

const ApplyLeave = () => {
  const [leaveType, setLeaveType] = useState<"Hostel" | "College" | "Both">("Hostel");
  const [reason, setReason] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState<"start" | "end" | null>(null);

  const [openDropdown, setOpenDropdown] = useState<DropdownKey>(null);
  const [dean, setDean] = useState("");
  const [warden, setWarden] = useState("");
  const [chiefWarden, setChiefWarden] = useState("");

  const leaveTypes = ["Hostel", "College", "Both"] as const;

  // When leave type changes, reset fields that are no longer shown
  const handleLeaveTypeChange = (type: "Hostel" | "College" | "Both") => {
    setLeaveType(type);
    if (type === "College") {
      setWarden("");
      setChiefWarden("");
    }
  };

  const isCollegeOnly = leaveType === "College";

  const handleDateChange = (event: DateTimePickerEvent, selected?: Date) => {
    if (event.type === "dismissed") { setShowPicker(null); return; }
    if (!selected) return;
    if (showPicker === "start") {
      setStartDate(selected);
      if (selected > endDate) setEndDate(selected);
    } else {
      setEndDate(selected < startDate ? startDate : selected);
    }
    if (Platform.OS === "android") setShowPicker(null);
  };

  const dateRows = getDatesInRange(startDate, endDate);
  const totalDays = dateRows.length;

  return (
    <>
      <Stack.Screen
        options={{
          title: "Apply Leave",
          headerTitleAlign: "center",
          headerShown: true,
        }}
      />

      <DropdownModal
        visible={openDropdown !== null}
        options={openDropdown ? DROPDOWN_OPTIONS[openDropdown] : []}
        onSelect={(val) => {
          if (openDropdown === "dean") setDean(val);
          else if (openDropdown === "warden") setWarden(val);
          else if (openDropdown === "chiefWarden") setChiefWarden(val);
          setOpenDropdown(null);
        }}
        onClose={() => setOpenDropdown(null)}
      />

      <ScrollView
        className="flex-1 bg-gray-100"
        contentContainerClassName="p-4 gap-y-2"
        showsVerticalScrollIndicator={false}
      >
        {/* Leave Type */}
        <View className="bg-white rounded-2xl p-4 border border-gray-200 mb-3">
          <Text className="text-center font-medium text-lg text-gray-800 mb-5">
            Leave Type
          </Text>
          <View className="flex-row justify-around">
            {leaveTypes.map((type) => (
              <TouchableOpacity
                key={type}
                className="items-center gap-y-1.5"
                onPress={() => handleLeaveTypeChange(type)}
              >
                <View className="w-5 h-5 rounded-full border-2 border-black items-center justify-center">
                  {leaveType === type && (
                    <View className="w-2.5 h-2.5 rounded-full bg-green-500" />
                  )}
                </View>
                <Text className="text-xl text-gray-800 mb-3">{type}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Date Pickers */}
        <View className="bg-white rounded-xl p-4 border border-gray-200">
          <View className="flex-row items-end gap-x-2">
            <View className="flex-1">
              <Text className="font-bold text-lg text-gray-800 mb-2">Start Date</Text>
              <TouchableOpacity
                className="border border-gray-300 rounded-lg px-3 py-2.5"
                onPress={() => setShowPicker("start")}
              >
                <Text className="text-lg font-semibold mb-3 text-gray-700">{formatDate(startDate)}</Text>
              </TouchableOpacity>
            </View>
            <Text className="text-gray-400 text-base pb-2.5">-</Text>
            <View className="flex-1">
              <Text className="font-bold text-lg text-gray-800 mb-2">End Date</Text>
              <TouchableOpacity
                className="border border-gray-300 rounded-lg px-3 py-2.5"
                onPress={() => setShowPicker("end")}
              >
                <Text className="text-lg font-semibold mb-3 text-gray-700">{formatDate(endDate)}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {showPicker && (
          <DateTimePicker
            value={showPicker === "start" ? startDate : endDate}
            mode="date"
            display={Platform.OS === "ios" ? "inline" : "default"}
            minimumDate={showPicker === "end" ? startDate : undefined}
            onChange={handleDateChange}
          />
        )}

        {/* Leave Table */}
        <View className="rounded-xl overflow-hidden border border-gray-200 mt-3">
          <View className="bg-indigo-800 flex-row px-4 py-2.5">
            <Text className="flex-1 text-white text-base font-medium ">Leave Date</Text>
            <Text className="flex-1 text-white text-base font-medium text-center">Leave Type</Text>
            <Text className="flex-1 text-white text-base font-medium text-right">Total</Text>
          </View>
          {dateRows.map((date, index) => (
            <View
              key={index}
              className={`flex-row items-center px-4 py-2.5 ${index % 2 === 0 ? "bg-white" : "bg-gray-50"}`}
            >
              <Text className="flex-1 text-base text-gray-800">{formatDate(date)}</Text>
              <View className="flex-1 items-center">
                <View className="bg-indigo-800 rounded-full px-3 py-1">
                  <Text className="text-white text-base">{leaveType}</Text>
                </View>
              </View>
              <Text className="flex-1 text-base text-gray-800 text-right">1.0</Text>
            </View>
          ))}
        </View>

          <View className="bg-white mt-3 p-4 py-6 rounded-2xl gap-y-5">
        {/* Total Days */}
        <FloatingLabelBox label="Total days">
          <Text className="text-lg text-gray-800">{totalDays}</Text>
        </FloatingLabelBox>

        {/* Dean/Principal — always shown */}
        <FloatingLabelBox label="Dean/Principal authority" required>
          <TouchableOpacity
            className="flex-row justify-between items-center"
            onPress={() => setOpenDropdown("dean")}
          >
            <Text className={`text-lg font-bold flex-1 mr-2 ${dean ? "text-gray-800" : "text-gray-400"}`}>
              {dean || "--Select--"}
            </Text>
            <Text className="text-gray-500 text-lg">▼</Text>
          </TouchableOpacity>
        </FloatingLabelBox>

        {/* Warden — hidden for College only */}
        {!isCollegeOnly && (
          <FloatingLabelBox label="Warden Approval" required>
            <TouchableOpacity
              className="flex-row justify-between items-center"
              onPress={() => setOpenDropdown("warden")}
            >
              <Text className={`text-lg font-bold flex-1 mr-2 ${warden ? "text-gray-800" : "text-gray-400"}`}>
                {warden || "--Select--"}
              </Text>
              <Text className="text-gray-500 text-lg">▼</Text>
            </TouchableOpacity>
          </FloatingLabelBox>
        )}

        {/* Chief Warden — hidden for College only */}
        {!isCollegeOnly && (
          <FloatingLabelBox label="Chief-Warden Approval" required>
            <TouchableOpacity
              className="flex-row justify-between items-center"
              onPress={() => setOpenDropdown("chiefWarden")}
            >
              <Text className={`text-lg font-bold flex-1 mr-2 ${chiefWarden ? "text-gray-800" : "text-gray-400"}`}>
                {chiefWarden || "--Select--"}
              </Text>
              <Text className="text-gray-500 text-lg">▼</Text>
            </TouchableOpacity>
          </FloatingLabelBox>
        )}

        {/* Leave Reason */}
        <FloatingLabelBox label="Leave Reason" required >
          <TextInput
            className="text-lg font-bold text-gray-800"
            style={{ minHeight: 160 }}   // ✅ more vertical space
            placeholder="Write a detailed reason"
            placeholderTextColor="#9ca3af"
            multiline
            numberOfLines={8}
            value={reason}
            onChangeText={setReason}
            textAlignVertical="top"
          />
        </FloatingLabelBox>

        {/* Attachment */}
        <TouchableOpacity className="flex-row items-center gap-x-2 bg-gray-200 rounded-full px-5 py-2.5 self-center">
          <Text className="text-sm">📎</Text>
          <Text className="text-sm text-indigo-800 font-medium">
            Attachment Image (Optional)
          </Text>
        </TouchableOpacity>

        {/* Submit */}
        <TouchableOpacity className="bg-indigo-800 rounded-xl py-4 items-center mb-4">
          <Text className="text-white text-base font-medium">Submit application</Text>
        </TouchableOpacity>

        </View>
      </ScrollView>
    </>
  );
};

export default ApplyLeave;



// import { Stack } from "expo-router";
// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   ScrollView,
//   TouchableOpacity,
//   TextInput,
//   Platform,
//   Modal,
//   Alert,
// } from "react-native";
// import DateTimePicker, {
//   DateTimePickerEvent,
// } from "@react-native-community/datetimepicker";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// const BASE_URL = "http://YOUR_IP:8080";

// // 🔥 API
// const applyLeaveApi = async (data: any) => {
//   const token = await AsyncStorage.getItem("token");

//   const response = await fetch(`${BASE_URL}/leave/apply`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${token}`,
//     },
//     body: JSON.stringify(data),
//   });

//   let result = {};
//   try {
//     result = await response.json();
//   } catch {
//     throw new Error("Server error");
//   }

//   if (!response.ok) {
//     throw new Error((result as any).error || "Failed");
//   }

//   return result;
// };

// const ApplyLeave = () => {
//   const [leaveType, setLeaveType] = useState("Hostel");
//   const [reason, setReason] = useState("");
//   const [startDate, setStartDate] = useState(new Date());
//   const [endDate, setEndDate] = useState(new Date());
//   const [showPicker, setShowPicker] = useState<any>(null);

//   const [dean, setDean] = useState("");
//   const [warden, setWarden] = useState("");
//   const [chiefWarden, setChiefWarden] = useState("");

//   const handleSubmit = async () => {
//     try {
//       const payload = {
//         leaveType,
//         startDate: startDate.toISOString().split("T")[0],
//         endDate: endDate.toISOString().split("T")[0],
//         reason,
//         deanName: dean,
//         wardenName: leaveType === "College" ? null : warden,
//         chiefWardenName: leaveType === "College" ? null : chiefWarden,
//       };

//       await applyLeaveApi(payload);
//       Alert.alert("Success", "Leave applied successfully");
//     } catch (err: any) {
//       Alert.alert("Error", err.message);
//     }
//   };

//   return (
//     <>
//       <Stack.Screen options={{ title: "Apply Leave" }} />

//       <ScrollView className="flex-1 bg-gray-100 p-4">

//         {/* Leave Type */}
//         <View className="bg-white rounded-2xl p-4 mb-3">
//           <Text className="text-center text-lg mb-4">Leave Type</Text>

//           <View className="flex-row justify-around">
//             {["Hostel", "College", "Both"].map((type) => (
//               <TouchableOpacity
//                 key={type}
//                 onPress={() => setLeaveType(type)}
//               >
//                 <Text>{type}</Text>
//               </TouchableOpacity>
//             ))}
//           </View>
//         </View>

//         {/* Dates */}
//         <TouchableOpacity onPress={() => setShowPicker("start")}>
//           <Text>Start: {startDate.toDateString()}</Text>
//         </TouchableOpacity>

//         <TouchableOpacity onPress={() => setShowPicker("end")}>
//           <Text>End: {endDate.toDateString()}</Text>
//         </TouchableOpacity>

//         {showPicker && (
//           <DateTimePicker
//             value={showPicker === "start" ? startDate : endDate}
//             mode="date"
//             onChange={(e, d) => {
//               if (!d) return;
//               if (showPicker === "start") setStartDate(d);
//               else setEndDate(d);
//               setShowPicker(null);
//             }}
//           />
//         )}

//         {/* Reason */}
//         <TextInput
//           placeholder="Enter reason"
//           value={reason}
//           onChangeText={setReason}
//           className="border p-3 mt-3 bg-white rounded-xl"
//         />

//         {/* Submit */}
//         <TouchableOpacity
//           onPress={handleSubmit}
//           className="bg-indigo-800 rounded-xl py-4 mt-5"
//         >
//           <Text className="text-white text-center">
//             Submit application
//           </Text>
//         </TouchableOpacity>

//       </ScrollView>
//     </>
//   );
// };

// export default ApplyLeave;