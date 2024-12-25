import axios from "axios";
const BASE_URL = "http://192.168.1.12:8080/api/v1"
const LoginUser = async ({ username, password }) => {
  return await axios.post(
    `${BASE_URL}/auth/signin`,
    {
      username,
      password,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};

const RegisterUser = async ({ username, email, password }) => {
  return await axios.post(`${BASE_URL}/auth/signup`, {
    username,
    email,
    password,
    roles: ["athlete"],
  });
};

const CreateUserExercise = async ({
  exerciseName,
  equipment,
  primaryMuscleGroup,
  otherMuscles,
  exerciseType,
}) => {
  let userId = 'temp';
  return await axios.post(
    `${BASE_URL}/user/exercises/create`,
    {
      userId,
      exerciseName,
      equipment,
      primaryMuscleGroup,
      otherMuscles,
      exerciseType,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};

export { LoginUser, RegisterUser, CreateUserExercise };
