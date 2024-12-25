import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ActivityIndicator,
} from "react-native";
import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { TouchableOpacity } from "react-native";
import { RegisterUser } from "../(service)/api/api";
import { useMutation } from "react-query";
import { useRouter } from "expo-router";

const validationSchema = Yup.object().shape({
  email: Yup.string().required("Email is required").email().label("Email"),
  username: Yup.string().required("Username is required").label("Username"),
  password: Yup.string()
    .required("Password is required")
    .min(4)
    .label("password"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Password must match")
    .required("Required"),
});

const Register = () => {
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: RegisterUser,
    mutationKey: ["register"],
    onError(error: any, variables, context) {},
    onSuccess(data, variables, context) {
      console.log("data: ", data);
      console.log("variables: ", variables);
    },
  });
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
      {mutation.isError && (
        <Text style={styles.errorText}>
          {mutation?.error["response"].data.message}
        </Text>
      )}
      {mutation.isSuccess && (
        <Text style={styles.sucessText}>Registration is successful</Text>
      )}
      <Formik
        initialValues={{
          username: "pparth1",
          email: "pspatel602@gmail.com",
          password: "admin@12345",
          confirmPassword: "admin@12345",
        }}
        onSubmit={(values) => {
          mutation
            .mutateAsync(values)
            .then((response) => {
              // console.log(data.data);
              // console.log("response: ", response.config.;
              // router.push("/(tabs)");
            })
            .catch((error) => {
              console.log("error: ", JSON.stringify(error, null, 2));
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
              placeholder="Username"
              onChangeText={handleChange("username")}
              onBlur={handleBlur("username")}
              value={values.username}
              key="username"
              keyboardType="default"
            />
            {/* Error */}
            {errors.username && touched.username && (
              <Text style={styles.errorText}>{errors.username}</Text>
            )}
            <TextInput
              style={styles.input}
              placeholder="Email"
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              value={values.email}
              key="email"
              keyboardType="email-address"
            />
            {/* Error */}
            {errors.email && touched.email && (
              <Text style={styles.errorText}>{errors.email}</Text>
            )}

            <TextInput
              style={styles.input}
              placeholder="Password"
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              value={values.password}
              key="password"
              secureTextEntry
            />
            {/* Error */}
            {errors.password && touched.password && (
              <Text style={styles.errorText}>{errors.password}</Text>
            )}

            {/* Confirm Password */}
            <TextInput
              style={styles.input}
              placeholder="Confirm Password"
              onChangeText={handleChange("confirmPassword")}
              onBlur={handleBlur("confirmPassword")}
              value={values.confirmPassword}
              secureTextEntry
            />
            {/* Error */}
            {errors.confirmPassword && touched.confirmPassword && (
              <Text style={styles.errorText}>{errors.confirmPassword}</Text>
            )}
            {/* Register Button */}
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleSubmit()}
            >
              {mutation?.isLoading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.buttonText}>Register</Text>
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
    justifyContent: "center",
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
});

export default Register;
