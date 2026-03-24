// import React from "react";
// import { Dimensions, Text, View } from "react-native";
// import { Gesture, GestureDetector } from "react-native-gesture-handler";
// import Animated, {
//   runOnJS,
//   useAnimatedStyle,
//   useSharedValue,
//   withSpring,
// } from "react-native-reanimated";

// const SCREEN_WIDTH = Dimensions.get("window").width;
// const PILL_WIDTH = SCREEN_WIDTH * 0.85;
// const KNOB_SIZE = 70;
// const MAX_X = PILL_WIDTH - KNOB_SIZE;

// export default function SOSSlider(){
//   const CENTER = MAX_X / 2;

//   // 🔵 Start from center
//   const translateX = useSharedValue<number>(CENTER);

//   // 🔥 Action handler
//   const triggerAction = (pos: number) => {
//     if (pos < MAX_X * 0.3) {
//       console.log("🚨 ALERT TRIGGERED");
//     } else if (pos > MAX_X * 0.7) {
//       console.log("📞 CALLING TRIGGERED");
//     } else {
//       console.log("🆘 SOS TRIGGERED");
//     }
//   };

//   // 👉 Gesture
//   const panGesture = Gesture.Pan()
//     .onUpdate((e) => {
//       let newX = e.translationX + CENTER;

//       if (newX < 0) newX = 0;
//       if (newX > MAX_X) newX = MAX_X;

//       translateX.value = newX;
//     })
//     .onEnd(() => {
//       // 🔥 trigger based on final position
//       runOnJS(triggerAction)(translateX.value);

//       // 🔁 always return to center
//       translateX.value = withSpring(CENTER, {
//         damping: 15,
//         stiffness: 150,
//       });
//     });

//   // 🎨 Knob movement
//   const knobStyle = useAnimatedStyle(() => ({
//     transform: [{ translateX: translateX.value }],
//   }));

//   // 🎨 Blue fill animation
//   const fillStyle = useAnimatedStyle(() => {
//     return {
//       width: translateX.value + KNOB_SIZE / 2,
//     };
//   });

//   return (
//     <View className="items-center mt-8">
//       {/* PILL */}
//       <View
//         style={{ width: PILL_WIDTH }}
//         className="h-16 bg-white rounded-full border border-blue-700 justify-center overflow-hidden"
//       >
//         {/* 🔵 BLUE FILL */}
//         <Animated.View
//           style={fillStyle}
//           className="absolute left-0 h-full bg-blue-500 rounded-full"
//         />

//         {/* TEXT */}
//         <View className="absolute w-full flex-row justify-between px-6">
//           <Text className="text-red-600 font-semibold">Alert</Text>
//           <Text className="text-red-600 font-semibold">Calling</Text>
//         </View>

//         {/* KNOB */}
//         <GestureDetector gesture={panGesture}>
//           <Animated.View
//             style={[
//               knobStyle,
//               {
//                 width: KNOB_SIZE,
//                 height: KNOB_SIZE,
//                 borderRadius: KNOB_SIZE / 2,
//               },
//             ]}
//             className="absolute bg-white border-4 border-blue-700 items-center justify-center shadow-lg"
//           >
//             <Text className="text-red-600 font-bold text-lg">SOS</Text>
//           </Animated.View>
//         </GestureDetector>
//       </View>
//     </View>
//   );
// }

import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { Dimensions, Text, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

const SCREEN_WIDTH = Dimensions.get("window").width;
const PILL_WIDTH = SCREEN_WIDTH * 0.85;
const KNOB_SIZE = 70;
const MAX_X = PILL_WIDTH - KNOB_SIZE;

export default function SOSSlider() {
  const CENTER = MAX_X / 2;

  // 🔵 Start from center
  const translateX = useSharedValue(CENTER);

  // 🔥 Action handler
  const triggerAction = (pos: number) => {
    // if (pos < MAX_X * 0.3) {
    //   console.log("🚨 ALERT TRIGGERED");
    // } else if (pos > MAX_X * 0.7) {
    //   console.log("📞 CALLING TRIGGERED");
    // } else {
    //   console.log("🆘 SOS TRIGGERED");
    // }
  };

  // 👉 Gesture
  const panGesture = Gesture.Pan()
    .onUpdate((e) => {
      let newX = e.translationX + CENTER;

      if (newX < 0) newX = 0;
      if (newX > MAX_X) newX = MAX_X;

      translateX.value = newX;
    })
    .onEnd(() => {
      runOnJS(triggerAction)(translateX.value);

      // 🔁 Always return to center
      translateX.value = withSpring(CENTER, {
        damping: 15,
        stiffness: 150,
      });
    });

  // 🎨 Knob style
  const knobStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  // 🎨 Directional Fill (FIXED)
  const fillStyle = useAnimatedStyle(() => {
    if (translateX.value < CENTER) {
      // 👉 LEFT SIDE
      return {
        left: translateX.value,
        width: CENTER - translateX.value + KNOB_SIZE / 2,
        backgroundColor: "#2f2fa2",
      };
    } else if (translateX.value > CENTER) {
      // 👉 RIGHT SIDE
      return {
        left: CENTER + KNOB_SIZE / 2,
        width: translateX.value - CENTER,
        backgroundColor: "#2f2fa2",
      };
    } else {
      return {
        width: 0,
      };
    }
  });

  return (
    <View className="items-center mt-8">
      {/* PILL */}
      <View
        style={{ width: PILL_WIDTH }}
        className="h-16 bg-white rounded-full border border-blue-700 justify-center "
      >
        {/* 🔵 DYNAMIC FILL */}
        <Animated.View
          style={fillStyle}
          className="absolute h-full rounded-full"
        />

        {/* TEXT */}
        <View className="absolute w-full flex-row justify-between px-6 ">
          <View className="flex-row items-center gap-1">
            <Text className="text-red-600 font-semibold text-lg">Alert</Text>
            <MaterialIcons name="add-alert" size={22} color="red" />
          </View>

          <View className="flex-row items-center gap-1">
            <Text className="text-red-600 font-semibold text-lg">Calling</Text>
            <MaterialIcons name="add-call" size={22} color="red" />
          </View>
        </View>

        {/* KNOB */}
        <GestureDetector gesture={panGesture}>
          <Animated.View
            style={[
              knobStyle,
              {
                width: KNOB_SIZE,
                height: KNOB_SIZE,
                borderRadius: KNOB_SIZE / 2,
              },
            ]}
            className="absolute bg-white border-2 border-blue-700 items-center justify-center shadow-lg"
          >
            <Text className="text-red-600 font-bold text-lg">SOS</Text>
          </Animated.View>
        </GestureDetector>
      </View>
    </View>
  );
}
