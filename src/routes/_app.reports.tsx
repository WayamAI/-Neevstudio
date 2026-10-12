import { AppIcon } from "@/components/ui/app-icon";
import type { IconName } from "@/lib/icons";
import { createFileRoute } from "@tanstack/react-router";
import { APP_NAME } from "@/lib/branding";
import { PageHeader } from "@/components/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const Route = createFileRoute("/_app/reports")({
  head: () => ({
    meta: [
      { title: `Reports & Exports — ${APP_NAME}` },
      {
        name: "description",
        content:
          "Design History File, Traceability Matrix, Compliance Summary, and scheduled reports.",
      },
    ],
  }),
  component: ReportsPage,
});

const exports: { name: string; format: string; icon: IconName; desc: string }[] = [
  {
    icon: "document",
    name: "Design History File",
    desc: "Compiles breakdown, compliance, classification, verification, and BOM into a submission-ready document.",
    format: "PDF",
  },
  {
    icon: "branch",
    name: "Traceability Matrix",
    desc: "Every requirement → boundary condition → test case → result, one row per hop.",
    format: "CSV / XLSX",
  },
  {
    icon: "compliance",
    name: "Compliance Summary",
    desc: "Regulatory-submission-formatted standards-alignment digest.",
    format: "PDF",
  },
];

const scheduled = [
  {
    name: "Weekly compliance summary",
    cadence: "Mon 08:00",
    recipients: "Compliance Lead, Program Manager",
    format: "PDF",
    next: "in 4d 18h",
  },
  {
    name: "Nightly traceability delta",
    cadence: "Daily 23:00",
    recipients: "Program Manager",
    format: "CSV",
    next: "in 7h",
  },
  {
    name: "Quarterly DHF snapshot",
    cadence: "Quarterly",
    recipients: "Regulatory Affairs",
    format: "PDF",
    next: "in 42d",
  },
];

const recent = [
  { name: "DHF-2026-07-01.pdf", size: "18.4 MB", by: "A. Bermejo", when: "1 h ago" },
  {
    name: "trace-matrix-2026-07-01.csv",
    size: "742 KB",
    by: "system (scheduled)",
    when: "7 h ago",
  },
  { name: "compliance-summary-2026-06-24.pdf", size: "3.2 MB", by: "L. Okafor", when: "1 wk ago" },
];

function ReportsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Reports & Exports"
        subtitle="Generated from live data at request time — stamped with the snapshot they reflect"
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {exports.map((e) => (
          <Card key={e.name}>
            <CardHeader className="flex-row items-center gap-3">
              <div className="h-9 w-9 rounded-md bg-primary/12 text-primary flex items-center justify-center">
                <AppIcon name={e.icon} />
              </div>
              <div className="flex-1 min-w-0">
                <CardTitle>{e.name}</CardTitle>
                <div className="text-caption text-muted-foreground">{e.format}</div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-body-sm text-muted-foreground min-h-[58px]">{e.desc}</p>
              <Button size="sm" className="mt-3 w-full">
                <AppIcon name="download" size="sm" className="mr-1.5" />
                Generate now
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader className="flex-row items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <AppIcon name="calendar" className="text-muted-foreground" />
              Scheduled reports
            </CardTitle>
            <div className="text-caption text-muted-foreground">
              Recurring delivery to distribution lists
            </div>
          </div>
          <Button size="sm" variant="outline">
            New schedule
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Report</TableHead>
                <TableHead>Cadence</TableHead>
                <TableHead>Recipients</TableHead>
                <TableHead>Format</TableHead>
                <TableHead>Next run</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {scheduled.map((s) => (
                <TableRow key={s.name}>
                  <TableCell className="text-body-sm font-medium">{s.name}</TableCell>
                  <TableCell className="text-body-sm">{s.cadence}</TableCell>
                  <TableCell className="text-body-sm text-muted-foreground">
                    {s.recipients}
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="text-caption">
                      {s.format}
                    </Badge>
                  </TableCell>
                  <TableCell className="tabular text-body-sm">{s.next}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent exports</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>File</TableHead>
                <TableHead>Size</TableHead>
                <TableHead>Generated by</TableHead>
                <TableHead>When</TableHead>
                <TableHead />
              </TableRow>
            </TableHeader>
            <TableBody>
              {recent.map((r) => (
                <TableRow key={r.name}>
                  <TableCell className="tabular text-body-sm">{r.name}</TableCell>
                  <TableCell className="tabular text-body-sm">{r.size}</TableCell>
                  <TableCell className="text-body-sm text-muted-foreground">{r.by}</TableCell>
                  <TableCell className="tabular text-body-sm text-muted-foreground">
                    {r.when}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7"
                      aria-label={`Download ${r.name}`}
                    >
                      <AppIcon name="download" size="sm" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
