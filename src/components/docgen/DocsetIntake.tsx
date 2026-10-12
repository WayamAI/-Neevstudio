import { AppIcon } from "@/components/ui/app-icon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CONCEPT_PRESETS } from "@/lib/concept-presets";
import { APP_NAME } from "@/lib/branding";

/** The document-set intake form: concept description, presets and an optional
 *  product name. The submit wiring stays with the page that hosts it. */
export function DocsetIntake({
  concept,
  setConcept,
  productName,
  setProductName,
  submitting,
  onGenerate,
}: {
  concept: string;
  setConcept: (v: string) => void;
  productName: string;
  setProductName: (v: string) => void;
  submitting: boolean;
  onGenerate: () => void;
}) {
  return (
    <div className="space-y-3">
      <div className="text-body-sm text-muted-foreground">
        No document needed. Describe the device or therapy and {APP_NAME} generates a coherent
        Product, Hardware, Software and Labeling requirement set.
      </div>
      <Textarea
        value={concept}
        onChange={(e) => setConcept(e.target.value)}
        placeholder="e.g. a syringe pump for the neonatal ICU with dose-error reduction and wireless drug-library updates"
        className="min-h-[120px] text-label-md"
        disabled={submitting}
      />
      <div className="flex flex-wrap gap-1.5">
        {CONCEPT_PRESETS.map((p) => (
          <Button
            key={p.label}
            variant="outline"
            size="sm"
            className="h-7 text-body-sm"
            disabled={submitting}
            onClick={() => setConcept(p.value)}
          >
            {p.label}
          </Button>
        ))}
      </div>
      <Input
        value={productName}
        onChange={(e) => setProductName(e.target.value)}
        placeholder="Product name (optional) — e.g. PIEB Infusion Pump"
        className="h-8 text-body-sm"
        disabled={submitting}
      />
      <Button onClick={onGenerate} disabled={submitting || concept.trim().length < 8} size="sm">
        {submitting ? (
          <AppIcon name="spinner" size="sm" className="mr-1.5 animate-spin" />
        ) : (
          <AppIcon name="magic" size="sm" className="mr-1.5" />
        )}
        Generate document set
      </Button>
    </div>
  );
}
