import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

const GoogleLoginBtn = () => {
  return (
    <TouchableOpacity className="items-center justify-center h-16 border rounded-lg border-secondary">
      <Text className="text-white">Login with Google</Text>
    </TouchableOpacity>
  );
};

export default GoogleLoginBtn;
