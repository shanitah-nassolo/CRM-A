"use client";

import { useCallback, useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { LayoutDashboard, Users, FileText, Settings, Target, Download, Calendar } from "lucide-react";
import { Bar, BarChart, Line, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { salesChartData, agentPerformanceData } from "@/lib/mockData";

const adminLinks = [
  { label: "Dashboard", href: "/admin/dashboard", icon: <LayoutDashboard className="h-5 w-5" /> },
  { label: "Leads", href: "/admin/leads", icon: <Target className="h-5 w-5" /> },
  { label: "Agents", href: "/admin/agents", icon: <Users className="h-5 w-5" /> },
  { label: "Reports", href: "/admin/reports", icon: <FileText className="h-5 w-5" /> },
  { label: "Settings", href: "/admin/settings", icon: <Settings className="h-5 w-5" /> },
];

const monthlyRevenueData = [
  { month: "Jan", revenue: 125000, target: 120000 },
  { month: "Feb", revenue: 145000, target: 140000 },
  { month: "Mar", revenue: 135000, target: 145000 },
  { month: "Apr", revenue: 168000, target: 150000 },
  { month: "May", revenue: 152000, target: 155000 },
  { month: "Jun", revenue: 185000, target: 160000 },
];

export default function ReportsPage() {
  const [dateRangeOpen, setDateRangeOpen] = useState(false);
  const [dateRange, setDateRange] = useState({
    startDate: "2024-01-01",
    endDate: new Date().toISOString().slice(0, 10),
  });
  const [tempDateRange, setTempDateRange] = useState(dateRange);

  const handleApplyDateRange = () => {
    setDateRange(tempDateRange);
    setDateRangeOpen(false);
  };

  const handleDateChange = (field: "startDate" | "endDate", value: string) => {
    setTempDateRange((prev) => ({ ...prev, [field]: value }));
  };

  const handleExport = useCallback(() => {
    try {
      const now = new Date();
      const stamp = now.toISOString().replace(/[:]/g, "-").slice(0, 19);
      const filename = `report-${stamp}.csv`;

      const lines: string[] = [];

      const pushSection = (title: string, headers: string[], rows: any[]) => {
        lines.push(`"${title}"`);
        lines.push(headers.map(h => `"${h.replace(/"/g, '""')}"`).join(","));
        rows.forEach(r => {
          const line = headers
            .map(h => {
              // map header string to object key heuristically
              const key = h.toLowerCase().replace(/\s+/g, "");
              // pick possible keys explicitly for our data shapes
              const findKey = Object.keys(r).find(k => k.toLowerCase() === key);
              const val = (r[key] ?? r[h.toLowerCase()] ?? (findKey ? (r as any)[findKey] : undefined) ?? "") as any;
              return String(val).replace(/"/g, '""');
            })
            .map(v => `"${v}"`)
            .join(",");
          lines.push(line);
        });
        lines.push("");
      };

      // Monthly revenue data defined locally in this file
      const monthlyRevenueData = [
        { month: "Jan", revenue: 125000, target: 120000 },
        { month: "Feb", revenue: 145000, target: 140000 },
        { month: "Mar", revenue: 135000, target: 145000 },
        { month: "Apr", revenue: 168000, target: 150000 },
        { month: "May", revenue: 152000, target: 155000 },
        { month: "Jun", revenue: 185000, target: 160000 },
      ];

      // push sections
      pushSection("Monthly Revenue", ["Month", "Revenue", "Target"], monthlyRevenueData);
      pushSection("Sales Trend", ["Month", "Sales"], salesChartData);
      pushSection("Agent Performance", ["Name", "Sales", "Deals"], agentPerformanceData);

      // Detailed metrics (same metrics shown in the table)
      const detailedMetrics = [
        { Metric: "Total Leads Generated", Current: "156", Target: "150", Change: "+4%", Status: "On Track" },
        { Metric: "Qualified Leads", Current: "98", Target: "100", Change: "-2%", Status: "Needs Attention" },
        { Metric: "Deals Closed", Current: "63", Target: "60", Change: "+5%", Status: "Exceeding" },
        { Metric: "Average Response Time", Current: "2.3 hrs", Target: "3 hrs", Change: "-23%", Status: "Excellent" },
      ];
      pushSection("Detailed Performance Metrics", ["Metric", "Current", "Target", "Change", "Status"], detailedMetrics);

      const blob = new Blob([lines.join("\n")], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch (err) {
      // fail silently — app shouldn't crash if export can't complete
      // in a fuller implementation we could show a toast
      // console.error("Export failed", err);
    }
  }, []);
  return (
    <DashboardLayout links={adminLinks} title="Admin Panel" showLogout={true}>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-foreground">Reports & Analytics</h1>
            <p className="text-muted-foreground mt-2">Comprehensive performance insights</p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="gap-2"
              onClick={() => {
                setTempDateRange(dateRange);
                setDateRangeOpen(true);
              }}
            >
              <Calendar className="h-4 w-4" />
              Date Range
            </Button>
            <Button className="gap-2" onClick={handleExport}>
              <Download className="h-4 w-4" />
              Export Report
            </Button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
            <CardHeader>
              <CardTitle className="text-white/90 text-sm">Total Revenue</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">$910K</div>
              <p className="text-sm text-white/80 mt-1">+18% vs last period</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
            <CardHeader>
              <CardTitle className="text-white/90 text-sm">Conversion Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">64%</div>
              <p className="text-sm text-white/80 mt-1">+5% vs last period</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
            <CardHeader>
              <CardTitle className="text-white/90 text-sm">Avg Deal Size</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">$42K</div>
              <p className="text-sm text-white/80 mt-1">+12% vs last period</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-[#F9622C] to-[#FF7F50] text-white">
            <CardHeader>
              <CardTitle className="text-white/90 text-sm">Active Pipelines</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">34</div>
              <p className="text-sm text-white/80 mt-1">8 closing this week</p>
            </CardContent>
          </Card>
        </div>

        {/* Revenue vs Target */}
        <Card>
          <CardHeader>
            <CardTitle>Revenue vs Target (6 Months)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={monthlyRevenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="revenue" fill="#3b82f6" name="Actual Revenue" />
                <Bar dataKey="target" fill="#93c5fd" name="Target" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Sales Performance Trend */}
          <Card>
            <CardHeader>
              <CardTitle>Sales Performance Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={salesChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="sales" stroke="#3b82f6" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Agent Performance Comparison */}
          <Card>
            <CardHeader>
              <CardTitle>Agent Performance Comparison</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={agentPerformanceData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis type="category" dataKey="name" width={100} />
                  <Tooltip />
                  <Bar dataKey="deals" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Metrics Table */}
        <Card>
          <CardHeader>
            <CardTitle>Detailed Performance Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b">
                  <tr className="text-left">
                    <th className="pb-3 font-semibold">Metric</th>
                    <th className="pb-3 font-semibold">Current</th>
                    <th className="pb-3 font-semibold">Target</th>
                    <th className="pb-3 font-semibold">Change</th>
                    <th className="pb-3 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-4">Total Leads Generated</td>
                    <td className="py-4 font-semibold">156</td>
                    <td className="py-4 text-muted-foreground">150</td>
                    <td className="py-4 text-green-600">+4%</td>
                    <td className="py-4"><span className="px-2 py-1 bg-green-100 text-green-700 rounded text-sm">On Track</span></td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-4">Qualified Leads</td>
                    <td className="py-4 font-semibold">98</td>
                    <td className="py-4 text-muted-foreground">100</td>
                    <td className="py-4 text-yellow-600">-2%</td>
                    <td className="py-4"><span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded text-sm">Needs Attention</span></td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-4">Deals Closed</td>
                    <td className="py-4 font-semibold">63</td>
                    <td className="py-4 text-muted-foreground">60</td>
                    <td className="py-4 text-green-600">+5%</td>
                    <td className="py-4"><span className="px-2 py-1 bg-green-100 text-green-700 rounded text-sm">Exceeding</span></td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-4">Average Response Time</td>
                    <td className="py-4 font-semibold">2.3 hrs</td>
                    <td className="py-4 text-muted-foreground">3 hrs</td>
                    <td className="py-4 text-green-600">-23%</td>
                    <td className="py-4"><span className="px-2 py-1 bg-green-100 text-green-700 rounded text-sm">Excellent</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Date Range Dialog */}
        <Dialog open={dateRangeOpen} onOpenChange={setDateRangeOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Select Date Range</DialogTitle>
              <DialogDescription>Choose the date range for your report.</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="start-date">Start Date</Label>
                <Input
                  id="start-date"
                  type="date"
                  value={tempDateRange.startDate}
                  onChange={(e) => handleDateChange("startDate", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="end-date">End Date</Label>
                <Input
                  id="end-date"
                  type="date"
                  value={tempDateRange.endDate}
                  onChange={(e) => handleDateChange("endDate", e.target.value)}
                />
              </div>
              <div className="text-sm text-muted-foreground">
                Selected Range: <span className="font-semibold">{tempDateRange.startDate}</span> to <span className="font-semibold">{tempDateRange.endDate}</span>
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button onClick={handleApplyDateRange} className="bg-[#F9622C] hover:bg-[#E85A24]">
                Apply
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
}
