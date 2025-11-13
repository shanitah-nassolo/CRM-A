"use client";

import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { LayoutDashboard, Briefcase, Users, FileText, ClipboardList, Plus, Calendar, UserCheck, Handshake, TrendingUp } from "lucide-react";
import { toast } from "sonner";

const agentLinks = [
  { label: "Dashboard", href: "/agent/dashboard", icon: <LayoutDashboard className="h-5 w-5" /> },
  { label: "Activities", href: "/agent/activities", icon: <ClipboardList className="h-5 w-5" /> },
  { label: "Deals", href: "/agent/deals", icon: <Briefcase className="h-5 w-5" /> },
  { label: "Contacts", href: "/agent/contacts", icon: <Users className="h-5 w-5" /> },
  { label: "Reports", href: "/agent/reports", icon: <FileText className="h-5 w-5" /> },
];

interface ActivityLog {
  id: string;
  date: string;
  peopleMet: number;
  meetingsScheduled: number;
  dealsClosed: number;
  notes: string;
}

export default function ActivitiesPage() {
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>([
    {
      id: "1",
      date: "2025-10-22",
      peopleMet: 8,
      meetingsScheduled: 3,
      dealsClosed: 1,
      notes: "Great day! Closed the TechStart deal and scheduled follow-ups with 3 prospects."
    },
    {
      id: "2",
      date: "2025-10-21",
      peopleMet: 12,
      meetingsScheduled: 5,
      dealsClosed: 0,
      notes: "Productive networking event. Met several potential clients from the manufacturing sector."
    },
    {
      id: "3",
      date: "2025-10-20",
      peopleMet: 6,
      meetingsScheduled: 2,
      dealsClosed: 2,
      notes: "Closed two deals! GlobalRetail and BuildCorp both signed today."
    },
  ]);

  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    peopleMet: "",
    meetingsScheduled: "",
    dealsClosed: "",
    notes: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.peopleMet || !formData.meetingsScheduled || !formData.dealsClosed) {
      toast.error("Please fill in all required fields");
      return;
    }

    const newActivity: ActivityLog = {
      id: Date.now().toString(),
      date: formData.date,
      peopleMet: parseInt(formData.peopleMet),
      meetingsScheduled: parseInt(formData.meetingsScheduled),
      dealsClosed: parseInt(formData.dealsClosed),
      notes: formData.notes
    };

    setActivityLogs([newActivity, ...activityLogs]);
    
    // Reset form
    setFormData({
      date: new Date().toISOString().split('T')[0],
      peopleMet: "",
      meetingsScheduled: "",
      dealsClosed: "",
      notes: ""
    });

    toast.success("Activity logged successfully!");
  };

  // Calculate totals
  const totals = activityLogs.reduce((acc, log) => ({
    peopleMet: acc.peopleMet + log.peopleMet,
    meetingsScheduled: acc.meetingsScheduled + log.meetingsScheduled,
    dealsClosed: acc.dealsClosed + log.dealsClosed
  }), { peopleMet: 0, meetingsScheduled: 0, dealsClosed: 0 });

  return (
    <DashboardLayout links={agentLinks} title="Sales Agent" showLogout={true}>
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold text-foreground">Daily Activities</h1>
          <p className="text-muted-foreground mt-2">Track your daily sales activities and performance</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border-l-4 border-l-primary">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">People Met</CardTitle>
              <UserCheck className="h-4 w-4 text-[#F9622C]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#F9622C]">{totals.peopleMet}</div>
              <p className="text-xs text-muted-foreground mt-1">Total this period</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Meetings Scheduled</CardTitle>
              <Calendar className="h-4 w-4 text-[#F9622C]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#F9622C]">{totals.meetingsScheduled}</div>
              <p className="text-xs text-muted-foreground mt-1">Total this period</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Deals Closed</CardTitle>
              <Handshake className="h-4 w-4 text-[#F9622C]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#F9622C]">{totals.dealsClosed}</div>
              <p className="text-xs text-muted-foreground mt-1">Total this period</p>
            </CardContent>
          </Card>
        </div>

        {/* Log New Activity Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="h-5 w-5" />
              Log Today's Activity
            </CardTitle>
            <CardDescription>Record your daily sales activities</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="peopleMet">People Met</Label>
                  <Input
                    id="peopleMet"
                    type="number"
                    min="0"
                    placeholder="0"
                    value={formData.peopleMet}
                    onChange={(e) => setFormData({...formData, peopleMet: e.target.value})}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="meetingsScheduled">Meetings Scheduled</Label>
                  <Input
                    id="meetingsScheduled"
                    type="number"
                    min="0"
                    placeholder="0"
                    value={formData.meetingsScheduled}
                    onChange={(e) => setFormData({...formData, meetingsScheduled: e.target.value})}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dealsClosed">Deals Closed</Label>
                  <Input
                    id="dealsClosed"
                    type="number"
                    min="0"
                    placeholder="0"
                    value={formData.dealsClosed}
                    onChange={(e) => setFormData({...formData, dealsClosed: e.target.value})}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Notes (Optional)</Label>
                <Textarea
                  id="notes"
                  placeholder="Add any notes about today's activities..."
                  rows={3}
                  value={formData.notes}
                  onChange={(e) => setFormData({...formData, notes: e.target.value})}
                />
              </div>

              <Button type="submit" className="gap-2">
                <Plus className="h-4 w-4" />
                Log Activity
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Activity History */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Activity History
            </CardTitle>
            <CardDescription>Your recent activity logs</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activityLogs.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">No activities logged yet. Start by logging your first activity above!</p>
              ) : (
                activityLogs.map((log) => (
                  <div key={log.id} className="border rounded-lg p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-primary" />
                        <span className="font-semibold">
                          {new Date(log.date).toLocaleDateString('en-US', { 
                            weekday: 'long', 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                          })}
                        </span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4">
                      <div className="flex items-center gap-2 bg-[#FDE4D4] p-3 rounded">
                        <UserCheck className="h-5 w-5 text-[#F9622C]" />
                        <div>
                          <div className="text-2xl font-bold text-[#F9622C]">{log.peopleMet}</div>
                          <div className="text-xs text-muted-foreground">People Met</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 bg-purple-50 p-3 rounded">
                        <Calendar className="h-5 w-5 text-purple-600" />
                        <div>
                          <div className="text-2xl font-bold text-purple-600">{log.meetingsScheduled}</div>
                          <div className="text-xs text-muted-foreground">Meetings Scheduled</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 bg-green-50 p-3 rounded">
                        <Handshake className="h-5 w-5 text-green-600" />
                        <div>
                          <div className="text-2xl font-bold text-green-600">{log.dealsClosed}</div>
                          <div className="text-xs text-muted-foreground">Deals Closed</div>
                        </div>
                      </div>
                    </div>

                    {log.notes && (
                      <div className="bg-secondary/50 p-3 rounded">
                        <div className="text-xs font-semibold text-muted-foreground mb-1">Notes:</div>
                        <div className="text-sm">{log.notes}</div>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
