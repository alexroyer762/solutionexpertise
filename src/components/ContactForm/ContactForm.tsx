import { useRef, useState } from "react";
import { gsap } from "gsap";
import { Mail, Phone } from "lucide-react";
import styles from "./ContactForm.module.scss";

interface ContactFormProps {
  simplified?: boolean;
}

const ContactForm = ({ simplified = false }: ContactFormProps) => {
  const [isLording, setIsLoading] = useState(false);
  const checkmarkRef = useRef<SVGPathElement>(null);
  const circleRef = useRef<SVGCircleElement>(null);
  const buttonTextRef = useRef<HTMLSpanElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsLoading(true);

    // animation implementation
    const tl = gsap.timeline();

    // button text fade out
    tl.to(buttonTextRef.current, {
      opacity: 0,
      duration: 0.1,
    });

    tl.fromTo(
      circleRef.current,
      {
        strokeDasharray: "0, 100",
        strokeDashoffset: 0,
      },
      {
        strokeDasharray: "100, 100",
        duration: 0.6,
        ease: "power2.out",
      }
    ).fromTo(
      checkmarkRef.current,
      {
        strokeDasharray: "0, 100",
        strokeDashoffset: 0,
      },
      {
        strokeDasharray: "100, 100",
        duration: 0.4,
        ease: "power2.out",
      },
      "-=0.3"
    );

    // await submitForm(formData)

    // reset animation
    setTimeout(() => {
      setIsLoading(false);
      tl.to(buttonTextRef.current, {
        opacity: 1,
        duration: 0.1,
      });
    }, 3000);
  };

  return (
    <div className={styles.contactForm}>
      {!simplified && (
        <div className={styles.leftPanel}>
          <div>
            <h2>Devenez un expert SolutionExpertise!</h2>
            <p className={styles.subtitle}>
              Pour savoir comment joindre notre réseau de médecins ou comment
              devenir un évaluateur indépendant, communiquez avec nous.
            </p>
          </div>
        </div>
      )}
      <div className={simplified ? styles.fullWidthForm : styles.rightPanel}>
        <form onSubmit={handleSubmit}>
          <div className={`${styles.formGroup} ${styles.twoColumns}`}>
            <div className={styles.inputGroup}>
              <label className={styles.label}>Votre prénom*</label>
              <input type="text" className={styles.input} required />
            </div>
            <div className={styles.inputGroup}>
              <label className={styles.label}>Votre nom*</label>
              <input type="text" className={styles.input} required />
            </div>
          </div>

          <div className={`${styles.formGroup} ${styles.twoColumns}`}>
            <div className={styles.inputGroup}>
              <label className={styles.label}>Votre courriel*</label>
              <input type="email" className={styles.input} required />
            </div>
            <div className={styles.inputGroup}>
              <label className={styles.label}>Votre téléphone*</label>
              <input type="tel" className={styles.input} required />
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>Vous êtes?*</label>
            <select className={styles.select} required>
              <option value="">Sélectionnez une option</option>
              <option value="CNESST">Employeur</option>
              <option value="SAAQ">Syndicat</option>
              <option value="TAT">Avocat</option>
              <option value="TAT">Assureur</option>
              <option value="TAQ">Mutuelle</option>
            </select>
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>Type d'expertise*</label>
            <div className={styles.radioGroup}>
              <label className={styles.radioLabel}>
                <input
                  type="radio"
                  name="expertiseType"
                  value="medical"
                  required
                />
                <span>Expertise médicale</span>
              </label>
              <label className={styles.radioLabel}>
                <input type="radio" name="expertiseType" value="opinion" />
                <span>Opinion sur dossier</span>
              </label>
              <label className={styles.radioLabel}>
                <input type="radio" name="expertiseType" value="formation" />
                <span>Formation</span>
              </label>
              <label className={styles.radioLabel}>
                <input type="radio" name="expertiseType" value="other" />
                <span>Autre</span>
              </label>
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>Informations additionnelles</label>
            <textarea className={styles.textarea}></textarea>
          </div>

          <button
            type="submit"
            className={`${styles.submitButton} ${
              isLording ? styles.loading : ""
            }`}
            disabled={isLording}
          >
            <span ref={buttonTextRef}>Envoyer</span>
            <svg
              className={styles.checkmark}
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <circle
                ref={circleRef}
                className={styles.checkmarkCircle}
                cx="12"
                cy="12"
                r="10"
                fill="none"
              />
              <path
                ref={checkmarkRef}
                className={styles.checkmarkPath}
                d="M7 13l3 3 7-7"
                fill="none"
              />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
