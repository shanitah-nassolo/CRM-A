"use client";

import { useRouter, useParams } from "next/navigation";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { LayoutDashboard, Users, FileText, Settings, Target, ArrowLeft } from "lucide-react";
import { mockAgents } from "@/lib/mockData";

const adminLinks = [
  { label: "Dashboard", href: "/admin/dashboard", icon: <LayoutDashboard className="h-5 w-5" /> },
  { label: "Leads", href: "/admin/leads", icon: <Target className="h-5 w-5" /> },
  { label: "Agents", href: "/admin/agents", icon: <Users className="h-5 w-5" /> },
  { label: "Reports", href: "/admin/reports", icon: <FileText className="h-5 w-5" /> },
  { label: "Settings", href: "/admin/settings", icon: <Settings className="h-5 w-5" /> },
];

export default function AgentDetailPage() {
  const router = useRouter();
  const params = useParams();
  const agentId = params.id as string;
  
  const agent = mockAgents.find((a) => a.id === agentId);

  if (!agent) {
    return (
      <DashboardLayout links={adminLinks} title="Admin Panel" showLogout={true}>
        <div className="space-y-4">
          <Button variant="ghost" className="gap-2" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
          <div className="flex items-center justify-center py-12">
            <p className="text-lg text-muted-foreground">Agent not found</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout links={adminLinks} title="Admin Panel" showLogout={true}>
      <div className="space-y-6">
        <Button variant="ghost" className="gap-2" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4" />
          Back to Agents
        </Button>

        {/* Agent Header */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <Avatar className="h-20 w-20 bg-primary">
                  <AvatarFallback className="bg-primary text-primary-foreground text-xl">
                    {agent.name.split(" ").map(n => n[0]).join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h1 className="text-3xl font-bold">{agent.name}</h1>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant={agent.status === "active" ? "default" : "secondary"}>
                      {agent.status}
                    </Badge>
                    <span className="text-sm text-muted-foreground">Joined {agent.joinedDate}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="text-sm text-muted-foreground">Email</div>
                <div className="text-lg font-medium mt-1">{agent.email}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Phone</div>
                <div className="text-lg font-medium mt-1">{agent.phone}</div>
              </div>
            </CardContent>
          </Card>

          {/* Performance Metrics */}
          <Card>
            <CardHeader>
              <CardTitle>Performance Metrics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="text-sm text-muted-foreground">Rating</div>
                <div className="text-2xl font-bold text-primary mt-1">{agent.rating} / 5.0</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Total Sales</div>
                <div className="text-2xl font-bold text-primary mt-1">${agent.totalSales.toLocaleString()}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Closed Deals</div>
                <div className="text-2xl font-bold text-primary mt-1">{agent.closedDeals}</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Activity / Stats */}
        <Card>
          <CardHeader>
            <CardTitle>Agent Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <div className="text-3xl font-bold text-primary">${(agent.totalSales / 1000).toFixed(0)}K</div>
                <div className="text-sm text-muted-foreground mt-1">Total Sales Generated</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary">{agent.closedDeals}</div>
                <div className="text-sm text-muted-foreground mt-1">Deals Closed</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary">{(agent.totalSales / agent.closedDeals).toLocaleString('en-US', { maximumFractionDigits: 0 })}</div>
                <div className="text-sm text-muted-foreground mt-1">Avg. Deal Value</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
