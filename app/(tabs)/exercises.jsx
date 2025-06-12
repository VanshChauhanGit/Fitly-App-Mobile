import { View, Text, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ImageSlider from "../../components/ImageSlider";
import BodyParts from "../../components/BodyParts";

const Exercises = () => {
  return (
    <SafeAreaView className="flex-1 px-4 pb-0 bg-primary gap-y-4">
      {/* Punchline */}
      <View className="flex-row items-center justify-center gap-4 mt-5">
        <View className="items-center gap-y-1">
          <Text className="text-3xl tracking-wider text-white font-pbold">
            READY TO
          </Text>
          <Text className="text-4xl tracking-widest font-pbold text-secondary">
            WORKOUT
          </Text>
        </View>
      </View>

      <View>
        <ImageSlider />
      </View>

      <View className="flex-1">
        <BodyParts />
      </View>
    </SafeAreaView>
  );
};

export default Exercises;
