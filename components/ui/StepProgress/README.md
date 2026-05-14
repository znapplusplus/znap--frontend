# StepProgress

Linear progress indicator for multi-step auth flows ("Step N of M" + filled bar).

## Import

```tsx
import { StepProgress } from "@/components/ui";
```

## Props

| Prop | Type | Description |
|---|---|---|
| `currentStep` | `number` | 1-indexed current step. |
| `totalSteps` | `number` | Total step count. |

## Usage

```tsx
<StepProgress currentStep={2} totalSteps={4} />
```

## Do

- Place above the step content so users see progress before content changes.
- Animate transitions by transitioning width on the `.bar` element (already in CSS).

## Don't

- Don't pass `currentStep > totalSteps` — the bar will clamp visually, but the label will read incorrectly.
- Don't use for non-sequential flows. For status indicators, use a badge instead.
