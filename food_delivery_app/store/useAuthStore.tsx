import { create } from "zustand"
import Toast from 'react-native-toast-message';
import { axiosInstance } from "@/utils/axios";
import { login, register, verify } from "@/types/types"
import AsyncStorage from "@react-native-async-storage/async-storage"

export const useAuthStore = create((set, get) => ({
    user: {},
    isSigningUp: false,
    isLoggingIn: false,
    isVerifyingEmail: false,
    isResetting: false,
    redirect: false,
    token: "",
    registerUser: async(data: register) => {
        await axiosInstance.post("/auth/register", {
            full_name: data.full_name,
            email: data.email,
            password: data.password
        })
        .then(async(data) => {
            set({ isSigningUp: true });
            Toast.show({
                type: `${data.data.success ? 'success' : "error"}`,
                text1: `${data.data.success ? 'Success' : "Error"}`,
                text2: data.data.message
            });
            if(data.data.success) {
                await AsyncStorage.setItem("auth_token", data.data.token);
                set({ redirect: true });
            }
        })
        .catch((e) => console.log(e))
        .finally(() => {
            set({ isSigningUp: false });
            set({ redirect: false });
        });
    },

    loginUser: async(data: login) => {
        await axiosInstance.post("/auth/login", {
            email: data.email,
            password: data.password
        })
        .then(async(data) => {
            set({ isLoggingIn: true });
            Toast.show({
                type: `${data.data.success ? 'success' : "error"}`,
                text1: `${data.data.success ? 'Success' : "Error"}`,
                text2: data.data.message
            });
            if(data.data.success) {
                await AsyncStorage.setItem("auth_token", data.data.token);
                set({ redirect: true });
            }
        })
        .catch((e) => console.log(e))
        .finally(() => {
            set({ isLoggingIn: false });
            set({ redirect: false });
        });
    },

    getUser: async() => {
        const auth_token = await AsyncStorage.getItem("auth_token");
        await axiosInstance.get("/auth/check", {
            headers: {
                Authorization: `Bearer ${auth_token}`
            }
        })
        .then(async(data) => {
            set({ user: data.data });
            set({ token: auth_token });
        })
        .catch((e) => console.log(e));
    },

    logoutUser: async() => {
        await AsyncStorage.removeItem("auth_token");
    },

    verifyEmail: async(data: verify) => {
        await axiosInstance.post("/auth/verify", {
            email: data.email
        })
        .then(async(data) => {
            set({ isVerifyingEmail: true });
            Toast.show({
                type: `${data.data.success ? 'success' : "error"}`,
                text1: `${data.data.success ? 'Success' : "Error"}`,
                text2: data.data.message
            });
            if(data.data.success) {
                await AsyncStorage.setItem("auth_token", data.data.token);
                set({ redirect: true });
            }
        })
        .catch((e) => console.log(e))
        .finally(() => {
            set({ isVerifyingEmail: false });
            set({ redirect: false });
        })
    },

}));