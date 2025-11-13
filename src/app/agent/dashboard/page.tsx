"use client";

import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LayoutDashboard, Briefcase, Users, FileText, TrendingUp, DollarSign, Target, Award, Star, ClipboardList } from "lucide-react";
import { Line, LineChart, Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { mockDeals } from "@/lib/mockData";

const agentLinks = [
  { label: "Dashboard", href: "/agent/dashboard", icon: <LayoutDashboard className="h-5 w-5" /> },
  { label: "Activities", href: "/agent/activities", icon: <ClipboardList className="h-5 w-5" /> },
  { label: "Deals", href: "/agent/deals", icon: <Briefcase className="h-5 w-5" /> },
  { label: "Contacts", href: "/agent/contacts", icon: <Users className="h-5 w-5" /> },
  { label: "Reports", href: "/agent/reports", icon: <FileText className="h-5 w-5" /> },
];

const personalSalesData = [
  { month: "Jan", sales: 42000 },
  { month: "Feb", sales: 48000 },
  { month: "Mar", sales: 45000 },
  { month: "Apr", sales: 52000 },
  { month: "May", sales: 49000 },
  { month: "Jun", sales: 55000 },
];

const weeklyActivityData = [
  { day: "Mon", calls: 12, emails: 25 },
  { day: "Tue", calls: 15, emails: 30 },
  { day: "Wed", calls: 10, emails: 20 },
  { day: "Thu", calls: 18, emails: 35 },
  { day: "Fri", calls: 14, emails: 28 },
];

export default function AgentDashboard() {
  const myDeals = mockDeals.filter(deal => deal.agentId === "1");
  const closedDeals = myDeals.filter(deal => deal.status === "closed");
  const totalSales = closedDeals.reduce((sum, deal) => sum + deal.value, 0);
  const myRating = 4.8;
  const activeDeals = myDeals.filter(deal => deal.status !== "closed" && deal.status !== "lost").length;

  return (
    <DashboardLayout links={agentLinks} title="Sales Agent" showLogout={true}>
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold text-foreground">My Dashboard</h1>
          <p className="text-muted-foreground mt-2">Track your performance and achievements</p>
        </div>

        {/* Performance Rating Card */}
        <Card className="relative overflow-hidden border-l-4 border-l-[#F9622C] bg-white">
          <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[#F9622C] to-transparent opacity-50"></div>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[#F9622C] mb-2 font-medium">Your Performance Rating</p>
                <div className="flex items-center gap-3">
                  <div className="text-5xl font-bold text-foreground">{myRating}</div>
                  <div>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`h-6 w-6 ${
                            star <= Math.floor(myRating)
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">Excellent Performance!</p>
                  </div>
                </div>
              </div>
              <Award className="h-24 w-24 text-[#F9622C]/20" />
            </div>
          </CardContent>
        </Card>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
              <DollarSign className="h-4 w-4 text-[#F9622C]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#F9622C]">${totalSales.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground mt-1">
                <span className="text-[#F9622C]">+15%</span> from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Closed Deals</CardTitle>
              <Target className="h-4 w-4 text-[#F9622C]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#F9622C]">{closedDeals.length}</div>
              <p className="text-xs text-muted-foreground mt-1">
                <span className="text-green-600">+2</span> this month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Deals</CardTitle>
              <Briefcase className="h-4 w-4 text-[#F9622C]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#F9622C]">{activeDeals}</div>
              <p className="text-xs text-muted-foreground mt-1">
                In pipeline
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Win Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-[#F9622C]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#F9622C]">75%</div>
              <p className="text-xs text-muted-foreground mt-1">
                Above average
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Personal Sales Trend */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-[#F9622C]" />
                My Sales Trend (6 Months)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={personalSalesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="sales" stroke="#F9622C" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Weekly Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-[#F9622C]" />
                Weekly Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={weeklyActivityData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="calls" fill="#F9622C" name="Calls" />
                  <Bar dataKey="emails" fill="#ffa07a" name="Emails" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Recent Deals */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Deals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {myDeals.slice(0, 5).map((deal) => (
                <div key={deal.id} className="flex items-center justify-between p-4 bg-secondary/50 rounded-lg">
                  <div className="flex-1">
                    <div className="font-semibold">{deal.title}</div>
                    <div className="text-sm text-muted-foreground">{deal.client}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-[#F9622C]">${deal.value.toLocaleString()}</div>
                    <div className={`text-xs px-2 py-1 rounded mt-1 inline-block ${
                      deal.status === "closed" ? "bg-[#F9622C]/10 text-[#F9622C]" :
                      deal.status === "proposal" ? "bg-[#F9622C]/10 text-[#F9622C]" :
                      deal.status === "negotiation" ? "bg-[#F9622C]/10 text-[#F9622C]" :
                      "bg-[#F9622C]/10 text-[#F9622C]"
                    }`}>
                      {deal.status.charAt(0).toUpperCase() + deal.status.slice(1)}
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