"use client";

import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { LayoutDashboard, Briefcase, Users, FileText, Plus, Search, Mail, Phone, Building, ClipboardList } from "lucide-react";
import { mockContacts } from "@/lib/mockData";

const agentLinks = [
  { label: "Dashboard", href: "/agent/dashboard", icon: <LayoutDashboard className="h-5 w-5" /> },
  { label: "Activities", href: "/agent/activities", icon: <ClipboardList className="h-5 w-5" /> },
  { label: "Deals", href: "/agent/deals", icon: <Briefcase className="h-5 w-5" /> },
  { label: "Contacts", href: "/agent/contacts", icon: <Users className="h-5 w-5" /> },
  { label: "Reports", href: "/agent/reports", icon: <FileText className="h-5 w-5" /> },
];

export default function ContactsPage() {
  return (
    <DashboardLayout links={agentLinks} title="Sales Agent" showLogout={true}>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-foreground">My Contacts</h1>
            <p className="text-muted-foreground mt-2">Manage your client relationships</p>
          </div>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Add Contact
          </Button>
        </div>

        {/* Search Bar */}
        <Card>
          <CardContent className="pt-6">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search contacts..." className="pl-10" />
            </div>
          </CardContent>
        </Card>

        {/* Contact Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="pt-6 text-center">
              <Users className="h-8 w-8 mx-auto text-primary mb-2" />
              <div className="text-2xl font-bold">{mockContacts.length}</div>
              <div className="text-sm text-muted-foreground">Total Contacts</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <Mail className="h-8 w-8 mx-auto text-blue-500 mb-2" />
              <div className="text-2xl font-bold">3</div>
              <div className="text-sm text-muted-foreground">Contacted This Week</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <Phone className="h-8 w-8 mx-auto text-green-500 mb-2" />
              <div className="text-2xl font-bold">12</div>
              <div className="text-sm text-muted-foreground">Calls This Month</div>
            </CardContent>
          </Card>
        </div>

        {/* Contacts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockContacts.map((contact) => (
            <Card key={contact.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start gap-4">
                  <Avatar className="h-12 w-12 bg-primary">
                    <AvatarFallback className="bg-primary text-primary-foreground font-semibold">
                      {contact.name.split(" ").map(n => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <CardTitle className="text-lg">{contact.name}</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">{contact.position}</p>
                    <Badge variant="outline" className="mt-2">
                      <Building className="h-3 w-3 mr-1" />
                      {contact.company}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">{contact.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">{contact.phone}</span>
                </div>
                <div className="pt-2 border-t">
                  <p className="text-xs text-muted-foreground">
                    Last Contact: {new Date(contact.lastContact).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex gap-2 pt-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Mail className="h-4 w-4 mr-1" />
                    Email
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <Phone className="h-4 w-4 mr-1" />
                    Call
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Contact Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockContacts.slice(0, 5).map((contact, idx) => (
                <div key={contact.id} className="flex items-center gap-4 p-4 bg-secondary/50 rounded-lg">
                  <Avatar className="h-10 w-10 bg-primary">
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {contact.name.split(" ").map(n => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="font-semibold">{contact.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {idx % 2 === 0 ? "Email sent" : "Phone call"} - {contact.company}
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {new Date(contact.lastContact).toLocaleDateString()}
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