import { useGlobalContext } from "@/context/GlobalProvider";
import { Redirect, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Image, Text, Touchable, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import Animated, { FadeInDown } from "react-native-reanimated";

export default function Index() {
  const { isLoading, isLoggedIn } = useGlobalContext();

  const router = useRouter();

  if (!isLoading && isLoggedIn) {
    return <Redirect href="/home" />;
  }

  return (
    <SafeAreaView className="justify-end flex-1 h-full">
      <Image
        source={require("@/assets/images/welcome.png")}
        className="absolute w-full h-full"
      />

      <LinearGradient
        colors={["transparent", "#161622"]}
        style={{ width: "100%", height: "60%" }}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 0.8 }}
        className="flex justify-end gap-6 pb-24"
      >
        <Animated.View
          entering={FadeInDown.delay(150).springify()}
          className="flex items-center"
        >
          <Text className="text-4xl font-semibold tracking-wider text-white">
            Track <Text className="text-secondary">Workouts</Text>
          </Text>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(250).springify()}>
          <TouchableOpacity
            onPress={() => router.push("/sign-in")}
            className="w-[80%] h-16 items-center justify-center self-center bg-secondary rounded-full border border-neutral-200"
          >
            <Text className="text-2xl tracking-wider text-center text-white font-psemibold">
              Get Started
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </LinearGradient>
    </SafeAreaView>
  );
}
