using AutoMapper;
using Microsoft.EntityFrameworkCore;
using prodigy_fs_02.Server.Data;
using prodigy_fs_02.Server.Entity;
using prodigy_fs_02.Server.Repositories;

namespace prodigy_fs_02.Server.Services
{
    public class EmployeeService : IEmployeeService
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;
        public EmployeeService(ApplicationDbContext context, IMapper mapper) {
            _context = context;
            _mapper = mapper;
        }
        public Employee AddEmployee(Employee employee)
        {
            _context.Employees.Add(employee);
            _context.SaveChanges();
            return employee;
        }

        public bool DeleteEmployee(int employeeId)
        {
            var employee = _context.Employees.Find(employeeId);
            if (employee == null)
            {
                return false;
            }
            _context.Employees.Remove(employee);
            _context.SaveChanges();
            return true;
        }

        public IEnumerable<Employee> GetAllEmployees()
        {
            return _context.Employees.ToList();
        }

        public Employee GetEmployeeById(int employeeId)
        {
            return _context.Employees.Find(employeeId);
        }

        public Employee UpdateEmployee(Employee employee)
        {
            _context.Employees.Update(employee);
            _context.SaveChanges();
            return employee;
        }
    }
}
