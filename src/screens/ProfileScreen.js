import React, { useMemo } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Pressable,
  Alert,
  Image,
  Switch,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { radius, spacing, shadow } from "../theme";
import { useAppTheme } from "../context/AppContext";
import Button from "../components/Button";
import { openWhatsApp } from "../whatsapp";
import { useAuth } from "../auth/AuthContext";

function initialsOf(name = "") {
  const parts = name.trim().split(/\s+/).slice(0, 2);
  return parts.map((p) => p[0]?.toUpperCase()).join("") || "JT";
}

export default function ProfileScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const { user, isSignedIn, signOut } = useAuth();
  const { colors, isDarkMode, toggleDarkMode, language, setLanguage, t } = useAppTheme();
  const styles = useMemo(() => makeStyles(colors), [colors]);

  const menuItems = [
    { id: "orders", label: t("menu.orders"), icon: "bag-handle-outline", route: "Orders" },
    { id: "address", label: t("menu.address"), icon: "location-outline", route: "Address" },
    { id: "payment", label: t("menu.payment"), icon: "card-outline", route: "Payment" },
    { id: "help", label: t("menu.help"), icon: "help-circle-outline", route: "Help" },
    { id: "about", label: t("menu.about"), icon: "information-circle-outline", route: "About" },
  ];

  function handleSignOut() {
    Alert.alert(t("profile.signout_title"), t("profile.signout_msg"), [
      { text: t("profile.signout_cancel"), style: "cancel" },
      { text: t("profile.signout_confirm"), style: "destructive", onPress: signOut },
    ]);
  }

  return (
    <ScrollView
      style={{ backgroundColor: colors.bg }}
      contentContainerStyle={{ paddingTop: insets.top + 12, paddingBottom: 32, paddingHorizontal: spacing.md }}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.h1}>{t("profile.title")}</Text>

      {/* Kartu profil */}
      <View style={styles.card}>
        {isSignedIn && user?.picture ? (
          <Image source={{ uri: user.picture }} style={styles.avaImg} />
        ) : (
          <View style={styles.ava}>
            <Text style={styles.avaText}>{isSignedIn ? initialsOf(user?.name) : "JT"}</Text>
          </View>
        )}
        <View style={{ flex: 1 }}>
          <Text style={styles.name}>{isSignedIn ? user?.name : t("profile.guest_name")}</Text>
          <Text style={styles.email} numberOfLines={1}>
            {isSignedIn ? user?.email : t("profile.guest_hint")}
          </Text>
        </View>
        {isSignedIn ? (
          <Pressable hitSlop={8} onPress={handleSignOut} style={styles.logout}>
            <Ionicons name="log-out-outline" size={22} color={colors.muted} />
          </Pressable>
        ) : (
          <Button label={t("profile.signin_btn")} variant="ghost" onPress={() => navigation.navigate("Login")} />
        )}
      </View>

      {/* Menu */}
      <View style={styles.menu}>
        {menuItems.map((m, i) => (
          <Pressable
            key={m.id}
            style={[styles.row, i < menuItems.length - 1 && styles.rowDivider]}
            onPress={() => navigation.navigate(m.route)}
          >
            <View style={styles.rowIcon}>
              <Ionicons name={m.icon} size={19} color={colors.brand} />
            </View>
            <Text style={styles.rowLabel}>{m.label}</Text>
            <Ionicons name="chevron-forward" size={18} color={colors.muted} />
          </Pressable>
        ))}
      </View>

      {/* Pengaturan: bahasa + dark mode */}
      <Text style={styles.settingsTitle}>{t("profile.settings_title")}</Text>
      <View style={styles.menu}>
        {/* Bahasa */}
        <View style={[styles.row, styles.rowDivider]}>
          <View style={styles.rowIcon}>
            <Ionicons name="language-outline" size={19} color={colors.brand} />
          </View>
          <Text style={styles.rowLabel}>{t("profile.language")}</Text>
          <View style={styles.langToggle}>
            <Pressable
              onPress={() => setLanguage("id")}
              style={[styles.langBtn, language === "id" && styles.langBtnActive]}
            >
              <Text style={[styles.langText, language === "id" && styles.langTextActive]}>ID</Text>
            </Pressable>
            <Pressable
              onPress={() => setLanguage("en")}
              style={[styles.langBtn, language === "en" && styles.langBtnActive]}
            >
              <Text style={[styles.langText, language === "en" && styles.langTextActive]}>EN</Text>
            </Pressable>
          </View>
        </View>

        {/* Dark mode */}
        <View style={styles.row}>
          <View style={styles.rowIcon}>
            <Ionicons name={isDarkMode ? "moon" : "sunny-outline"} size={19} color={colors.brand} />
          </View>
          <Text style={styles.rowLabel}>{t("profile.dark_mode")}</Text>
          <Switch
            value={isDarkMode}
            onValueChange={toggleDarkMode}
            trackColor={{ false: colors.line, true: colors.brand }}
            thumbColor={colors.white}
          />
        </View>
      </View>

      <Button
        label={t("profile.whatsapp_btn")}
        icon="logo-whatsapp"
        onPress={() => openWhatsApp("Halo Jastipin, saya butuh bantuan")}
        style={{ marginTop: spacing.lg }}
      />

      <Text style={styles.version}>{t("profile.version")}</Text>
    </ScrollView>
  );
}

function makeStyles(colors) {
  return StyleSheet.create({
    h1: { fontSize: 24, fontWeight: "800", color: colors.ink, letterSpacing: -0.5, marginBottom: spacing.md },
    card: {
      flexDirection: "row",
      alignItems: "center",
      gap: 14,
      backgroundColor: colors.surface,
      borderRadius: radius.md,
      borderWidth: 1,
      borderColor: colors.line,
      padding: spacing.md,
      ...shadow.card,
    },
    ava: { width: 54, height: 54, borderRadius: 27, backgroundColor: colors.brand, alignItems: "center", justifyContent: "center" },
    avaImg: { width: 54, height: 54, borderRadius: 27, backgroundColor: colors.tint },
    avaText: { color: colors.white, fontWeight: "800", fontSize: 18 },
    name: { fontSize: 17, fontWeight: "800", color: colors.ink },
    email: { fontSize: 13, color: colors.muted, marginTop: 2 },
    logout: { padding: 6 },
    menu: {
      backgroundColor: colors.surface,
      borderRadius: radius.md,
      borderWidth: 1,
      borderColor: colors.line,
      marginTop: spacing.md,
      overflow: "hidden",
      ...shadow.card,
    },
    row: { flexDirection: "row", alignItems: "center", gap: 14, paddingHorizontal: spacing.md, paddingVertical: 15 },
    rowDivider: { borderBottomWidth: 1, borderBottomColor: colors.line },
    rowIcon: { width: 36, height: 36, borderRadius: 11, backgroundColor: colors.brandSoft, alignItems: "center", justifyContent: "center" },
    rowLabel: { flex: 1, fontSize: 15, fontWeight: "600", color: colors.ink },
    settingsTitle: {
      fontSize: 13.5,
      fontWeight: "700",
      color: colors.muted,
      letterSpacing: 0.3,
      marginTop: spacing.lg,
      marginBottom: spacing.xs,
      textTransform: "uppercase",
    },
    langToggle: { flexDirection: "row", borderRadius: radius.pill, borderWidth: 1, borderColor: colors.line, overflow: "hidden" },
    langBtn: { paddingHorizontal: 14, paddingVertical: 6, backgroundColor: "transparent" },
    langBtnActive: { backgroundColor: colors.brand },
    langText: { fontSize: 13, fontWeight: "700", color: colors.muted },
    langTextActive: { color: colors.white },
    version: { textAlign: "center", color: colors.muted, fontSize: 12.5, marginTop: spacing.lg },
  });
}
