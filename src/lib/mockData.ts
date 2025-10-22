export interface Agent {
  id: string;
  name: string;
  email: string;
  phone: string;
  rating: number;
  totalSales: number;
  closedDeals: number;
  status: "active" | "inactive";
  joinedDate: string;
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  status: "new" | "contacted" | "qualified" | "converted" | "lost";
  value: number;
  assignedTo: string;
  createdAt: string;
}

export interface Deal {
  id: string;
  title: string;
  client: string;
  value: number;
  status: "negotiation" | "proposal" | "closed" | "lost";
  probability: number;
  closedDate?: string;
  agentId: string;
}

export interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  position: string;
  lastContact: string;
}

export const mockAgents: Agent[] = [
  {
    id: "1",
    name: "John Smith",
    email: "john.smith@crm.com",
    phone: "+1 (555) 123-4567",
    rating: 4.8,
    totalSales: 285000,
    closedDeals: 24,
    status: "active",
    joinedDate: "2023-01-15",
  },
  {
    id: "2",
    name: "Sarah Johnson",
    email: "sarah.j@crm.com",
    phone: "+1 (555) 234-5678",
    rating: 4.9,
    totalSales: 320000,
    closedDeals: 28,
    status: "active",
    joinedDate: "2023-02-20",
  },
  {
    id: "3",
    name: "Michael Brown",
    email: "m.brown@crm.com",
    phone: "+1 (555) 345-6789",
    rating: 4.6,
    totalSales: 245000,
    closedDeals: 19,
    status: "active",
    joinedDate: "2023-03-10",
  },
  {
    id: "4",
    name: "Emily Davis",
    email: "emily.d@crm.com",
    phone: "+1 (555) 456-7890",
    rating: 4.7,
    totalSales: 298000,
    closedDeals: 22,
    status: "active",
    joinedDate: "2023-04-05",
  },
  {
    id: "5",
    name: "David Wilson",
    email: "d.wilson@crm.com",
    phone: "+1 (555) 567-8901",
    rating: 4.5,
    totalSales: 210000,
    closedDeals: 17,
    status: "inactive",
    joinedDate: "2023-05-12",
  },
];

export const mockLeads: Lead[] = [
  {
    id: "1",
    name: "Robert Chen",
    email: "robert.chen@techcorp.com",
    phone: "+1 (555) 111-2222",
    company: "TechCorp Solutions",
    status: "qualified",
    value: 45000,
    assignedTo: "John Smith",
    createdAt: "2024-01-15",
  },
  {
    id: "2",
    name: "Lisa Anderson",
    email: "l.anderson@innovate.io",
    phone: "+1 (555) 222-3333",
    company: "Innovate Inc",
    status: "contacted",
    value: 32000,
    assignedTo: "Sarah Johnson",
    createdAt: "2024-01-18",
  },
  {
    id: "3",
    name: "James Martinez",
    email: "jmartinez@global.com",
    phone: "+1 (555) 333-4444",
    company: "Global Enterprises",
    status: "new",
    value: 58000,
    assignedTo: "Michael Brown",
    createdAt: "2024-01-20",
  },
  {
    id: "4",
    name: "Patricia Taylor",
    email: "p.taylor@startupxyz.com",
    phone: "+1 (555) 444-5555",
    company: "Startup XYZ",
    status: "converted",
    value: 28000,
    assignedTo: "Emily Davis",
    createdAt: "2024-01-10",
  },
  {
    id: "5",
    name: "Christopher Lee",
    email: "c.lee@megacorp.net",
    phone: "+1 (555) 555-6666",
    company: "MegaCorp Industries",
    status: "qualified",
    value: 75000,
    assignedTo: "John Smith",
    createdAt: "2024-01-22",
  },
  {
    id: "6",
    name: "Jennifer White",
    email: "j.white@biztech.com",
    phone: "+1 (555) 666-7777",
    company: "BizTech Ltd",
    status: "contacted",
    value: 42000,
    assignedTo: "Sarah Johnson",
    createdAt: "2024-01-25",
  },
  {
    id: "7",
    name: "Daniel Harris",
    email: "dharris@solutions.org",
    phone: "+1 (555) 777-8888",
    company: "Solutions Group",
    status: "new",
    value: 35000,
    assignedTo: "Michael Brown",
    createdAt: "2024-01-28",
  },
  {
    id: "8",
    name: "Michelle Clark",
    email: "m.clark@enterprise.co",
    phone: "+1 (555) 888-9999",
    company: "Enterprise Co",
    status: "lost",
    value: 48000,
    assignedTo: "Emily Davis",
    createdAt: "2024-01-12",
  },
];

export const mockDeals: Deal[] = [
  {
    id: "1",
    title: "Enterprise Software License",
    client: "TechCorp Solutions",
    value: 45000,
    status: "closed",
    probability: 100,
    closedDate: "2024-01-20",
    agentId: "1",
  },
  {
    id: "2",
    title: "Cloud Infrastructure Setup",
    client: "Innovate Inc",
    value: 32000,
    status: "proposal",
    probability: 70,
    agentId: "1",
  },
  {
    id: "3",
    title: "CRM Implementation",
    client: "Global Enterprises",
    value: 58000,
    status: "negotiation",
    probability: 60,
    agentId: "1",
  },
  {
    id: "4",
    title: "Marketing Automation Package",
    client: "Startup XYZ",
    value: 28000,
    status: "closed",
    probability: 100,
    closedDate: "2024-01-18",
    agentId: "2",
  },
  {
    id: "5",
    title: "Data Analytics Platform",
    client: "MegaCorp Industries",
    value: 75000,
    status: "proposal",
    probability: 80,
    agentId: "2",
  },
  {
    id: "6",
    title: "Mobile App Development",
    client: "BizTech Ltd",
    value: 42000,
    status: "negotiation",
    probability: 65,
    agentId: "3",
  },
];

export const mockContacts: Contact[] = [
  {
    id: "1",
    name: "Robert Chen",
    email: "robert.chen@techcorp.com",
    phone: "+1 (555) 111-2222",
    company: "TechCorp Solutions",
    position: "CTO",
    lastContact: "2024-01-20",
  },
  {
    id: "2",
    name: "Lisa Anderson",
    email: "l.anderson@innovate.io",
    phone: "+1 (555) 222-3333",
    company: "Innovate Inc",
    position: "VP of Operations",
    lastContact: "2024-01-19",
  },
  {
    id: "3",
    name: "James Martinez",
    email: "jmartinez@global.com",
    phone: "+1 (555) 333-4444",
    company: "Global Enterprises",
    position: "Director of IT",
    lastContact: "2024-01-22",
  },
  {
    id: "4",
    name: "Patricia Taylor",
    email: "p.taylor@startupxyz.com",
    phone: "+1 (555) 444-5555",
    company: "Startup XYZ",
    position: "CEO",
    lastContact: "2024-01-18",
  },
  {
    id: "5",
    name: "Christopher Lee",
    email: "c.lee@megacorp.net",
    phone: "+1 (555) 555-6666",
    company: "MegaCorp Industries",
    position: "Procurement Manager",
    lastContact: "2024-01-23",
  },
];

export const salesChartData = [
  { month: "Jan", sales: 45000 },
  { month: "Feb", sales: 52000 },
  { month: "Mar", sales: 48000 },
  { month: "Apr", sales: 61000 },
  { month: "May", sales: 55000 },
  { month: "Jun", sales: 67000 },
];

export const agentPerformanceData = [
  { name: "John Smith", sales: 285000, deals: 24 },
  { name: "Sarah Johnson", sales: 320000, deals: 28 },
  { name: "Michael Brown", sales: 245000, deals: 19 },
  { name: "Emily Davis", sales: 298000, deals: 22 },
  { name: "David Wilson", sales: 210000, deals: 17 },
];

export const leadStatusData = [
  { status: "New", count: 15 },
  { status: "Contacted", count: 23 },
  { status: "Qualified", count: 18 },
  { status: "Converted", count: 12 },
  { status: "Lost", count: 8 },
];
