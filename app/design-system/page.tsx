"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  Alert,
  Avatar,
  Badge,
  Button,
  Card,
  CategoryTile,
  Checkbox,
  Dialog,
  Divider,
  Drawer,
  EmptyState,
  FileUploadCard,
  Input,
  Pagination,
  PriceTag,
  QuickActionItem,
  RangeSlider,
  RatingStars,
  SectionHeader,
  Select,
  Skeleton,
  SocialAuthButton,
  Spinner,
  StepProgress,
  Switch,
  TagInput,
  Tabs,
  Tooltip,
} from "@/components/ui";
import {
  CameraIcon,
  FireIcon,
  HeartIcon,
  ICON_REGISTRY,
  ImageIcon,
  PinIcon,
  SearchIcon,
  SparkleIcon,
  TrashIcon,
  UserIcon,
  type IconRegistryEntry,
} from "@/components/ui/icons";
import { Footer, Navbar } from "@/components/layout";
import {
  PhotographerListItem,
  PhotographerStyleChips,
  StylePreferencePicker,
} from "@/components/features";
import styles from "./page.module.css";

/* ============================================================
 * Categories
 * ============================================================ */
type Category =
  | "foundations"
  | "icons"
  | "inputs"
  | "feedback"
  | "navigation"
  | "overlays"
  | "composites"
  | "layout"
  | "sections"
  | "features";

type CategoryInfo = {
  id: Category;
  group: "UI" | "App";
  label: string;
  description: string;
  count: number;
};

const CATEGORIES: CategoryInfo[] = [
  { id: "foundations", group: "UI", label: "Foundations", description: "Atomic visual primitives — buttons, avatars, badges, cards, dividers, price, social auth.", count: 9 },
  { id: "icons",       group: "UI", label: "Icons",       description: "SVG icon library. Click a tile to copy its import.", count: ICON_REGISTRY.length },
  { id: "inputs",      group: "UI", label: "Inputs",      description: "Form controls — text, select, checkbox, switch, slider, tags, uploads.", count: 7 },
  { id: "feedback",    group: "UI", label: "Feedback",    description: "Loading, empty, alerts, progress.", count: 5 },
  { id: "navigation",  group: "UI", label: "Navigation",  description: "Tabs and pagination.", count: 2 },
  { id: "overlays",    group: "UI", label: "Overlays",    description: "Dialog, drawer, tooltip.", count: 3 },
  { id: "composites",  group: "UI", label: "Composites",  description: "Larger UI patterns built from primitives.", count: 2 },
  { id: "layout",      group: "App", label: "Layout",      description: "Site chrome shared across pages — Navbar variants and Footer.", count: 2 },
  { id: "sections",    group: "App", label: "Sections",    description: "Composable page sections — hero, marketing blocks.", count: 1 },
  { id: "features",    group: "App", label: "Features",    description: "Feature-scoped components — auth/onboarding, photographer list.", count: 4 },
];

/* ============================================================
 * Page
 * ============================================================ */
export default function DesignSystemPage() {
  const [active, setActive] = useState<Category>("foundations");

  const grouped = useMemo(
    () => ({
      UI: CATEGORIES.filter((c) => c.group === "UI"),
      App: CATEGORIES.filter((c) => c.group === "App"),
    }),
    [],
  );

  const current = CATEGORIES.find((c) => c.id === active);

  return (
    <div className={styles.shell}>
      <aside className={styles.sidebar}>
        <Link href="/" className={styles.sidebarBrand}>
          <span className={styles.brandMark}>Z</span>
          Znap++ DS
        </Link>

        <div className={styles.sidebarGroup}>
          <span className={styles.sidebarLabel}>UI Library</span>
          {grouped.UI.map((cat) => (
            <SidebarLink key={cat.id} cat={cat} active={active} onClick={setActive} />
          ))}
        </div>

        <div className={styles.sidebarGroup}>
          <span className={styles.sidebarLabel}>App Composition</span>
          {grouped.App.map((cat) => (
            <SidebarLink key={cat.id} cat={cat} active={active} onClick={setActive} />
          ))}
        </div>

        <div className={styles.sidebarGroup}>
          <span className={styles.sidebarLabel}>References</span>
          <Link href="/" className={styles.sidebarLink}>← Back to site</Link>
        </div>
      </aside>

      <main className={styles.main}>
        <header className={styles.pageHeader}>
          <h1 className={styles.pageTitle}>{current?.label}</h1>
          <p className={styles.pageSubtitle}>{current?.description}</p>
        </header>

        <div className={styles.componentList}>
          {active === "foundations" && <FoundationsSection />}
          {active === "icons" && <IconsSection />}
          {active === "inputs" && <InputsSection />}
          {active === "feedback" && <FeedbackSection />}
          {active === "navigation" && <NavigationSection />}
          {active === "overlays" && <OverlaysSection />}
          {active === "composites" && <CompositesSection />}
          {active === "layout" && <LayoutSection />}
          {active === "sections" && <SectionsSection />}
          {active === "features" && <FeaturesSection />}
        </div>
      </main>
    </div>
  );
}

function SidebarLink({
  cat,
  active,
  onClick,
}: {
  cat: CategoryInfo;
  active: Category;
  onClick: (id: Category) => void;
}) {
  return (
    <button
      type="button"
      className={`${styles.sidebarLink} ${active === cat.id ? styles.sidebarLinkActive : ""}`}
      onClick={() => onClick(cat.id)}
    >
      <span>{cat.label}</span>
      <span className={styles.sidebarCount}>{cat.count}</span>
    </button>
  );
}

/* ============================================================
 * Component preview wrapper
 * ============================================================ */
type ComponentBlockProps = {
  name: string;
  importFrom: string;
  description: string;
  children: React.ReactNode;
};

function ComponentBlock({ name, importFrom, description, children }: ComponentBlockProps) {
  return (
    <section className={styles.componentBlock}>
      <header className={styles.componentHeader}>
        <div className={styles.componentTitleRow}>
          <h2 className={styles.componentName}>{name}</h2>
          <code className={styles.componentImport}>{importFrom}</code>
        </div>
        <p className={styles.componentDescription}>{description}</p>
      </header>
      {children}
    </section>
  );
}

type VariantCardProps = {
  label: string;
  wide?: boolean;
  children: React.ReactNode;
};

function VariantCard({ label, wide, children }: VariantCardProps) {
  return (
    <div className={styles.variantCard}>
      <span className={styles.variantLabel}>{label}</span>
      <div className={`${styles.variantStage} ${wide ? styles.variantStageWide : ""}`}>
        {children}
      </div>
    </div>
  );
}

/* ============================================================
 * Icons section
 * ============================================================ */
function IconsSection() {
  const [query, setQuery] = useState("");
  const [copied, setCopied] = useState<string | null>(null);

  const groups = useMemo(() => {
    const filtered = ICON_REGISTRY.filter((i) =>
      i.name.toLowerCase().includes(query.toLowerCase()) ||
      i.displayName.toLowerCase().includes(query.toLowerCase()),
    );
    return {
      Navigation: filtered.filter((i) => i.group === "Navigation"),
      Action: filtered.filter((i) => i.group === "Action"),
      Status: filtered.filter((i) => i.group === "Status"),
      Domain: filtered.filter((i) => i.group === "Domain"),
    } satisfies Record<string, IconRegistryEntry[]>;
  }, [query]);

  const copyImport = async (name: string) => {
    const code = `import { ${name} } from "@/components/ui/icons";`;
    try {
      await navigator.clipboard.writeText(code);
      setCopied(name);
      setTimeout(() => setCopied(null), 1200);
    } catch {
      // ignore
    }
  };

  return (
    <>
      <Card padding="md">
        <p className={styles.componentDescription} style={{ marginBottom: "var(--space-sm)" }}>
          All icons share <code className={styles.componentImport}>size</code>,{" "}
          <code className={styles.componentImport}>strokeWidth</code>, and inherit{" "}
          <code className={styles.componentImport}>currentColor</code>. Click a tile to copy its import.
        </p>
        <div className={styles.iconSearch}>
          <Input
            placeholder="Search icons…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            leftIcon={<SearchIcon size={16} />}
            fullWidth
          />
        </div>
      </Card>

      {(Object.keys(groups) as Array<keyof typeof groups>).map((group) =>
        groups[group].length === 0 ? null : (
          <div key={group} className={styles.iconGroup}>
            <span className={styles.iconGroupLabel}>{group}</span>
            <div className={styles.iconGrid}>
              {groups[group].map(({ name, displayName, Component }) => (
                <button
                  key={name}
                  type="button"
                  className={`${styles.iconCell} ${copied === name ? styles.iconCopied : ""}`}
                  onClick={() => copyImport(name)}
                  title={`Copy: import { ${name} } from "@/components/ui/icons"`}
                >
                  <span className={styles.iconCellGlyph}>
                    <Component size={28} />
                  </span>
                  <span className={styles.iconCellName}>{displayName}</span>
                  <code className={styles.iconCellCode}>{copied === name ? "Copied!" : name}</code>
                </button>
              ))}
            </div>
          </div>
        ),
      )}
    </>
  );
}

/* ============================================================
 * Foundations
 * ============================================================ */
function FoundationsSection() {
  return (
    <>
      <ComponentBlock name="Avatar" importFrom='import { Avatar } from "@/components/ui"' description="Circular profile image with initials fallback + optional role border + status dot.">
        <div className={styles.variantGrid}>
          <VariantCard label="Sizes">
            <Avatar name="Jodaney M" size="xs" />
            <Avatar name="Jodaney M" size="sm" />
            <Avatar name="Jodaney M" size="md" />
            <Avatar name="Jodaney M" size="lg" />
            <Avatar name="Jodaney M" size="xl" />
          </VariantCard>
          <VariantCard label="Variants">
            <Avatar name="Default" />
            <Avatar name="Traveler" variant="traveler" />
            <Avatar name="Photographer" variant="photographer" />
          </VariantCard>
          <VariantCard label="With status">
            <Avatar name="Online" status="online" size="lg" />
            <Avatar name="Offline" status="offline" size="lg" />
          </VariantCard>
        </div>
      </ComponentBlock>

      <ComponentBlock name="Badge" importFrom='import { Badge } from "@/components/ui"' description="Pill label for tags, categories, status.">
        <div className={styles.variantGrid}>
          <VariantCard label="Variants">
            <Badge>Default</Badge>
            <Badge variant="primary">Friends Moment</Badge>
            <Badge variant="secondary" icon={<FireIcon />}>Modern Thai</Badge>
            <Badge variant="info">Local Experience</Badge>
          </VariantCard>
          <VariantCard label="Semantic">
            <Badge variant="success" size="sm">Online</Badge>
            <Badge variant="warning" size="sm">Coming soon</Badge>
            <Badge variant="error" size="sm">Error</Badge>
            <Badge variant="neutral" size="sm">Draft</Badge>
          </VariantCard>
          <VariantCard label="Sizes">
            <Badge size="sm">SM</Badge>
            <Badge size="md">MD</Badge>
            <Badge size="lg">LG</Badge>
          </VariantCard>
        </div>
      </ComponentBlock>

      <ComponentBlock name="Button" importFrom='import { Button } from "@/components/ui"' description="Pill button, also renders as <Link> when href is provided.">
        <div className={styles.variantGrid}>
          <VariantCard label="Variants">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="danger">Danger</Button>
          </VariantCard>
          <VariantCard label="Sizes">
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
          </VariantCard>
          <VariantCard label="States">
            <Button disabled>Disabled</Button>
            <Button href="/" variant="primary">As link</Button>
          </VariantCard>
          <VariantCard label="Full width" wide>
            <Button variant="primary" fullWidth>Continue</Button>
          </VariantCard>
        </div>
      </ComponentBlock>

      <ComponentBlock name="Card" importFrom='import { Card } from "@/components/ui"' description="Surface wrapper — default / outline / elevated / ghost variants.">
        <div className={styles.variantGrid}>
          <VariantCard label="Default" wide><Card>Default card with shadow-sm</Card></VariantCard>
          <VariantCard label="Outline" wide><Card variant="outline">Outline card</Card></VariantCard>
          <VariantCard label="Elevated" wide><Card variant="elevated">Elevated card</Card></VariantCard>
          <VariantCard label="Ghost (dashed)" wide><Card variant="ghost">Dashed placeholder</Card></VariantCard>
          <VariantCard label="Interactive" wide>
            <Card interactive onClick={() => {}}>Whole card is clickable</Card>
          </VariantCard>
        </div>
      </ComponentBlock>

      <ComponentBlock name="Divider" importFrom='import { Divider } from "@/components/ui"' description="Visual separator. Horizontal/vertical, solid/dashed, optional label.">
        <div className={styles.variantGrid}>
          <VariantCard label="Solid" wide><Divider /></VariantCard>
          <VariantCard label="Dashed" wide><Divider variant="dashed" /></VariantCard>
          <VariantCard label="With label" wide><Divider label="OR" /></VariantCard>
        </div>
      </ComponentBlock>

      <ComponentBlock name="PriceTag" importFrom='import { PriceTag } from "@/components/ui"' description="Formatted price with currency symbol, amount, optional unit.">
        <div className={styles.variantGrid}>
          <VariantCard label="Sizes">
            <PriceTag amount={500} size="sm" unit="/hr" />
            <PriceTag amount={500} size="md" unit="/hr" />
            <PriceTag amount={500} size="lg" unit="/hr" />
            <PriceTag amount={500} size="xl" unit="/hr" />
          </VariantCard>
          <VariantCard label="Emphasis + discount">
            <PriceTag amount={1200} size="xl" emphasis unit="/session" />
            <PriceTag amount={2000} size="sm" strikethrough />
          </VariantCard>
          <VariantCard label="Other currencies">
            <PriceTag amount={20} currency="USD" />
            <PriceTag amount={18} currency="EUR" />
            <PriceTag amount={3500} currency="JPY" />
          </VariantCard>
        </div>
      </ComponentBlock>

      <ComponentBlock name="RatingStars" importFrom='import { RatingStars } from "@/components/ui"' description="Star + rating value + count.">
        <div className={styles.variantGrid}>
          <VariantCard label="Compact">
            <RatingStars rating={4.9} count={132} size="sm" />
            <RatingStars rating={4.8} count={92} />
            <RatingStars rating={4.6} count={67} size="lg" />
          </VariantCard>
          <VariantCard label="All 5 stars">
            <RatingStars rating={5} showAllStars />
            <RatingStars rating={4} showAllStars />
            <RatingStars rating={3} showAllStars />
          </VariantCard>
        </div>
      </ComponentBlock>

      <ComponentBlock name="SectionHeader" importFrom='import { SectionHeader } from "@/components/ui"' description="Section title with optional view-all action; kicker variant for uppercase labels.">
        <div className={styles.variantGrid}>
          <VariantCard label="Default" wide>
            <SectionHeader title="Trending now" action={{ label: "view all", href: "/photographers" }} />
          </VariantCard>
          <VariantCard label="Kicker" wide>
            <SectionHeader variant="kicker" title="EXPLORE CATEGORIES" description="Pick a style to start a session" />
          </VariantCard>
        </div>
      </ComponentBlock>

      <ComponentBlock
        name="SocialAuthButton"
        importFrom='import { SocialAuthButton } from "@/components/ui"'
        description="OAuth / SSO sign-in buttons. Google / Apple / Facebook / X with real brand colors. Use `mode` to switch the prefix label."
      >
        <div className={styles.variantGrid}>
          <VariantCard label='mode="login"' wide>
            <SocialAuthButton provider="google" />
            <SocialAuthButton provider="apple" />
            <SocialAuthButton provider="facebook" />
            <SocialAuthButton provider="x" />
          </VariantCard>
          <VariantCard label='mode="signup"' wide>
            <SocialAuthButton provider="google" mode="signup" />
            <SocialAuthButton provider="apple" mode="signup" />
            <SocialAuthButton provider="facebook" mode="signup" />
            <SocialAuthButton provider="x" mode="signup" />
          </VariantCard>
          <VariantCard label='mode="continue"' wide>
            <SocialAuthButton provider="google" mode="continue" />
            <SocialAuthButton provider="apple" mode="continue" />
          </VariantCard>
          <VariantCard label="Custom label + disabled" wide>
            <SocialAuthButton provider="apple" label="Use Apple ID" />
            <SocialAuthButton provider="google" disabled />
          </VariantCard>
        </div>
      </ComponentBlock>
    </>
  );
}

/* ============================================================
 * Inputs
 * ============================================================ */
function InputsSection() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [notes, setNotes] = useState("");
  const [tags, setTags] = useState<string[]>(["portrait"]);
  const [range, setRange] = useState(500);
  const [file, setFile] = useState<File | null>(null);
  const [city, setCity] = useState("bkk");
  const [agree, setAgree] = useState(false);
  const [notif, setNotif] = useState(true);

  return (
    <>
      <ComponentBlock name="Input" importFrom='import { Input } from "@/components/ui"' description="Text/email/password/textarea with label, helper, error, warning, success states.">
        <div className={styles.variantGrid}>
          <VariantCard label="Sizes" wide>
            <Input label="Small" size="sm" placeholder="small" fullWidth />
            <Input label="Medium" size="md" placeholder="medium" fullWidth />
            <Input label="Large" size="lg" placeholder="large" fullWidth />
          </VariantCard>
          <VariantCard label="Status" wide>
            <Input label="Error" errorText="Required field" placeholder="Error" fullWidth />
            <Input label="Warning" warningText="Check the value" placeholder="Warning" fullWidth />
            <Input label="Success" successText="Looks good" placeholder="Success" fullWidth />
          </VariantCard>
          <VariantCard label="Password + textarea" wide>
            <Input label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter password" fullWidth />
            <Input label="Notes" type="textarea" rows={3} value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Type a longer note" fullWidth />
          </VariantCard>
          <VariantCard label="Controlled email" wide>
            <Input label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} helperText={`Length: ${email.length}`} fullWidth />
          </VariantCard>
        </div>
      </ComponentBlock>

      <ComponentBlock name="Checkbox" importFrom='import { Checkbox } from "@/components/ui"' description="Custom-styled checkbox preserving native input.">
        <div className={styles.variantGrid}>
          <VariantCard label="Basic">
            <Checkbox label="I agree to the terms" checked={agree} onChange={(e) => setAgree(e.target.checked)} />
            <Checkbox label="Subscribe to updates" />
            <Checkbox label="Disabled" disabled />
          </VariantCard>
          <VariantCard label="With description">
            <Checkbox label="Remember me" description="Stay logged in on this device" />
            <Checkbox label="Save card" description="Saved cards can be used next time" />
          </VariantCard>
          <VariantCard label="Error">
            <Checkbox label="Required" errorText="You must accept the terms" />
          </VariantCard>
        </div>
      </ComponentBlock>

      <ComponentBlock name="Switch" importFrom='import { Switch } from "@/components/ui"' description="On/off toggle for instant settings.">
        <div className={styles.variantGrid}>
          <VariantCard label="With description" wide>
            <Switch label="Available for bookings" description="Show your profile in search" checked={notif} onChange={(e) => setNotif(e.target.checked)} />
            <Switch label="Email updates" description="Weekly summary of new requests" defaultChecked />
            <Switch label="SMS notifications" description="For urgent requests" disabled />
          </VariantCard>
        </div>
      </ComponentBlock>

      <ComponentBlock name="Select" importFrom='import { Select } from "@/components/ui"' description="Native select styled to match Input.">
        <div className={styles.variantGrid}>
          <VariantCard label="With placeholder" wide>
            <Select
              label="City"
              placeholder="Choose a city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              options={[
                { value: "bkk", label: "Bangkok" },
                { value: "cnx", label: "Chiang Mai" },
                { value: "hkt", label: "Phuket" },
              ]}
              fullWidth
            />
          </VariantCard>
          <VariantCard label="Sizes" wide>
            <Select label="Small" size="sm" options={[{ value: "1", label: "Option 1" }]} fullWidth />
            <Select label="Large" size="lg" options={[{ value: "1", label: "Option 1" }]} fullWidth />
          </VariantCard>
          <VariantCard label="Error" wide>
            <Select label="Required" errorText="Pick a city" options={[{ value: "1", label: "Option" }]} fullWidth />
          </VariantCard>
        </div>
      </ComponentBlock>

      <ComponentBlock name="TagInput" importFrom='import { TagInput } from "@/components/ui"' description="Free-form tags (Enter or , to add).">
        <div className={styles.variantGrid}>
          <VariantCard label="With existing tags" wide>
            <TagInput label="Styles" value={tags} onChange={setTags} helperText="Add up to 5" maxTags={5} />
          </VariantCard>
        </div>
      </ComponentBlock>

      <ComponentBlock name="RangeSlider" importFrom='import { RangeSlider } from "@/components/ui"' description="Single-value slider with floating label.">
        <div className={styles.variantGrid}>
          <VariantCard label="Currency" wide>
            <RangeSlider label="Hourly budget" value={range} min={100} max={2000} step={50} onChange={setRange} formatValue={(n) => `฿${n.toLocaleString()}`} />
          </VariantCard>
        </div>
      </ComponentBlock>

      <ComponentBlock name="FileUploadCard" importFrom='import { FileUploadCard } from "@/components/ui"' description="Image upload with preview.">
        <div className={styles.variantGrid}>
          <VariantCard label="Empty" wide>
            <FileUploadCard label="Profile photo" file={file} onChange={setFile} />
          </VariantCard>
        </div>
      </ComponentBlock>
    </>
  );
}

/* ============================================================
 * Feedback
 * ============================================================ */
function FeedbackSection() {
  return (
    <>
      <ComponentBlock name="Alert" importFrom='import { Alert } from "@/components/ui"' description="Inline notification with icon, title, message, and optional dismiss.">
        <div className={styles.variantGrid}>
          <VariantCard label="Info" wide><Alert variant="info" title="Heads up">Your session is about to expire in 5 minutes.</Alert></VariantCard>
          <VariantCard label="Success" wide><Alert variant="success" title="Saved" onClose={() => {}}>Your profile has been updated.</Alert></VariantCard>
          <VariantCard label="Warning" wide><Alert variant="warning" title="Pending verification">We&apos;re reviewing your documents. This usually takes 24 hours.</Alert></VariantCard>
          <VariantCard label="Error" wide><Alert variant="error" title="Upload failed" onClose={() => {}}>The file exceeds the 10 MB limit.</Alert></VariantCard>
        </div>
      </ComponentBlock>

      <ComponentBlock name="EmptyState" importFrom='import { EmptyState } from "@/components/ui"' description="Placeholder for empty lists, initial states, no-search-results.">
        <div className={styles.variantGrid}>
          <VariantCard label="With action" wide>
            <EmptyState icon={<CameraIcon />} title="No bookings yet" description="Once a photographer accepts your request, it'll appear here." action={<Button href="/find-photographer">Find a photographer</Button>} />
          </VariantCard>
          <VariantCard label="Compact" wide>
            <EmptyState variant="compact" title="Nothing here" description="No items match your filter." />
          </VariantCard>
        </div>
      </ComponentBlock>

      <ComponentBlock name="Skeleton" importFrom='import { Skeleton } from "@/components/ui"' description="Animated loading placeholder. Match the shape of the real content.">
        <div className={styles.variantGrid}>
          <VariantCard label="Card-like" wide>
            <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-sm)", width: "100%" }}>
              <div style={{ display: "flex", gap: "var(--space-md)", alignItems: "center" }}>
                <Skeleton shape="circle" width={48} />
                <div style={{ flex: 1 }}><Skeleton shape="text" lines={2} /></div>
              </div>
              <Skeleton height={120} />
            </div>
          </VariantCard>
          <VariantCard label="Text lines" wide><Skeleton shape="text" lines={4} /></VariantCard>
        </div>
      </ComponentBlock>

      <ComponentBlock name="Spinner" importFrom='import { Spinner } from "@/components/ui"' description="Inline loading indicator.">
        <div className={styles.variantGrid}>
          <VariantCard label="Sizes">
            <Spinner size="sm" />
            <Spinner size="md" />
            <Spinner size="lg" />
          </VariantCard>
          <VariantCard label="Tones">
            <Spinner tone="primary" />
            <Spinner tone="muted" />
            <div style={{ background: "var(--color-primary)", padding: "var(--space-sm)", borderRadius: "var(--radius-sm)" }}>
              <Spinner tone="inverse" />
            </div>
          </VariantCard>
        </div>
      </ComponentBlock>

      <ComponentBlock name="StepProgress" importFrom='import { StepProgress } from "@/components/ui"' description='"Step N of M" progress bar for multi-step flows.'>
        <div className={styles.variantGrid}>
          <VariantCard label="1 of 3" wide><StepProgress currentStep={1} totalSteps={3} /></VariantCard>
          <VariantCard label="2 of 3" wide><StepProgress currentStep={2} totalSteps={3} /></VariantCard>
          <VariantCard label="3 of 3" wide><StepProgress currentStep={3} totalSteps={3} /></VariantCard>
        </div>
      </ComponentBlock>
    </>
  );
}

/* ============================================================
 * Navigation
 * ============================================================ */
function NavigationSection() {
  const [tab, setTab] = useState("active");
  const [pillTab, setPillTab] = useState("week");
  const [page, setPage] = useState(3);

  return (
    <>
      <ComponentBlock name="Tabs" importFrom='import { Tabs } from "@/components/ui"' description="Tab strip with optional count chips. Underline or pill variant.">
        <div className={styles.variantGrid}>
          <VariantCard label="Underline" wide>
            <Tabs value={tab} onChange={setTab} items={[
              { id: "active", label: "Active", count: 3 },
              { id: "history", label: "History", count: 12 },
              { id: "cancelled", label: "Cancelled", disabled: true },
            ]} />
          </VariantCard>
          <VariantCard label="Pill" wide>
            <Tabs variant="pill" value={pillTab} onChange={setPillTab} items={[
              { id: "day", label: "Day" },
              { id: "week", label: "Week" },
              { id: "month", label: "Month" },
            ]} />
          </VariantCard>
        </div>
      </ComponentBlock>

      <ComponentBlock name="Pagination" importFrom='import { Pagination } from "@/components/ui"' description="Numbered page navigation with ellipsis for long ranges.">
        <div className={styles.variantGrid}>
          <VariantCard label="Default" wide><Pagination page={page} totalPages={20} onChange={setPage} /></VariantCard>
          <VariantCard label="With info" wide><Pagination page={page} totalPages={20} onChange={setPage} showInfo siblingCount={2} /></VariantCard>
        </div>
      </ComponentBlock>
    </>
  );
}

/* ============================================================
 * Overlays
 * ============================================================ */
function OverlaysSection() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [drawerLeft, setDrawerLeft] = useState(false);
  const [drawerRight, setDrawerRight] = useState(false);
  const [drawerBottom, setDrawerBottom] = useState(false);

  return (
    <>
      <ComponentBlock name="Dialog" importFrom='import { Dialog } from "@/components/ui"' description="Centered modal dialog. Escape + backdrop close, body scroll lock.">
        <div className={styles.variantGrid}>
          <VariantCard label="Trigger" wide>
            <Button onClick={() => setDialogOpen(true)}>Open dialog</Button>
            <Dialog
              open={dialogOpen}
              onClose={() => setDialogOpen(false)}
              title="Confirm booking"
              description="You will be charged ฿500 once the photographer accepts."
              footer={
                <>
                  <Button variant="secondary" onClick={() => setDialogOpen(false)}>Cancel</Button>
                  <Button onClick={() => setDialogOpen(false)}>Confirm</Button>
                </>
              }
            >
              Choose the time slot and any special requests.
            </Dialog>
          </VariantCard>
        </div>
      </ComponentBlock>

      <ComponentBlock name="Drawer" importFrom='import { Drawer } from "@/components/ui"' description="Slide-out panel — left/right/top/bottom.">
        <div className={styles.variantGrid}>
          <VariantCard label="Left (mobile menu)" wide>
            <Button onClick={() => setDrawerLeft(true)}>Open left drawer</Button>
            <Drawer open={drawerLeft} onClose={() => setDrawerLeft(false)} side="left" size="sm" title="Menu">
              <p style={{ fontSize: "var(--font-size-sm)", color: "var(--color-text-muted)" }}>Menu links would go here.</p>
            </Drawer>
          </VariantCard>
          <VariantCard label="Right (settings)" wide>
            <Button onClick={() => setDrawerRight(true)}>Open right drawer</Button>
            <Drawer open={drawerRight} onClose={() => setDrawerRight(false)} side="right" size="md" title="Filters" footer={<Button onClick={() => setDrawerRight(false)} fullWidth>Apply</Button>}>
              <p style={{ fontSize: "var(--font-size-sm)", color: "var(--color-text-muted)" }}>Filter form would go here.</p>
            </Drawer>
          </VariantCard>
          <VariantCard label="Bottom sheet" wide>
            <Button onClick={() => setDrawerBottom(true)}>Open bottom sheet</Button>
            <Drawer open={drawerBottom} onClose={() => setDrawerBottom(false)} side="bottom" size="sm" title="Quick action">
              <p style={{ fontSize: "var(--font-size-sm)", color: "var(--color-text-muted)" }}>Sheet content.</p>
            </Drawer>
          </VariantCard>
        </div>
      </ComponentBlock>

      <ComponentBlock name="Tooltip" importFrom='import { Tooltip } from "@/components/ui"' description="Pure CSS hover tooltip. Wrap any trigger.">
        <div className={styles.variantGrid}>
          <VariantCard label="Sides">
            <Tooltip label="Delete this photo" side="top">
              <Button variant="icon" aria-label="Delete"><TrashIcon /></Button>
            </Tooltip>
            <Tooltip label="Find nearby" side="bottom">
              <Button variant="icon" aria-label="Pin"><PinIcon /></Button>
            </Tooltip>
            <Tooltip label="Take a photo" side="right">
              <Button variant="icon" aria-label="Camera"><CameraIcon /></Button>
            </Tooltip>
          </VariantCard>
        </div>
      </ComponentBlock>
    </>
  );
}

/* ============================================================
 * Composites
 * ============================================================ */
function CompositesSection() {
  return (
    <>
      <ComponentBlock name="CategoryTile" importFrom='import { CategoryTile } from "@/components/ui"' description="Image card with circular icon overlay + label. Used for Explore Categories.">
        <div className={styles.variantGrid}>
          <VariantCard label="Landscape" wide>
            <div style={{ maxWidth: 280 }}>
              <CategoryTile label="Travel" imageSrc="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=600" icon={<FireIcon />} onClick={() => {}} />
            </div>
          </VariantCard>
          <VariantCard label="Square" wide>
            <div style={{ maxWidth: 220 }}>
              <CategoryTile label="Portrait" imageSrc="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=600" icon={<CameraIcon />} aspect="square" onClick={() => {}} />
            </div>
          </VariantCard>
          <VariantCard label="Portrait" wide>
            <div style={{ maxWidth: 180 }}>
              <CategoryTile label="Street Art" imageSrc="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600" icon={<SparkleIcon />} aspect="portrait" onClick={() => {}} />
            </div>
          </VariantCard>
        </div>
      </ComponentBlock>

      <ComponentBlock name="QuickActionItem" importFrom='import { QuickActionItem } from "@/components/ui"' description="Icon + title + subtitle + chevron — used in quick actions panels.">
        <div className={styles.variantGrid}>
          <VariantCard label="In a Card" wide>
            <Card padding="md" style={{ width: "100%" }}>
              <SectionHeader variant="kicker" title="QUICK ACTIONS" />
              <QuickActionItem icon={<PinIcon />} title="Near me" subtitle="Find photographers nearby" onClick={() => {}} />
              <QuickActionItem icon={<CameraIcon />} title="Find a photographer" subtitle="Search with filters" onClick={() => {}} />
              <QuickActionItem icon={<FireIcon />} title="Trending this month" subtitle="Best photographers" tone="secondary" onClick={() => {}} />
              <QuickActionItem icon={<SparkleIcon />} title="Match Style" subtitle="Match a style with AI" onClick={() => {}} />
            </Card>
          </VariantCard>
        </div>
      </ComponentBlock>
    </>
  );
}

/* ============================================================
 * Layout
 * ============================================================ */
function LayoutSection() {
  return (
    <>
      <ComponentBlock name="Navbar" importFrom='import { Navbar } from "@/components/layout"' description="Top navigation. Three variants for guest, traveler, and photographer roles.">
        <div className={styles.fullStage}>
          <p className={styles.componentDescription} style={{ marginBottom: "var(--space-sm)" }}>Guest</p>
          <Navbar variant="guest" />
        </div>
        <div className={styles.fullStage}>
          <p className={styles.componentDescription} style={{ marginBottom: "var(--space-sm)" }}>Traveler</p>
          <Navbar variant="traveler" user={{ name: "Jodaney" }} />
        </div>
        <div className={styles.fullStage}>
          <p className={styles.componentDescription} style={{ marginBottom: "var(--space-sm)" }}>Photographer</p>
          <Navbar variant="photographer" user={{ name: "Sofarey" }} />
        </div>
      </ComponentBlock>

      <ComponentBlock name="Footer" importFrom='import { Footer } from "@/components/layout"' description="Site footer with brand line and nav links.">
        <div className={styles.fullStage}><Footer /></div>
      </ComponentBlock>
    </>
  );
}

/* ============================================================
 * Sections
 * ============================================================ */
function SectionsSection() {
  return (
    <ComponentBlock name="LandingHero" importFrom='import { LandingHero } from "@/components/sections"' description="Public landing hero — kicker, headline, CTAs, stat row, preview card, steps grid.">
      <p className={styles.componentDescription}>
        Full-page section. View live on the{" "}
        <Link href="/" style={{ color: "var(--color-primary)", textDecoration: "underline" }}>landing page</Link>.
      </p>
    </ComponentBlock>
  );
}

/* ============================================================
 * Features
 * ============================================================ */
function FeaturesSection() {
  const [travelerStyles, setTravelerStyles] = useState<string[]>(["portrait"]);
  const [photoStyles, setPhotoStyles] = useState<string[]>(["wedding"]);

  return (
    <>
      <ComponentBlock name="PhotographerListItem" importFrom='import { PhotographerListItem } from "@/components/features"' description="Photographer summary row — avatar + name + rating + location.">
        <div className={styles.variantGrid}>
          <VariantCard label="Trending list" wide>
            <Card padding="md" style={{ width: "100%" }}>
              <SectionHeader variant="kicker" title="TRENDING NOW" action={{ label: "view all", href: "/photographers" }} />
              <PhotographerListItem name="Bundee J." rating={4.9} ratingCount={132} location="Bangkok" onClick={() => {}} />
              <PhotographerListItem name="Jitdee S." rating={4.8} ratingCount={92} location="Bangkok" onClick={() => {}} />
              <PhotographerListItem name="Mondee L." rating={4.6} ratingCount={67} location="Bangkok" onClick={() => {}} />
            </Card>
          </VariantCard>
        </div>
      </ComponentBlock>

      <ComponentBlock name="TravelerAuthShell" importFrom='import { TravelerAuthShell } from "@/components/features"' description="Two-column layout shell (copy + form card) for login/register/onboarding.">
        <p className={styles.componentDescription}>
          See{" "}
          <Link href="/login" style={{ color: "var(--color-primary)", textDecoration: "underline" }}>/login</Link>{" "}or{" "}
          <Link href="/register" style={{ color: "var(--color-primary)", textDecoration: "underline" }}>/register</Link>{" "}for a live example.
        </p>
      </ComponentBlock>

      <ComponentBlock name="StylePreferencePicker" importFrom='import { StylePreferencePicker } from "@/components/features"' description="Image-tile multi-select for traveler onboarding.">
        <div className={styles.fullStage}>
          <StylePreferencePicker
            options={[
              { id: "portrait", label: "Portrait", imageUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400" },
              { id: "street", label: "Street", imageUrl: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=400" },
              { id: "landscape", label: "Landscape", imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400" },
              { id: "food", label: "Food", imageUrl: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400" },
            ]}
            selected={travelerStyles}
            onChange={setTravelerStyles}
          />
        </div>
      </ComponentBlock>

      <ComponentBlock name="PhotographerStyleChips" importFrom='import { PhotographerStyleChips } from "@/components/features"' description="Icon-chip multi-select for photographer onboarding.">
        <div className={styles.fullStage}>
          <PhotographerStyleChips
            options={[
              { id: "portrait", label: "Portrait", icon: <UserIcon size={18} /> },
              { id: "wedding", label: "Wedding", icon: <HeartIcon size={18} /> },
              { id: "street", label: "Street", icon: <PinIcon size={18} /> },
              { id: "food", label: "Food", icon: <FireIcon size={18} /> },
              { id: "landscape", label: "Landscape", icon: <ImageIcon size={18} /> },
              { id: "event", label: "Event", icon: <SparkleIcon size={18} /> },
            ]}
            selected={photoStyles}
            onChange={setPhotoStyles}
          />
        </div>
      </ComponentBlock>
    </>
  );
}
