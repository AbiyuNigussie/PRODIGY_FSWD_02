using prodigy_fs_02.Server.Entity;

namespace prodigy_fs_02.Server.Repositories
{
    public interface IEmployeeService
    {
        IEnumerable<Employee> GetAllEmployees();
        Employee GetEmployeeById(int employeeId);
        Employee AddEmployee(Employee employee);
        Employee UpdateEmployee(Employee employee);
        bool DeleteEmployee(int employeeId);
    }
}
