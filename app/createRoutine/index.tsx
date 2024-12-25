import { View, StyleSheet } from "react-native";
import React from "react";
import { Link, Stack, useRouter } from "expo-router";
import { Button, TextInput, Text, Icon, MD3Colors } from "react-native-paper";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useMutation } from "react-query";
import { CreateUserExercise } from "../(service)/api/api";

const validationSchema = Yup.object().shape({
  exerciseName: Yup.string()
    .required("Exercise Name is required")
    .label("Exercise Name"),
  equipment: Yup.string().required("Please select").label("Equipment"),
  primaryMuscleGroup: Yup.string()
    .required("Please select")
    .label("Primary Muscle Group"),
  otherMuscles: Yup.string().notRequired().label("Other Muscles"),
  exerciseType: Yup.string().required("Please select").label("Exercise Type"),
});
const CreateRoutine = () => {
  const router = useRouter();
  const [routineTitle, setRoutineTitle] = React.useState("");

  const mutation = useMutation({
    mutationFn: CreateUserExercise,
    mutationKey: ["CreateUserExercise"],
    onError(error: any, variables, context) {
      console.log("error: ", error["response"].data);
    },
  });
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
              mode="contained"
              labelStyle={{ fontSize: 18 }}
              onPress={() => alert("This is a button!")}
            >
              Save
            </Button>
          ),
        }}
      />
      <View style={styles.container}>
        <TextInput
          placeholder="Routine title"
          contentStyle={{
            fontWeight: "bold",
            fontSize: 25,
          }}
          value={routineTitle}
          onChangeText={(title) => setRoutineTitle(title)}
        />
        <View style={styles.emptyScreen}>
          <Icon source="dumbbell" color={MD3Colors.tertiary10} size={65} />
          <Text variant="titleLarge" style={{ textAlign: "center" }}>
            Get Started by adding an exercise to your routine.
          </Text>
          <Button
            mode="contained"
            style={styles.addExerciseBtn}
            labelStyle={{ fontSize: 20 }}
            onPress={() => router.push("/exercise/add")}
          >
            Add exercise
          </Button>
        </View>
      </View>
    </>
  );
};

export default CreateRoutine;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  emptyScreen: {
    height: "40%",
    gap: 15,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  addExerciseBtn: {
    borderRadius: 8,
    width: "98%",
    borderCurve: "continuous",
  },
});
