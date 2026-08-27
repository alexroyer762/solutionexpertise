"use client";

import { Suspense, useCallback, useEffect, useRef, useState } from "react";
import { AvatarCall } from "@runwayml/avatars-react";
import "@runwayml/avatars-react/styles.css";
import styles from "./NoahAvatar.module.scss";

const NOAH_ID = "e1aa926d-857e-42b9-833f-ce4429bebc70";
const NOAH_ENABLED = true;

interface SessionInfo {
  sessionId:      string;
  sessionKey:     string;
  allowedSeconds: number; // quota remaining for this IP
}

function formatTime(s: number) {
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${m}:${sec.toString().padStart(2, "0")}`;
}

function formatCooldown(s: number) {
  if (s >= 3600) {
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    return m > 0 ? `${h}h ${m}min` : `${h}h`;
  }
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return m > 0 ? `${m}min ${sec}s` : `${sec}s`;
}

export default function NoahAvatar() {
  const [isOpen,       setIsOpen]       = useState(false);
  const [session,      setSession]      = useState<SessionInfo | null>(null);
  const [isCreating,   setIsCreating]   = useState(false);
  const [error,        setError]        = useState<string | null>(null);
  const [timeLeft,     setTimeLeft]     = useState(0);
  const [cooldownLeft, setCooldownLeft] = useState(0);

  const timerRef      = useRef<ReturnType<typeof setInterval> | null>(null);
  const cooldownRef   = useRef<ReturnType<typeof setInterval> | null>(null);
  const callStartRef  = useRef<number>(0); // timestamp when call became active

  // Report actual seconds used to the server
  const reportDone = useCallback((allowedSeconds: number) => {
    const usedSeconds = Math.round((Date.now() - callStartRef.current) / 1000);
    const clamped = Math.min(usedSeconds, allowedSeconds);
    fetch("/api/avatar/done", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ usedSeconds: clamped }),
    }).catch(() => {});
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
    setSession(null);
    setIsCreating(false);
    setError(null);
    setTimeLeft(0);
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const startCooldownDisplay = useCallback((seconds: number) => {
    setCooldownLeft(seconds);
    if (cooldownRef.current) clearInterval(cooldownRef.current);
    cooldownRef.current = setInterval(() => {
      setCooldownLeft((prev) => {
        if (prev <= 1) {
          clearInterval(cooldownRef.current!);
          cooldownRef.current = null;
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, []);

  // Start countdown once session is active
  useEffect(() => {
    if (!session) return;
    callStartRef.current = Date.now();
    setTimeLeft(session.allowedSeconds);

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          // Quota exhausted — report full allowedSeconds used
          reportDone(session.allowedSeconds);
          closeModal();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [session, closeModal, reportDone]);

  async function startCall() {
    if (cooldownLeft > 0) return;
    setIsOpen(true);
    setIsCreating(true);
    setError(null);
    try {
      const res = await fetch("/api/avatar/connect", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ avatarId: NOAH_ID }),
      });

      if (res.status === 429) {
        const { secondsLeft } = await res.json();
        startCooldownDisplay(secondsLeft);
        setError(`cooldown:${secondsLeft}`);
        setIsCreating(false);
        return;
      }

      if (!res.ok) throw new Error(`Erreur serveur: ${res.status}`);
      const data: SessionInfo = await res.json();
      setSession(data);
    } catch {
      setError("Impossible de démarrer la session. Réessayez.");
      setIsCreating(false);
    }
  }

  // User clicks end-call button → report actual time used
  function handleEnd() {
    if (session) reportDone(session.allowedSeconds);
    closeModal();
  }

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleEnd();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, session]);

  const isWarning = timeLeft > 0 && timeLeft <= 30 && !!session;

  if (!NOAH_ENABLED) return null;

  return (
    <>
      <button
        className={styles.floatingBtn}
        onClick={startCall}
        aria-label="Parler avec Noah"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
        <span>Parler avec Noah</span>
      </button>

      {isOpen && (
        <div
          className={styles.overlay}
          onClick={handleEnd}
          role="dialog"
          aria-modal="true"
          aria-label="Conversation avec Noah"
        >
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <div className={styles.modalTitle}>
                <span className={styles.statusDot} />
                Noah — Assistant SolutionExpertise
              </div>
              <div className={styles.headerRight}>
                {session && timeLeft > 0 && (
                  <span className={`${styles.timer} ${isWarning ? styles.timerWarning : ""}`}>
                    {formatTime(timeLeft)}
                  </span>
                )}
                <button className={styles.closeBtn} onClick={handleEnd} aria-label="Fermer">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <div className={styles.callArea}>
              {error?.startsWith("cooldown:") ? (
                <div className={styles.errorState}>
                  <div className={styles.cooldownIcon}>
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12,6 12,12 16,14" />
                    </svg>
                  </div>
                  <p className={styles.cooldownTitle}>Limite atteinte</p>
                  <p className={styles.cooldownMsg}>
                    Vous pourrez relancer un appel dans
                  </p>
                  <span className={styles.cooldownTimer}>
                    {formatCooldown(cooldownLeft)}
                  </span>
                  <button className={styles.retryBtn} onClick={closeModal}>
                    Fermer
                  </button>
                </div>
              ) : error ? (
                <div className={styles.errorState}>
                  <p>{error}</p>
                  <button className={styles.retryBtn} onClick={startCall}>
                    Réessayer
                  </button>
                </div>
              ) : session ? (
                <Suspense fallback={
                  <div className={styles.loadingState}>
                    <span className={styles.spinner} />
                    Connexion en cours…
                  </div>
                }>
                  <AvatarCall
                    avatarId={NOAH_ID}
                    sessionId={session.sessionId}
                    sessionKey={session.sessionKey}
                    onEnd={handleEnd}
                    onError={() => setError("La connexion a été interrompue.")}
                  />
                </Suspense>
              ) : (
                <div className={styles.loadingState}>
                  <span className={styles.spinner} />
                  Démarrage de la session…
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
