"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export type CartItem = {
  id: string;
  slug: string;
  name: string;
  price: number;
  priceLabel: string;
  image: string;
  size?: string;
  quantity: number;
  /** Product detail base path, e.g. /collections/rings */
  collectionPath?: string;
};

type CartContextValue = {
  items: CartItem[];
  count: number;
  subtotal: number;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addItem: (item: Omit<CartItem, "quantity"> & { quantity?: number }) => void;
  removeItem: (id: string, size?: string) => void;
  updateQuantity: (id: string, quantity: number, size?: string) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "kundan-cart-v1";

function itemKey(id: string, size?: string) {
  return `${id}::${size ?? ""}`;
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw) as CartItem[]);
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, hydrated]);

  const addItem = useCallback(
    (item: Omit<CartItem, "quantity"> & { quantity?: number }) => {
      setItems((prev) => {
        const key = itemKey(item.id, item.size);
        const existing = prev.find(
          (p) => itemKey(p.id, p.size) === key
        );
        if (existing) {
          return prev.map((p) =>
            itemKey(p.id, p.size) === key
              ? { ...p, quantity: p.quantity + (item.quantity ?? 1) }
              : p
          );
        }
        return [...prev, { ...item, quantity: item.quantity ?? 1 }];
      });
      setIsOpen(true);
    },
    []
  );

  const removeItem = useCallback((id: string, size?: string) => {
    setItems((prev) =>
      prev.filter((p) => itemKey(p.id, p.size) !== itemKey(id, size))
    );
  }, []);

  const updateQuantity = useCallback(
    (id: string, quantity: number, size?: string) => {
      if (quantity <= 0) {
        removeItem(id, size);
        return;
      }
      setItems((prev) =>
        prev.map((p) =>
          itemKey(p.id, p.size) === itemKey(id, size)
            ? { ...p, quantity }
            : p
        )
      );
    },
    [removeItem]
  );

  const clearCart = useCallback(() => setItems([]), []);

  const value = useMemo<CartContextValue>(() => {
    const count = items.reduce((sum, i) => sum + i.quantity, 0);
    const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
    return {
      items,
      count,
      subtotal,
      isOpen,
      openCart: () => setIsOpen(true),
      closeCart: () => setIsOpen(false),
      toggleCart: () => setIsOpen((v) => !v),
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
    };
  }, [items, isOpen, addItem, removeItem, updateQuantity, clearCart]);

  return (
    <CartContext.Provider value={value}>{children}</CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
