"use client";

import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, Briefcase, Users, FileText, Download, TrendingUp, Target, Award, Calendar, ClipboardList } from "lucide-react";
import { Line, LineChart, Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

const agentLinks = [
  { label: "Dashboard", href: "/agent/dashboard", icon: <LayoutDashboard className="h-5 w-5" /> },
  { label: "Activities", href: "/agent/activities", icon: <ClipboardList className="h-5 w-5" /> },
  { label: "Deals", href: "/agent/deals", icon: <Briefcase className="h-5 w-5" /> },
  { label: "Contacts", href: "/agent/contacts", icon: <Users className="h-5 w-5" /> },
  { label: "Reports", href: "/agent/reports", icon: <FileText className="h-5 w-5" /> },
];

const personalPerformanceData = [
  { month: "Jan", sales: 42000, target: 40000, calls: 85 },
  { month: "Feb", sales: 48000, target: 45000, calls: 92 },
  { month: "Mar", sales: 45000, target: 45000, calls: 88 },
  { month: "Apr", sales: 52000, target: 50000, calls: 95 },
  { month: "May", sales: 49000, target: 50000, calls: 90 },
  { month: "Jun", sales: 55000, target: 52000, calls: 98 },
];

const activityMetrics = [
  { activity: "Calls Made", count: 548 },
  { activity: "Emails Sent", count: 1240 },
  { activity: "Meetings", count: 67 },
  { activity: "Proposals", count: 34 },
];

export default function AgentReportsPage() {
  return (
    <DashboardLayout links={agentLinks} title="Sales Agent" showLogout={true}>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-foreground">My Reports</h1>
            <p className="text-muted-foreground mt-2">Personal performance analytics</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
              <Calendar className="h-4 w-4" />
              Date Range
            </Button>
            <Button className="gap-2">
              <Download className="h-4 w-4" />
              Export
            </Button>
          </div>
        </div>

        {/* Performance Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
            <CardHeader>
              <CardTitle className="text-white/90 text-sm flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                Total Revenue
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">$291K</div>
              <p className="text-sm text-white/80 mt-1">+18% from last period</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
            <CardHeader>
              <CardTitle className="text-white/90 text-sm flex items-center gap-2">
                <Target className="h-4 w-4" />
                Target Achievement
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">108%</div>
              <p className="text-sm text-white/80 mt-1">Above target</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-[#F9622C] to-[#FF7F50] text-white">
            <CardHeader>
              <CardTitle className="text-white/90 text-sm flex items-center gap-2">
                <Briefcase className="h-4 w-4" />
                Deals Closed
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">24</div>
              <p className="text-sm text-white/80 mt-1">This period</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-[#F9622C] to-[#FF7F50] text-white">
            <CardHeader>
              <CardTitle className="text-white/90 text-sm flex items-center gap-2">
                <Award className="h-4 w-4" />
                Performance Rating
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">4.8/5.0</div>
              <p className="text-sm text-white/80 mt-1">Excellent</p>
            </CardContent>
          </Card>
        </div>

        {/* Sales Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Sales Performance vs Target</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={personalPerformanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="sales" fill="#F9622C" name="Actual Sales" />
                <Bar dataKey="target" fill="#ffa07a" name="Target" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Activity Metrics */}
          <Card>
            <CardHeader>
              <CardTitle>Activity Breakdown (6 Months)</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={activityMetrics} layout="horizontal">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis type="category" dataKey="activity" width={100} />
                  <Tooltip />
                  <Bar dataKey="count" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Calls Trend */}
          <Card>
            <CardHeader>
              <CardTitle>Call Activity Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={personalPerformanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="calls" stroke="#3b82f6" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Monthly Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly Performance Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b">
                  <tr className="text-left">
                    <th className="pb-3 font-semibold">Month</th>
                    <th className="pb-3 font-semibold">Sales</th>
                    <th className="pb-3 font-semibold">Target</th>
                    <th className="pb-3 font-semibold">Achievement</th>
                    <th className="pb-3 font-semibold">Calls</th>
                    <th className="pb-3 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {personalPerformanceData.map((data) => {
                    const achievement = ((data.sales / data.target) * 100).toFixed(0);
                    return (
                      <tr key={data.month} className="border-b last:border-0">
                        <td className="py-4 font-medium">{data.month}</td>
                        <td className="py-4 font-semibold text-primary">${data.sales.toLocaleString()}</td>
                        <td className="py-4 text-muted-foreground">${data.target.toLocaleString()}</td>
                        <td className="py-4">
                          <span className={`font-semibold ${
                            parseInt(achievement) >= 100 ? "text-green-600" : "text-yellow-600"
                          }`}>
                            {achievement}%
                          </span>
                        </td>
                        <td className="py-4 text-muted-foreground">{data.calls}</td>
                        <td className="py-4">
                          <span className={`px-2 py-1 rounded text-xs ${
                            parseInt(achievement) >= 100
                              ? "bg-green-100 text-green-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}>
                            {parseInt(achievement) >= 100 ? "Target Met" : "Below Target"}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Key Insights */}
        <Card>
          <CardHeader>
            <CardTitle>Key Insights & Recommendations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-start gap-3">
                  <div className="text-2xl">✅</div>
                  <div>
                    <div className="font-semibold text-green-900">Exceeding Targets</div>
                    <p className="text-sm text-green-700 mt-1">
                      You've exceeded your sales targets for 5 out of 6 months. Keep up the excellent work!
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-start gap-3">
                  <div className="text-2xl">📈</div>
                  <div>
                    <div className="font-semibold text-blue-900">Growing Call Activity</div>
                    <p className="text-sm text-blue-700 mt-1">
                      Your call activity has increased by 15% over the past 6 months, showing consistent engagement.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                <div className="flex items-start gap-3">
                  <div className="text-2xl">🎯</div>
                  <div>
                    <div className="font-semibold text-purple-900">High Win Rate</div>
                    <p className="text-sm text-purple-700 mt-1">
                      Your 75% win rate is significantly above the company average of 60%.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}