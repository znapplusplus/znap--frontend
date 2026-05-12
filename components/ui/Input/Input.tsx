import {
  forwardRef,
  useId,
  useMemo,
  useState,
  type ChangeEvent,
  type InputHTMLAttributes,
  type ReactNode,
  type TextareaHTMLAttributes,
} from "react";
import { Button } from "@/components/ui/Button";
import styles from "./Input.module.css";

type InputType =
  | "text"
  | "email"
  | "password"
  | "search"
  | "number"
  | "tel"
  | "url"
  | "date"
  | "time"
  | "textarea";

type Variant = "default" | "filled" | "outline" | "soft";
type Size = "sm" | "md" | "lg";

type NativeInputAttributes = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  | "type"
  | "size"
  | "onChange"
  | "value"
  | "defaultValue"
  | "placeholder"
  | "id"
  | "name"
  | "autoComplete"
  | "maxLength"
  | "readOnly"
  | "disabled"
  | "className"
>;

type NativeTextAreaAttributes = Omit<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  | "onChange"
  | "value"
  | "defaultValue"
  | "placeholder"
  | "id"
  | "name"
  | "autoComplete"
  | "maxLength"
  | "readOnly"
  | "disabled"
  | "rows"
  | "className"
>;

export type InputProps = {
  label?: string;
  labelHint?: string;
  placeholder?: string;
  helperText?: string;
  errorText?: string;
  successText?: string;
  warningText?: string;
  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  fullWidth?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  leftAddon?: ReactNode;
  type?: InputType;
  variant?: Variant;
  size?: Size;
  value?: string | number;
  defaultValue?: string | number;
  onChange?: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  name?: string;
  id?: string;
  autoComplete?: string;
  maxLength?: number;
  rows?: number;
  className?: string;
} & NativeInputAttributes
  & NativeTextAreaAttributes;

const cn = (...values: Array<string | false | undefined | null>) =>
  values.filter(Boolean).join(" ");

type Status = "error" | "warning" | "success" | "helper" | undefined;

const SuccessIcon = () => (
  <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" focusable="false">
    <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.8" />
    <path
      d="M6.5 10.2 8.8 12.4 13.5 7.6"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const Input = forwardRef<HTMLInputElement | HTMLTextAreaElement, InputProps>(
  (
    {
      label,
      labelHint,
      placeholder,
      helperText,
      errorText,
      successText,
      warningText,
      required = false,
      disabled = false,
      readOnly = false,
      fullWidth = false,
      leftIcon,
      rightIcon,
      leftAddon,
      type = "text",
      variant = "default",
      size = "md",
      value,
      defaultValue,
      onChange,
      name,
      id,
      autoComplete,
      maxLength,
      rows = 4,
      className,
      ...rest
    },
    ref,
  ) => {
    const generatedId = useId();
    const inputId = id ?? name ?? generatedId;
    const [showPassword, setShowPassword] = useState(false);

    const status: Status = useMemo(() => {
      if (errorText) return "error";
      if (warningText) return "warning";
      if (successText) return "success";
      if (helperText) return "helper";
      return undefined;
    }, [errorText, warningText, successText, helperText]);

    const statusText = errorText || warningText || successText || helperText;
    const filled = useMemo(
      () => Boolean(value ?? defaultValue) && String(value ?? defaultValue).length > 0,
      [value, defaultValue],
    );

    const inputDescriptionId = statusText ? `${inputId}-message` : undefined;
    const externalDescribedBy = rest["aria-describedby"] as string | undefined;
    const describedBy = [inputDescriptionId, externalDescribedBy].filter(Boolean).join(" ") || undefined;

    const variantClass = styles[`variant${variant.charAt(0).toUpperCase()}${variant.slice(1)}`] ?? styles.variantDefault;
    const sizeClass = styles[`size${size.charAt(0).toUpperCase()}${size.slice(1)}`] ?? styles.sizeMd;
    const statusClass = status ? styles[status] : "";
    const hasPasswordToggle = type === "password";
    const decoratedRightIcon = rightIcon ?? (successText && !hasPasswordToggle ? <SuccessIcon /> : null);

    const sharedControlProps = {
      id: inputId,
      name,
      placeholder,
      disabled,
      readOnly,
      autoComplete,
      maxLength,
      value,
      defaultValue,
      onChange,
      "aria-describedby": describedBy,
      "aria-invalid": Boolean(errorText),
      ref,
      ...rest,
    } as InputHTMLAttributes<HTMLInputElement> & TextareaHTMLAttributes<HTMLTextAreaElement>;

    const controlClassName = cn(
      styles.control,
      variantClass,
      sizeClass,
      Boolean(leftIcon) && styles.hasLeftIcon,
      Boolean(leftAddon) && styles.hasLeftAddon,
      Boolean(decoratedRightIcon) && styles.hasRightIcon,
      disabled && styles.disabled,
      readOnly && styles.readOnly,
      errorText && styles.error,
      warningText && styles.warning,
      successText && styles.success,
      filled && styles.filled,
    );

    const wrapperClassName = cn(styles.root, fullWidth && styles.fullWidth, className);

    const controlType = hasPasswordToggle ? (showPassword ? "text" : "password") : type;

    return (
      <div className={wrapperClassName}>
        {label ? (
          <label htmlFor={inputId} className={styles.labelRow}>
            <span className={styles.label}>
              <span>{label}</span>
              {labelHint ? <span className={styles.labelHint}>{labelHint}</span> : null}
              {required ? <span className={styles.requiredMark}>*</span> : null}
            </span>
          </label>
        ) : null}

        <div className={styles.controlWrapper}>
          {leftAddon ? <span className={cn(styles.addon, styles.addonLeft)}>{leftAddon}</span> : null}
          {leftIcon ? <span className={cn(styles.icon, styles.iconLeft)}>{leftIcon}</span> : null}

          {type === "textarea" ? (
            <textarea
              className={cn(controlClassName, styles.textarea)}
              rows={rows}
              {...sharedControlProps}
            />
          ) : (
            <input
              className={controlClassName}
              type={controlType}
              {...sharedControlProps}
            />
          )}

          {hasPasswordToggle ? (
            <Button
              type="button"
              variant="unstyled"
              className={styles.toggleButton}
              onClick={() => setShowPassword((current) => !current)}
              tabIndex={-1}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              <span className={styles.toggleIcon} aria-hidden="true">
                {showPassword ? (
                  <svg viewBox="0 0 20 20" fill="none" focusable="false">
                    <path d="M2.5 10s2.6-4.5 7.5-4.5 7.5 4.5 7.5 4.5-2.6 4.5-7.5 4.5S2.5 10 2.5 10Z" stroke="currentColor" strokeWidth="1.5" />
                    <circle cx="10" cy="10" r="2.2" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 20 20" fill="none" focusable="false">
                    <path d="M3 3 17 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    <path d="M8.7 5.7A7.9 7.9 0 0 1 10 5.6c4.7 0 7.2 4.4 7.2 4.4a11.2 11.2 0 0 1-2 2.5M6.3 6.9A11.1 11.1 0 0 0 2.8 10s2.5 4.4 7.2 4.4c1.1 0 2.1-.2 3-.7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M8.6 8.8a2 2 0 0 0 2.6 2.6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                )}
              </span>
              {showPassword ? "Hide" : "Show"}
            </Button>
          ) : null}

          {decoratedRightIcon ? <span className={cn(styles.icon, styles.iconRight)}>{decoratedRightIcon}</span> : null}
        </div>

        {statusText ? (
          <p id={inputDescriptionId} className={cn(styles.statusText, statusClass)}>
            {statusText}
          </p>
        ) : null}
      </div>
    );
  },
);

Input.displayName = "Input";
