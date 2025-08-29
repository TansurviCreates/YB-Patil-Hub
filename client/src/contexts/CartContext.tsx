import React, { createContext, useContext, useEffect, useState } from 'react';

export interface CartItem {
  id: string;
  name: string;
  price: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  cartCount: number;
  subtotal: number;
  discount: number;
  total: number;
  applyDiscount: boolean;
  setApplyDiscount: (apply: boolean) => void;
}

const CartContext = createContext<CartContextType>({
  cart: [],
  addToCart: () => {},
  removeFromCart: () => {},
  clearCart: () => {},
  cartCount: 0,
  subtotal: 0,
  discount: 0,
  total: 0,
  applyDiscount: false,
  setApplyDiscount: () => {},
});

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('cart');
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });
  
  const [applyDiscount, setApplyDiscount] = useState(false);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item: CartItem) => {
    setCart(prev => {
      const exists = prev.find(cartItem => cartItem.id === item.id);
      if (!exists) {
        return [...prev, item];
      }
      return prev;
    });
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartCount = cart.length;
  const subtotal = cart.reduce((sum, item) => sum + item.price, 0);
  const discount = applyDiscount ? Math.round(subtotal * 0.1) : 0;
  const total = subtotal - discount;

  const value = {
    cart,
    addToCart,
    removeFromCart,
    clearCart,
    cartCount,
    subtotal,
    discount,
    total,
    applyDiscount,
    setApplyDiscount,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
