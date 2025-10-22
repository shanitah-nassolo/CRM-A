"use client";

import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { LayoutDashboard, Briefcase, Users, FileText, Plus, DollarSign, ClipboardList } from "lucide-react";
import { mockDeals } from "@/lib/mockData";

const agentLinks = [
  { label: "Dashboard", href: "/agent/dashboard", icon: <LayoutDashboard className="h-5 w-5" /> },
  { label: "Activities", href: "/agent/activities", icon: <ClipboardList className="h-5 w-5" /> },
  { label: "Deals", href: "/agent/deals", icon: <Briefcase className="h-5 w-5" /> },
  { label: "Contacts", href: "/agent/contacts", icon: <Users className="h-5 w-5" /> },
  { label: "Reports", href: "/agent/reports", icon: <FileText className="h-5 w-5" /> },
];

const statusColors = {
  negotiation: "bg-yellow-100 text-yellow-700 border-yellow-300",
  proposal: "bg-blue-100 text-blue-700 border-blue-300",
  closed: "bg-green-100 text-green-700 border-green-300",
  lost: "bg-red-100 text-red-700 border-red-300",
};

export default function DealsPage() {
  const myDeals = mockDeals.filter(deal => deal.agentId === "1");
  const totalValue = myDeals.reduce((sum, deal) => sum + deal.value, 0);
  const closedValue = myDeals.filter(d => d.status === "closed").reduce((sum, deal) => sum + deal.value, 0);

  return (
    <DashboardLayout links={agentLinks} title="Sales Agent" showLogout={true}>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-foreground">My Deals</h1>
            <p className="text-muted-foreground mt-2">Manage your sales pipeline</p>
          </div>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            New Deal
          </Button>
        </div>

        {/* Pipeline Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="text-sm text-muted-foreground">Total Pipeline</div>
              <div className="text-2xl font-bold text-primary mt-1">${totalValue.toLocaleString()}</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-sm text-muted-foreground">Closed Won</div>
              <div className="text-2xl font-bold text-green-600 mt-1">${closedValue.toLocaleString()}</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-sm text-muted-foreground">Active Deals</div>
              <div className="text-2xl font-bold text-blue-600 mt-1">
                {myDeals.filter(d => d.status !== "closed" && d.status !== "lost").length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-sm text-muted-foreground">Win Rate</div>
              <div className="text-2xl font-bold text-purple-600 mt-1">75%</div>
            </CardContent>
          </Card>
        </div>

        {/* Deals by Status */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Negotiation */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center justify-between">
                <span>Negotiation</span>
                <Badge variant="outline" className="bg-yellow-100 text-yellow-700">
                  {myDeals.filter(d => d.status === "negotiation").length}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {myDeals.filter(d => d.status === "negotiation").map((deal) => (
                <Card key={deal.id} className="border-yellow-200">
                  <CardContent className="pt-4 space-y-2">
                    <div className="font-semibold text-sm">{deal.title}</div>
                    <div className="text-xs text-muted-foreground">{deal.client}</div>
                    <div className="flex items-center justify-between">
                      <span className="text-primary font-bold">${deal.value.toLocaleString()}</span>
                      <span className="text-xs text-muted-foreground">{deal.probability}%</span>
                    </div>
                    <Progress value={deal.probability} className="h-1" />
                  </CardContent>
                </Card>
              ))}
            </CardContent>
          </Card>

          {/* Proposal */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center justify-between">
                <span>Proposal</span>
                <Badge variant="outline" className="bg-blue-100 text-blue-700">
                  {myDeals.filter(d => d.status === "proposal").length}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {myDeals.filter(d => d.status === "proposal").map((deal) => (
                <Card key={deal.id} className="border-blue-200">
                  <CardContent className="pt-4 space-y-2">
                    <div className="font-semibold text-sm">{deal.title}</div>
                    <div className="text-xs text-muted-foreground">{deal.client}</div>
                    <div className="flex items-center justify-between">
                      <span className="text-primary font-bold">${deal.value.toLocaleString()}</span>
                      <span className="text-xs text-muted-foreground">{deal.probability}%</span>
                    </div>
                    <Progress value={deal.probability} className="h-1" />
                  </CardContent>
                </Card>
              ))}
            </CardContent>
          </Card>

          {/* Closed Won */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center justify-between">
                <span>Closed Won</span>
                <Badge variant="outline" className="bg-green-100 text-green-700">
                  {myDeals.filter(d => d.status === "closed").length}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {myDeals.filter(d => d.status === "closed").map((deal) => (
                <Card key={deal.id} className="border-green-200">
                  <CardContent className="pt-4 space-y-2">
                    <div className="font-semibold text-sm">{deal.title}</div>
                    <div className="text-xs text-muted-foreground">{deal.client}</div>
                    <div className="flex items-center justify-between">
                      <span className="text-primary font-bold">${deal.value.toLocaleString()}</span>
                      <span className="text-xs text-green-600">✓ Won</span>
                    </div>
                    {deal.closedDate && (
                      <div className="text-xs text-muted-foreground">Closed: {deal.closedDate}</div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </CardContent>
          </Card>

          {/* Lost */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center justify-between">
                <span>Lost</span>
                <Badge variant="outline" className="bg-red-100 text-red-700">
                  {myDeals.filter(d => d.status === "lost").length}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {myDeals.filter(d => d.status === "lost").length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-4">No lost deals</p>
              ) : (
                myDeals.filter(d => d.status === "lost").map((deal) => (
                  <Card key={deal.id} className="border-red-200">
                    <CardContent className="pt-4 space-y-2">
                      <div className="font-semibold text-sm">{deal.title}</div>
                      <div className="text-xs text-muted-foreground">{deal.client}</div>
                      <div className="text-primary font-bold">${deal.value.toLocaleString()}</div>
                    </CardContent>
                  </Card>
                ))
              )}
            </CardContent>
          </Card>
        </div>

        {/* All Deals Table */}
        <Card>
          <CardHeader>
            <CardTitle>All My Deals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b">
                  <tr className="text-left">
                    <th className="pb-3 font-semibold">Deal</th>
                    <th className="pb-3 font-semibold">Client</th>
                    <th className="pb-3 font-semibold">Value</th>
                    <th className="pb-3 font-semibold">Probability</th>
                    <th className="pb-3 font-semibold">Status</th>
                    <th className="pb-3 font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {myDeals.map((deal) => (
                    <tr key={deal.id} className="border-b last:border-0">
                      <td className="py-4 font-medium">{deal.title}</td>
                      <td className="py-4 text-muted-foreground">{deal.client}</td>
                      <td className="py-4 font-semibold text-primary">${deal.value.toLocaleString()}</td>
                      <td className="py-4">
                        <div className="flex items-center gap-2">
                          <Progress value={deal.probability} className="h-2 w-16" />
                          <span className="text-sm">{deal.probability}%</span>
                        </div>
                      </td>
                      <td className="py-4">
                        <Badge variant="outline" className={statusColors[deal.status]}>
                          {deal.status.charAt(0).toUpperCase() + deal.status.slice(1)}
                        </Badge>
                      </td>
                      <td className="py-4">
                        <Button variant="ghost" size="sm">View</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}