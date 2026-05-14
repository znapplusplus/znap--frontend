import { Button } from "@/components/ui";
import styles from "./LandingHero.module.css";

const heroStats = [
  { value: "15-30", label: "นาทีต่อ session" },
  { value: "2 km", label: "ค้นหาช่างภาพใกล้คุณ" },
  { value: "20%", label: "ค่าธรรมเนียมแพลตฟอร์ม" },
];

const highlights = [
  {
    title: "ค้นหาช่างภาพที่พร้อมรับงานทันที",
    body: "ดูสถานะออนไลน์ ระยะทาง และแพ็คเกจที่เปิดใช้งานได้จากหน้าเดียว",
    accent: "LIVE",
  },
  {
    title: "จ่ายผ่าน escrow ก่อนส่งงาน",
    body: "ลดความเสี่ยงทั้งฝั่งลูกค้าและช่างภาพด้วย flow ที่ชัดเจน",
    accent: "SAFE",
  },
  {
    title: "เหมาะกับทริปสั้นและ spot ยอดนิยม",
    body: "ออกแบบมาเพื่อการจองแบบเร็วในจุดท่องเที่ยว ไม่ต้องโหลดแอป",
    accent: "FAST",
  },
];

const journeySteps = [
  {
    step: "01",
    title: "สแกน QR หรือเปิดเว็บ",
    body: "เข้าหน้าจองได้ทันทีจากมือถือหรือแท็บเล็ตในพื้นที่จริง",
  },
  {
    step: "02",
    title: "เลือกช่างภาพและแพ็คเกจ",
    body: "เปรียบเทียบราคา ระยะทาง และเวลาที่ว่างได้ในไม่กี่วินาที",
  },
  {
    step: "03",
    title: "ถ่าย รับรูป และปลด escrow",
    body: "จบ session แบบเรียบง่าย พร้อมขั้นตอนรับงานที่ตรวจสอบได้",
  },
];

export function LandingHero() {
  return (
    <main className={styles.heroShell}>
      <div aria-hidden className={styles.orbLarge} />
      <div aria-hidden className={styles.orbSmall} />

      <section id="overview" className={styles.heroSection}>
        <div className={styles.copyColumn}>
          <span className={styles.kicker}>
            <span className={styles.kickerDot} />
            On-demand Photography Ecosystem
          </span>

          <h1 className={styles.title}>
            เปลี่ยนทุก
            <span className={styles.titleAccent}>การท่องเที่ยว</span>
            <br />
            ให้กลายเป็น <span className={styles.titleAccent}>สตูดิโอส่วนตัว</span>
          </h1>

          <p className={styles.lead}>
            จองช่างภาพหรือ Photography Buddy แบบทันใจในจุดเช็คอินที่คุณอยู่
            <br className={styles.desktopBreak} />
            ใช้งานผ่านเว็บได้เลย แค่สแกน QR แล้วเริ่ม session ได้ทันที
          </p>

          <div className={styles.ctaRow}>
            <Button href="/register" size="lg" className={styles.primaryCta}>
              เริ่มใช้งานฟรี
              <ArrowRightIcon />
            </Button>
            <Button href="/login" variant="secondary" size="lg" className={styles.secondaryCta}>
              เข้าสู่ระบบ
            </Button>
          </div>

          <div className={styles.statRow}>
            {heroStats.map((stat) => (
              <article key={stat.label} className={styles.statCard}>
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </article>
            ))}
          </div>
        </div>

        <div className={styles.previewColumn}>
          <div className={styles.previewCard}>
            <div className={styles.previewTopbar}>
              <span className={`${styles.windowDot} ${styles.windowDotRed}`} />
              <span className={`${styles.windowDot} ${styles.windowDotYellow}`} />
              <span className={`${styles.windowDot} ${styles.windowDotGreen}`} />
              <span className={styles.previewOrigin}>znapplus.app</span>
            </div>

            <div className={styles.previewBody}>
              <div className={styles.mapPanel}>
                <span className={styles.mapPulse} />
                <span className={styles.mapLabel}>Nearby creators online</span>
                <strong>12 คน</strong>
                <p>พร้อมรับงานในรัศมี 2 กม. ตอนนี้</p>
              </div>

              <div className={styles.previewGrid}>
                {highlights.map((item) => (
                  <article key={item.title} className={styles.highlightCard}>
                    <span className={styles.highlightBadge}>{item.accent}</span>
                    <h2>{item.title}</h2>
                    <p>{item.body}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>

          <p className={styles.previewNote}>* ภาพประกอบจำลอง ระบบจริงอยู่ระหว่างการพัฒนา</p>
        </div>
      </section>

      <section className={styles.stepsSection} aria-labelledby="how-it-works-title">
        <div className={styles.sectionHeading}>
          <span className={styles.sectionLabel}>How it works</span>
          <h2 id="how-it-works-title">โฟลว์ที่สั้นพอสำหรับหน้างานจริง</h2>
          <p>ตั้งแต่ค้นหา ไปจนถึงปลด escrow ทุกอย่างถูกออกแบบให้จบเร็วและเข้าใจง่ายบนมือถือ</p>
        </div>

        <div className={styles.stepsGrid}>
          {journeySteps.map((step) => (
            <article key={step.step} className={styles.stepCard}>
              <span className={styles.stepNumber}>{step.step}</span>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

function ArrowRightIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className={styles.arrowIcon}>
      <path
        d="M4 10h12m0 0-4-4m4 4-4 4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
