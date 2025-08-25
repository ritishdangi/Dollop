export interface Ticket {
  customerName?: any;
  id: number;
  title: string;
  description: string;
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  status: 'OPEN' | 'IN_PROGRESS' | 'PENDING' | 'RESOLVED';
  userId: number;
  assignedToId: number | null;
  assignedCsrName?: any;
  createdAt: string;
  updatedAt: string;
}