import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "@/components/FormField";
import CustomButton from "@/components/CustomButton";
import { Link } from "expo-router";
import {
  getCurrentUser,
  SignIn as SignInUSer,
  signInWithGoogle,
} from "@/lib/appwrite";
import { router } from "expo-router";
import { useGlobalContext } from "@/context/GlobalProvider";
import { useToast } from "react-native-toast-notifications";
import Loader from "@/components/Loader";
import GoogleLoginBtn from "../../components/GoogleLoginBtn";

const SignIn = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [isSubmiting, setIsSubmiting] = useState(false);
  const { isLoading, setIsLoggedIn, setUser } = useGlobalContext();
  const toast = useToast();

  const submit = async () => {
    if (!form.email || !form.password) {
      toast.show("Please fill all fields!", {
        type: "warning",
      });
      return;
    }
    setIsSubmiting(true);
    try {
      const res = await SignInUSer(form.email, form.password);
      if (!res.success) {
        toast.show(res.message, {
          type: "warning",
        });
        return;
      }
      const result = await getCurrentUser();
      if (!result) {
        toast.show("Failed to fetch user details!", { type: "danger" });
        return;
      }
      setUser(result);
      setIsLoggedIn(true);
      router.replace("/home");
      toast.show("Logged in successfully!", {
        type: "success",
      });
    } catch (error) {
      console.log(error);
      toast.show("An error occurred!", {
        type: "danger",
      });
    } finally {
      setIsSubmiting(false);
    }
  };

  const submitWithGoogle = async () => {
    setIsSubmiting(true);
    try {
      const res = await signInWithGoogle(); // the function we added earlier

      if (!res.success) {
        toast.show(res.message, {
          type: "warning",
        });
        return;
      }

      const result = await getCurrentUser();
      if (!result) {
        toast.show("Failed to fetch user details!", { type: "danger" });
        return;
      }

      setUser(result);
      setIsLoggedIn(true);
      router.replace("/home");

      toast.show("Logged in with Google!", {
        type: "success",
      });
    } catch (error) {
      console.log(error);
      toast.show("Google login failed!", {
        type: "danger",
      });
    } finally {
      setIsSubmiting(false);
    }
  };

  return (
    <>
      <SafeAreaView className="h-full bg-primary">
        <ScrollView contentContainerStyle={{ height: "90%" }}>
          <View className="items-center justify-center w-full h-full px-4 my-6">
            <Image
              source={require("@/assets/logo-transparent.png")}
              className="w-[130px] h-[84px]"
              resizeMode="contain"
            />
            <Text className="mt-5 text-3xl text-white font-pregular">
              Log in to{" "}
              <Text className="text-secondary font-psemibold">Fitly</Text>
            </Text>
            <FormField
              title={"Email"}
              value={form.email}
              placeholder="Enter your email"
              handleChangeText={(e) => setForm({ ...form, email: e })}
              keyboardType="email-address"
              otherStyles="mt-7"
            />
            <FormField
              title={"Password"}
              value={form.password}
              placeholder="Enter your password"
              handleChangeText={(e) => setForm({ ...form, password: e })}
              otherStyles="mt-7"
            />
            <CustomButton
              title="Sign In"
              handlePress={submit}
              isLoading={isSubmiting}
              containerStyles="mt-7 w-full"
            />

            <View className="flex-row items-center justify-between w-full mt-5">
              <View className="h-[1px] w-[40%] bg-gray-100" />
              <Text className="text-lg text-gray-100 font-pregular">Or</Text>
              <View className="h-[1px] w-[40%] bg-gray-100" />
            </View>

            <TouchableOpacity
              className="flex-row items-center justify-center w-full h-16 gap-2 mt-2 border border-white rounded-lg"
              onPress={submitWithGoogle}
            >
              <Image
                source={require("@/assets/icons/google.png")}
                className="size-8"
                resizeMode="contain"
              />
              <Text className="text-2xl text-white font-pmedium">
                Login with Google
              </Text>
            </TouchableOpacity>

            <View className="flex-row justify-center gap-2 pt-5">
              <Text className="text-lg text-gray-100 font-pregular">
                Don't have an account?
              </Text>
              <Link
                href="/sign-up"
                className="text-lg text-secondary font-psemibold"
              >
                Sign Up
              </Link>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
      <Loader visible={isSubmiting} />
    </>
  );
};

export default SignIn;
