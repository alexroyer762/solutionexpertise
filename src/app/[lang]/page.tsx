"use client";
import Link from "next/link";
import React, { use, useState, useEffect, useRef } from "react";
import {
  Briefcase,
  Shield,
  Gavel,
  Users,
  Check,
  ChevronDown,
  ChevronUp,
  ClipboardPlus,
  FileText,
  GraduationCap,
} from "lucide-react";
import styles from "./page.module.scss";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Modal from "@/components/Modal/Modal";
import ContactForm from "@/components/ContactForm/ContactForm";
import NoahAvatar from "@/components/NoahAvatar/NoahAvatar";

gsap.registerPlugin(ScrollTrigger);

const submitCaseLabels = {
  fr: { text: "Déposer un dossier →", href: "/fr/deposer-un-dossier" },
  en: { text: "Submit a Case File →", href: "/en/submit-a-case" },
};

export default function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = use(params);
  const submitLabel = submitCaseLabels[lang as "fr" | "en"] ?? submitCaseLabels.fr;
  const [openServiceIndex, setOpenServiceIndex] = useState<number | null>(null);
  const toggleService = (index: number) =>
    setOpenServiceIndex((prev) => (prev === index ? null : index));

  const services = [
    {
      title: "Expertises médicales",
      description:
        "Nos experts réalisent des expertises détaillées et objectives pour vous offrir des solutions adaptées à votre situation.",
    },
    {
      title: "Avis sur dossier",
      description:
        "Bénéficiez d'une évaluation approfondie grâce à notre réseau de professionnels expérimentés.",
    },
    // {
    //   title: "Formations spécialisées",
    //   description:
    //     "Nous concevons des formations adaptées aux besoins de votre organisation et de votre personnel.",
    // },
    // {
    //   title: "Mise à disposition de professionnels de santé",
    //   description:
    //     "Accédez à notre réseau de spécialistes médicaux en toute flexibilité, selon vos besoins.",
    // },
    {
      title: "Un soutien fiable",
      description:
        "Nous vous accompagnons avec réactivité et professionnalisme dans toutes vos démarches.",
    },
    // {
    //   title: "Un soutien fiable",
    //   description:
    //     "Nous vous accompagnons avec réactivité et professionnalisme dans toutes vos démarches.",
    // },
  ];

  const homeTextRef = useRef<HTMLDivElement>(null);
  const backgroundImageRef = useRef<HTMLDivElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const homeText = homeTextRef.current;
    const backgroundImage = backgroundImageRef.current;
    if (!homeText || !backgroundImage) return;

    const h1 = homeText.querySelector("h1");
    const h2 = homeText.querySelector("h2");
    const buttonGroup = homeText.querySelector(`.${styles.buttonGroup}`);

    if (!gsap) {
      const homeSection = document.querySelector(`.${styles.homeSection}`);
      homeSection?.classList.add("failGsap");
      return;
    }

    gsap
      .timeline({ defaults: { ease: "power3.out" } })
      .to(backgroundImage, { opacity: 1, duration: 0.5, delay: 0.2 })
      .to([h1, h2, buttonGroup], { opacity: 1, duration: 0.5 }, "-=0.3")
      .to(
        backgroundImage,
        {
          maskImage: "linear-gradient(45deg, white 100%, transparent 100%)",
          duration: 0.8,
        },
        "-=0.3"
      );

    const serviceCards = gsap.utils.toArray<HTMLElement>(
      `.${styles.serviceCard}`
    );
    gsap.fromTo(
      serviceCards,
      {
        opacity: 0,
        y: 50,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.2,
        scrollTrigger: {
          trigger: `.${styles.servicesSection}`,
          start: "top bottom-=100",
          toggleActions: "play none none none",
        },
      }
    );

    // const clientType = gsap.utils.toArray<HTMLElement>(`.${styles.clientType}`);
    // gsap.fromTo(
    //   clientType,
    //   {
    //     scale: 0,
    //   },
    //   {
    //     scale: 1,
    //     duration: 0.6,
    //     stagger: 0.2,
    //     scrollTrigger: {
    //       trigger: `.${styles.clientsSection}`,
    //       start: "top bottom-=100",
    //       toggleActions: "play none none none",
    //     },
    //   }
    // );

    const teamSection = gsap.utils.toArray<HTMLElement>(
      `.${styles.teamSection}`
    );
    teamSection.forEach((element, index) => {
      gsap.from(element, {
        backgroundPositionY: "50%",
        scrollTrigger: {
          trigger: element,
          start: "top 80%",
          scrub: 1,
        },
      });
    });

    const specialtyItem = gsap.utils.toArray<HTMLElement>(
      `.${styles.specialtyItem}`
    );
    gsap.fromTo(
      specialtyItem,
      {
        opacity: 0,
      },
      {
        opacity: 1,
        duration: 0.1,
        stagger: 0.05,
        scrollTrigger: {
          trigger: `.${styles.specialtiesSection}`,
          start: "top center",
          toggleActions: "play none none none",
        },
      }
    );
  }, []);

  return (
    <>
      <section className={`${styles.fadeIn} ${styles.homeSection}`}>
        <div
          className={`${styles.backgroundImage} backgroundImage`}
          ref={backgroundImageRef}
        ></div>
        <div className={styles.heroContainer}>
          <div
            className={`${styles.row} ${styles.alignCenter} ${styles.fullScreen}`}
          >
            <div className={styles.homeText} ref={homeTextRef}>
              <h1>
                <span>Expertise</span> médicale
              </h1>
              <h2>Un accompagnement sur mesure pour répondre à vos besoins.</h2>
              <div className={styles.buttonGroup}>
                <button>
                  <Link href="/contact-us">Demander une expertise</Link>
                </button>
                <button
                  className={styles.secondaryButton}
                  onClick={() => setIsModalOpen(true)}
                >
                  Prendre un rendez-vous
                </button>
                <button className={styles.submitCaseButton}>
                  <Link href={submitLabel.href}>{submitLabel.text}</Link>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section className={styles.servicesSection}>
        <div className={styles.container}>
          <div className={styles.row}>
            <div className={styles.sectionTitle}>
              <h2 className={styles.title}>Nos services</h2>
              <p className={styles.subtitle}>
                Notre équipe vous apporte des solutions adaptées à vos enjeux.
              </p>
              <div className={styles.servicesGrid}>
                {services.map((service, index) => (
                  <Link
                    key={index}
                    href="/services"
                    className={styles.serviceCard}
                  >
                    <div className={styles.iconWrapper}>
                      {index === 0 && <ClipboardPlus size={24} />}
                      {index === 1 && <FileText size={24} />}
                      {index === 2 && <GraduationCap size={24} />}
                      {index === 3 && <Users size={24} />}
                      {index === 4 && <Shield size={24} />}
                      {index === 5 && <Shield size={24} />}
                    </div>
                    <h3>{service.title}</h3>
                    <p>{service.description}</p>
                    {/* <div className={styles.arrowWrapper}>
                      <svg
                        className={styles.arrow}
                        width="32"
                        height="32"
                        viewBox="0 0 32 32"
                      >
                        <path
                          d="M5 16h22m-6-6 6 6-6 6"
                          stroke="currentColor"
                          strokeWidth="2"
                          fill="none"
                        />
                      </svg>
                    </div> */}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CLIENTS SECTION */}
      <section className={styles.clientsSection}>
        <div className={styles.container}>
          <div className={styles.row}>
            <div className={styles.sectionTitle}>
              <h2 className={styles.whiteTitle}>
                À qui s'adressent nos services?
              </h2>
              <p className={styles.subtitle} style={{ color: "white" }}>
                Nous privilégions une approche flexible et proactive pour
                répondre aux besoins spécifiques de chaque client.
              </p>
            </div>
          </div>
          <div className={styles.clientTypes}>
            <div className={styles.clientType}>
              <Briefcase size={32} color="white" />
              <span>EMPLOYEUR</span>
            </div>
            <div className={styles.clientType}>
              <Shield size={32} color="white" />
              <span>ASSUREUR ET MUTUELLE</span>
            </div>

            <div className={styles.clientType}>
              <Users size={32} color="white" />
              <span>SYNDICATS</span>
            </div>
            <div className={styles.clientType}>
              <Gavel size={32} color="white" />
              <span>AVOCATS</span>
            </div>
          </div>
        </div>
      </section>

      {/* TEAM SECTION */}
      {/* <section className={styles.teamSection}>
        <div className={styles.container}>
          <div className={styles.row}>
            <div className={styles.sectionTitle}>
              <h2 className={styles.title}>
                Une équipe d'experts à votre service
              </h2>
              <h3 className={styles.subtitle}>
                Nous recherchons constamment des professionnels qualifiés pour
                rejoindre notre équipe médicale.
              </h3>
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.fullWidth}>
              <button>
                <Link href="/join-team">Rejoindre l'équipe</Link>
              </button>
            </div>
          </div>
        </div>
      </section> */}

      {/* SPECIALTIES SECTION */}
      <section className={styles.specialtiesSection}>
        <div className={styles.container}>
          <div className={styles.row}>
            <div className={styles.sectionTitle}>
              {/* <h2 className={styles.title}>Nos domaines d'expertise</h2> */}
              <h2 className={styles.title}>
                Notre équipe excelle dans de nombreux domaines médicaux pour
                répondre à tous vos besoins.
                {/* <br /> D'autres spécialisations sont disponibles sur demande.
                Contactez-nous pour en savoir plus. */}
              </h2>
            </div>
          </div>

          {/* <div className={styles.specialtiesList}>
            {[
              "Orthopédie",
              "Psychiatrie",
              "Médecine du travail",
              "Neurologie",
              "Neurochirur.",
              "Microbiologie",
              "Cardiologie",
              "Pneumologie",
              "Toxicologie",
              "Neuropsych.",
              "Médecine interne",
              "Ergonomie",
              "O.R.L",
            ].map((specialty, idx) => (
              <div key={idx} className={styles.specialtyItem}>
                <div style={{ width: "20px", height: "20px" }}>
                  <Check size={20} style={{ color: "var(--main-color)" }} />
                </div>
                <span>{specialty}</span>
              </div>
            ))}
          </div>
          <button>
            <Link href="/contact-us">Prendre rendez-vous</Link>
          </button> */}
        </div>
      </section>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className={styles.modalHeader}>
          <h2>Prendre un rendez-vous</h2>
          <p>
            Remplissez le formulaire ci-dessous et nous vous contacterons dans
            les plus brefs délais.
          </p>
        </div>
        <ContactForm simplified />
      </Modal>

      <NoahAvatar />
    </>
  );
}
