"use client";

import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { LayoutDashboard, Briefcase, Users, FileText, Plus, Search, Mail, Phone, Building, ClipboardList } from "lucide-react";
import { useState } from "react";
import { mockContacts, type Contact } from "@/lib/mockData";

const agentLinks = [
  { label: "Dashboard", href: "/agent/dashboard", icon: <LayoutDashboard className="h-5 w-5" /> },
  { label: "Activities", href: "/agent/activities", icon: <ClipboardList className="h-5 w-5" /> },
  { label: "Deals", href: "/agent/deals", icon: <Briefcase className="h-5 w-5" /> },
  { label: "Contacts", href: "/agent/contacts", icon: <Users className="h-5 w-5" /> },
  { label: "Reports", href: "/agent/reports", icon: <FileText className="h-5 w-5" /> },
];

export default function ContactsPage() {
  const [contactOpen, setContactOpen] = useState(false);
  const [contacts, setContacts] = useState<Contact[]>(mockContacts);
  const [emailOpen, setEmailOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    position: "",
  });
  const [emailForm, setEmailForm] = useState({
    subject: "",
    message: "",
  });

  const updateContact = (k: string, v: string) => setContactForm((f) => ({ ...f, [k]: v }));
  const updateEmail = (k: string, v: string) => setEmailForm((f) => ({ ...f, [k]: v }));

  function resetContactForm() {
    setContactForm({ name: "", email: "", phone: "", company: "", position: "" });
  }

  function handleAddContact(e: React.FormEvent) {
    e.preventDefault();
    const newContact: Contact = {
      id: String(Date.now()),
      name: contactForm.name || "New Contact",
      email: contactForm.email || "",
      phone: contactForm.phone || "",
      company: contactForm.company || "",
      position: contactForm.position || "",
      lastContact: new Date().toISOString().slice(0, 10),
    };
    setContacts((s) => [newContact, ...s]);
    setContactOpen(false);
    resetContactForm();
  }

  function handleEmailClick(contact: Contact) {
    setSelectedContact(contact);
    setEmailOpen(true);
    setEmailForm({ subject: "", message: "" });
  }

  function handleSendEmail(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedContact) return;
    
    console.log("Email sent to:", selectedContact.email, {
      subject: emailForm.subject,
      message: emailForm.message,
    });
    
    alert(`Email sent to ${selectedContact.name} (${selectedContact.email})`);
    setEmailOpen(false);
    setEmailForm({ subject: "", message: "" });
  }

  return (
    <DashboardLayout links={agentLinks} title="Sales Agent" showLogout={true}>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-foreground">My Contacts</h1>
            <p className="text-muted-foreground mt-2">Manage your client relationships</p>
          </div>
          <Button
            onClick={() => setContactOpen(true)}
            className="gap-2 bg-[#F9622C] hover:bg-[#E85A24]"
          >
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
              <div className="text-2xl font-bold">{contacts.length}</div>
              <div className="text-sm text-muted-foreground">Total Contacts</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <Mail className="h-8 w-8 mx-auto text-[#F9622C] mb-2" />
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
          {contacts.map((contact) => (
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
                  <Button variant="outline" size="sm" className="flex-1" onClick={() => handleEmailClick(contact)}>
                    <Mail className="h-4 w-4 mr-1" />
                    Email
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

        {/* Email Dialog */}
        <Dialog open={emailOpen} onOpenChange={setEmailOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Send Email to {selectedContact?.name}</DialogTitle>
              <DialogDescription>Compose and send an email message</DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSendEmail} className="space-y-4">
              <div className="space-y-2">
                <Label>To</Label>
                <Input type="email" value={selectedContact?.email || ""} disabled className="bg-muted" />
              </div>
              <div className="space-y-2">
                <Label>Subject</Label>
                <Input
                  placeholder="Email subject"
                  value={emailForm.subject}
                  onChange={(e) => updateEmail("subject", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Message</Label>
                <Textarea
                  placeholder="Type your message here..."
                  value={emailForm.message}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => updateEmail("message", e.target.value)}
                  className="min-h-[150px]"
                  required
                />
              </div>

              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button type="submit">Send Email</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        {/* Add Contact Dialog */}
        <Dialog open={contactOpen} onOpenChange={setContactOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Contact</DialogTitle>
              <DialogDescription>Create a new contact to manage.</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleAddContact} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 space-y-2">
                  <Label>Full Name</Label>
                  <Input
                    placeholder="John Doe"
                    value={contactForm.name}
                    onChange={(e) => updateContact("name", e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input
                    type="email"
                    placeholder="john@company.com"
                    value={contactForm.email}
                    onChange={(e) => updateContact("email", e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>Phone</Label>
                  <Input
                    placeholder="+1 (555) 123-4567"
                    value={contactForm.phone}
                    onChange={(e) => updateContact("phone", e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>Company</Label>
                  <Input
                    placeholder="Acme Inc."
                    value={contactForm.company}
                    onChange={(e) => updateContact("company", e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>Position</Label>
                  <Input
                    placeholder="Manager"
                    value={contactForm.position}
                    onChange={(e) => updateContact("position", e.target.value)}
                    required
                  />
                </div>
              </div>

              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button type="submit" className="bg-[#F9622C] hover:bg-[#E85A24]">Add Contact</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
}