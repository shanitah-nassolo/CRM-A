"use client";

import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LayoutDashboard, Users, FileText, Settings, Target, Plus, Search } from "lucide-react";
import { mockLeads } from "@/lib/mockData";

const adminLinks = [
  { label: "Dashboard", href: "/admin/dashboard", icon: <LayoutDashboard className="h-5 w-5" /> },
  { label: "Leads", href: "/admin/leads", icon: <Target className="h-5 w-5" /> },
  { label: "Agents", href: "/admin/agents", icon: <Users className="h-5 w-5" /> },
  { label: "Reports", href: "/admin/reports", icon: <FileText className="h-5 w-5" /> },
  { label: "Settings", href: "/admin/settings", icon: <Settings className="h-5 w-5" /> },
];

const statusColors = {
  new: "bg-blue-100 text-blue-700 border-blue-300",
  contacted: "bg-yellow-100 text-yellow-700 border-yellow-300",
  qualified: "bg-purple-100 text-purple-700 border-purple-300",
  converted: "bg-green-100 text-green-700 border-green-300",
  lost: "bg-red-100 text-red-700 border-red-300",
};

export default function LeadsPage() {
  return (
    <DashboardLayout links={adminLinks} title="Admin Panel" showLogout={true}>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-foreground">Leads Management</h1>
            <p className="text-muted-foreground mt-2">Track and manage all your leads</p>
          </div>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Add New Lead
          </Button>
        </div>

        {/* Search and Filter */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search leads..." className="pl-10" />
              </div>
              <Button variant="outline">Filter</Button>
            </div>
          </CardContent>
        </Card>

        {/* Leads Stats */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <Card>
            <CardContent className="pt-6 text-center">
              <div className="text-2xl font-bold text-[#F9622C]">15</div>
              <p className="text-sm text-muted-foreground mt-1">New</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <div className="text-2xl font-bold text-[#F9622C]">23</div>
              <p className="text-sm text-muted-foreground mt-1">Contacted</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <div className="text-2xl font-bold text-[#F9622C]">18</div>
              <p className="text-sm text-muted-foreground mt-1">Qualified</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <div className="text-2xl font-bold text-[#F9622C]">12</div>
              <p className="text-sm text-muted-foreground mt-1">Converted</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <div className="text-2xl font-bold text-[#F9622C]">8</div>
              <p className="text-sm text-muted-foreground mt-1">Lost</p>
            </CardContent>
          </Card>
        </div>

        {/* Leads Table */}
        <Card>
          <CardHeader>
            <CardTitle>All Leads</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b">
                  <tr className="text-left">
                    <th className="pb-3 font-semibold">Name</th>
                    <th className="pb-3 font-semibold">Company</th>
                    <th className="pb-3 font-semibold">Contact</th>
                    <th className="pb-3 font-semibold">Value</th>
                    <th className="pb-3 font-semibold">Status</th>
                    <th className="pb-3 font-semibold">Assigned To</th>
                    <th className="pb-3 font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {mockLeads.map((lead) => (
                    <tr key={lead.id} className="border-b last:border-0">
                      <td className="py-4">
                        <div className="font-medium">{lead.name}</div>
                      </td>
                      <td className="py-4 text-muted-foreground">{lead.company}</td>
                      <td className="py-4">
                        <div className="text-sm">{lead.email}</div>
                        <div className="text-xs text-muted-foreground">{lead.phone}</div>
                      </td>
                      <td className="py-4 font-semibold text-primary">
                        ${lead.value.toLocaleString()}
                      </td>
                      <td className="py-4">
                        <Badge variant="outline" className={statusColors[lead.status]}>
                          {lead.status.charAt(0).toUpperCase() + lead.status.slice(1)}
                        </Badge>
                      </td>
                      <td className="py-4 text-muted-foreground">{lead.assignedTo}</td>
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
