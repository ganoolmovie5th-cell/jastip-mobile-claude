import React from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer, DefaultTheme, DarkTheme } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

import { AuthProvider } from "./src/auth/AuthContext";
import { StoreProvider } from "./src/store/StoreContext";
import { AppProvider, useAppTheme } from "./src/context/AppContext";

import HomeScreen from "./src/screens/HomeScreen";
import NotificationsScreen from "./src/screens/NotificationsScreen";
import CategoriesScreen from "./src/screens/CategoriesScreen";
import CategoryDetailScreen from "./src/screens/CategoryDetailScreen";
import TrackScreen from "./src/screens/TrackScreen";
import ProfileScreen from "./src/screens/ProfileScreen";
import LoginScreen from "./src/screens/LoginScreen";
import OrdersScreen from "./src/screens/OrdersScreen";
import OrderDetailScreen from "./src/screens/OrderDetailScreen";
import AddressScreen from "./src/screens/AddressScreen";
import AddressFormScreen from "./src/screens/AddressFormScreen";
import PaymentScreen from "./src/screens/PaymentScreen";
import HelpScreen from "./src/screens/HelpScreen";
import AboutScreen from "./src/screens/AboutScreen";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const ICONS = {
  Beranda: ["home", "home-outline"],
  Kategori: ["grid", "grid-outline"],
  Lacak: ["navigate", "navigate-outline"],
  Profil: ["person", "person-outline"],
};

function makeScreenOpts(colors) {
  return {
    headerStyle: { backgroundColor: colors.bg },
    headerShadowVisible: false,
    headerTintColor: colors.ink,
    headerTitleStyle: { fontWeight: "800" },
    headerBackButtonDisplayMode: "generic",
    contentStyle: { backgroundColor: colors.bg },
  };
}

function HomeStack() {
  const { colors, t } = useAppTheme();
  const screenOpts = makeScreenOpts(colors);
  return (
    <Stack.Navigator screenOptions={screenOpts}>
      <Stack.Screen name="BerandaScreen" component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen
        name="Notifications"
        component={NotificationsScreen}
        options={{ title: t("nav.notifications") }}
      />
    </Stack.Navigator>
  );
}

function CategoriesStack() {
  const { colors, t } = useAppTheme();
  const screenOpts = makeScreenOpts(colors);
  return (
    <Stack.Navigator screenOptions={screenOpts}>
      <Stack.Screen name="CategoriesList" component={CategoriesScreen} options={{ title: t("nav.categories") }} />
      <Stack.Screen
        name="CategoryDetail"
        component={CategoryDetailScreen}
        options={({ route }) => ({ title: route.params?.title ?? t("nav.categories") })}
      />
    </Stack.Navigator>
  );
}

function ProfileStack() {
  const { colors, t } = useAppTheme();
  const screenOpts = makeScreenOpts(colors);
  return (
    <Stack.Navigator screenOptions={screenOpts}>
      <Stack.Screen name="ProfileHome" component={ProfileScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Login" component={LoginScreen} options={{ title: t("nav.login") }} />
      <Stack.Screen name="Orders" component={OrdersScreen} options={{ title: t("nav.orders") }} />
      <Stack.Screen name="OrderDetail" component={OrderDetailScreen} options={{ title: t("nav.order_detail") }} />
      <Stack.Screen name="Address" component={AddressScreen} options={{ title: t("nav.address") }} />
      <Stack.Screen name="AddressForm" component={AddressFormScreen} options={{ title: t("nav.address_form") }} />
      <Stack.Screen name="Payment" component={PaymentScreen} options={{ title: t("nav.payment") }} />
      <Stack.Screen name="Help" component={HelpScreen} options={{ title: t("nav.help") }} />
      <Stack.Screen name="About" component={AboutScreen} options={{ title: t("nav.about") }} />
    </Stack.Navigator>
  );
}

function AppNavigator() {
  const { colors, isDarkMode, t } = useAppTheme();

  const navTheme = {
    ...(isDarkMode ? DarkTheme : DefaultTheme),
    colors: {
      ...(isDarkMode ? DarkTheme.colors : DefaultTheme.colors),
      background: colors.bg,
      primary: colors.brand,
      card: colors.surface,
      text: colors.ink,
      border: colors.line,
    },
  };

  const tabHome = t("tab.home");
  const tabCategories = t("tab.categories");
  const tabTrack = t("tab.track");
  const tabProfile = t("tab.profile");

  return (
    <>
      <StatusBar style={isDarkMode ? "light" : "dark"} />
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
          <Tab.Screen name="Beranda" component={HomeStack} options={{ tabBarLabel: tabHome }} />
          <Tab.Screen name="Kategori" component={CategoriesStack} options={{ tabBarLabel: tabCategories }} />
          <Tab.Screen name="Lacak" component={TrackScreen} options={{ tabBarLabel: tabTrack }} />
          <Tab.Screen name="Profil" component={ProfileStack} options={{ tabBarLabel: tabProfile }} />
        </Tab.Navigator>
      </NavigationContainer>
    </>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <AppProvider>
        <AuthProvider>
          <StoreProvider>
            <AppNavigator />
          </StoreProvider>
        </AuthProvider>
      </AppProvider>
    </SafeAreaProvider>
  );
}
