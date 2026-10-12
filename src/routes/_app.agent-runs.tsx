import { AppIcon } from "@/components/ui/app-icon";
import { createFileRoute } from "@tanstack/react-router";
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
import { agentRuns } from "@/lib/mock-data";
import { APP_NAME } from "@/lib/branding";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_app/agent-runs")({
  head: () => ({
    meta: [
      { title: `Agent Runs — ${APP_NAME}` },
      {
        name: "description",
        content: "Task queue for every asynchronous agent job across the program.",
      },
    ],
  }),
  component: AgentRunsPage,
});

const statusStyle: Record<string, string> = {
  succeeded: "bg-success-soft text-success",
  failed: "bg-coral-soft text-coral",
  running: "bg-sw-soft text-sw",
  queued: "bg-secondary text-muted-foreground",
  "needs-approval": "bg-amber-soft text-amber-brand",
};

function AgentRunsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Agent Runs / Task Queue"
        subtitle="Every asynchronous agent job across every program — queued, running, succeeded, failed, needs approval"
      />

      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {[
          { l: "Queued", v: 1, tone: "muted" },
          { l: "Running", v: 1, tone: "sw" },
          { l: "Needs approval", v: 1, tone: "amber" },
          { l: "Succeeded (24h)", v: 42, tone: "success" },
          { l: "Failed (24h)", v: 2, tone: "coral" },
        ].map((s) => (
          <Card key={s.l}>
            <CardContent className="p-4">
              <div className="text-caption uppercase tracking-wider text-muted-foreground">
                {s.l}
              </div>
              <div
                className={cn(
                  "tabular font-display text-display-xl mt-1",
                  s.tone === "success" && "text-success",
                  s.tone === "coral" && "text-coral",
                  s.tone === "amber" && "text-amber-brand",
                  s.tone === "sw" && "text-sw",
                )}
              >
                {s.v}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent runs</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Run</TableHead>
                <TableHead>Agent</TableHead>
                <TableHead>Triggered by</TableHead>
                <TableHead>Scope</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>When</TableHead>
                <TableHead />
              </TableRow>
            </TableHeader>
            <TableBody>
              {agentRuns.map((r) => (
                <TableRow key={r.id}>
                  <TableCell className="tabular font-medium">{r.id}</TableCell>
                  <TableCell className="text-body-sm">{r.agent}</TableCell>
                  <TableCell className="text-body-sm text-muted-foreground">
                    {r.triggeredBy}
                  </TableCell>
                  <TableCell className="text-body-sm">{r.scope}</TableCell>
                  <TableCell>
                    <Badge className={cn("text-caption border-0", statusStyle[r.status])}>
                      {r.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="tabular text-body-sm">{r.duration}</TableCell>
                  <TableCell className="text-body-sm text-muted-foreground">{r.when}</TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      {r.status === "failed" && (
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-7 w-7"
                          aria-label={`Retry ${r.id}`}
                        >
                          <AppIcon name="refresh" size="sm" />
                        </Button>
                      )}
                      {r.status === "queued" && (
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-7 w-7"
                          aria-label={`Cancel ${r.id}`}
                        >
                          <AppIcon name="error" size="sm" />
                        </Button>
                      )}
                    </div>
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
