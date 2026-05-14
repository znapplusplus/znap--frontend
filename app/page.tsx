"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Footer, Navbar } from "@/components/layout";
import { LandingHero } from "@/components/sections";
import styles from "./page.module.css";

type UserLite = { firstName?: string; role?: "traveler" | "photographer" | string } | null;

export default function Home() {
  const router = useRouter();
  const [user, setUser] = useState<UserLite>(null);
  const [mounted, setMounted] = useState(false);
  const navbarVariant = !mounted || !user
    ? "guest"
    : user.role === "photographer"
      ? "photographer"
      : "traveler";

  // อ่าน user จาก localStorage หลัง hydrate (external system → ปลอดภัย)
  useEffect(() => {
    /* eslint-disable react-hooks/set-state-in-effect */
    setMounted(true);
    try {
      const raw = localStorage.getItem("znap_user");
      if (raw) setUser(JSON.parse(raw));
    } catch {
      setUser(null);
    }
    /* eslint-enable react-hooks/set-state-in-effect */
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("znap_token");
    localStorage.removeItem("znap_user");
    setUser(null);
    router.refresh();
  };

  return (
    <div className={styles.page}>
      <Navbar
        variant={navbarVariant}
        user={user ? { name: user.firstName } : undefined}
        onSignOut={user ? handleLogout : undefined}
      />

      <LandingHero />
      <Footer />
    </div>
  );
}

