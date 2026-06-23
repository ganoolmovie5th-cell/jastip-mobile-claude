// Store lokal untuk alamat & metode pembayaran.
// Data tersimpan di perangkat (AsyncStorage). Tanpa backend.

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { loadJSON, saveJSON, STORAGE_KEYS } from "../storage";
import { seedAddresses, seedPayments, seedNotifications } from "../data";

const StoreContext = createContext(null);

function makeId(prefix) {
  return `${prefix}-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
}

export function StoreProvider({ children }) {
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

  // Simpan tiap kali berubah (setelah data awal siap).
  useEffect(() => {
    if (ready) saveJSON(STORAGE_KEYS.addresses, addresses);
  }, [addresses, ready]);
  useEffect(() => {
    if (ready) saveJSON(STORAGE_KEYS.payments, payments);
  }, [payments, ready]);
  useEffect(() => {
    if (ready) saveJSON(STORAGE_KEYS.notifications, notifications);
  }, [notifications, ready]);

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
      // Pastikan hanya satu default.
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
      if (makeDefault) next = next.map((x, i) => ({ ...x, isDefault: x.id === next[next.length - 1].id }));
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

  // ----- Notifikasi -----
  const markNotificationRead = useCallback((id) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  }, []);

  const markAllNotificationsRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  }, []);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const value = {
    ready,
    addresses,
    payments,
    notifications,
    unreadCount,
    upsertAddress,
    removeAddress,
    setDefaultAddress,
    addPayment,
    removePayment,
    setDefaultPayment,
    markNotificationRead,
    markAllNotificationsRead,
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore harus dipakai di dalam StoreProvider");
  return ctx;
}
