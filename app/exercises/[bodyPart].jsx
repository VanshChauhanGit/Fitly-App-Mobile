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
import { exerciseData } from "../../constants";

const ExerciseScreen = () => {
  const [exercises, setExercises] = useState(exerciseData);

  const router = useRouter();
  const { name, image } = useLocalSearchParams();

  // useEffect(() => {
  //   if (name) getExercises(name);
  // }, [name]);

  // const getExercises = async (bodyPart) => {
  //   let data = await fetchExercisesByBodyPart(bodyPart);
  //   if (data) {
  //     setExercises(data);
  //     console.log("Fetched exercises:", data[0]);
  //   } else {
  //     console.error("No exercises found for this body part");
  //   }
  // };

  return (
    <ScrollView className="bg-primary">
      <StatusBar
        barStyle="dark-content"
        animated={true}
        backgroundColor="transparent"
        translucent={true}
      />
      <Image
        source={image}
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
          {name
            .split(" ")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ")}{" "}
          Exercises
        </Text>

        <View className="flex-row items-center justify-evenly my-6 flex-wrap gap-y-12">
          {exercises.length === 0 ? (
            <Loader />
          ) : (
            exercises.map((exercise, index) => (
              <TouchableOpacity
                key={index}
                onPress={() =>
                  router.push({
                    pathname: "/exerciseDetails",
                    params: exercise,
                  })
                }
                className="w-[46%] h-60 rounded-lg"
              >
                <View className="relative w-full h-full mb-2">
                  <Image
                    source={{ uri: exercise.gifUrl }}
                    className="w-full h-full rounded-lg"
                    resizeMode="cover"
                  />

                  <Text className="text-sm text-center text-white font-psemibold">
                    {exercise.name}
                  </Text>
                </View>
              </TouchableOpacity>
            ))
          )}
        </View>
      </View>
    </ScrollView>
  );
};

export default ExerciseScreen;
