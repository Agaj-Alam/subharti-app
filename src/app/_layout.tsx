import { Stack } from "expo-router/stack";
import { ActivityIndicator ,View} from "react-native";
import { Provider, useSelector } from "react-redux";
import "../../globals.css";
import { store } from "../redux/store";

function RootNavigator() {
  const user = useSelector((state: any) => state.auth.user);

  if (user === undefined) {
    return (
      <View className="flex-1,justify-content:'center , align-item:'center">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: "#2f2fa2", // 🔵 blue header
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "600",
        },
        headerShown: false,
      }}
    >
      {!user ? (
        <Stack.Screen name="(auth)/login" />
      ) : (
        <Stack.Screen name="(main)"  />
      )}
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <Provider store={store}>
      <RootNavigator />
    </Provider>
  );
}
