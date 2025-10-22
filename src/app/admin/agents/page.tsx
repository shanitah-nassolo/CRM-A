"use client";

import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { LayoutDashboard, Users, FileText, Settings, Target, Plus, Star } from "lucide-react";
import { mockAgents } from "@/lib/mockData";

const adminLinks = [
  { label: "Dashboard", href: "/admin/dashboard", icon: <LayoutDashboard className="h-5 w-5" /> },
  { label: "Leads", href: "/admin/leads", icon: <Target className="h-5 w-5" /> },
  { label: "Agents", href: "/admin/agents", icon: <Users className="h-5 w-5" /> },
  { label: "Reports", href: "/admin/reports", icon: <FileText className="h-5 w-5" /> },
  { label: "Settings", href: "/admin/settings", icon: <Settings className="h-5 w-5" /> },
];

export default function AgentsPage() {
  return (
    <DashboardLayout links={adminLinks} title="Admin Panel" showLogout={true}>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-foreground">Sales Agents</h1>
            <p className="text-muted-foreground mt-2">Manage and monitor agent performance</p>
          </div>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Add New Agent
          </Button>
        </div>

        {/* Agents Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockAgents.map((agent) => (
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
                  <Button variant="outline" size="sm" className="flex-1">
                    View Details
                  </Button>
                  <Button variant="ghost" size="sm" className="flex-1">
                    Message
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
