import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice } from "@reduxjs/toolkit";

const loadUserFromStorage = async () => {
  try {
    const userInfo = await AsyncStorage.getItem("userInfo");
    return userInfo ? JSON.parse(userInfo) : null;
  } catch (error) {
    console.log("Errir occured while fetching data: ", error);
    return null;
  }
};

export interface AuthState {
    user: any;
    isLoading: boolean;
}

// Initial State
const initialState: AuthState = {
  user: null,
  isLoading: true
};

// Slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginUserAction: (state: AuthState, action: any) => {
      state.user = action.payload;
      state.isLoading = false;
      AsyncStorage.setItem("userInfo", JSON.stringify(action.payload));
    },
    logoutUserAction: (state: AuthState) => {
      state.user = null;
      state.isLoading = false;
      AsyncStorage.removeItem("userInfo");
    },
    setUserAction: (state: AuthState, action: any) => {
      state.user = action.payload;
      state.isLoading = false;
    },
  },
});

// Generate the actions
export const { loginUserAction, logoutUserAction, setUserAction } =
  authSlice.actions;

export const authReducer = authSlice.reducer;
 
// Load User
export const loadUser = () => async (dispatch: any) => {
    const userInfo = await loadUserFromStorage();
    if(userInfo) {
        dispatch(setUserAction(userInfo));
    }
}