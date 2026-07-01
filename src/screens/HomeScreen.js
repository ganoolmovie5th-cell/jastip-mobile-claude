import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ImageBackground,
  Image,
  Pressable,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

import { radius, spacing, shadow } from "../theme";
import { useApp } from "../context/AppContext";
import { categories, steps, aboutContent, testimonial } from "../data";
import Button from "../components/Button";
import SectionHeader from "../components/SectionHeader";
import { openWhatsApp } from "../whatsapp";

export default function HomeScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const { isSignedIn, user, signInWithGoogle, signingIn, unreadCount, colors, t } = useApp();
  const styles = useMemo(() => makeStyles(colors), [colors]);

  const [searchQuery, setSearchQuery] = useState("");

  const firstName = (user?.name || "").trim().split(/\s+/)[0];

  const filteredCategories = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return categories;
    return categories.filter(
      (cat) =>
        cat.name.toLowerCase().includes(q) ||
        cat.blurb.toLowerCase().includes(q) ||
        cat.items.some((item) => item.name.toLowerCase().includes(q))
    );
  }, [searchQuery]);

  const goToCategory = (cat) =>
    navigation.navigate("Kategori", {
      screen: "CategoryDetail",
      params: { id: cat.id, title: cat.name },
    });

  const greeting = isSignedIn && firstName
    ? t("home.greeting", { name: firstName })
    : t("home.greeting_guest");

  return (
    <ScrollView
      style={{ backgroundColor: colors.bg }}
      contentContainerStyle={{ paddingTop: insets.top + 8, paddingBottom: 32 }}
      showsVerticalScrollIndicator={false}
    >
      {/* Top bar */}
      <View style={styles.topbar}>
        <View style={styles.brandRow}>
          <View style={styles.brandMark}>
            <Ionicons name="cube" size={18} color={colors.white} />
          </View>
          <Text style={styles.brandName}>Jastipin</Text>
        </View>
        <View style={styles.topRight}>
          <Pressable style={styles.bell} hitSlop={8} onPress={() => navigation.navigate("Notifications")}>
            <Ionicons name="notifications-outline" size={22} color={colors.ink} />
            {unreadCount > 0 ? (
              <View style={styles.bellBadge}>
                <Text style={styles.bellBadgeText}>{unreadCount > 9 ? "9+" : unreadCount}</Text>
              </View>
            ) : null}
          </Pressable>
          {isSignedIn ? (
            <Pressable hitSlop={8} onPress={() => navigation.navigate("Profil")}>
              {user?.picture ? (
                <Image source={{ uri: user.picture }} style={styles.topAva} />
              ) : (
                <View style={[styles.topAva, styles.topAvaFallback]}>
                  <Text style={styles.topAvaText}>{(firstName?.[0] || "J").toUpperCase()}</Text>
                </View>
              )}
            </Pressable>
          ) : null}
        </View>
      </View>

      {/* Sapaan + search */}
      <View style={styles.pad}>
        <Text style={styles.greeting}>{greeting}</Text>
        <View style={styles.search}>
          <Ionicons name="search-outline" size={18} color={colors.muted} />
          <TextInput
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder={t("home.search_placeholder")}
            placeholderTextColor={colors.muted}
            style={styles.searchInput}
          />
          {searchQuery ? (
            <Pressable hitSlop={8} onPress={() => setSearchQuery("")}>
              <Ionicons name="close-circle" size={18} color={colors.muted} />
            </Pressable>
          ) : null}
        </View>
      </View>

      {/* Ajakan login (hanya saat belum masuk dan tidak sedang search) */}
      {!isSignedIn && !searchQuery ? (
        <View style={[styles.pad, { marginTop: spacing.md }]}>
          <View style={styles.signinCard}>
            <View style={styles.signinHead}>
              <View style={styles.signinMark}>
                <Ionicons name="person-circle-outline" size={22} color={colors.brand} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.signinTitle}>{t("home.signin_title")}</Text>
                <Text style={styles.signinDesc}>{t("home.signin_desc")}</Text>
              </View>
            </View>
            <Pressable
              onPress={signInWithGoogle}
              disabled={signingIn}
              style={({ pressed }) => [styles.googleBtn, pressed && { opacity: 0.9 }, signingIn && { opacity: 0.7 }]}
            >
              {signingIn ? (
                <ActivityIndicator color={colors.ink} />
              ) : (
                <>
                  <Ionicons name="logo-google" size={19} color="#ea4335" />
                  <Text style={styles.googleText}>{t("home.google_btn")}</Text>
                </>
              )}
            </Pressable>
          </View>
        </View>
      ) : null}

      {/* Sembunyikan hero/stats/cara-kerja saat user sedang search */}
      {!searchQuery ? (
        <>
          {/* Hero */}
          <View style={[styles.pad, { marginTop: spacing.md }]}>
            <ImageBackground
              source={require("../../assets/hero.jpg")}
              style={styles.hero}
              imageStyle={{ borderRadius: radius.lg }}
            >
              <View style={styles.heroOverlay}>
                <Text style={styles.heroTitle}>Titip barang favoritmu, dari mana pun</Text>
                <Text style={styles.heroSub}>Aman, transparan, ada update di tiap langkah.</Text>
                <Button
                  label={t("home.hero_btn")}
                  icon="logo-whatsapp"
                  onPress={() => openWhatsApp()}
                  style={{ alignSelf: "flex-start", marginTop: 14 }}
                />
              </View>
            </ImageBackground>
          </View>

          {/* Stats */}
          <View style={[styles.pad, styles.statsRow]}>
            {aboutContent.stats.map((s, i) => (
              <View key={s.label} style={[styles.stat, i < aboutContent.stats.length - 1 && styles.statDivider]}>
                <Text style={styles.statValue}>{s.value}</Text>
                <Text style={styles.statLabel}>{s.label}</Text>
              </View>
            ))}
          </View>

          {/* Cara kerja */}
          <View style={[styles.pad, { marginTop: spacing.xl }]}>
            <SectionHeader title={t("home.how_it_works")} />
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: spacing.md, gap: 12 }}
          >
            {steps.map((step) => (
              <View key={step.id} style={styles.stepCard}>
                <View style={styles.stepNo}>
                  <Text style={styles.stepNoText}>{step.id}</Text>
                </View>
                <Text style={styles.stepTitle}>{step.title}</Text>
                <Text style={styles.stepDesc}>{step.desc}</Text>
              </View>
            ))}
          </ScrollView>
        </>
      ) : null}

      {/* Kategori populer */}
      <View style={[styles.pad, { marginTop: spacing.xl }]}>
        <SectionHeader
          title={t("home.popular_categories")}
          action={!searchQuery ? t("home.see_all") : null}
          onAction={() => navigation.navigate("Kategori")}
        />
      </View>

      {filteredCategories.length === 0 ? (
        <View style={[styles.pad, { paddingVertical: spacing.lg }]}>
          <Text style={styles.noResults}>{t("home.no_results")}</Text>
        </View>
      ) : (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: spacing.md, gap: 12 }}
        >
          {filteredCategories.map((cat) => (
            <Pressable key={cat.id} style={styles.catCard} onPress={() => goToCategory(cat)}>
              <Image source={cat.image} style={styles.catImg} />
              <View style={styles.catBody}>
                <Text style={styles.catName} numberOfLines={1}>
                  {cat.name}
                </Text>
                <Text style={styles.catBlurb} numberOfLines={2}>
                  {cat.blurb}
                </Text>
              </View>
            </Pressable>
          ))}
        </ScrollView>
      )}

      {/* Sembunyikan promo/testimonial saat search */}
      {!searchQuery ? (
        <>
          {/* Promo banner */}
          <View style={[styles.pad, { marginTop: spacing.xl }]}>
            <View style={styles.promo}>
              <View style={{ flex: 1, paddingRight: 12 }}>
                <Text style={styles.promoTitle}>{t("home.promo_title")}</Text>
                <Text style={styles.promoSub}>{t("home.promo_sub")}</Text>
              </View>
              <Button label={t("home.chat_btn")} icon="logo-whatsapp" onPress={() => openWhatsApp()} />
            </View>
          </View>

          {/* Testimonial */}
          <View style={[styles.pad, { marginTop: spacing.xl }]}>
            <View style={styles.quote}>
              <Ionicons name="chatbubble-ellipses" size={22} color={colors.brand} />
              <Text style={styles.quoteText}>"{testimonial.quote}"</Text>
              <View style={styles.quoteFoot}>
                <View style={styles.ava}>
                  <Text style={styles.avaText}>{testimonial.initials}</Text>
                </View>
                <View>
                  <Text style={styles.quoteName}>{testimonial.name}</Text>
                  <Text style={styles.quoteCity}>{testimonial.city}</Text>
                </View>
              </View>
            </View>
          </View>
        </>
      ) : null}
    </ScrollView>
  );
}

function makeStyles(colors) {
  return StyleSheet.create({
    pad: { paddingHorizontal: spacing.md },
    topbar: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: spacing.md,
      marginBottom: spacing.md,
    },
    brandRow: { flexDirection: "row", alignItems: "center", gap: 9 },
    brandMark: {
      width: 32,
      height: 32,
      borderRadius: 10,
      backgroundColor: colors.brand,
      alignItems: "center",
      justifyContent: "center",
    },
    brandName: { fontSize: 18, fontWeight: "800", color: colors.ink, letterSpacing: -0.3 },
    bell: {
      width: 40,
      height: 40,
      borderRadius: 12,
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.line,
      alignItems: "center",
      justifyContent: "center",
    },
    greeting: { fontSize: 24, fontWeight: "800", color: colors.ink, letterSpacing: -0.5, marginBottom: 14 },
    search: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.line,
      borderRadius: radius.pill,
      paddingHorizontal: 16,
      height: 48,
    },
    searchInput: { flex: 1, color: colors.ink, fontSize: 15 },
    noResults: { fontSize: 14.5, color: colors.muted, textAlign: "center" },
    hero: { height: 210, justifyContent: "flex-end" },
    heroOverlay: {
      backgroundColor: "rgba(10,30,24,0.42)",
      borderRadius: radius.lg,
      padding: spacing.lg,
      flex: 1,
      justifyContent: "flex-end",
    },
    heroTitle: { color: colors.white, fontSize: 22, fontWeight: "800", letterSpacing: -0.4 },
    heroSub: { color: "rgba(255,255,255,0.9)", fontSize: 13.5, marginTop: 6 },
    statsRow: {
      flexDirection: "row",
      backgroundColor: colors.brand,
      borderRadius: radius.md,
      marginTop: spacing.md,
      paddingVertical: spacing.md,
      ...shadow.card,
    },
    stat: { flex: 1, alignItems: "center" },
    statDivider: { borderRightWidth: 1, borderRightColor: "rgba(255,255,255,0.18)" },
    statValue: { color: colors.white, fontSize: 20, fontWeight: "800" },
    statLabel: { color: "rgba(255,255,255,0.82)", fontSize: 12, marginTop: 2 },
    stepCard: {
      width: 175,
      backgroundColor: colors.surface,
      borderRadius: radius.md,
      borderWidth: 1,
      borderColor: colors.line,
      padding: spacing.md,
      ...shadow.card,
    },
    stepNo: {
      width: 28,
      height: 28,
      borderRadius: 9,
      backgroundColor: colors.brandSoft,
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 10,
    },
    stepNoText: { color: colors.brand, fontWeight: "800" },
    stepTitle: { fontSize: 15, fontWeight: "700", color: colors.ink, marginBottom: 4 },
    stepDesc: { fontSize: 13, color: colors.muted, lineHeight: 18 },
    catCard: {
      width: 220,
      backgroundColor: colors.surface,
      borderRadius: radius.md,
      borderWidth: 1,
      borderColor: colors.line,
      overflow: "hidden",
      ...shadow.card,
    },
    catImg: { width: 220, height: 120 },
    catBody: { padding: spacing.md },
    catName: { fontSize: 15, fontWeight: "700", color: colors.ink },
    catBlurb: { fontSize: 12.5, color: colors.muted, marginTop: 3, lineHeight: 17 },
    promo: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: colors.tint,
      borderRadius: radius.md,
      padding: spacing.md,
    },
    promoTitle: { fontSize: 16, fontWeight: "800", color: colors.ink },
    promoSub: { fontSize: 13, color: colors.muted, marginTop: 3, lineHeight: 18 },
    quote: {
      backgroundColor: colors.surface,
      borderRadius: radius.md,
      borderWidth: 1,
      borderColor: colors.line,
      padding: spacing.lg,
      ...shadow.card,
    },
    quoteText: { fontSize: 15, color: colors.ink, lineHeight: 22, marginTop: 10 },
    quoteFoot: { flexDirection: "row", alignItems: "center", gap: 12, marginTop: 16 },
    ava: {
      width: 42,
      height: 42,
      borderRadius: 21,
      backgroundColor: colors.brandSoft,
      alignItems: "center",
      justifyContent: "center",
    },
    avaText: { color: colors.brand, fontWeight: "800", fontSize: 14 },
    quoteName: { fontSize: 14, fontWeight: "700", color: colors.ink },
    quoteCity: { fontSize: 12.5, color: colors.muted },
    signinCard: {
      backgroundColor: colors.surface,
      borderRadius: radius.md,
      borderWidth: 1,
      borderColor: colors.line,
      padding: spacing.md,
      ...shadow.card,
    },
    signinHead: { flexDirection: "row", alignItems: "center", gap: 12 },
    signinMark: {
      width: 40,
      height: 40,
      borderRadius: 12,
      backgroundColor: colors.brandSoft,
      alignItems: "center",
      justifyContent: "center",
    },
    signinTitle: { fontSize: 15, fontWeight: "800", color: colors.ink },
    signinDesc: { fontSize: 12.5, color: colors.muted, marginTop: 3, lineHeight: 18 },
    topRight: { flexDirection: "row", alignItems: "center", gap: 12 },
    bellBadge: {
      position: "absolute",
      top: -4,
      right: -4,
      minWidth: 17,
      height: 17,
      borderRadius: 9,
      paddingHorizontal: 4,
      backgroundColor: colors.accent,
      alignItems: "center",
      justifyContent: "center",
      borderWidth: 1.5,
      borderColor: colors.bg,
    },
    bellBadgeText: { color: colors.white, fontSize: 10, fontWeight: "800" },
    topAva: { width: 34, height: 34, borderRadius: 17, backgroundColor: colors.tint },
    topAvaFallback: { backgroundColor: colors.brand, alignItems: "center", justifyContent: "center" },
    topAvaText: { color: colors.white, fontWeight: "800", fontSize: 14 },
    googleBtn: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 10,
      backgroundColor: colors.bg,
      borderRadius: radius.pill,
      borderWidth: 1.5,
      borderColor: colors.line,
      paddingVertical: 13,
      marginTop: spacing.md,
    },
    googleText: { fontSize: 15, fontWeight: "700", color: colors.ink },
  });
}
