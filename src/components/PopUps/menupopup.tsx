"use client";

import { useState } from "react";

export default function Menupopup() {
  const [modal, setModal] = useState(false);
  const toggleMenu = () => {
    setModal(!modal);
  };

  return (
    <button
      onClick={toggleMenu}
      style={{
        backgroundColor: "blue",
        height: "50px",
        width: "100px",
      }}
    >
      MENU PRICES
    </button>
  );
}
