import styles from "./Footer.module.css";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <span className={styles.mark}>Z</span>
          <span>© {new Date().getFullYear()} Znap++ — Infrastructure for Digital Memories</span>
        </div>

        <nav className={styles.links} aria-label="Footer">
          <a href="#overview">ภาพรวม</a>
          <a href="#how-it-works">วิธีใช้งาน</a>
          <a href="/register">เริ่มต้นใช้งาน</a>
        </nav>
      </div>
    </footer>
  );
}
