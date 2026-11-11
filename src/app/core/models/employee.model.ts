export interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  departmentId: number;
  designation: string;
  joiningDate: string;
  status: 'Active' | 'Inactive';
}
