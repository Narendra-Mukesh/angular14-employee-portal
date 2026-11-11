export interface LeaveRequest {
  id: number;
  employeeId: number;
  type: 'Annual' | 'Sick' | 'Personal';
  startDate: string;
  endDate: string;
  reason: string;
  status: 'Pending' | 'Approved' | 'Rejected';
}
