import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { Field, Formik } from "formik";
import * as Yup from "yup";
import { useRouter } from "expo-router";
import { useMutation } from "react-query";
import { CreateUserExercise } from "@/app/(service)/api/api";
import { Dropdown } from "react-native-element-dropdown";
import AntDesign from "@expo/vector-icons/AntDesign";

interface CreateExerciseValues {
  imageUrl: string;
  exerciseName: string;
  equipment: string;
  primaryMuscleGroup: string;
  otherMuscles: string[];
  exerciseType: string;
}

const equipmentData = [
  { label: "None", value: "NONE" },
  { label: "Barbell", value: "BARBELL" },
  { label: "Dumbell", value: "DUMBELL" },
  { label: "Kettlebell", value: "KETTLEBELL" },
  { label: "Machine", value: "MACHINE" },
  { label: "Plate", value: "PLATE" },
  { label: "Resistance Band", value: "RESISTANCE_BAND" },
  { label: "Other", value: "OTHER" },
];

const exerciseTypeData = [
  { label: "Weight & Reps", value: "WEIGHT_REPS" },
  { label: "Bodyweight Reps", value: "BODYWEIGHT_REPS" },
  { label: "Weighted Bodyweight", value: "WEIGHTED_BODYWEIGHT" },
  { label: "Assisted Bodyweight", value: "ASSISTED_BODYWEIGHT" },
  { label: "Duration", value: "DURATION" },
  { label: "Duration & Weight", value: "DURATION_WEIGHT" },
  { label: "Distance & Duration", value: "DISTANCE_DURATION" },
  { label: "Weight & Distance", value: "WEIGHT_DISTANCE" },
];

const muscleGroupData = [
  { label: "Abdominals", value: "ABS" },
  { label: "Abductors", value: "BARBELL" },
  { label: "Adductors", value: "DUMBELL" },
  { label: "Biceps", value: "KETTLEBELL" },
  { label: "Triceps", value: "MACHINE" },
  { label: "Forearms", value: "PLATE" },
  { label: "Quads", value: "QUADRICEPS" },
  { label: "Hamstring", value: "HAMSTRINGS" },
  { label: "Glutes", value: "GLUTES" },
  { label: "Calves", value: "CALVES" },
  { label: "Chest", value: "CHEST" },
  { label: "Shoulders", value: "SHOULDERS" },
  { label: "Upper Back", value: "UPPER_BACK" },
  { label: "Lower Back", value: "LOWER_BACK" },
  { label: "LATS", value: "LATS" },
  { label: "Traps", value: "TRAPS" },
  { label: "Full Body", value: "FULL_BODY" },
];

const CreateExercise = () => {
  const initialValues: CreateExerciseValues = {
    imageUrl: "",
    exerciseName: "",
    equipment: "",
    primaryMuscleGroup: "",
    otherMuscles: [],
    exerciseType: "",
  };

  const router = useRouter();
  const validationSchema = Yup.object({
    exerciseName: Yup.string()
      .required("Exercise Name is required")
      .label("Exercise Name"),
    equipment: Yup.string().required("Please select").label("Equipment"),
    primaryMuscleGroup: Yup.string()
      .required("Please select")
      .label("Primary Muscle Group"),
    otherMuscles: Yup.string().notRequired().label("Other Muscles"),
    exerciseType: Yup.string().required("Please select").label("Exercise Type"),
    imageUrl: Yup.string().label("Image").notRequired(),
  });

  const mutation = useMutation({
    mutationFn: CreateUserExercise,
    mutationKey: ["CreateUserExercise"],
    onError(error: any, variables, context) {
      console.log("error: ", error["response"].data);
    },
  });

  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      {mutation.isError && (
        <Text style={styles.errorText}>
          {mutation?.error["response"].data.message}
        </Text>
      )}
      {mutation.isSuccess && (
        <Text style={styles.sucessText}>Create Exercise</Text>
      )}
      <Formik
        initialValues={{
          imageUrl: "",
          exerciseName: "",
          equipment: "",
          primaryMuscleGroup: "",
          otherMuscles: "",
          exerciseType: "",
        }}
        onSubmit={(values) => {
          mutation
            .mutateAsync(values)
            .then((response) => {
              console.log("response: ", response.data);

              router.push("/exercise/add");
            })
            .catch((error) => {
              console.log("error: ", error);
            });
        }}
        validationSchema={validationSchema}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <View style={styles.form}>
            <TextInput
              style={styles.input}
              placeholder="Exercise Name"
              onChangeText={handleChange("exerciseName")}
              onBlur={handleBlur("exerciseName")}
              value={values.exerciseName}
              key="username"
              keyboardType="default"
            />
            {/* Error */}
            {errors.exerciseName && touched.exerciseName && (
              <Text style={styles.errorText}>{errors.exerciseName}</Text>
            )}

            <Dropdown
              style={[styles.dropdown, isFocus && { borderColor: "blue" }]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={equipmentData}
              search
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={!isFocus ? "Select equipment" : "..."}
              searchPlaceholder="Search..."
              value={value}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={(item) => {
                // setValue(item.value);
                setIsFocus(false);
              }}
              renderLeftIcon={() => (
                <AntDesign
                  style={styles.icon}
                  color={isFocus ? "blue" : "black"}
                  name="Safety"
                  size={20}
                />
              )}
            />

            {/* <Dropdown
              style={[styles.dropdown, isFocus && { borderColor: "blue" }]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={muscleGroupData}
              search
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={!isFocus ? "Select Primary Muscle" : "..."}
              searchPlaceholder="Search Muscle..."
              value={value}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={(item) => {
                // setValue(item.value);
                setIsFocus(false);
              }}
              renderLeftIcon={() => (
                <AntDesign
                  style={styles.icon}
                  color={isFocus ? "blue" : "black"}
                  name="Safety"
                  size={20}
                />
              )}
            />

            <Dropdown
              style={[styles.dropdown, isFocus && { borderColor: "blue" }]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={muscleGroupData}
              search
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={!isFocus ? "Other Muscles" : "..."}
              searchPlaceholder="Search Muscle"
              value={value}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={(item) => {
                // setValue(item.value);
                setIsFocus(false);
              }}
              renderLeftIcon={() => (
                <AntDesign
                  style={styles.icon}
                  color={isFocus ? "blue" : "black"}
                  name="Safety"
                  size={20}
                />
              )}
            />

            <Dropdown
              style={[styles.dropdown, isFocus && { borderColor: "blue" }]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={exerciseTypeData}
              search
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={!isFocus ? "Other Muscles" : "..."}
              searchPlaceholder="Search Muscle"
              value={value}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={(item) => {
                // setValue(item.value);
                setIsFocus(false);
              }}
              renderLeftIcon={() => (
                <AntDesign
                  style={styles.icon}
                  color={isFocus ? "blue" : "black"}
                  name="Safety"
                  size={20}
                />
              )}
            /> */}

            {/* Create Exercise Button */}
            <TouchableOpacity
              onPress={() => handleSubmit()}
              style={styles.button}
              disabled={mutation?.isLoading}
            >
              {mutation?.isLoading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.buttonText}>Create Exercise</Text>
              )}
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 24,
  },
  form: {
    width: "100%",
  },
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
    backgroundColor: "#fff",
  },
  errorText: {
    color: "red",
    marginBottom: 16,
  },
  sucessText: {
    color: "green",
    marginBottom: 16,
  },
  button: {
    height: 50,
    backgroundColor: "#6200ea",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginTop: 16,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  dropdown: {
    height: 50,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: "absolute",
    backgroundColor: "white",
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});

export default CreateExercise;
