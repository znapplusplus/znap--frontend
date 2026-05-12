import styles from "./StepProgress.module.css";

export type StepProgressProps = {
  currentStep: number;
  totalSteps: number;
};

export function StepProgress({ currentStep, totalSteps }: StepProgressProps) {
  return (
    <div className={styles.root} aria-label={`Step ${currentStep} of ${totalSteps}`}>
      <span>
        Step {currentStep} of {totalSteps}
      </span>
      <span className={styles.track}>
        <span
          className={styles.bar}
          style={{ width: `${Math.max(0, Math.min(100, (currentStep / totalSteps) * 100))}%` }}
        />
      </span>
    </div>
  );
}
