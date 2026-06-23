import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ImageBackground,
  Image,
  Pressable,
  TextInput,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

import { colors, radius, spacing, shadow } from "../theme";
import { categories, steps, stats, testimonial } from "../data";
import Button from "../components/Button";
import SectionHeader from "../components/SectionHeader";
import { openWhatsApp } from "../whatsapp";

export default function HomeScreen({ navigation }) {
  const insets = useSafeAreaInsets();

  const goToCategory = (cat) =>
    navigation.navigate("Kategori", {
      screen: "CategoryDetail",
      params: { id: cat.id, title: cat.name },
    });

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
        <Pressable style={styles.bell} hitSlop={8}>
          <Ionicons name="notifications-outline" size={22} color={colors.ink} />
        </Pressable>
      </View>

      {/* Greeting + search */}
      <View style={styles.pad}>
        <Text style={styles.greeting}>Mau titip apa hari ini?</Text>
        <View style={styles.search}>
          <Ionicons name="search-outline" size={18} color={colors.muted} />
          <TextInput
            placeholder="Cari barang atau tempel link toko"
            placeholderTextColor={colors.muted}
            style={styles.searchInput}
          />
        </View>
      </View>

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
              label="Mulai Nitip"
              icon="logo-whatsapp"
              onPress={() => openWhatsApp()}
              style={{ alignSelf: "flex-start", marginTop: 14 }}
            />
          </View>
        </ImageBackground>
      </View>

      {/* Stats */}
      <View style={[styles.pad, styles.statsRow]}>
        {stats.map((s, i) => (
          <View key={s.label} style={[styles.stat, i < stats.length - 1 && styles.statDivider]}>
            <Text style={styles.statValue}>{s.value}</Text>
            <Text style={styles.statLabel}>{s.label}</Text>
          </View>
        ))}
      </View>

      {/* Cara kerja */}
      <View style={[styles.pad, { marginTop: spacing.xl }]}>
        <SectionHeader title="Cara kerja" />
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

      {/* Kategori populer */}
      <View style={[styles.pad, { marginTop: spacing.xl }]}>
        <SectionHeader
          title="Kategori populer"
          action="Lihat semua"
          onAction={() => navigation.navigate("Kategori")}
        />
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: spacing.md, gap: 12 }}
      >
        {categories.map((cat) => (
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

      {/* Promo banner */}
      <View style={[styles.pad, { marginTop: spacing.xl }]}>
        <View style={styles.promo}>
          <View style={{ flex: 1, paddingRight: 12 }}>
            <Text style={styles.promoTitle}>Ada barang incaran?</Text>
            <Text style={styles.promoSub}>Chat kami, dapatkan rincian harga tanpa komitmen.</Text>
          </View>
          <Button label="Chat" icon="logo-whatsapp" onPress={() => openWhatsApp()} />
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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
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
  catImg: { width: "100%", height: 120 },
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
});
