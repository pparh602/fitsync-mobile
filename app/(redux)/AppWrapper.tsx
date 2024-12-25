import { Stack } from "expo-router";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loadUser } from "./authSlice";
import { useAppDispatch } from "./hooks";
import { SafeAreaProvider } from "react-native-safe-area-context";

const AppWrapper = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);
  return (
    <SafeAreaProvider style={{ flex: 1 }}>
    <Stack screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="index"
      ></Stack.Screen>
    </Stack>
    </SafeAreaProvider>
  );
};

export default AppWrapper;