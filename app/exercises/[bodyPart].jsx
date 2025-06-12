import {
  View,
  Text,
  Image,
  StatusBar,
  ScrollView,
  Touchable,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { fetchExercisesByBodyPart } from "../../api/exerciseDB";
import { Ionicons } from "@expo/vector-icons";
import Loader from "../../components/Loader";

const ExerciseScreen = () => {
  const [exercises, setExercises] = useState([]);

  const router = useRouter();
  const item = useLocalSearchParams();

  useEffect(() => {
    if (item) getExercises(item.name);
  }, [item]);

  const getExercises = async (bodyPart) => {
    let data = await fetchExercisesByBodyPart(bodyPart);
    if (data) {
      setExercises(data);
    } else {
      console.error("No exercises found for this body part");
    }
  };

  return (
    <ScrollView className="bg-primary">
      <StatusBar
        barStyle="dark-content"
        animated={true}
        backgroundColor="transparent"
        translucent={true}
      />
      <Image
        source={item.image}
        className="w-full h-[45vh] rounded-lg rounded-b-[25px] self-center"
        resizeMode="cover"
      />

      <TouchableOpacity
        onPress={() => router.back()}
        className="absolute z-10 top-10 left-4"
      >
        <Ionicons
          name="arrow-back"
          size={30}
          color="white"
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            padding: 5,
            borderRadius: 50,
          }}
        />
      </TouchableOpacity>

      {/* Exercises */}
      <View className="mx-4 mt-4">
        <Text className="text-3xl tracking-wider text-white font-psemibold">
          {item.name
            .split(" ")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ")}{" "}
          Exercises
        </Text>

        {exercises.length === 0 ? (
          <Loader />
        ) : (
          exercises.map((exercise, index) => (
            <TouchableOpacity
              key={index}
              // onPress={() =>
              //   router.push({
              //     pathname: "/exerciseDetails/[id]",
              //     params: { id: exercise.id },
              //   })
              // }
              className="flex-row items-center my-4 bg-gray-200 gap-x-4"
            >
              <Image
                source={{ uri: exercise.gifUrl }}
                className="w-24 h-24 rounded-lg"
                resizeMode="cover"
              />
              <View className="flex-1">
                <Text className="text-lg text-white font-psemibold">
                  {exercise.name}
                </Text>
                <Text className="text-sm text-secondary font-pregular">
                  {exercise.target}
                </Text>
              </View>
            </TouchableOpacity>
          ))
        )}

        <Text className="mt-1 text-lg tracking-wide text-secondary font-pregular">
          {exercises.length} exercises
        </Text>
      </View>
    </ScrollView>
  );
};

export default ExerciseScreen;
