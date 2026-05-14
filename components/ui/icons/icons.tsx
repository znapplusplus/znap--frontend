import type { SVGProps } from "react";

/**
 * Icon props.
 *
 * - `size` controls width + height in px (default 20).
 * - `strokeWidth` overrides the stroke (default 2).
 * - Color inherits from `currentColor` — set it via `color` on the parent.
 */
export type IconProps = {
  size?: number;
  strokeWidth?: number;
} & Omit<SVGProps<SVGSVGElement>, "color">;

function base({ size = 20, strokeWidth, ...rest }: IconProps) {
  return {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: strokeWidth ?? 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true as const,
    ...rest,
  };
}

/* ============== Navigation ============== */

export function ChevronDownIcon(props: IconProps) {
  return (<svg {...base(props)}><path d="m6 9 6 6 6-6" /></svg>);
}
export function ChevronUpIcon(props: IconProps) {
  return (<svg {...base(props)}><path d="m18 15-6-6-6 6" /></svg>);
}
export function ChevronLeftIcon(props: IconProps) {
  return (<svg {...base(props)}><path d="m15 18-6-6 6-6" /></svg>);
}
export function ChevronRightIcon(props: IconProps) {
  return (<svg {...base(props)}><path d="m9 18 6-6-6-6" /></svg>);
}
export function ArrowLeftIcon(props: IconProps) {
  return (<svg {...base(props)}><path d="M19 12H5M12 19l-7-7 7-7" /></svg>);
}
export function ArrowRightIcon(props: IconProps) {
  return (<svg {...base(props)}><path d="M5 12h14M12 5l7 7-7 7" /></svg>);
}
export function MenuIcon(props: IconProps) {
  return (<svg {...base(props)}><path d="M4 6h16M4 12h16M4 18h16" /></svg>);
}
export function CloseIcon(props: IconProps) {
  return (<svg {...base(props)}><path d="M18 6 6 18M6 6l12 12" /></svg>);
}

/* ============== Common actions ============== */

export function SearchIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
  );
}
export function PlusIcon(props: IconProps) {
  return (<svg {...base(props)}><path d="M12 5v14M5 12h14" /></svg>);
}
export function CheckIcon(props: IconProps) {
  return (<svg {...base(props)}><path d="m5 12 5 5 9-11" /></svg>);
}
export function EditIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5Z" />
    </svg>
  );
}
export function TrashIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M6 6l1 14a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-14" />
      <path d="M10 11v6M14 11v6" />
    </svg>
  );
}
export function DownloadIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
    </svg>
  );
}
export function UploadIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12" />
    </svg>
  );
}
export function ShareIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <path d="m8.6 13.5 6.8 4M15.4 6.5l-6.8 4" />
    </svg>
  );
}
export function HeartIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M20.8 6.6a5.5 5.5 0 0 0-7.8 0L12 7.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 23l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8Z" />
    </svg>
  );
}
export function HeartFilledIcon(props: IconProps) {
  return (
    <svg {...base({ ...props, fill: "currentColor", stroke: "none" })}>
      <path d="M20.8 6.6a5.5 5.5 0 0 0-7.8 0L12 7.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 23l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8Z" />
    </svg>
  );
}
export function EyeIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}
export function EyeOffIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M9.9 5.1A10.9 10.9 0 0 1 12 5c6.5 0 10 7 10 7a18.5 18.5 0 0 1-2.4 3.2M6.6 6.6A18 18 0 0 0 2 12s3.5 7 10 7c2 0 3.7-.5 5.1-1.3" />
      <path d="M10.6 10.6A2 2 0 0 0 13.4 13.4M3 3l18 18" />
    </svg>
  );
}

/* ============== Status / feedback ============== */

export function CheckCircleIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <circle cx="12" cy="12" r="10" />
      <path d="m8 12 3 3 5-6" />
    </svg>
  );
}
export function AlertCircleIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 8v5M12 16v.5" />
    </svg>
  );
}
export function AlertTriangleIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M10.3 3.7 1.8 18.2A2 2 0 0 0 3.5 21h17a2 2 0 0 0 1.7-2.8L13.7 3.7a2 2 0 0 0-3.4 0Z" />
      <path d="M12 9v5M12 17v.5" />
    </svg>
  );
}
export function InfoIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 11v5M12 7v.5" />
    </svg>
  );
}

/* ============== Domain (ZNAP++) ============== */

export function CameraIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M5 8h2l1.5-2h7L17 8h2a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2Z" />
      <circle cx="12" cy="13" r="3.2" />
    </svg>
  );
}
export function ImageIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <circle cx="9" cy="9" r="2" />
      <path d="m21 15-5-5L5 21" />
    </svg>
  );
}
export function GalleryIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <rect x="3" y="3" width="14" height="14" rx="2" />
      <path d="M7 21h12a2 2 0 0 0 2-2V7" />
    </svg>
  );
}
export function StarIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M12 2.5 14.9 8.8 22 9.5l-5 4.6 1.3 6.9L12 17.6 5.7 21l1.3-6.9-5-4.6L9.1 8.8 12 2.5Z" />
    </svg>
  );
}
export function StarFilledIcon(props: IconProps) {
  return (
    <svg {...base({ ...props, fill: "currentColor", stroke: "none" })}>
      <path d="M12 2.5 14.9 8.8 22 9.5l-5 4.6 1.3 6.9L12 17.6 5.7 21l1.3-6.9-5-4.6L9.1 8.8 12 2.5Z" />
    </svg>
  );
}
export function PinIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M12 21s-7-7.5-7-12a7 7 0 1 1 14 0c0 4.5-7 12-7 12Z" />
      <circle cx="12" cy="9" r="2.5" />
    </svg>
  );
}
export function BellIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M6 8a6 6 0 1 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
      <path d="M10.3 21a2 2 0 0 0 3.4 0" />
    </svg>
  );
}
export function SendIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M22 2 11 13M22 2l-7 20-4-9-9-4 20-7Z" />
    </svg>
  );
}
export function WalletIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M20 12V8a2 2 0 0 0-2-2H5a2 2 0 0 1 0-4h12v4" />
      <path d="M20 12v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6" />
      <circle cx="17" cy="14" r="1.2" fill="currentColor" stroke="none" />
    </svg>
  );
}
export function SparkleIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M5.6 18.4l2.8-2.8M15.6 8.4l2.8-2.8" />
    </svg>
  );
}
export function FireIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M12 2s4 4 4 8a4 4 0 0 1-1 2.7c.5-.4 1-1 1-2.2 0 0 3 3 3 6.5a7 7 0 1 1-14 0c0-2.5 1.3-4 2.5-5.5 1.2 1.3 2.5 1.3 2.5-1.5 0-2 .5-4 2-8Z" />
    </svg>
  );
}
export function UserIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8" />
    </svg>
  );
}
export function CalendarIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M16 2v4M8 2v4M3 10h18" />
    </svg>
  );
}
export function ClockIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
    </svg>
  );
}
export function LogoutIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <path d="m16 17 5-5-5-5M21 12H9" />
    </svg>
  );
}
export function HomeIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="m3 11 9-8 9 8" />
      <path d="M5 10v10a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1V10" />
    </svg>
  );
}
export function FilterIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M3 6h18M7 12h10M10 18h4" />
    </svg>
  );
}
export function SettingsIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 12.9a8 8 0 0 0 0-1.8l2-1.5-2-3.4-2.3.9a8 8 0 0 0-1.6-.9L15 3.6h-4l-.5 2.5a8 8 0 0 0-1.6.9l-2.3-.9-2 3.4 2 1.5a8 8 0 0 0 0 1.8l-2 1.5 2 3.4 2.3-.9c.5.4 1 .7 1.6.9l.5 2.5h4l.5-2.5c.6-.2 1.1-.5 1.6-.9l2.3.9 2-3.4-2-1.5Z" />
    </svg>
  );
}
