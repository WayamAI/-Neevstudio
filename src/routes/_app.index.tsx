import { AppIcon } from "@/components/ui/app-icon";
import { createFileRoute, Link } from "@tanstack/react-router";
import { APP_NAME } from "@/lib/branding";
import { PageHeader } from "@/components/PageHeader";
import { Mark } from "@/components/ui/mark";
import type { MarkId } from "@/lib/marks";
import { WaveformHero } from "@/components/WaveformHero";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  agentActivity,
  coverageTrend,
  complianceReadiness,
  workflowStages,
  programs,
  approvals,
} from "@/lib/mock-data";
import {
  AreaChart,
  Area,
  LineChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

export const Route = createFileRoute("/_app/")({
  head: () => ({
    meta: [
      { title: `Overview · Aeris V500 — ${APP_NAME}` },
      {
        name: "description",
        content:
          "Live program-wide view: requirements, standards, verification coverage, BOM savings, agent activity.",
      },
    ],
  }),
  component: Overview,
});

const p = programs[0];

const STAGE_MARKS: Record<string, MarkId> = {
  Decompose: "breakdown",
  Classify: "classification",
  "Map compliance": "compliance",
  "Generate tests": "verification",
  "Optimize BOM": "hardware",
};

function KpiCard({
  label,
  value,
  delta,
  tone,
  to,
  mark,
}: {
  label: string;
  value: string;
  delta?: string;
  tone?: "teal" | "coral" | "amber" | "success";
  to: string;
  mark: MarkId;
}) {
  const toneMap = {
    teal: "text-teal border-teal/30 bg-teal-soft/40",
    coral: "text-coral border-coral/30 bg-coral-soft/40",
    amber: "text-amber-brand border-amber-brand/30 bg-amber-soft/40",
    success: "text-success border-success/30 bg-success-soft/40",
  } as const;
  return (
    <Link to={to} className="block">
      <Card className="hover:shadow-elevated transition-shadow">
        <CardContent>
          <div className="flex items-start justify-between">
            <div className="text-caption font-medium uppercase tracking-wider text-muted-foreground">
              {label}
            </div>
            <Mark id={mark} size={36} className="-mt-1 -mr-1" />
          </div>
          <div className="mt-2.5 flex min-w-0 flex-wrap items-baseline gap-x-2 gap-y-1">
            <div className="tabular font-display text-display-2xl">{value}</div>
            {delta && (
              <span
                className={
                  "tabular rounded-md border px-1.5 py-0.5 text-caption font-medium " +
                  (tone ? toneMap[tone] : "text-muted-foreground border-border")
                }
              >
                {delta}
              </span>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

function Overview() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Program Overview"
        subtitle={`${p.name} · ${p.subtitle} · Stage: ${p.stage}`}
        actions={
          <>
            <Button variant="outline" size="sm">
              Snapshot
            </Button>
            <Button size="sm">Generate DHF</Button>
          </>
        }
      />

      {/* Hero — title, waveform band and stats are stacked so nothing draws over the text. */}
      <div className="overflow-hidden rounded-xl border border-muted bg-container">
        <div className="flex flex-col">
          <div className="flex items-start gap-3 px-6 pt-5">
            <Mark id="telemetry" size={44} />
            <div className="min-w-0">
              <div className="text-caption uppercase tracking-widest text-ink-foreground/60">
                Live program telemetry
              </div>
              <div className="mt-1 text-ink-foreground text-xl font-semibold">
                Aeris V500 · Verification phase
              </div>
              <div className="mt-0.5 text-ink-foreground/70 text-label-md">
                Waveform reflects live agent + human activity across the traceability spine
              </div>
            </div>
          </div>
          <WaveformHero
            height={96}
            className="pointer-events-none relative h-24 rounded-none border-0 bg-transparent"
          />
          <div className="grid grid-cols-2 gap-4 border-t border-muted px-6 py-4 md:grid-cols-4">
            {[
              { l: "Requirements decomposed", v: "428", d: "+12 this week" },
              { l: "Standards mapped", v: "10", d: "1 gap" },
              { l: "Verification coverage", v: "87%", d: "+3.4pt" },
              { l: "BOM saving / unit", v: "$218", d: "of $246 target" },
            ].map((s) => (
              <div key={s.l} className="border-l border-ink-foreground/15 pl-3">
                <div className="text-caption uppercase tracking-wider text-ink-foreground/60">
                  {s.l}
                </div>
                <div className="tabular font-display text-display-xl text-ink-foreground mt-0.5">
                  {s.v}
                </div>
                <div className="text-caption text-ink-foreground/60 tabular">{s.d}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* KPI row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard
          label="Total requirements"
          value="428"
          delta="236 SW · 192 HW"
          to="/classification"
          mark="kpi-requirements"
        />
        <KpiCard
          label="Critical-to-Safety"
          value="112"
          delta="94% verified"
          tone="success"
          to="/classification"
          mark="kpi-critical-safety"
        />
        <KpiCard
          label="Test coverage"
          value="87%"
          delta="1,284 cases"
          tone="teal"
          to="/verification"
          mark="kpi-test-coverage"
        />
        <KpiCard
          label="BOM saving / unit"
          value="$218"
          delta="12.4% of BOM"
          tone="amber"
          to="/hardware"
          mark="kpi-bom-saving"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Verification coverage trend</CardTitle>
            <div className="text-caption text-muted-foreground">By test level · nightly rollup</div>
          </CardHeader>
          <CardContent>
            <div className="h-[240px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={coverageTrend}
                  margin={{ top: 8, right: 12, left: -18, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                  <XAxis
                    dataKey="week"
                    tick={{ fill: "var(--color-muted-foreground)", fontSize: 11 }}
                    axisLine={{ stroke: "var(--color-border)" }}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fill: "var(--color-muted-foreground)", fontSize: 11 }}
                    axisLine={{ stroke: "var(--color-border)" }}
                    tickLine={false}
                  />
                  <Tooltip
                    contentStyle={{
                      background: "var(--color-card)",
                      border: "1px solid var(--color-border)",
                      borderRadius: 8,
                      fontSize: 12,
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="unit"
                    name="Unit"
                    stroke="var(--color-teal)"
                    strokeWidth={2}
                    dot={false}
                  />
                  <Line
                    type="monotone"
                    dataKey="integ"
                    name="Integration"
                    stroke="var(--color-sw)"
                    strokeWidth={2}
                    dot={false}
                  />
                  <Line
                    type="monotone"
                    dataKey="system"
                    name="System"
                    stroke="var(--color-hw)"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Compliance readiness</CardTitle>
            <div className="text-caption text-muted-foreground">Weighted alignment · monthly</div>
          </CardHeader>
          <CardContent>
            <div className="h-[240px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={complianceReadiness}
                  margin={{ top: 8, right: 12, left: -18, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="areaComp" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor="var(--color-teal)" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="var(--color-teal)" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                  <XAxis
                    dataKey="month"
                    tick={{ fill: "var(--color-muted-foreground)", fontSize: 11 }}
                    axisLine={{ stroke: "var(--color-border)" }}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fill: "var(--color-muted-foreground)", fontSize: 11 }}
                    axisLine={{ stroke: "var(--color-border)" }}
                    tickLine={false}
                  />
                  <Tooltip
                    contentStyle={{
                      background: "var(--color-card)",
                      border: "1px solid var(--color-border)",
                      borderRadius: 8,
                      fontSize: 12,
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="weighted"
                    stroke="var(--color-teal)"
                    strokeWidth={2}
                    fill="url(#areaComp)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Workflow */}
      <Card>
        <CardHeader>
          <CardTitle>Program workflow</CardTitle>
          <div className="text-caption text-muted-foreground">
            Live pipeline status · entities in stage / total
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {workflowStages.map((s) => (
              <div
                key={s.name}
                className="flex gap-3 rounded-lg border border-border bg-raised p-3"
              >
                <Mark id={STAGE_MARKS[s.name] ?? "overview"} size={32} />
                <div className="min-w-0 flex-1">
                  <div className="truncate text-caption font-medium uppercase tracking-wider text-muted-foreground">
                    {s.name}
                  </div>
                  <div className="tabular font-display text-display-lg mt-1">{s.pct}%</div>
                  <Progress value={s.pct} className="h-1.5 mt-2" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Activity + Approvals */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between ">
            <div>
              <CardTitle>Agent activity</CardTitle>
              <div className="text-caption text-muted-foreground">
                Live · from audit + agent runs
              </div>
            </div>
            <div className="flex items-center gap-1.5 text-caption text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" /> streaming
            </div>
          </CardHeader>
          <CardContent>
            <ul className="divide-y divide-border">
              {agentActivity.map((e) => {
                const mark = e.actor === "agent" ? "agent" : "human";
                const dot =
                  e.severity === "critical"
                    ? "bg-coral"
                    : e.severity === "warn"
                      ? "bg-amber-brand"
                      : e.severity === "success"
                        ? "bg-success"
                        : "bg-teal";
                return (
                  <li key={e.id} className="py-3 flex gap-3">
                    <div className={"mt-1 h-2 w-2 rounded-full shrink-0 " + dot} />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 text-body-sm">
                        <Mark id={mark} size={20} />
                        <span className="font-medium">{e.actorName}</span>
                        <span className="ml-auto tabular text-caption text-muted-foreground">
                          {e.time}
                        </span>
                      </div>
                      <div className="mt-0.5 text-label-md text-foreground/90">{e.message}</div>
                      {e.entity && (
                        <div className="mt-1">
                          <Badge variant="secondary" className="tabular text-caption">
                            {e.entity}
                          </Badge>
                        </div>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between ">
            <div>
              <CardTitle>Your approvals</CardTitle>
              <div className="text-caption text-muted-foreground">Items awaiting sign-off</div>
            </div>
            <Link to="/approvals" className="text-caption text-primary hover:underline">
              Open queue
            </Link>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {approvals.slice(0, 4).map((a) => (
                <li key={a.id} className="rounded-md border border-border p-3">
                  <div className="flex items-start gap-2">
                    {a.priority === "High" ? (
                      <AppIcon name="warning" className="text-coral mt-0.5" />
                    ) : (
                      <AppIcon name="success" className="text-amber-brand mt-0.5" />
                    )}
                    <div className="min-w-0">
                      <div className="text-body-sm font-medium">{a.kind}</div>
                      <div className="tabular text-caption text-muted-foreground mt-0.5">
                        {a.entity}
                      </div>
                      <div className="text-body-sm text-foreground/80 mt-1.5 line-clamp-2">
                        {a.proposal}
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
