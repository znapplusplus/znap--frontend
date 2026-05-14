"use client";

import styles from "./Pagination.module.css";

export type PaginationProps = {
  page: number;            // 1-indexed
  totalPages: number;
  onChange: (page: number) => void;
  /** Show a "Page X of Y" label between buttons. */
  showInfo?: boolean;
  /** Number of sibling pages to render. */
  siblingCount?: number;
  className?: string;
};

const cn = (...v: Array<string | false | null | undefined>) =>
  v.filter(Boolean).join(" ");

function range(start: number, end: number): number[] {
  const arr: number[] = [];
  for (let i = start; i <= end; i++) arr.push(i);
  return arr;
}

function buildPages(page: number, totalPages: number, siblings: number): (number | "…")[] {
  const totalNumbers = siblings * 2 + 5; // first + last + siblings*2 + current + 2 dots
  if (totalPages <= totalNumbers) return range(1, totalPages);

  const left = Math.max(page - siblings, 2);
  const right = Math.min(page + siblings, totalPages - 1);
  const showLeftDots = left > 2;
  const showRightDots = right < totalPages - 1;

  const result: (number | "…")[] = [1];
  if (showLeftDots) result.push("…");
  for (let i = left; i <= right; i++) result.push(i);
  if (showRightDots) result.push("…");
  result.push(totalPages);
  return result;
}

export function Pagination({
  page,
  totalPages,
  onChange,
  showInfo = false,
  siblingCount = 1,
  className,
}: PaginationProps) {
  if (totalPages <= 1) return null;
  const pages = buildPages(page, totalPages, siblingCount);

  const go = (target: number) => {
    const clamped = Math.max(1, Math.min(totalPages, target));
    if (clamped !== page) onChange(clamped);
  };

  return (
    <nav aria-label="Pagination" className={cn(styles.root, className)}>
      <button
        type="button"
        className={styles.nav}
        onClick={() => go(page - 1)}
        disabled={page === 1}
        aria-label="Previous page"
      >
        ‹
      </button>

      {pages.map((p, i) =>
        p === "…" ? (
          <span key={`dots-${i}`} className={styles.dots}>…</span>
        ) : (
          <button
            key={p}
            type="button"
            className={cn(styles.page, p === page && styles.active)}
            onClick={() => go(p)}
            aria-current={p === page ? "page" : undefined}
          >
            {p}
          </button>
        ),
      )}

      <button
        type="button"
        className={styles.nav}
        onClick={() => go(page + 1)}
        disabled={page === totalPages}
        aria-label="Next page"
      >
        ›
      </button>

      {showInfo ? (
        <span className={styles.info}>
          Page {page} of {totalPages}
        </span>
      ) : null}
    </nav>
  );
}
