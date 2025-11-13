"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { mockLeads } from "@/lib/mockData";

export default function LeadDetailPage() {
  const params = useParams();
  const id = params?.id ?? "";
  const lead = mockLeads.find((l) => l.id === id);

  return (
    <DashboardLayout links={[] as any} title="Admin Panel" showLogout={true}>
      <div className="p-8">
        <Card>
          <CardHeader>
            <CardTitle>Lead Details</CardTitle>
          </CardHeader>
          <CardContent>
            {!lead ? (
              <div className="py-8 text-center">Lead not found.</div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-semibold">{lead.name}</h2>
                    <div className="text-sm text-muted-foreground">{lead.company}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-lg">${lead.value.toLocaleString()}</div>
                    <div className="text-xs text-muted-foreground">Created: {lead.createdAt}</div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-muted-foreground">Email</div>
                    <div className="font-medium">{lead.email}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Phone</div>
                    <div className="font-medium">{lead.phone}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Status</div>
                    <div className="font-medium">{lead.status}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Assigned To</div>
                    <div className="font-medium">{lead.assignedTo}</div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Link href="/admin/leads">
                    <Button variant="outline">Back to leads</Button>
                  </Link>
                  <Button>Assign</Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
