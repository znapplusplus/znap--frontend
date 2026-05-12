"use client";

import { useState } from "react";
import { Button, Input, Navbar } from "@/components/ui";
import styles from "./page.module.css";

export default function DesignSystemPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [notes, setNotes] = useState("");

  return (
    <main className={styles.page}>
      <section className={styles.grid}>
        <div className={styles.card}>
          <h1 className={styles.heading}>Input design system</h1>
          <p className={styles.text}>Preview the new reusable Input component states and sizes.</p>
        </div>

        <div className={styles.navbarCard}>
          <h2 className={styles.sectionTitle}>Navbar</h2>
          <div className={styles.navbarStack}>
            <div>
              <p className={styles.navbarLabel}>Not login</p>
              <Navbar variant="guest" />
            </div>
            <div>
              <p className={styles.navbarLabel}>Login / Traveler</p>
              <Navbar variant="traveler" user={{ name: "Jodaney" }} />
            </div>
            <div>
              <p className={styles.navbarLabel}>Photographer</p>
              <Navbar variant="photographer" user={{ name: "Sofarey" }} />
            </div>
          </div>
        </div>

        <div className={styles.card}>
          <h2 className={styles.sectionTitle}>Variants</h2>
          <Input label="Default" placeholder="Default" />
          <Input label="Filled" variant="filled" placeholder="Filled style" />
          <Input label="Outline" variant="outline" placeholder="Outline style" />
          <Input label="Soft" variant="soft" placeholder="Soft style" />
        </div>

        <div className={styles.card}>
          <h2 className={styles.sectionTitle}>Sizes</h2>
          <Input label="Small" size="sm" placeholder="Small input" />
          <Input label="Medium" size="md" placeholder="Medium input" />
          <Input label="Large" size="lg" placeholder="Large input" />
        </div>

        <div className={styles.card}>
          <h2 className={styles.sectionTitle}>Status</h2>
          <Input label="Error" errorText="Required field" placeholder="Error state" />
          <Input label="Warning" warningText="Check the value" placeholder="Warning state" />
          <Input label="Success" successText="Good choice" placeholder="Success state" />
          <Input label="Helper" helperText="Optional guidance" placeholder="Helper text" />
        </div>

        <div className={styles.card}>
          <h2 className={styles.sectionTitle}>Password</h2>
          <Input
            label="Password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>

        <div className={styles.card}>
          <h2 className={styles.sectionTitle}>Form patterns</h2>
          <div className={styles.fieldRow}>
            <Input label="First name" placeholder="input text" />
            <Input label="Middle name" labelHint="(optional)" placeholder="input text" />
          </div>
          <Input label="Last name" placeholder="input text" />
          <Input label="Email address" type="email" placeholder="input text" />
          <Input
            label="Phone number"
            type="tel"
            placeholder="input text"
            leftAddon={
              <Button type="button" variant="unstyled" className={styles.phonePrefix} aria-label="Change country code">
                <span>US</span>
                <span aria-hidden="true">v</span>
                <span>+1</span>
              </Button>
            }
          />
        </div>

        <div className={styles.card}>
          <h2 className={styles.sectionTitle}>Textarea</h2>
          <Input
            label="Notes"
            type="textarea"
            rows={5}
            value={notes}
            onChange={(event) => setNotes(event.target.value)}
            placeholder="Type a longer note"
          />
        </div>

        <div className={styles.card}>
          <h2 className={styles.sectionTitle}>Disabled / readonly</h2>
          <Input label="Disabled" disabled placeholder="Disabled input" />
          <Input label="Read only" type="textarea" readOnly defaultValue="This field is read only." />
        </div>

        <div className={styles.card}>
          <h2 className={styles.sectionTitle}>Controlled example</h2>
          <Input
            label="Email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            helperText="Controlled input example"
          />
        </div>
      </section>
    </main>
  );
}
