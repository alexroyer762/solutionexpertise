import SubmitCasePortal from "@/components/SubmitCasePortal/SubmitCasePortal";
import styles from "../deposer-un-dossier/page.module.scss";

export const metadata = {
  title: "Submit a Case File – SolutionExpertise",
  description:
    "Submit your medical expertise request directly through our secure portal.",
};

export default function SubmitACase() {
  return (
    <div className={styles.pageContainer}>
      <section className={styles.heroSection}>
        <div className={styles.heroContent}>
          <h1>
            <span>Submit</span> a Case File
          </h1>
          <p>
            Submit your medical expertise request directly through our secure
            portal.
          </p>
        </div>
      </section>

      <section className={styles.portalSection}>
        <div className={styles.container}>
          <SubmitCasePortal lang="en" />
        </div>
      </section>
    </div>
  );
}
