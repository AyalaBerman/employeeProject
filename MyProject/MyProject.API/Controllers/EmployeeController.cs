using Microsoft.AspNetCore.Mvc;
using MyProject.Core.Models;
using MyProject.Service;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace MyProject.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private readonly EmployeeService _employeeService;
        public EmployeeController(EmployeeService employeeService)
        {
            _employeeService = employeeService;
        }

        // GET: api/<EmployeeController>
        [HttpGet]
        public IEnumerable<Employee> Get()
        {
            return _employeeService.Get();
        }

        // GET api/<EmployeeController>/5
        [HttpGet("{id}")]
        public Employee Get(int id)
        {
            return _employeeService.Get(id);
        }

        // POST api/<EmployeeController>
        [HttpPost]
        public Employee Post([FromBody] Employee employee)
        {
            return _employeeService.Post(employee);
        }

        [HttpPost("{id}")]
        public void PostJob(int id,[FromBody] Job job)
        {
            _employeeService.PostJob(id,job);
        }

        

        // PUT api/<EmployeeController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] Employee employee)
        {
            _employeeService.Put(id, employee);
        }

        // DELETE api/<EmployeeController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            _employeeService.Delete(id);
        }
    }
}
