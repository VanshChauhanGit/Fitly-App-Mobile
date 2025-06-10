import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import { bodyParts } from "../constants";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";

const BodyParts = () => {
  const router = useRouter();
  const handleBodyPartPress = (bodyPart) => {
    router.push({
      pathname: "/exercises/[bodyPart]",
      params: { bodyPart: bodyPart.name },
    });
  };

  return (
    <View>
      <Text className="text-white font-pregular text-3xl mb-2">Exercises</Text>

      <FlatList
        data={bodyParts}
        numColumns={2}
        keyExtractor={(item) => item.name}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <BodyPartCard
            item={item}
            index={index}
            handleBodyPartPress={handleBodyPartPress}
          />
        )}
      />
    </View>
  );
};

export default BodyParts;

const BodyPartCard = ({ item, index, handleBodyPartPress }) => {
  return (
    <TouchableOpacity
      onPress={() => handleBodyPartPress(item)}
      className={`w-1/2 p-2 ${index % 2 === 0 ? "pr-1" : "pl-1"}`}
    >
      <Image
        source={item.image}
        className="w-full h-60 rounded-lg"
        resizeMode="cover"
      />
      <LinearGradient
        colors={["transparent", "#161622"]}
        className="absolute inset-0 rounded-lg"
      />
      <View className="absolute bottom-0 left-0 right-0 p-2">
        <Text className="text-white text-center tracking-wider font-pbold text-lg">
          {item?.name}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
