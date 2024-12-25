import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { useRouter } from "expo-router";
import { useMutation } from "react-query";
import { LoginUser } from "../(service)/api/api";
import { useDispatch } from "react-redux";
import { loginUserAction } from "../(redux)/authSlice";
import { useAppSelector } from "../(redux)/hooks";

const validationSchema = Yup.object().shape({
  username: Yup.string().required("Username is required").label("Username"),
  password: Yup.string()
    .required("Password is required")
    .min(4)
    .label("password"),
});

const Login = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  useAppSelector((state) => console.log("Store data: ", state));
  const mutation = useMutation({
    mutationFn: LoginUser,
    mutationKey: ["login"],
    onError(error: any, variables, context) {
      console.log("error: ", error["response"].data);
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      {mutation.isError && (
        <Text style={styles.errorText}>
          {mutation?.error["response"].data.message}
        </Text>
      )}
      {mutation.isSuccess && (
        <Text style={styles.sucessText}>Login is successful</Text>
      )}
      <Formik
        initialValues={{ username: "pparth602", password: "Pparth11" }}
        onSubmit={(values) => {
          mutation
            .mutateAsync(values)
            .then((response) => {
              console.log("response: ", response.data);

              // dispatch
              dispatch(loginUserAction(response.data));
              router.push("/(tabs)");
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
            {/* Login Button */}
            <TouchableOpacity
              onPress={() => handleSubmit()}
              style={styles.button}
              disabled={mutation?.isLoading}
            >
              {mutation?.isLoading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.buttonText}>Login</Text>
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

export default Login;
