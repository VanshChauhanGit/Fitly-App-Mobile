import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Model from "@/components/Model";
import { signOut } from "@/lib/appwrite";
import { router } from "expo-router";
import { useGlobalContext } from "@/context/GlobalProvider";
import { useToast } from "react-native-toast-notifications";

const profile = () => {
  const [showModal, setShowModal] = useState(false);

  const { user, setUser, isLoggedIn } = useGlobalContext();
  const toast = useToast();

  const logout = async () => {
    await signOut();
    toast.show("Logged out successfully!", { type: "success" });
    router.replace("/sign-in");
    setUser(null);
    isLoggedIn(false);
  };

  return (
    <SafeAreaView className="h-full bg-primary">
      <View className="mx-4">
        <TouchableOpacity
          className="items-end w-full mb-2"
          onPress={() => setShowModal(true)}
        >
          <Image
            source={require("@/assets/icons/logout.png")}
            className="size-8"
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
      <Model
        visible={showModal}
        onClose={() => setShowModal(false)}
        onLogout={logout}
      />
    </SafeAreaView>
  );
};

export default profile;
