import Link from "next/link";
import styles from "./index.module.scss";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className={styles.sectionPadding}>
      <div className={styles.container}>
        <div className={styles.row}>
          <div className={styles.leftCol}>
            <div className="mainLogo footer" style={{ marginBottom: "2rem" }}>
              <Link href="/">
                <Image
                  alt="Solution Expertise"
                  src="/media/logo/solexp_logo_white_normal.png"
                  width={250}
                  height={76}
                  priority
                  className={styles.logo}
                />
              </Link>
            </div>
            <div className={styles.contact}>
              <span>info@solutionexpertise.ca</span>
              <span>55 Av. de Vimy, H3S 2P9, Outremont, QC</span>
            </div>
            {/* <div className={styles.socialMedia}>
              <Link href="/">
                <i className="fa-brands fa-facebook"></i>
              </Link>
              <Link href="/">
                <i className="fa-brands fa-x-twitter"></i>
              </Link>
              <Link href="/">
                <i className="fa-brands fa-instagram"></i>
              </Link>
              <Link href="/">
                <i className="fa-brands fa-youtube"></i>
              </Link>
              <Link href="/">
                <i className="fa-brands fa-linkedin"></i>
              </Link>
            </div> */}
          </div>
          <div className={styles.rightCol}>
            <div className={styles.footerSection}>
              <p>Entreprise</p>
              <Link href="/">Accueil</Link>
              <Link href="/">Nos services</Link>
              <Link href="/">À propos</Link>
              <Link href="/">Nous joindre</Link>
            </div>
            <div className={styles.footerSection}>
              <p>Services</p>
              <Link href="/">Expertise médicale</Link>
              <Link href="/">Opinion sur dossier</Link>
              <Link href="/">Consultation en médecine privée</Link>
            </div>
          </div>
        </div>
        <div className={styles.footerBottom}>
          <p>
            &copy; {new Date().getFullYear()} SolutionExpertise. Tous droits
            réservés.
          </p>
          <div className={styles.bottomLinks}>
            <Link href="/">Politique de confidentialité</Link>
            <Link href="/">Conditions d'utilisation</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
