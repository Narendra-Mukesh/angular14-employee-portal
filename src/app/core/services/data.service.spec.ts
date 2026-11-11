import { TestBed } from '@angular/core/testing';
import { DataService } from './data.service';

describe('DataService', () => {
  let service: DataService;
  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataService);
  });

  it('should load the seeded employee list', (done) => {
    service.getEmployees().subscribe(items => {
      expect(items.length).toBeGreaterThan(0);
      done();
    });
  });

  it('should add a new employee', (done) => {
    service.saveEmployee({
      id: 0, firstName: 'Test', lastName: 'User', email: 'test@example.com',
      phone: '1234567890', departmentId: 1, designation: 'Tester',
      joiningDate: '2024-01-01', status: 'Active'
    });
    service.getEmployees().subscribe(items => {
      expect(items.some(item => item.email === 'test@example.com')).toBeTrue();
      done();
    });
  });
});
