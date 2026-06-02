"use client";

import { useEffect, useState } from "react";
import styles from "./SubmitCasePortal.module.scss";

const PORTAL_URL =
  "https://solutionexpertise.zohocreatorportal.ca/#Form:D_p_t";

const labels = {
  fr: {
    loading: "Chargement du formulaire…",
    openBtn: "Ouvrir le portail →",
    notice:
      "Notre portail Zoho Creator s'ouvre dans un nouvel onglet pour une meilleure expérience.",
    iframeTitle: "Déposer un dossier – Portail SolutionExpertise",
  },
  en: {
    loading: "Loading the form…",
    openBtn: "Open the portal →",
    notice:
      "Our Zoho Creator portal opens in a new tab for the best experience.",
    iframeTitle: "Submit a Case File – SolutionExpertise Portal",
  },
};

interface Props {
  lang: "fr" | "en";
}

export default function SubmitCasePortal({ lang }: Props) {
  const [canEmbed, setCanEmbed] = useState<boolean | null>(null);
  const t = labels[lang];

  useEffect(() => {
    fetch("/api/check-iframe")
      .then((r) => r.json())
      .then((data) => setCanEmbed(data.canEmbed))
      .catch(() => setCanEmbed(false));
  }, []);

  if (canEmbed === null) {
    return (
      <div className={styles.loading}>
        <span className={styles.spinner} />
        {t.loading}
      </div>
    );
  }

  if (canEmbed) {
    return (
      <div className={styles.iframeWrapper}>
        <iframe
          src={PORTAL_URL}
          width="100%"
          height="900"
          frameBorder="0"
          allow="camera; microphone"
          title={t.iframeTitle}
        />
      </div>
    );
  }

  return (
    <div className={styles.fallback}>
      <div className={styles.fallbackIcon}>
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14,2 14,8 20,8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
          <polyline points="10,9 9,9 8,9" />
        </svg>
      </div>
      <p className={styles.fallbackNotice}>{t.notice}</p>
      <a
        href={PORTAL_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.portalBtn}
      >
        {t.openBtn}
      </a>
    </div>
  );
}
