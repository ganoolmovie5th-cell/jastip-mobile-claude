import React from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

import { colors } from "./src/theme";
import HomeScreen from "./src/screens/HomeScreen";
import CategoriesScreen from "./src/screens/CategoriesScreen";
import CategoryDetailScreen from "./src/screens/CategoryDetailScreen";
import TrackScreen from "./src/screens/TrackScreen";
import ProfileScreen from "./src/screens/ProfileScreen";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const navTheme = {
  ...DefaultTheme,
  colors: { ...DefaultTheme.colors, background: colors.bg, primary: colors.brand },
};

function CategoriesStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.bg },
        headerShadowVisible: false,
        headerTintColor: colors.ink,
        headerTitleStyle: { fontWeight: "800" },
        contentStyle: { backgroundColor: colors.bg },
      }}
    >
      <Stack.Screen name="CategoriesList" component={CategoriesScreen} options={{ title: "Kategori" }} />
      <Stack.Screen
        name="CategoryDetail"
        component={CategoryDetailScreen}
        options={({ route }) => ({ title: route.params?.title ?? "Kategori" })}
      />
    </Stack.Navigator>
  );
}

const ICONS = {
  Beranda: ["home", "home-outline"],
  Kategori: ["grid", "grid-outline"],
  Lacak: ["navigate", "navigate-outline"],
  Profil: ["person", "person-outline"],
};

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar style="dark" />
      <NavigationContainer theme={navTheme}>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            headerShown: false,
            tabBarActiveTintColor: colors.brand,
            tabBarInactiveTintColor: colors.muted,
            tabBarStyle: {
              backgroundColor: colors.surface,
              borderTopColor: colors.line,
              height: 62,
              paddingBottom: 8,
              paddingTop: 8,
            },
            tabBarLabelStyle: { fontSize: 11, fontWeight: "600" },
            tabBarIcon: ({ focused, color, size }) => {
              const pair = ICONS[route.name] || ["ellipse", "ellipse-outline"];
              return <Ionicons name={focused ? pair[0] : pair[1]} size={size} color={color} />;
            },
          })}
        >
          <Tab.Screen name="Beranda" component={HomeScreen} />
          <Tab.Screen name="Kategori" component={CategoriesStack} />
          <Tab.Screen name="Lacak" component={TrackScreen} />
          <Tab.Screen name="Profil" component={ProfileScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
