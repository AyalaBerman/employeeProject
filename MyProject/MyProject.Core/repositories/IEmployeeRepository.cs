using MyProject.Core.Models;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyProject.Core.repositories
{
    public interface IEmployeeRepository
    {

        public List<Employee> Get();
        public Employee Get(int id);
        public Employee Post(Employee employee);
        public void PostJob(int id, Job job);
        public void PostEmployeeJob(Employee employee, Job job);
        public void Put(int id, Employee employee);
        public void Delete(int id);

    }
}
