import { AuthState } from "@/app/(redux)/authSlice";
import { useAppDispatch, useAppSelector } from "@/app/(redux)/hooks";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator } from "react-native";

const ProtectedRoutes = ({ children }: any ) => {
  const appDispatch = useAppDispatch();
  const router = useRouter();
  const { user, isLoading } = useAppSelector((state) => state.auth);
  useEffect(() => {
    if (!user) {
      router.push("/auth/login");
    }
  }, [user]);

  if (isLoading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (!user) return null;
  return children;
};

export default ProtectedRoutes;