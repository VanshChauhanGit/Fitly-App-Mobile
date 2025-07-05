import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams } from "expo-router";

const exerciseDetails = () => {
  const exercise = useLocalSearchParams();
  return (
    <SafeAreaView className="bg-primary flex-1">
      <Text className="text-white">Name : {exercise.name} </Text>
    </SafeAreaView>
  );
};

export default exerciseDetails;
