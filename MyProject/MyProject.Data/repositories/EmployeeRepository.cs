using Microsoft.EntityFrameworkCore;
using MyProject.Core.Models;
using MyProject.Core.repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyProject.Data.repositories
{
    public class EmployeeRepository : IEmployeeRepository
    {
        private readonly DataContext _context;
        public EmployeeRepository(DataContext context)
        {
            _context = context;
        }


        public List<Employee> Get()
        {
            return _context.Employees.Where(e => e.Deleted == false).ToList();
        }


        public Employee Get(int id)
        {
            foreach (var employee in _context.Employees)
            {
                if (employee.Id == id)
                    return employee;
            }
            return null;
        }


        public Employee Post(Employee employee)
        {
            Employee foundEmployee = _context.Employees.ToList().Find(e => e.Identity == employee.Identity);
            if (foundEmployee == null)
            {
                _context.Employees.Add(employee);
                _context.SaveChanges();
            }
            else
            {
                return null;
            }
            return employee;
        }

        public void PostJob(int id, Job job)
        {
            Employee foundEmployee = _context.Employees.Include(e => e.Jobs).FirstOrDefault(e => e.Id == id);
            if (foundEmployee.Jobs == null)
                foundEmployee.Jobs = new List<Job>();
            Job foundJob = foundEmployee.Jobs.Find(j => j.Name == job.Name);
            if (foundJob == null)
                foundEmployee.Jobs.Add(job);
            _context.SaveChanges();
        }

        public void PostEmployeeJob(Employee employee, Job job)
        {
            employee.Jobs.Add(job);
            _context.Employees.Add(employee);
            _context.SaveChanges();
        }

        public void Put(int id, Employee emp)
        {
            Employee foundEmployee = _context.Employees.ToList().Find(employee => employee.Id == id);
            emp.Id = foundEmployee.Id;
            _context.Employees.Remove(foundEmployee);
            _context.Employees.Add(emp);
            _context.SaveChanges();
        }

        public void Delete(int id)
        {
            Employee foundEmployee = _context.Employees.Find(id);
            foundEmployee.Deleted = true;
            _context.SaveChanges();


        }
    }
}
