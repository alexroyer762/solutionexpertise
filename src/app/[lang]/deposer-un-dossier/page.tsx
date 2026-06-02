import SubmitCasePortal from "@/components/SubmitCasePortal/SubmitCasePortal";
import styles from "./page.module.scss";

export const metadata = {
  title: "Déposer un dossier – SolutionExpertise",
  description:
    "Soumettez votre dossier d'expertise médicale directement via notre portail sécurisé.",
};

export default function DeposerUnDossier() {
  return (
    <div className={styles.pageContainer}>
      <section className={styles.heroSection}>
        <div className={styles.heroContent}>
          <h1>
            <span>Déposer</span> un dossier
          </h1>
          <p>
            Soumettez votre demande d'expertise médicale directement via notre
            portail sécurisé.
          </p>
        </div>
      </section>

      <section className={styles.portalSection}>
        <div className={styles.container}>
          <SubmitCasePortal lang="fr" />
        </div>
      </section>
    </div>
  );
}
