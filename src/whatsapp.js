import { Linking, Alert } from "react-native";
import { WHATSAPP_NUMBER } from "./theme";

export function openWhatsApp(message = "Halo Jastipin, saya mau nitip barang") {
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  Linking.openURL(url).catch(() => {
    Alert.alert(
      "Tidak bisa membuka WhatsApp",
      "Pastikan WhatsApp terpasang, atau hubungi kami di " + WHATSAPP_NUMBER
    );
  });
}
