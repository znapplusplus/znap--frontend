import type { ReactNode } from "react";
import { Navbar } from "@/components/layout";
import styles from "./TravelerAuthShell.module.css";

export type TravelerAuthShellProps = {
  title: ReactNode;
  subtitle: ReactNode;
  children: ReactNode;
  tone?: "traveler" | "photographer";
  illustrationSrc?: string;
  illustrationAlt?: string;
};

export function TravelerAuthShell({
  title,
  subtitle,
  children,
  tone = "traveler",
  illustrationSrc,
  illustrationAlt = "",
}: TravelerAuthShellProps) {
  return (
    <div className={`${styles.page} ${tone === "photographer" ? styles.photographer : styles.traveler}`}>
      <Navbar variant="guest" />
      <main className={styles.stage}>
        <section className={styles.copy}>
          <div className={styles.copyContent}>
            <h1>{title}</h1>
            <div className={styles.subtitle}>{subtitle}</div>
          </div>
          {illustrationSrc ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img className={styles.illustration} src={illustrationSrc} alt={illustrationAlt} />
          ) : null}
        </section>
        <section className={styles.card}>{children}</section>
      </main>
    </div>
  );
}
