// Store lokal untuk pesanan, alamat, metode pembayaran, dan notifikasi.
// Alamat/pembayaran/notifikasi tersimpan di perangkat (AsyncStorage).
// Pesanan dijaga sebagai state hidup (di-seed tiap aplikasi dibuka) supaya
// simulasi update real-time selalu segar. Tanpa backend.

import React, { createContext, useContext, useEffect, useRef, useState, useCallback } from "react";
import { loadJSON, saveJSON, STORAGE_KEYS } from "../storage";
import {
  seedAddresses,
  seedPayments,
  seedNotifications,
  seedOrders,
  ORDER_STAGES,
  ORDER_TOTAL_STEPS,
  statusForStep,
  orderStatusMeta,
} from "../data";

const StoreContext = createContext(null);

// Seberapa sering status pesanan maju satu tahap (simulasi real-time).
const SIM_INTERVAL_MS = 20000;
const MAX_NOTIFICATIONS = 50;

function makeId(prefix) {
  return `${prefix}-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
}

export function StoreProvider({ children }) {
  const [orders, setOrders] = useState(seedOrders);
  const [addresses, setAddresses] = useState([]);
  const [payments, setPayments] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    (async () => {
      const a = await loadJSON(STORAGE_KEYS.addresses, null);
      const p = await loadJSON(STORAGE_KEYS.payments, null);
      const n = await loadJSON(STORAGE_KEYS.notifications, null);
      setAddresses(a ?? seedAddresses);
      setPayments(p ?? seedPayments);
      setNotifications(n ?? seedNotifications);
      setReady(true);
    })();
  }, []);

  useEffect(() => {
    if (ready) saveJSON(STORAGE_KEYS.addresses, addresses);
  }, [addresses, ready]);
  useEffect(() => {
    if (ready) saveJSON(STORAGE_KEYS.payments, payments);
  }, [payments, ready]);
  useEffect(() => {
    if (ready) saveJSON(STORAGE_KEYS.notifications, notifications);
  }, [notifications, ready]);

  // ----- Notifikasi -----
  const addNotification = useCallback((n) => {
    setNotifications((prev) =>
      [{ id: makeId("n"), read: false, ts: Date.now(), time: "Baru saja", ...n }, ...prev].slice(0, MAX_NOTIFICATIONS)
    );
  }, []);

  const markNotificationRead = useCallback((id) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  }, []);

  const markAllNotificationsRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  }, []);

  const unreadCount = notifications.filter((n) => !n.read).length;

  // ----- Pesanan + simulasi real-time -----
  const findOrder = useCallback((id) => orders.find((o) => o.id === id) || null, [orders]);

  // Jaga referensi pesanan terkini untuk dipakai di interval.
  const ordersRef = useRef(orders);
  useEffect(() => {
    ordersRef.current = orders;
  }, [orders]);

  const advanceOrder = useCallback(
    (id) => {
      const target = ordersRef.current.find((o) => o.id === id);
      if (!target || target.currentStep >= ORDER_TOTAL_STEPS) return;
      const nextStep = target.currentStep + 1;
      const newStatus = statusForStep(nextStep);
      const stageTitle = ORDER_STAGES[nextStep - 1];
      setOrders((prev) =>
        prev.map((o) =>
          o.id === id
            ? { ...o, currentStep: nextStep, status: newStatus, eta: newStatus === "selesai" ? null : o.eta }
            : o
        )
      );
      addNotification({
        orderId: id,
        icon: orderStatusMeta[newStatus]?.icon || "notifications-outline",
        title: stageTitle,
        body: `${id} (${target.item}): ${stageTitle.toLowerCase()}.`,
      });
    },
    [addNotification]
  );

  // Timer simulasi: majukan satu pesanan yang masih berjalan tiap interval.
  useEffect(() => {
    const timer = setInterval(() => {
      const next = ordersRef.current.find(
        (o) => o.currentStep < ORDER_TOTAL_STEPS && (o.status === "diproses" || o.status === "dikirim")
      );
      if (next) advanceOrder(next.id);
    }, SIM_INTERVAL_MS);
    return () => clearInterval(timer);
  }, [advanceOrder]);

  // ----- Alamat -----
  const upsertAddress = useCallback((addr) => {
    setAddresses((prev) => {
      const exists = addr.id && prev.some((x) => x.id === addr.id);
      let next;
      if (exists) {
        next = prev.map((x) => (x.id === addr.id ? { ...x, ...addr } : x));
      } else {
        next = [...prev, { ...addr, id: makeId("addr") }];
      }
      if (addr.isDefault) {
        next = next.map((x) => ({ ...x, isDefault: x.id === (addr.id || next[next.length - 1].id) }));
      }
      if (!next.some((x) => x.isDefault) && next.length) next[0].isDefault = true;
      return next;
    });
  }, []);

  const removeAddress = useCallback((id) => {
    setAddresses((prev) => {
      const next = prev.filter((x) => x.id !== id);
      if (!next.some((x) => x.isDefault) && next.length) next[0].isDefault = true;
      return next;
    });
  }, []);

  const setDefaultAddress = useCallback((id) => {
    setAddresses((prev) => prev.map((x) => ({ ...x, isDefault: x.id === id })));
  }, []);

  // ----- Pembayaran -----
  const addPayment = useCallback((pay) => {
    setPayments((prev) => {
      const makeDefault = prev.length === 0 || pay.isDefault;
      let next = [...prev, { ...pay, id: makeId("pay"), isDefault: !!makeDefault }];
      if (makeDefault) next = next.map((x) => ({ ...x, isDefault: x.id === next[next.length - 1].id }));
      return next;
    });
  }, []);

  const removePayment = useCallback((id) => {
    setPayments((prev) => {
      const next = prev.filter((x) => x.id !== id);
      if (!next.some((x) => x.isDefault) && next.length) next[0].isDefault = true;
      return next;
    });
  }, []);

  const setDefaultPayment = useCallback((id) => {
    setPayments((prev) => prev.map((x) => ({ ...x, isDefault: x.id === id })));
  }, []);

  const value = {
    ready,
    orders,
    findOrder,
    advanceOrder,
    addresses,
    payments,
    notifications,
    unreadCount,
    addNotification,
    markNotificationRead,
    markAllNotificationsRead,
    upsertAddress,
    removeAddress,
    setDefaultAddress,
    addPayment,
    removePayment,
    setDefaultPayment,
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore harus dipakai di dalam StoreProvider");
  return ctx;
}
