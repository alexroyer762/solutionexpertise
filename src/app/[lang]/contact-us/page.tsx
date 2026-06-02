"use client";
import { useForm } from "react-hook-form";
import { useState, useRef, useEffect } from "react";
import styles from "./page.module.scss";
import Image from "next/image";
import { Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type FormData = {
  name: string;
  email: string;
  message: string;
};

export default function Contact() {
  const [isLording, setIsLording] = useState(false);
  const checkmarkRef = useRef<SVGPathElement>(null);
  const circleRef = useRef<SVGCircleElement>(null);
  const buttonTextRef = useRef<HTMLSpanElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const heroRef = useRef<HTMLDivElement>(null);

  const onSubmit = async (data: FormData) => {
    setIsLording(true);

    const tl = gsap.timeline();

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

    // try {
    //   const res = await fetch("/api/contact", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify(data),
    //   });
    //   if (!res.ok) {
    //     throw new Error("Error sending message");
    //   }
    //   setSubmitted(true);
    //   reset();
    // } catch (error) {
    //   console.error(error);
    //   // Optionally set an error state to display a message
    // }

    setTimeout(() => {
      setIsLording(false);
      tl.to(buttonTextRef.current, {
        opacity: 1,
        duration: 0.1,
      });
    }, 3000);
  };

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
      <div className={styles.hero} ref={heroRef}>
        <div className={styles.heroContent}>
          <h1 className="fade-in" style={{ fontSize: "3rem" }}>
            Nous joindre
          </h1>
        </div>
        <div className={styles.heroBackground}>
          <Image
            src="/media/contact-us-bg.jpg"
            alt="Contact hero image"
            fill
            priority
            style={{ objectFit: "cover" }}
          />
        </div>
      </div>

      <div className={styles.mainContent} style={{ padding: "0 0 4rem 0" }}>
        <div className={styles.contactCard}>
          <div className={styles.leftPanel}>
            <div>
              <h2>Entrez en contact</h2>
              <p className={styles.subtitle}>
                <span>
                  Pour toute question ou demande, n'hésitez pas à nous
                  contacter.
                </span>
                <span> Nous sommes toujours à votre disposition.</span>
              </p>
            </div>
            <div className={styles.contactInfo}>
              <div className={`${styles.infoItem} fade-in`}>
                <div className={styles.iconWrapper}>
                  <Mail className={styles.icon} />
                </div>
                <div>
                  <h4>Email</h4>
                  <p>info@solutionexpertise.ca</p>
                </div>
              </div>

              <div className={`${styles.infoItem} fade-in`}>
                <div className={styles.iconWrapper}>
                  <Phone className={styles.icon} />
                </div>
                <div>
                  <h4>Téléphone</h4>
                  <p>+1 (855) 481-2339</p>
                </div>
              </div>
              <div className={`${styles.infoItem} fade-in`}>
                <div className={styles.iconWrapper}>
                  <MapPin className={styles.icon} />
                </div>
                <div>
                  <h4>Bureau principal</h4>
                  <p>
                    <span>55 Av. de Vimy,</span>
                    <span> H3S 2P9, Outremont, QC</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.rightPanel}>
            <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
              <div className={styles.formGrid}>
                <div className={styles.inputGroup}>
                  <label className={styles.label}>Votre nom*</label>
                  <input
                    type="text"
                    className={styles.input}
                    {...register("name", {
                      required: "Veuillez entrer votre nom",
                    })}
                  />
                  {errors.name && (
                    <span className={styles.error}>{errors.name.message}</span>
                  )}
                </div>

                <div className={styles.inputGroup}>
                  <label className={styles.label}>Votre email*</label>
                  <input
                    type="email"
                    className={styles.input}
                    {...register("email", {
                      required: "Veuillez entrer votre email",
                      pattern: {
                        value: /^\S+@\S+$/i,
                        message: "Email invalide",
                      },
                    })}
                  />
                  {errors.email && (
                    <span className={styles.error}>{errors.email.message}</span>
                  )}
                </div>
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label}>Votre message*</label>
                <textarea
                  className={styles.textarea}
                  {...register("message", {
                    required: "Veuillez entrer un message",
                  })}
                />
                {errors.message && (
                  <span className={styles.error}>{errors.message.message}</span>
                )}
              </div>

              <button
                type="submit"
                className={`${styles.submitButton} ${
                  isLording ? styles.lording : ""
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
      </div>

      {/* <div className={styles.mapSection}>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2796.3305816093724!2d-73.55739492346987!3d45.50201573056824!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4cc91a5a66841509%3A0x6434041f34d9f84b!2s408%20Rue%20McGill%2C%20Montr%C3%A9al%2C%20QC%20H2Y%202G1!5e0!3m2!1sfr!2sca!4v1709612844034!5m2!1sfr!2sca"
          width="100%"
          height="450"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div> */}
    </div>
  );
}
