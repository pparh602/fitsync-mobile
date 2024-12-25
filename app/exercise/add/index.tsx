import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Stack, useRouter } from "expo-router";
import { Button } from "react-native-paper";

const AddExercise = () => {
  const router = useRouter();
  return (
    <>
      <Stack.Screen
        options={{
          title: "New Routine",
          headerShown: true,
          headerTitleAlign: "center",
          headerLeft: () => (
            <Button
              mode="text"
              labelStyle={{ fontSize: 18 }}
              onPress={() => router.back()}
            >
              Cancel
            </Button>
          ),
          headerRight: () => (
            <Button
              mode="text"
              labelStyle={{ fontSize: 18 }}
              onPress={() => router.navigate('/exercise/create')}
            >
              Create
            </Button>
          ),
        }}
      />
      <View style={styles.container}>

      </View>
    </>
  );
};

export default AddExercise;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
