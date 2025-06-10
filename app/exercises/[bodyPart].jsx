import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams } from "expo-router";

const ExerciseScreen = () => {
  const { bodyPart } = useLocalSearchParams();

  return (
    <SafeAreaView className="flex-1 px-4 bg-primary">
      <Text className="text-white">ExerciseScreen</Text>
      <Text className="text-white">Body Part: {bodyPart}</Text>
    </SafeAreaView>
  );
};

export default ExerciseScreen;
