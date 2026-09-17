import React, { createContext, useContext, useState } from "react";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);
  const [wishlistOpen, setWishlistOpen] = useState(false);

  const addToWishlist = (item) => {
    setWishlist((prev) => {
      const alreadyExists = prev.some(
        (wishlistItem) => wishlistItem.id === item.id
      );

      if (alreadyExists) return prev;

      return [...prev, item];
    });
  };

  const removeFromWishlist = (id) => {
    setWishlist((prev) =>
      prev.filter((item) => item.id !== id)
    );
  };

  const toggleWishlist = (item) => {
    setWishlist((prev) => {
      const exists = prev.some(
        (wishlistItem) => wishlistItem.id === item.id
      );

      if (exists) {
        return prev.filter(
          (wishlistItem) => wishlistItem.id !== item.id
        );
      }

      return [...prev, item];
    });
  };

  const isWishlisted = (id) => {
    return wishlist.some((item) => item.id === id);
  };

  const openWishlist = () => {
    setWishlistOpen(true);
  };

  const closeWishlist = () => {
    setWishlistOpen(false);
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        wishlistOpen,
        addToWishlist,
        removeFromWishlist,
        toggleWishlist,
        isWishlisted,
        openWishlist,
        closeWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  return useContext(WishlistContext);
};