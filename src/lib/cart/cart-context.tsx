"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export type CartLine = {
  id: string; // product slug
  name: string;
  price: number;
  qty: number;
};

type AddToCartInput = Omit<CartLine, "qty">;

type CartContextValue = {
  lines: CartLine[];
  addToCart: (product: AddToCartInput, qty?: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  totalCount: number;
  totalPrice: number;
  isReady: boolean;
};

const CartContext = createContext<CartContextValue | null>(null);
const CART_KEY = "ccuk_cart";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(CART_KEY);
      if (raw) setLines(JSON.parse(raw));
    } catch {
      // ignore malformed storage
    }
    setIsReady(true);
  }, []);

  useEffect(() => {
    if (!isReady) return;
    localStorage.setItem(CART_KEY, JSON.stringify(lines));
  }, [lines, isReady]);

  const addToCart = useCallback((product: AddToCartInput, qty = 1) => {
    setLines((prev) => {
      const existing = prev.find((l) => l.id === product.id);
      if (existing) {
        return prev.map((l) =>
          l.id === product.id ? { ...l, qty: l.qty + qty } : l
        );
      }
      return [...prev, { ...product, qty }];
    });
  }, []);

  const removeFromCart = useCallback((id: string) => {
    setLines((prev) => prev.filter((l) => l.id !== id));
  }, []);

  const clearCart = useCallback(() => setLines([]), []);

  const totalCount = useMemo(
    () => lines.reduce((sum, l) => sum + l.qty, 0),
    [lines]
  );

  const totalPrice = useMemo(
    () => lines.reduce((sum, l) => sum + l.price * l.qty, 0),
    [lines]
  );

  const value: CartContextValue = {
    lines,
    addToCart,
    removeFromCart,
    clearCart,
    totalCount,
    totalPrice,
    isReady,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
