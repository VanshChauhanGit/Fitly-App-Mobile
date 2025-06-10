import React from "react";
import { View, Text, Image, Dimensions } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import { sliderImages } from "../constants";

const ImageSlider = () => {
  const width = Dimensions.get("window").width;

  return (
    <View className="mt-5 justify-center items-center">
      <Carousel
        loop
        autoPlay
        data={sliderImages}
        scrollAnimationDuration={1000}
        autoPlayInterval={3000}
        width={width - 40}
        height={250}
        mode="parallax"
        modeConfig={{
          parallaxScrollingScale: 0.9,
          parallaxScrollingOffset: 100,
          parallaxAdjacentItemScale: 0.5,
          parallaxAdjacentItemOpacity: 0.1,
        }}
        renderItem={({ item }) => (
          <View className="h-[250px] overflow-hidden rounded-xl justify-center items-center">
            <Image
              source={item}
              className="w-full h-full rounded-xl"
              resizeMode="cover"
            />
          </View>
        )}
      />
    </View>
  );
};

export default ImageSlider;
