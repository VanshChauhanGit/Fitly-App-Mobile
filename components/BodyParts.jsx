import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import { bodyParts } from "../constants";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";

const BodyParts = () => {
  const router = useRouter();
  // const handleBodyPartPress = (bodyPart) => {
  //   console.log("Selected body part:", bodyPart);
  //   router.push({
  //     pathname: "/exercises/[bodyPart]",
  //     params: { bodyPart },
  //   });
  // };

  return (
    <View>
      <Text className="mb-2 text-3xl text-white font-pregular">Exercises</Text>

      <FlatList
        className="pb-20"
        data={bodyParts}
        numColumns={2}
        keyExtractor={(item) => item.name}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <BodyPartCard item={item} index={index} router={router} />
        )}
      />
    </View>
  );
};

export default BodyParts;

const BodyPartCard = ({ item, index, router }) => {
  return (
    <TouchableOpacity
      onPress={() =>
        router.push({ pathname: "/exercises/[bodyPart]", params: item })
      }
      className={`w-1/2 p-2 ${index % 2 === 0 ? "pr-1" : "pl-1"}`}
    >
      <Image
        source={item.image}
        className="w-full rounded-lg h-60"
        resizeMode="cover"
      />
      <LinearGradient
        colors={["transparent", "#161622"]}
        className="absolute inset-0 rounded-lg"
      />
      <View className="absolute bottom-0 left-0 right-0 p-2">
        <Text className="text-lg tracking-wider text-center text-white font-pbold">
          {item?.name}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
