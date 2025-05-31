using GoSolar.API.Models;
using GoSolar.API.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace GoSolar.API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UsersController : ControllerBase
    {
        //private UsersRepository _usersRepository;
        //public UsersController(UsersRepository userRepo)
        //{
        //    _usersRepository = userRepo;
        //}

        [HttpGet]
        public ActionResult GetUser()
        {
            return Ok("siema byq, jestes w GetUser");
        }

        [HttpPost]
        public ActionResult Login(LoginRequest loginRequest)
        {
            var foundUser = UsersRepository.CurrentInstance.Users
                .FirstOrDefault(x => x.Username == loginRequest.Username);
            if(foundUser is null) return NotFound($"user {loginRequest.Username} not found");
             
            return Ok(new User
            {
                Id = foundUser.Id,
                Username = foundUser.Username,
                IsAuthenticated = true

            });
        }
    }
}

