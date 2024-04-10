namespace MyProject.Core.Models
{
    public class Employee
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Identity { get; set; }
        public DateTime StartDate { get; set; }
        public List<Job> Jobs { get; set; }
        public bool Deleted { get; set; }
    }
}