import { AppIcon } from "@/components/ui/app-icon";
import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { users, programs } from "@/lib/mock-data";
import { APP_NAME } from "@/lib/branding";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const Route = createFileRoute("/_app/settings")({
  head: () => ({
    meta: [
      { title: `Settings — ${APP_NAME}` },
      {
        name: "description",
        content: "Company, programs, users, roles, notification rules, and API keys.",
      },
    ],
  }),
  component: SettingsPage,
});

function SettingsPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Settings" />

      <Tabs defaultValue="programs">
        <TabsList>
          <TabsTrigger value="programs">Company & Programs</TabsTrigger>
          <TabsTrigger value="users">Users & Roles</TabsTrigger>
          <TabsTrigger value="notifications">Notification Rules</TabsTrigger>
          <TabsTrigger value="api">API Keys & Webhooks</TabsTrigger>
        </TabsList>

        <TabsContent value="programs" className="mt-4 space-y-4">
          <Card>
            <CardHeader className="flex-row items-center justify-between">
              <div>
                <CardTitle>Programs</CardTitle>
                <div className="text-caption text-muted-foreground">
                  Isolated per-program data, agents and approval routing
                </div>
              </div>
              <Button size="sm">New program</Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Stage</TableHead>
                    <TableHead>Maturity</TableHead>
                    <TableHead>Requirements</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {programs.map((p) => (
                    <TableRow key={p.id}>
                      <TableCell className="font-medium">{p.name}</TableCell>
                      <TableCell className="text-body-sm text-muted-foreground">
                        {p.subtitle}
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="text-caption">
                          {p.stage}
                        </Badge>
                      </TableCell>
                      <TableCell className="tabular">{p.maturity}%</TableCell>
                      <TableCell className="tabular">{p.requirements}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="mt-4 space-y-4">
          <Card>
            <CardHeader className="flex-row items-center justify-between">
              <div>
                <CardTitle>Users</CardTitle>
                <div className="text-caption text-muted-foreground">
                  Role assignment is per-program, not global
                </div>
              </div>
              <Button size="sm">Invite user</Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Programs</TableHead>
                    <TableHead>Last active</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((u) => (
                    <TableRow key={u.name}>
                      <TableCell className="font-medium">{u.name}</TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="text-caption">
                          {u.role}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-body-sm text-muted-foreground">
                        {u.programs.join(", ")}
                      </TableCell>
                      <TableCell className="text-body-sm text-muted-foreground tabular">
                        {u.last}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="mt-4 space-y-4">
          <Card>
            <CardHeader className="flex-row items-center gap-2">
              <AppIcon name="notification" className="text-muted-foreground" />
              <CardTitle>Notification rules</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { event: "CTS test failure", inApp: true, email: true },
                  { event: "New approval assigned to me", inApp: true, email: true },
                  { event: "Agent run failed", inApp: true, email: false },
                  { event: "Integration sync degraded", inApp: true, email: true },
                  { event: "Contract renewal within 60 days", inApp: true, email: false },
                ].map((n) => (
                  <div
                    key={n.event}
                    className="flex items-center justify-between border-b border-border pb-3 last:border-0"
                  >
                    <div className="text-label-md">{n.event}</div>
                    <div className="flex items-center gap-6">
                      <label className="flex items-center gap-2 text-body-sm">
                        <Switch defaultChecked={n.inApp} /> In-app
                      </label>
                      <label className="flex items-center gap-2 text-body-sm">
                        <Switch defaultChecked={n.email} /> Email
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="api" className="mt-4 space-y-4">
          <Card>
            <CardHeader className="flex-row items-center gap-2">
              <AppIcon name="key" className="text-muted-foreground" />
              <CardTitle>API keys & webhooks</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-body-sm text-muted-foreground">Production key</Label>
                <div className="mt-1.5 flex gap-2">
                  <Input
                    readOnly
                    value="vt_live_9j3•••••••••••••••••••••••4kf2"
                    className="tabular font-mono text-body-sm"
                  />
                  <Button variant="outline" size="sm">
                    Rotate
                  </Button>
                </div>
              </div>
              <div>
                <Label className="text-body-sm text-muted-foreground">Webhook endpoint</Label>
                <div className="mt-1.5 flex gap-2">
                  <Input
                    placeholder="https://your-service/veritrace/webhook"
                    className="text-body-sm"
                  />
                  <Button size="sm">Save</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
