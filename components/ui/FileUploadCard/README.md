# FileUploadCard

Image-first file upload card. Shows preview, file name & size, and a circular camera button trigger.

## Import

```tsx
import { FileUploadCard } from "@/components/ui";
```

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `label` | `string` | **required** | Field label, also used as `aria-label`. |
| `description` | `string` | — | Caption shown under the action row. |
| `accept` | `string` | `"image/jpeg,image/png"` | Standard `<input accept>` value. |
| `maxSizeLabel` | `string` | `"JPG, PNG (Max 10 MB)"` | Hint shown when no file is selected. |
| `file` | `File \| null` | — | Currently selected file (controlled). |
| `previewUrl` | `string \| null` | — | Image src for preview. Caller is responsible for `URL.createObjectURL` lifecycle. |
| `onChange` | `(file: File \| null) => void` | **required** | Fires on select or clear. |
| `illustration` | `ReactNode` | — | Replaces placeholder when no file selected. |
| `disabled` | `boolean` | `false` | — |

## Usage

```tsx
const [file, setFile] = useState<File | null>(null);
const [previewUrl, setPreviewUrl] = useState<string | null>(null);

const handleChange = (f: File | null) => {
  setFile(f);
  setPreviewUrl(f ? URL.createObjectURL(f) : null);
};

<FileUploadCard
  label="Profile photo"
  description="Use a clear front-facing photo for best visibility."
  file={file}
  previewUrl={previewUrl}
  onChange={handleChange}
/>
```

## Do

- Revoke previous preview URL with `URL.revokeObjectURL()` when replacing.
- Validate file size client-side before previewing (UI does not enforce `maxSizeLabel`).

## Don't

- Don't pass the same `previewUrl` for multiple files — each file should have its own object URL.
- Don't use this card for non-image uploads — it's optimized for image preview.
