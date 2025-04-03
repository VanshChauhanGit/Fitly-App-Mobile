import { View, Text, ScrollView, Image, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "@/components/FormField";
import CustomButton from "@/components/CustomButton";
import { Link } from "expo-router";
import { createUser } from "@/lib/appwrite";
import { router } from "expo-router";
import { useGlobalContext } from "@/context/GlobalProvider";
import { useToast } from "react-native-toast-notifications";
import Loader from "@/components/Loader";

const SignUp = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [isSubmiting, setIsSubmiting] = useState(false);
  const { setUser, setIsLoggedIn } = useGlobalContext();

  const toast = useToast();

  const submit = async () => {
    if (!form.username || !form.email || !form.password) {
      toast.show("Please fill all fields", {
        type: "warning",
      });
      return;
    }
    setIsSubmiting(true);
    try {
      const res = await createUser(form.email, form.password, form.username);
      if (!res.success) {
        toast.show(res.message, { type: "warning" });
        return;
      }
      setUser(res.user);
      setIsLoggedIn(true);
      router.replace("/home");
      toast.show(res.message, {
        type: "success",
      });
    } catch (error) {
      console.log(error);
      toast.show(error.message, { type: "error" });
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
              Sign Up to{" "}
              <Text className="text-secondary font-psemibold">Fitly</Text>
            </Text>
            <FormField
              title={"Username"}
              value={form.username}
              placeholder="Enter your username"
              handleChangeText={(e) => setForm({ ...form, username: e })}
              keyboardType="default"
              otherStyles="mt-7"
            />
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
              title="Sign Up"
              handlePress={submit}
              isLoading={isSubmiting}
              containerStyles="mt-7 w-full"
            />

            <View className="flex-row justify-center gap-2 pt-5">
              <Text className="text-lg text-gray-100 font-pregular">
                Already have an account?
              </Text>
              <Link
                href="/sign-in"
                className="text-lg text-secondary font-psemibold"
              >
                Sign In
              </Link>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
      <Loader visible={isSubmiting} />
    </>
  );
};

export default SignUp;
