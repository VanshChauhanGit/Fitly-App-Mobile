import { useGlobalContext } from "@/context/GlobalProvider";
import { Redirect, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Image, Text, Touchable, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import CustomButton from "@/components/CustomButton";
import Animated, { FadeInDown } from "react-native-reanimated";

export default function Index() {
  const { isLoading, isLoggedIn } = useGlobalContext();

  const router = useRouter();

  if (!isLoading && isLoggedIn) {
    return <Redirect href="/home" />;
  }

  return (
    <SafeAreaView className="h-full justify-end flex-1">
      <Image
        source={require("@/assets/images/welcome.png")}
        className="h-full w-full absolute"
      />

      <LinearGradient
        colors={["transparent", "#161622"]}
        style={{ width: "100%", height: "60%" }}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 0.8 }}
        className="flex justify-end pb-24 gap-6"
      >
        <Animated.View
          entering={FadeInDown.delay(150).springify()}
          className="items-center flex"
        >
          <Text className="text-white text-4xl font-semibold tracking-wider">
            Track <Text className="text-secondary">Workouts</Text>
          </Text>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(250).springify()}>
          <TouchableOpacity
            onPress={() => router.push("/sign-in")}
            className="w-[80%] h-16 items-center justify-center self-center bg-secondary rounded-full border border-neutral-200"
          >
            <Text className="text-white text-center text-2xl font-psemibold tracking-wider">
              Get Started
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </LinearGradient>
    </SafeAreaView>
  );
}
