using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using prodigy_fs_02.Server.Entity;
using prodigy_fs_02.Server.Models;
using prodigy_fs_02.Server.Repositories;

namespace prodigy_fs_02.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private readonly IEmployeeService _employeesService;
        private readonly IMapper _mapper;
        public EmployeeController(IEmployeeService employeeService, IMapper mapper)
        {
            _employeesService = employeeService;
            _mapper = mapper;
        }

        [HttpGet]
        public IActionResult GetEmployees()
        {
            var employee = _employeesService.GetAllEmployees();
            return Ok(employee);

        }

        [HttpGet("{id}")]
        public IActionResult GetEmployee(int id)
        {
            var employee = _employeesService.GetEmployeeById(id);
            if (employee == null)
            {
                return NotFound();
            }
            return Ok(employee);
        }

        [HttpPost]
        [Authorize(Roles = "Admin")]

        public IActionResult PostEmployee(RegisterEmployee registeredemployee)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var employee = _mapper.Map<Employee>(registeredemployee);
            var createdEmployee = _employeesService.AddEmployee(employee);
            // return CreatedAtAction(nameof(GetEmployee), new { id = createdEmployee.EmployeeID });
            return Ok("Employee Successfully Created!");
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")]
        public IActionResult PutEmployee(int id, UpdateEmployee employee) 
        {

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var updatedobj = _employeesService.GetEmployeeById(id);

            if(id != updatedobj.EmployeeID)
            {
                return NotFound("Error: Invalid Put Request, Employee Not Found!");
            }
            _mapper.Map(employee, updatedobj);
            var updatedEmployee = _employeesService.UpdateEmployee(updatedobj);

            if(updatedEmployee == null)
            {
                return NotFound();
            }
            return NoContent();
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public IActionResult DeleteEmployee(int id)
        {
            var success = _employeesService.DeleteEmployee(id);

            if (!success)
            {
                return NotFound();
            }

            return NoContent();
        }

    }
}