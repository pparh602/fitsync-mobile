import { Stack } from "expo-router/stack";
import { QueryClientProvider } from "react-query";
import queryClient from "./(service)/queryClient";
import AppWrapper from "./(redux)/AppWrapper";
import {
  configureFonts,
  DefaultTheme,
  PaperProvider,
} from "react-native-paper";
import { Provider } from "react-redux";
import { store } from "./(redux)/store";
import { SafeAreaProvider } from "react-native-safe-area-context";

const fontConfig = {
  titleSmall: {
    letterSpacing: 0.101,
  },
  labelLarge: {
    letterSpacing: 0.101,
  },
};

const theme = {
  ...DefaultTheme,
  // Specify custom property
  myOwnProperty: true,
  fonts: configureFonts({ config: fontConfig, isV3: true }),
  // Specify custom property in nested object
  colors: {
    ...DefaultTheme.colors,
    myOwnColor: "#BADA55",
  },
};

export default function RootLayout() {
  return (
    <PaperProvider theme={theme}>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <AppWrapper />
        </QueryClientProvider>
      </Provider>
    </PaperProvider>
  );
}
