"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect } from "react";
import {
  Brain,
  ClipboardPlus,
  Stethoscope,
  Users,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import styles from "./page.module.scss";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Services() {
  useEffect(() => {
    const elements = document.querySelectorAll(".fade-in");
    elements?.forEach((element, index) => {
      setTimeout(() => {
        element.classList.add("visible");
      }, index * 100);
    });

    gsap.fromTo(
      ".infoImage",
      {
        y: "20%",
        scale: 1.4,
      },
      {
        y: "-20%",
        scrollTrigger: {
          trigger: ".infoImage",
          start: "top bottom",
          end: "bottom center",
          scrub: true,
        },
      }
    );
  }, []);

  return (
    <div className={styles.servicesPage}>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        {/* <div className={styles.heroBackground} /> */}
        <div className={styles.container}>
          <div className={styles.heroContent}>
            <h1
              className={`${styles.title} fade-in`}
              style={{ fontSize: "3rem" }}
            >
              Services
            </h1>
            <p className={`fade-in`} style={{ fontSize: "1.5rem" }}>
              Tous les services de médecins experts pour votre organisation et
              le plus vaste réseau de médecins multidisciplinaires au Québec.
            </p>
          </div>
          <div>
            <Image
              src="/media/services-header.webp"
              alt="Contact hero image"
              fill
              priority
              style={{ objectFit: "cover", filter: "blur(4px)" }}
            />
          </div>
        </div>
      </section>

      {/* Simplified Service Cards Section */}
      <section className={styles.cardsSection}>
        <div className={styles.container}>
          <div className={styles.cardsGrid}>
            <div className={styles.serviceCard}>
              <div className={styles.cardContent}>
                <div className={styles.iconWrapper}>
                  <ClipboardPlus size={45} color="var(--main-color)" />
                </div>
                <h3 className={styles.cardTitle}>Expertises médicales</h3>
                <p className={styles.cardDescription}>
                  Pour des opinions objectives et une gestion efficace de vos
                  dossiers d'invalidité.
                </p>
              </div>
              <button>
                <Link href="/contact-us">Prendre un rendez-vous</Link>
              </button>
            </div>
            <div className={styles.serviceCard}>
              <div className={styles.cardContent}>
                <div className={styles.iconWrapper}>
                  <Brain size={45} color="var(--main-color)" />
                </div>
                <h3 className={styles.cardTitle}>Opinions sur dossier</h3>
                <p className={styles.cardDescription}>
                  Pour des opinions éclairées et une gestion optimale de vos
                  dossiers complexes.
                </p>
              </div>
              <button>
                <Link href="/contact-us">Prendre un rendez-vous</Link>
              </button>
            </div>
            <div className={styles.serviceCard}>
              <div className={styles.cardContent}>
                <div className={styles.iconWrapper}>
                  <Stethoscope size={45} color="var(--main-color)" />
                </div>
                <h3 className={styles.cardTitle}>Médecins‑conseil</h3>
                <p className={styles.cardDescription}>
                  Pour un accompagnement stratégique et une expertise pointue.
                </p>
              </div>
              <button>
                <Link href="/contact-us">Prendre un rendez-vous</Link>
              </button>
            </div>
            {/* <div className={styles.serviceCard}>
              <div className={styles.cardContent}>
                <div className={styles.iconWrapper}>
                  <Users size={45} color="var(--main-color)" />
                </div>
                <h3 className={styles.cardTitle}>Formations</h3>
                <p className={styles.cardDescription}>
                  Pour des formations sur mesure assurant un transfert de
                  compétences optimal.
                </p>
              </div>
              <button>
                <Link href="/contact-us">Prendre un rendez-vous</Link>
              </button>
            </div> */}
          </div>
        </div>
      </section>

      {/* Info Section with Image */}
      <section className={styles.infoSection}>
        <div className={styles.container}>
          <div className={styles.infoWrapper}>
            <div className={styles.imageColumn}>
              <div className={styles.imageContainer}>
                <img
                  src="/media/services.webp"
                  alt="Professional medical expert"
                  className="infoImage"
                />
              </div>
            </div>
            <div className={styles.textColumn}>
              <div className={styles.textContent}>
                <h2>Notre expertise</h2>
                <div className={styles.infoTextWrapper}>
                  <p className={styles.infoText}>
                    SolutionExpertise propose des services d'expertise médicale
                    au Québec couvrant une grande variété de spécialités. La
                    qualité exceptionnelle de nos médecins experts ainsi que
                    l'engagement constant de notre équipe constituent nos
                    valeurs fondamentales.
                  </p>
                  <p className={styles.infoText}>
                    En tant que partenaire d'affaires, nous concevons des
                    solutions personnalisées qui répondent aux attentes
                    spécifiques de chacun de nos clients. Notre approche
                    flexible garantit des services parfaitement adaptés aux
                    exigences des employeurs, avocats, gestionnaires et
                    assureurs.
                  </p>
                  <p className={styles.infoText}>
                    Faire équipe avec SolutionExpertise, c'est accéder à un
                    tableau de bord complet conçu pour optimiser votre
                    expérience client. Nous nous engageons pleinement à devenir
                    votre partenaire stratégique et privilégié.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
