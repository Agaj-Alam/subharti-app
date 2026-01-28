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
  // 🔵 knob by default center me
  const translateX = useSharedValue(MAX_X / 2);

  // 🔥 yahin actual kaam hoga
  const triggerAction = (pos: number) => {
    if (pos < MAX_X * 0.3) {
      console.log("🚨 ALERT TRIGGERED");
      // alert logic
    } else if (pos > MAX_X * 0.7) {
      console.log("📞 CALLING TRIGGERED");
      // calling logic
    } else {
      console.log("🆘 SOS TRIGGERED");
      // sos logic
    }
  };

  // 👉 drag gesture
  const panGesture = Gesture.Pan()
    .onUpdate((e) => {
      let newX = e.translationX + MAX_X / 2;

      if (newX < 0) newX = 0;
      if (newX > MAX_X) newX = MAX_X;

      translateX.value = newX;
    })
    .onEnd(() => {
      let snapPoint = MAX_X / 2; // center (SOS)

      if (translateX.value < MAX_X * 0.3) {
        snapPoint = 0; // Alert
      } else if (translateX.value > MAX_X * 0.7) {
        snapPoint = MAX_X; // Calling
      }

      translateX.value = withSpring(snapPoint, {
        damping: 15,
        stiffness: 150,
      });

      runOnJS(triggerAction)(snapPoint);
    });

  // 🎨 animated style
  const knobStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <View className="items-center mt-8">
      {/* PILL */}
      <View
        style={{ width: PILL_WIDTH }}
        className="h-16 bg-white rounded-full border border-blue-700 justify-center"
      >
        {/* LEFT / RIGHT TEXT */}
        <View className="absolute w-full flex-row justify-between px-6">
          <Text className="text-red-600 font-semibold">Alert</Text>
          <Text className="text-red-600 font-semibold">Calling</Text>
        </View>

        {/* DRAGGABLE SOS */}
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
            className="absolute bg-white border-4 border-blue-700 items-center justify-center shadow-lg"
          >
            <Text className="text-red-600 font-bold text-lg">SOS</Text>
          </Animated.View>
        </GestureDetector>
      </View>
    </View>
  );
}
