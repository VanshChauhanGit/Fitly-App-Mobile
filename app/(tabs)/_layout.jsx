import { View, Text, Image } from "react-native";
import React from "react";
import { Tabs, Redirect } from "expo-router";
import { IoMdHome } from "react-icons/io";
import { LiaDumbbellSolid } from "react-icons/lia";
import { FaPlusCircle, FaHistory, FaUserCircle } from "react-icons/fa";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

const TabIcon = ({ IconComponent, color, name, focused }) => {
  return (
    <View className="items-center justify-center">
      <IconComponent size={24} color={color} focused={focused} name={name} />
    </View>
  );
};

const TabsLayout = () => {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: "bold",
          },
          tabBarActiveTintColor: "#39FF14",
          tabBarInactiveTintColor: "#CDCDE0",
          tabBarStyle: {
            backgroundColor: "#161622",
            height: 60,
            borderTopWidth: 0.5,
            borderColor: "#CDCDE0",
          },
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            headerShown: false,
            tabBarIcon: ({ color }) => (
              <TabIcon
                IconComponent={Ionicons}
                color={color}
                name="home-outline"
              />
            ),
          }}
        />
        <Tabs.Screen
          name="exercises"
          options={{
            title: "Exercises",
            headerShown: false,
            tabBarIcon: ({ color }) => (
              <TabIcon
                IconComponent={FontAwesome5}
                color={color}
                name="dumbbell"
              />
            ),
          }}
        />
        <Tabs.Screen
          name="workout"
          options={{
            title: "Workout",
            headerShown: false,
            tabBarIcon: ({ color }) => (
              <TabIcon IconComponent={FontAwesome5} color={color} name="plus" />
            ),
          }}
        />
        <Tabs.Screen
          name="history"
          options={{
            title: "History",
            headerShown: false,
            tabBarIcon: ({ color }) => (
              <TabIcon
                IconComponent={FontAwesome5}
                color={color}
                name="history"
              />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            headerShown: false,
            tabBarIcon: ({ color }) => (
              <TabIcon
                IconComponent={FontAwesome5}
                color={color}
                name="user-circle"
              />
            ),
          }}
        />
      </Tabs>
    </>
  );
};

export default TabsLayout;
