"use client";

import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { LayoutDashboard, Users, FileText, Settings, Target, Plus, Star } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { mockAgents, type Agent } from "@/lib/mockData";

const adminLinks = [
  { label: "Dashboard", href: "/admin/dashboard", icon: <LayoutDashboard className="h-5 w-5" /> },
  { label: "Leads", href: "/admin/leads", icon: <Target className="h-5 w-5" /> },
  { label: "Agents", href: "/admin/agents", icon: <Users className="h-5 w-5" /> },
  { label: "Reports", href: "/admin/reports", icon: <FileText className="h-5 w-5" /> },
  { label: "Settings", href: "/admin/settings", icon: <Settings className="h-5 w-5" /> },
];

export default function AgentsPage() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [agents, setAgents] = useState<Agent[]>(mockAgents);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    rating: "4.5",
    totalSales: "0",
    closedDeals: "0",
    status: "active",
    joinedDate: new Date().toISOString().slice(0, 10),
  });

  const update = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  function resetForm() {
    setForm({ name: "", email: "", phone: "", rating: "4.5", totalSales: "0", closedDeals: "0", status: "active", joinedDate: new Date().toISOString().slice(0, 10) });
  }

  function handleViewDetails(agentId: string) {
    router.push(`/admin/agents/${agentId}`);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const newAgent: Agent = {
      id: String(Date.now()),
      name: form.name || "New Agent",
      email: form.email || "",
      phone: form.phone || "",
      rating: Number(form.rating) || 0,
      totalSales: Number(form.totalSales) || 0,
      closedDeals: Number(form.closedDeals) || 0,
      status: (form.status as Agent["status"]) || "active",
      joinedDate: form.joinedDate || new Date().toISOString().slice(0,10),
    };
    setAgents((s) => [newAgent, ...s]);
    setOpen(false);
    resetForm();
  }

  return (
    <DashboardLayout links={adminLinks} title="Admin Panel" showLogout={true}>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-foreground">Sales Agents</h1>
            <p className="text-muted-foreground mt-2">Manage and monitor agent performance</p>
          </div>
          <div>
            <Button className="gap-2" onClick={() => setOpen(true)}>
              <Plus className="h-4 w-4" />
              Add New Agent
            </Button>

            <Dialog open={open} onOpenChange={setOpen}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Agent</DialogTitle>
                  <DialogDescription>Provide agent details to add them to the system.</DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col">
                      <Label className="mb-2">Full name</Label>
                      <Input value={form.name} onChange={(e) => update("name", e.target.value)} required />
                    </div>
                    <div className="flex flex-col">
                      <Label className="mb-2">Email</Label>
                      <Input type="email" value={form.email} onChange={(e) => update("email", e.target.value)} />
                    </div>
                    <div className="flex flex-col">
                      <Label className="mb-2">Phone</Label>
                      <Input value={form.phone} onChange={(e) => update("phone", e.target.value)} />
                    </div>
                    <div className="flex flex-col">
                      <Label className="mb-2">Rating</Label>
                      <Input type="number" step="0.1" min="0" max="5" value={form.rating} onChange={(e) => update("rating", e.target.value)} />
                    </div>
                    <div className="flex flex-col">
                      <Label className="mb-2">Total Sales</Label>
                      <Input type="number" value={form.totalSales} onChange={(e) => update("totalSales", e.target.value)} />
                    </div>
                    <div className="flex flex-col">
                      <Label className="mb-2">Closed Deals</Label>
                      <Input type="number" value={form.closedDeals} onChange={(e) => update("closedDeals", e.target.value)} />
                    </div>
                    <div className="flex flex-col">
                      <Label className="mb-2">Status</Label>
                      <select className="border-input rounded-md px-3 py-2" value={form.status} onChange={(e) => update("status", e.target.value)}>
                        <option value="active">active</option>
                        <option value="inactive">inactive</option>
                      </select>
                    </div>
                    <div className="flex flex-col">
                      <Label className="mb-2">Joined Date</Label>
                      <Input type="date" value={form.joinedDate} onChange={(e) => update("joinedDate", e.target.value)} />
                    </div>
                  </div>

                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button type="submit">Create Agent</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Agents Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {agents.map((agent) => (
            <Card key={agent.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12 bg-primary">
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {agent.name.split(" ").map(n => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg">{agent.name}</CardTitle>
                      <div className="flex items-center gap-1 mt-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-semibold">{agent.rating}</span>
                      </div>
                    </div>
                  </div>
                  <Badge variant={agent.status === "active" ? "default" : "secondary"}>
                    {agent.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="text-sm text-muted-foreground">Contact</div>
                  <div className="text-sm font-medium mt-1">{agent.email}</div>
                  <div className="text-sm text-muted-foreground">{agent.phone}</div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                  <div>
                    <div className="text-2xl font-bold text-primary">
                      ${(agent.totalSales / 1000).toFixed(0)}K
                    </div>
                    <div className="text-xs text-muted-foreground">Total Sales</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-blue-600">{agent.closedDeals}</div>
                    <div className="text-xs text-muted-foreground">Closed Deals</div>
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <Button variant="outline" size="sm" className="flex-1" onClick={() => handleViewDetails(agent.id)}>
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Performance Leaderboard */}
        <Card>
          <CardHeader>
            <CardTitle>Performance Leaderboard</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockAgents
                .sort((a, b) => b.totalSales - a.totalSales)
                .map((agent, index) => (
                  <div key={agent.id} className="flex items-center gap-4 p-4 bg-secondary/50 rounded-lg">
                    <div className={`flex items-center justify-center w-8 h-8 rounded-full font-bold ${
                      index === 0 ? "bg-yellow-400 text-yellow-900" :
                      index === 1 ? "bg-gray-300 text-gray-700" :
                      index === 2 ? "bg-orange-400 text-orange-900" :
                      "bg-primary/20 text-primary"
                    }`}>
                      {index + 1}
                    </div>
                    <Avatar className="h-10 w-10 bg-primary">
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {agent.name.split(" ").map(n => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="font-semibold">{agent.name}</div>
                      <div className="text-sm text-muted-foreground">{agent.closedDeals} deals closed</div>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold text-primary">
                        ${agent.totalSales.toLocaleString()}
                      </div>
                      <div className="flex items-center gap-1 justify-end">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm">{agent.rating}</span>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
