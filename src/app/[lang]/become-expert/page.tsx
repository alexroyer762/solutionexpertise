"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  ShieldCheck,
  Cpu,
  GraduationCap,
  CalendarCheck,
  BadgeCheck,
  Rocket,
  LifeBuoy,
  Users,
  Lightbulb,
  Award,
  Clock,
  Briefcase,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ContactForm from "@/components/ContactForm/ContactForm";
import styles from "./page.module.scss";
import { Mail, Phone } from "lucide-react";
import emailjs from "@emailjs/browser";

gsap.registerPlugin(ScrollTrigger);

export default function BecomeExpert() {
  const mainRef = useRef<HTMLDivElement>(null);
  const bannerRef = useRef<HTMLElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });
  const formRef = useRef<HTMLFormElement>(null);

  const features = [
    {
      title: "Réseautage",
      description:
        "Connectez-vous à une communauté dynamique de professionnels médicaux partageant les mêmes valeurs.",
      linkHref: "#reseautage",
      linkText: "En savoir plus",
      icon: <Users />,
    },
    {
      title: "Innovation continue",
      description:
        "Nous investissons constamment dans des solutions innovantes pour optimiser vos services médicaux.",
      linkHref: "#innovation",
      linkText: "En savoir plus",
      icon: <Lightbulb />,
    },
    {
      title: "Soutien personnalisé",
      description:
        "Notre équipe est disponible pour vous conseiller dans tous les aspects de votre pratique médicale.",
      linkHref: "#soutien",
      linkText: "En savoir plus",
      icon: <LifeBuoy />,
    },
    {
      title: "Développement professionnel",
      description:
        "Accédez à des ressources exclusives pour améliorer vos compétences et votre leadership médical.",
      linkHref: "#developpement",
      linkText: "En savoir plus",
      icon: <Briefcase />,
    },
    {
      title: "Équilibre travail-vie",
      description:
        "Nous encourageons une gestion flexible de votre horaire pour préserver votre qualité de vie.",
      linkHref: "#equilibre",
      linkText: "En savoir plus",
      icon: <Clock />,
    },
    {
      title: "Valorisation professionnelle",
      description:
        "Nous reconnaissons et valorisons l'impact positif que vous avez sur la vie de vos patients.",
      linkHref: "#valorisation",
      linkText: "En savoir plus",
      icon: <Award />,
    },
  ];

  useEffect(() => {
    const elements = document.querySelectorAll(".fade-in");
    elements?.forEach((element, index) => {
      setTimeout(() => {
        element.classList.add("visible");
      }, index * 100);
    });

    gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".animate-fade-up").forEach((element) => {
        gsap.from(element, {
          opacity: 0,
          y: 50,
          duration: 1,
          scrollTrigger: {
            trigger: element,
            start: "top bottom-=100",
            toggleActions: "play none none none",
          },
        });
      });

      gsap.utils
        .toArray<HTMLElement>(".imageWrapperSquare")
        .forEach((element) => {
          const square = element.querySelector(`.${styles.decorativeSquare}`);
          const image = element.querySelector(`.${styles.image}`);

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: element,
              start: "top center",
              toggleActions: "play none none none",
            },
          });

          tl.from(square, {
            opacity: 0,
            x: 100,
            y: 0,
            duration: 1.2,
            ease: "power3.out",
          }).from(
            image,
            {
              opacity: 0,
              x: 100,
              duration: 1.2,
              ease: "power3.out",
            },
            "-=0.8"
          );
        });

      gsap.utils
        .toArray<HTMLElement>(".imageWrapperRight")
        .forEach((element) => {
          gsap.from(element, {
            opacity: 0,
            x: 100,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: element,
              start: "top bottom-=100",
              end: "bottom center",
              toggleActions: "play none none none",
              scrub: 1,
            },
          });
        });

      gsap.utils
        .toArray<HTMLElement>(".imageWrapperLeft")
        .forEach((element) => {
          gsap.from(element, {
            opacity: 0,
            x: -100,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: element,
              start: "top bottom-=100",
              end: "bottom center",
              toggleActions: "play none none none",
              scrub: 1,
            },
          });
        });

      const cards = gsap.utils.toArray<HTMLDivElement>(`.${styles.card}`);
      gsap.fromTo(
        cards,
        {
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          stagger: 0.2,
          scrollTrigger: {
            trigger: `.${styles.features}`,
            start: "top center",
            toggleActions: "play none none none",
          },
        }
      );
    }, mainRef);

    gsap.context(() => {
      if (!bannerRef.current) return;

      const section = bannerRef.current;
      const strands = section.querySelectorAll(`.${styles.dnaStrand}`);
      const nodes = section.querySelectorAll(`.${styles.dnaNode}`);
      const title = section.querySelector("h2");
      const text = section.querySelector("p");

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          toggleActions: "play none none none",
        },
      });

      tl.fromTo(
        strands,
        {
          opacity: 0,
          scale: 0.8,
        },
        {
          opacity: 0.2,
          scale: 1,
          duration: 1,
          stagger: 0.2,
        }
      )
        .fromTo(
          nodes,
          {
            opacity: 0,
            scale: 0,
          },
          {
            opacity: 0.2,
            scale: 1,
            duration: 0.8,
            stagger: 0.05,
          },
          "-=0.5"
        )
        .fromTo(
          [title, text],
          {
            opacity: 0,
            y: 20,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.2,
          },
          "-=0.5"
        );
    }, bannerRef);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      // Replace these with your actual EmailJS credentials
      const result = await emailjs.sendForm(
        "YOUR_SERVICE_ID", // You'll get this from EmailJS
        "YOUR_TEMPLATE_ID", // You'll get this from EmailJS
        formRef.current!,
        "YOUR_PUBLIC_KEY" // You'll get this from EmailJS
      );

      if (result.text === "OK") {
        setSubmitStatus({
          type: "success",
          message: "Votre message a été envoyé avec succès!",
        });
        // Reset form
        formRef.current?.reset();
      }
    } catch (error) {
      setSubmitStatus({
        type: "error",
        message: "Une erreur est survenue. Veuillez réessayer plus tard.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main ref={mainRef} className={styles.main} style={{ overflowX: "hidden" }}>
      <section className={styles.hero}>
        <div className={styles.heroBackground}>
          <Image
            src="/media/femdoc.jpg"
            alt="Devenir Expert"
            fill
            sizes="100vw"
            priority
            className={styles.backgroundImage}
          />
          <div className={styles.gradient}></div>
        </div>
        <div className={styles.container}>
          <div className={styles.content}>
            <div className={styles.textContainer}>
              <h1 className="fade-in">
                Faites partie de notre réseau d'évaluateurs indépendants.
              </h1>
              <p className="fade-in">
                Nos médecins profitent d'un flux important de consultations
                ainsi que d'un accompagnement administratif et technologique
                complet et de haut niveau.
              </p>
              <button
                className={`${styles.button} ${styles.heroButton} fade-in`}
                onClick={() =>
                  document
                    .querySelector("#contact-form")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                Devenir expert chez SolutionExpertise
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.features}>
        <h2 className="animate-fade-up">L'avantage SolutionExpertise</h2>
        <p className={`animate-fade-up ${styles.featuresText}`}>
          Nous créons des conditions favorables au développement d'une pratique
          médicale autonome, centrée sur vos besoins et vos objectifs
          personnels.
        </p>
        <div className={`${styles.grid} features-grid`}>
          {features.map((feature, index) => (
            <div key={index} className={`${styles.card} feature-card`}>
              <div className={styles.iconWrapper}>{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
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
            </div>
          ))}
        </div>
      </section>

      <section className={styles.about}>
        <div className={styles.content}>
          <div className={`${styles.imageWrapper} imageWrapperRight`}>
            <img
              src="/media/femdoc.jpg"
              alt="Professionnels médicaux"
              className={styles.image}
            />
          </div>
          <div className={`${styles.gradient}`}>
            <div className={`${styles.textContainer}`}>
              <div className={styles.text}>
                <h2>
                  Chez SolutionExpertise, le perfectionnement des compétences
                  est essentiel à notre mission.
                </h2>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={`${styles.about} ${styles.reverse}`}>
        <div className={styles.content}>
          <div className={`${styles.gradient}`}>
            <div className={`${styles.textContainer}`}>
              <div className={styles.text}>
                <h2>
                  La protection de la réputation de nos médecins est au cœur de
                  nos préoccupations.
                </h2>
                <p>
                  Nous offrons un environnement enrichissant qui soutient
                  l'évolution professionnelle continue de nos experts.
                </p>
                <p>
                  Notre modèle opérationnel repose sur l'intégrité et
                  l'impartialité. Nous mettons en œuvre des mécanismes
                  spécifiques pour assurer l'indépendance de chaque expertise.
                </p>
              </div>
            </div>
          </div>
          <div className={`${styles.imageWrapper} imageWrapperLeft`}>
            <img
              src="/media/be-3.webp"
              alt="Professionnels médicaux"
              className={styles.image}
            />
          </div>
        </div>
      </section>

      <section className={`${styles.about} ${styles.accent}`}>
        <div className={styles.content}>
          <div className={`${styles.imageWrapper} imageWrapperRight`}>
            <img
              src="/media/be-4.webp"
              alt="Professionnels médicaux"
              className={styles.image}
            />
          </div>
          <div className={`${styles.gradient}`}>
            <div className={`${styles.textContainer}`}>
              <div className={styles.text}>
                <h2>
                  Nous favorisons la transmission des savoirs pour maintenir
                  l'excellence dans notre réseau.
                </h2>
                <p>
                  Tous nos médecins, peu importe leur expérience, reçoivent un
                  soutien personnalisé.
                </p>
                <p>
                  Nos directeurs médicaux assurent activement la formation
                  initiale, la formation continue et la mise à jour régulière
                  des connaissances juridiques de nos équipes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section ref={bannerRef} className={styles.banner}>
        <svg
          className={styles.dnaBg}
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          viewBox="0 0 100 100"
          width="100%"
          height="100%"
        >
          <path
            className={styles.dnaStrand}
            d="M0,50 Q10,25 20,50 T40,50 T60,50 T80,50 T100,50"
            vectorEffect="non-scaling-stroke"
          />
          <path
            className={styles.dnaStrand}
            d="M0,50 Q10,75 20,50 T40,50 T60,50 T80,50 T100,50"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
        <div className={styles.bannerContent}>
          <h2>L'excellence portée par nos valeurs collectives</h2>
          <p>
            Chez SolutionExpertise, nous cultivons une dynamique d'équipe
            inspirante où chaque membre contribue activement à l'amélioration
            continue, toujours avec empathie et reconnaissance envers nos
            professionnels de santé.
          </p>
        </div>
      </section>

      <section className={styles.evaluation}>
        <div className={styles.evaluationContainer}>
          <div className={styles.evaluationContent}>
            <h2 className="animate-fade-up">
              Offrez-vous une pratique sur mesure adaptée à votre vie
              professionnelle.
            </h2>
            <p className="animate-fade-up">
              SolutionExpertise vous donne accès à divers environnements de
              travail, que ce soit en cabinet privé, en milieu corporatif ou en
              téléconsultation. Nous facilitons ainsi une adaptation fluide à
              vos besoins professionnels uniques.
            </p>
          </div>
          <div
            className={`${styles.evaluationImageWrapper} imageWrapperSquare`}
          >
            <div className={styles.decorativeSquare}></div>
            <img
              src="/media/holding-medicine.jpg"
              alt="Évaluation"
              className={styles.image}
            />
          </div>
        </div>

        <div className={styles.evaluationProcess}>
          <div className={styles.processContainer}>
            <div
              className={`${styles.processImageWrapper} ${styles.mobileFirst}`}
            >
              <img
                src="/media/sample-circulation01.png"
                alt="processus"
                className={styles.image}
                style={{ height: "100%", width: "auto" }}
              />
            </div>
            <div className={styles.processContent}>
              <h2 className="animate-fade-up">
                Un accompagnement personnalisé à chaque étape
              </h2>
              <p className="animate-fade-up">
                Notre équipe spécialisée vous accompagne dans la rédaction, la
                révision et la validation de vos rapports médicaux, garantissant
                ainsi la conformité avec les exigences professionnelles et
                réglementaires tout en valorisant votre image professionnelle.
              </p>
            </div>
          </div>
        </div>

        <div className={styles.evaluationProcess}>
          <div className={styles.processContainer}>
            <div className={styles.processContent}>
              <h2 className="animate-fade-up">
                SolutionExpertise vous propose de :
              </h2>
              <ul className="animate-fade-up">
                <li>
                  Organiser votre emploi du temps en fonction de vos priorités
                </li>
                <li>Automatiser les tâches administratives chronophages</li>
                <li>
                  Profiter d'un système rigoureux de validation de vos documents
                </li>
                <li>
                  Externaliser la gestion complète des échanges avec vos
                  patients
                </li>
              </ul>
            </div>
            {/* <div
              className={`${styles.processImageWrapper} ${styles.mobileFirst}`}
            >
              <Image
                src="/media/sample-circulation02.png"
                alt="processus"
                width={500}
                height={500}
                className={styles.image}
              />
            </div> */}
            <div
              className={`${styles.evaluationImageWrapper} imageWrapperSquare`}
              style={{ marginLeft: "4rem", maxWidth: "50%" }}
            >
              <div className={styles.decorativeSquare}></div>
              <img
                src="/media/docwrite.jpeg"
                alt="Évaluation"
                className={styles.image}
              />
            </div>
          </div>
        </div>
      </section>
      <div id="contact-form" className={styles.container}>
        <div className={styles.leftSection}>
          <h2 className={styles.title}>Devenez un expert SolutionExpertise!</h2>
          <p className={styles.description}>
            Pour savoir comment joindre notre réseau de médecins ou comment
            devenir un évaluateur indépendant, communiquez avec nous.
          </p>

          <div className={styles.buttonGroup}>
            <button
              className={styles.button}
              onClick={() => {
                window.open("mailto:info@solutionexpertise.ca", "_blank");
              }}
            >
              <Mail width={20} height={20} />
              Envoyer un courriel
            </button>
            <button className={styles.button}>
              <Phone width={20} height={20} />
              1.877.513.1453
            </button>
          </div>
        </div>

        <div className={styles.rightSection}>
          <form ref={formRef} className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.inputGroup}>
              <label className={styles.label}>Votre nom*</label>
              <input
                type="text"
                name="user_name"
                className={styles.input}
                required
              />
            </div>

            <div className={`${styles.formGroup} ${styles.twoColumns}`}>
              <div className={styles.inputGroup}>
                <label className={styles.label}>Votre courriel*</label>
                <input
                  type="email"
                  name="user_email"
                  className={styles.input}
                  required
                />
              </div>
              <div className={styles.inputGroup}>
                <label className={styles.label}>Votre téléphone*</label>
                <input
                  type="tel"
                  name="user_phone"
                  className={styles.input}
                  required
                />
              </div>
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label}>Votre spécialité*</label>
              <input
                type="text"
                name="user_specialty"
                className={styles.input}
                required
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label}>Votre message</label>
              <textarea name="message" className={styles.textarea}></textarea>
            </div>

            {submitStatus.message && (
              <div
                className={`${styles.statusMessage} ${
                  styles[submitStatus.type || ""]
                }`}
              >
                {submitStatus.message}
              </div>
            )}

            <button
              type="submit"
              className={styles.submitButton}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Envoi en cours..." : "Envoyer"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
