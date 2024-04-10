//using Microsoft.AspNetCore.Mvc;
//using MyProject.Core.Models;
//using MyProject.Service;

//// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

//namespace MyProject.API.Controllers
//{
//    [Route("api/[controller]")]
//    [ApiController]
//    public class JobController : ControllerBase
//    {
//        private readonly JobService _jobService;
//        public JobController(JobService jobService)
//        {
//            _jobService = jobService;
//        }

//        // GET: api/<JobController>
//        [HttpGet]
//        public IEnumerable<Job> Get()
//        {
//            return _jobService.Get();
//        }

//        // GET api/<JobController>/5
//        [HttpGet("{id}")]
//        public Job Get(int id)
//        {
//            return _jobService.Get(id);
//        }

//        // POST api/<JobController>
//        [HttpPost]
//        public void Post([FromBody] Job job)
//        {
//            _jobService.Post(job);
//        }

//        // PUT api/<JobController>/5
//        [HttpPut("{id}")]
//        public void Put(int id, [FromBody] Job job)
//        {
//            _jobService.Put(id, job);
//        }

//        // DELETE api/<JobController>/5
//        [HttpDelete("{id}")]
//        public void Delete(int id)
//        {
//            _jobService.Delete(id);
//        }
//    }
//}
