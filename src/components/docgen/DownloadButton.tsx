import { AppIcon } from "@/components/ui/app-icon";
import type { IconName } from "@/lib/icons";
import { Button } from "@/components/ui/button";
import { API_URL, type FileInfo } from "@/lib/api";

const icons: Partial<Record<FileInfo["kind"], IconName>> = {
  docx: "document",
  csv: "spreadsheet",
  zip: "archive",
};

function humanSize(bytes: number): string {
  if (!bytes) return "";
  const kb = bytes / 1024;
  return kb >= 1024 ? `${(kb / 1024).toFixed(1)} MB` : `${Math.round(kb)} KB`;
}

/** Links straight at the backend — it streams the file with a
 *  Content-Disposition header, so no blob round-trip is needed here. */
export function DownloadButton({
  file,
  variant = "outline",
}: {
  file: FileInfo;
  variant?: "outline" | "default";
}) {
  const icon = icons[file.kind] ?? "download";
  const size = humanSize(file.size_bytes);
  return (
    <Button variant={variant} size="sm" asChild>
      <a href={`${API_URL}${file.url}`} download={file.name}>
        <AppIcon name={icon} size="sm" className="mr-1.5" />
        {file.label}
        {size && <span className="ml-1.5 text-caption opacity-60">{size}</span>}
      </a>
    </Button>
  );
}
