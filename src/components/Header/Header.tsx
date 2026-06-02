"use client";

import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import styles from "./index.module.scss";
import { Menu, X } from "lucide-react";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

interface HeaderProps {
  lang: string;
}

const Header = ({ lang }: HeaderProps) => {
  console.log(lang);
  const [isSticky, setIsSticky] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef(null);
  const [isAboveViewport, setIsAboveViewport] = useState(false);

  useEffect(() => {
    if (!headerRef.current) return;
    const header = headerRef.current as HTMLElement;
    let lastScrollTop = 0;
    let animationInProgress = false;

    const controlScroll = (disable: boolean) => {
      document.body.style.overflow = disable ? "hidden" : "";
    };

    const handleScroll = () => {
      if (menuOpen) return;

      const scrollTop = window.scrollY;
      const viewportHeight = window.innerHeight;

      if (scrollTop > 10) {
        header.classList.add(styles.sticky);
        setIsSticky(true);
      } else {
        header.classList.remove(styles.sticky);
        setIsSticky(false);
      }

      if (scrollTop > viewportHeight - 50) {
        if (!animationInProgress) {
          animationInProgress = true;
          const targetTop = scrollTop > lastScrollTop ? "-100%" : window.innerWidth <= 1100 ? "0" : "1rem";
          gsap.to(header, {
            top: targetTop,
            duration: 0.6,
            ease: "power3.inOut",
            onComplete: () => {
              animationInProgress = false;
              if (targetTop === "-100%") {
                header.classList.remove(styles.sticky);
              }
            },
            onInterrupt: () => {
              animationInProgress = false;
              header.classList.add(styles.sticky);
            },
          });
        }
      } else {
        if (!animationInProgress) {
          animationInProgress = true;
          gsap.to(header, {
            top: window.innerWidth <= 1100 ? "0" : "1rem",
            duration: 0.6,
            ease: "power3.inOut",
            onComplete: () => {
              animationInProgress = false;
            },
            onInterrupt: () => {
              animationInProgress = false;
              header.classList.add(styles.sticky);
            },
          });
        }
      }

      lastScrollTop = scrollTop;
    };

    window.addEventListener("scroll", handleScroll);

    controlScroll(menuOpen);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      controlScroll(false);
    };
  }, [menuOpen]);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <div className={`${styles.navbar} ${isSticky ? styles.sticky : ""}`} ref={headerRef}>
      <div className={styles.container}>
        <nav className={styles.row}>
          <div className="mainLogo">
            <Link href="/">
              {isSticky ? (
                <Image alt="Solution Expertise" src="/media/logo/solexp_logo_allwhite.png" width={188} height={57} priority className={styles.logo} />
              ) : (
                <Image alt="Solution Expertise" src="/media/logo/solexp_logo_white_normal.png" width={250} height={76} priority className={styles.logo} />
              )}
            </Link>
          </div>
          <div className={styles.menu}>
            <ul className={styles.navItems}>
              <li className={styles.navItem}>
                <Link href="/services" className={styles.navLink}>
                  Services
                </Link>
              </li>
              <li className={styles.navItem}>
                <Link href="/about-us" className={styles.navLink}>
                  À propos
                </Link>
              </li>
              <li className={styles.navItem}>
                <Link href="/become-expert" className={styles.navLink}>
                  Devenir expert
                </Link>
              </li>
              <li className={styles.navItem}>
                <Link href="/contact-us" className={styles.navLink}>
                  Contact
                </Link>
              </li>
              <li className={styles.navItem}>
                <Link
                  href={lang === "en" ? "/en/submit-a-case" : "/fr/deposer-un-dossier"}
                  className={`${styles.navLink} ${styles.submitCaseNavLink}`}
                >
                  {lang === "en" ? "Submit a Case File" : "Déposer un dossier"}
                </Link>
              </li>
            </ul>
            <div className={styles.navItemBtn}>
              <Link href="/contact-us" className={styles.appointmentBtn} onClick={closeMenu}>
                Prendre un rendez-vous
              </Link>
              <button className={styles.mobileMenuBtn} onClick={() => setMenuOpen(!menuOpen)}>
                {menuOpen ? <X size={24} strokeWidth={1.5} /> : <Menu size={24} strokeWidth={1.5} />}
              </button>
            </div>
          </div>
        </nav>
      </div>
      <div className={`${styles.mobileMenu} ${menuOpen ? styles.active : ""}`}>
        <ul className={styles.mobileNavItems}>
          <li className={styles.mobileNavItem}>
            <Link href="/services" className={styles.mobileNavLink} onClick={closeMenu}>
              Services
            </Link>
          </li>
          <li className={styles.mobileNavItem}>
            <Link href="/about-us" className={styles.mobileNavLink} onClick={closeMenu}>
              À propos
            </Link>
          </li>
          <li className={styles.mobileNavItem}>
            <Link href="/become-expert" className={styles.mobileNavLink} onClick={closeMenu}>
              Devenir expert
            </Link>
          </li>
          <li className={styles.mobileNavItem}>
            <Link href="/contact-us" className={styles.mobileNavLink} onClick={closeMenu}>
              Contact
            </Link>
          </li>
          <li className={styles.mobileNavItem}>
            <Link
              href={lang === "en" ? "/en/submit-a-case" : "/fr/deposer-un-dossier"}
              className={`${styles.mobileNavLink} ${styles.submitCaseNavLink}`}
              onClick={closeMenu}
            >
              {lang === "en" ? "Submit a Case File" : "Déposer un dossier"}
            </Link>
          </li>
        </ul>
        <button className={styles.mobileAppointmentBtn} onClick={closeMenu}>
          <Link href="/contact-us">Prendre un rendez-vous</Link>
        </button>
      </div>
      <div className={`${styles.menuOverlay} ${menuOpen ? styles.active : ""}`} onClick={closeMenu}></div>
    </div>
  );
};

export default Header;
