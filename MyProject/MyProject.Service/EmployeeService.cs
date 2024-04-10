using MyProject.Core.Models;
using MyProject.Core.repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyProject.Service
{
    public class EmployeeService
    {
        private readonly IEmployeeRepository _employeeRepository;
        public EmployeeService(IEmployeeRepository employeeRepository)
        {
            _employeeRepository = employeeRepository;
        }
        public IEnumerable<Employee> Get()
        {
            return _employeeRepository.Get();
        }
        public Employee Get(int id)
        {
            return _employeeRepository.Get(id);
        }
        public Employee  Post(Employee employee)
        {
            return _employeeRepository.Post(employee);
        }
        public void PostJob(int id, Job job)
        {
            _employeeRepository.PostJob(id, job);
        }
        public void PostEmployeeJob(Employee employee, Job job)
        {
            _employeeRepository.PostEmployeeJob(employee, job);
        }
        public void Put(int id, Employee employee)
        {
            _employeeRepository.Put(id, employee);
        }
        public void Delete(int id)
        {
            _employeeRepository.Delete(id);
        }
    }
}