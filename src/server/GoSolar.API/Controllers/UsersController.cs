using Microsoft.AspNetCore.Mvc;

namespace GoSolar.API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UsersController : ControllerBase
    {

        [HttpGet]
        public ActionResult GetUser()
        {
            return Ok("siema byq, jestes w GetUser");
        }

        [HttpPost]
        public ActionResult LoginUser()
        { 
            return Ok("siema byq, jestes w LoginUser");
        }
    }
}

