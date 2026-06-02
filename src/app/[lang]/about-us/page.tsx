"use client";
import { useEffect, useRef } from "react";
import { Award, Shield, Zap } from "lucide-react";
import Image from "next/image";
import styles from "./page.module.scss";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const images = [
    {
      src: "/media/slides/pill.webp",
      alt: "Pill",
    },
    {
      src: "/media/slides/calm.webp",
      alt: "Calm",
    },
    {
      src: "/media/slides/hands.webp",
      alt: "Hands",
    },
    {
      src: "/media/slides/prescription.webp",
      alt: "Prescription",
    },
    {
      src: "/media/slides/nursing.webp",
      alt: "Nursing",
    },
    {
      src: "/media/slides/examination.webp",
      alt: "Examination",
    },
    {
      src: "/media/slides/doc.webp",
      alt: "Document",
    },
  ];

  useEffect(() => {
    const elements = document.querySelectorAll(".fade-in");
    elements?.forEach((element, index) => {
      setTimeout(() => {
        element.classList.add("visible");
      }, index * 100);
    });
  }, []);

  return (
    <div className={styles.pageContainer}>
      {/* Hero Section with Background */}
      {/* <div className={styles.heroSection}>
        <div className={styles.heroBackground} />
        <div className={styles.container}>
          <div className={styles.heroContent}>
            <h1 className={`fade-in`}>À Propos</h1>
            <h2 className={`fade-in`} style={{ fontWeight: "500" }}>
              Nos fondateurs
            </h2>
          </div>
        </div>
      </div> */}

      <section className={styles.teamSection}>
        <div className={styles.heroBackground} style={{ zIndex: -1 }} />
        <div
          className={styles.container}
          style={{ padding: "6rem 0rem 0rem 0rem" }}
        >
          <div className={styles.teamContainer}>
            <div className={styles.sectionTitle}>
              <h2 className={styles.title} style={{ fontSize: "3rem" }}>
                Nos fondateurs
              </h2>
              {/* <p className={styles.subtitle}>
                Une équipe dévouée à votre service
              </p> */}
            </div>
            <div className={styles.teamMembers}>
              <div className={styles.teamMember}>
                <div className={styles.memberImage}>
                  <div className={styles.memberImageDeco}></div>
                  <Image
                    src="/media/team/fred-tc.png"
                    alt="Alexandre Grenier"
                    width={300}
                    height={400}
                    objectFit="cover"
                  />
                </div>
                <div className={styles.memberInfo}>
                  <h3>Docteur Frédéric Thomas-Chaussé</h3>
                  <p className={styles.memberDescription}>
                    Médecin radiologiste depuis plus de 10 ans, j'ai le
                    privilège d’exercer en radiologie diagnostique et
                    interventionnelle avec la volonté constante d’améliorer
                    l’accès aux soins. À travers la gestion de trois cliniques
                    de radiologie, je m’efforce d’offrir des services de
                    qualité, adaptés aux besoins des patients et du réseau de
                    santé. Mon engagement repose sur une approche humaine et une
                    vision axée sur l’innovation et l’efficience. Chaque
                    décision est guidée par le souci d’apporter une contribution
                    concrète à la communauté et de faciliter l’accès à des soins
                    de proximité. Je crois fermement que l’amélioration des
                    services de santé passe par l’écoute des besoins des
                    patients, l’optimisation des processus et une collaboration
                    étroite avec les professionnels du milieu. Mon parcours est
                    motivé par cette quête d’excellence et par la conviction
                    qu’il est toujours possible de faire mieux pour ceux qui
                    comptent sur nous.
                  </p>
                </div>
              </div>
              <div className={styles.teamMember}>
                <div className={styles.memberImage}>
                  <div className={styles.memberImageDeco}></div>
                  <Image
                    src="/media/team/alex-grenier.png"
                    alt="Alexandre Grenier"
                    width={300}
                    height={400}
                    objectFit="cover"
                  />
                </div>

                <div className={styles.memberInfo}>
                  <h3>Alexandre Grenier</h3>
                  <p className={styles.memberDescription}>
                    Alexandre Grenier est un entrepreneur chevronné évoluant
                    dans l’industrie pharmaceutique depuis plus de 25 ans. Son
                    expertise couvre un large spectre de fonctions stratégiques
                    et opérationnelles, notamment en développement commercial,
                    marketing, ventes et mise en marché. Il possède également
                    une maîtrise approfondie des opérations liées aux programmes
                    patients, de l’accès au marché ainsi que du développement
                    des affaires. Tout au long de sa carrière, il s’est
                    distingué par sa capacité à innover, à insuffler une
                    dynamique de croissance et à générer une réelle valeur
                    ajoutée. Guidé par une vision centrée sur le patient, il
                    place les besoins de ce dernier au cœur de chacune de ses
                    initiatives.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Image Band Section */}
      <div className={styles.imageBandWrapper}>
        <div className={styles.imageBand}>
          {/* Repeat images twice for seamless loop */}
          {[...images, ...images].map((img, idx) => (
            <div key={idx} className={styles.imageContainer}>
              <Image
                src={img.src}
                alt={img.alt}
                width={300}
                height={200}
                objectFit="cover"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Values Section */}
      <section className={styles.valuesSection}>
        <div className={styles.container}>
          <div className={styles.valuesContainer}>
            <div className={styles.sectionTitle}>
              <h2 className={styles.title}>Nos valeurs</h2>
              {/* <p className={styles.subtitle}>
                L'information au cœur de vos décisions. Voyez pourquoi tant
                d'entreprises et d'assureurs choisissent SolutionExpertise.
              </p> */}
            </div>
            <div className={styles.valuesItems}>
              <div className={styles.valueItem}>
                <div className={styles.iconWrapper}>
                  <Award size={48} />
                </div>
                <h4>Compétence</h4>
                <p>Excellence dans chaque expertise médicale</p>
              </div>
              <div className={styles.valueItem}>
                <div className={styles.iconWrapper}>
                  <Shield size={48} />
                </div>
                <h4>Agilité</h4>
                <p>Précision et professionnalisme constant</p>
              </div>
              <div className={styles.valueItem}>
                <div className={styles.iconWrapper}>
                  <Zap size={48} />
                </div>
                <h4>Efficacité</h4>
                <p>Solutions rapides et adaptées</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* New Team Section */}

      {/* Description Section */}
      <section className={styles.descriptionSection}>
        <div className={styles.container}>
          <div className={styles.descriptionContent}>
            <p>
              SolutionExpertise offre des services complets en santé au travail
              et expertise médicale partout au Québec. Notre équipe d'experts se
              distingue par son approche rigoureuse et sa capacité à fournir des
              évaluations précises et des conseils adaptés aux besoins
              spécifiques de nos clients.
            </p>
            <p>
              Parmi nos services, nous offrons des évaluations médicales
              indépendantes et des analyses détaillées de dossiers médicaux.
            </p>
            <p>
              Collaborer avec SolutionExpertise, c’est bénéficier d’outils
              numériques performants conçus pour améliorer continuellement
              l'expérience utilisateur. Notre ambition est de devenir votre
              partenaire stratégique, engagé à soutenir activement vos démarches
              en matière d'invalidité.
            </p>
            <p>
              Avec notre bureau principal à Montréal, SolutionExpertise assure
              une proximité et une réactivité qui répondent efficacement aux
              attentes de nos clients partout dans la province.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
