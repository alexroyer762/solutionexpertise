"use client";

import { useState, useEffect } from "react";
import styles from "./CookieConsent.module.scss";

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Add a small delay to ensure hydration is complete
    const timer = setTimeout(() => {
      const hasAccepted = localStorage.getItem("cookiesAccepted");
      if (!hasAccepted) {
        setIsVisible(true);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookiesAccepted", "true");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className={styles.cookieConsent}>
      <p>
        Nous utilisons des témoins pour optimiser votre expérience. En
        poursuivant votre navigation, vous acceptez leur utilisation.
      </p>
      <div className={styles.buttonGroup}>
        <button className={styles.acceptButton} onClick={handleAccept}>
          Accepter
        </button>
        <button className={styles.moreButton} onClick={handleAccept}>
          En savoir plus
        </button>
      </div>
    </div>
  );
}
