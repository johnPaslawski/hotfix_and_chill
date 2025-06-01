using GoSolar.API.Models;
using GoSolar.API.Repositories;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;

namespace GoSolar.API.Controllers
{
    [ApiController]
    [Route("users")]
    public class UsersController : ControllerBase
    {
        //private UsersRepository _usersRepository;
        //public UsersController(UsersRepository userRepo)
        //{
        //    _usersRepository = userRepo; 
        //}

        //[HttpGet("{userId}")]
        //public ActionResult GetUser(int userId)
        //{
        //    var userFromBase = UsersRepository.CurrentInstance.Users
        //        .FirstOrDefault(x => x.Id == userId);
        //    if (userFromBase == null)
        //        return NotFound(new JsonResult($"user {userFromBase.Username} not found"));

        //    userFromBase.IsAuthenticated = false;
        //    return Ok(userFromBase);
        //}

        [HttpGet("{userId}")]
        public ActionResult GetUserData(int userId, [FromQuery] bool getData)
        {
            var userFromBase = UsersRepository.CurrentInstance.Users
                .FirstOrDefault(x => x.Id == userId);
            if (userFromBase == null)
                return NotFound(new JsonResult($"user {userId} not found"));

            var userToReturn = new UserData();

            userToReturn.IsAuthenticated = false;
            userToReturn.Username = userFromBase.Username;
            userToReturn.Id = userId;

            return Ok(userToReturn);
        }

        [HttpPost]
        public ActionResult Login(Models.LoginRequest loginRequest)
        {
            var foundUser = UsersRepository.CurrentInstance.Users
                .FirstOrDefault(x => x.Username == loginRequest.Username);
            if(foundUser is null) 
                return NotFound(new JsonResult($"user {loginRequest.Username} not found"));
             
            return Ok(new User
            {
                Id = foundUser.Id,
                Username = foundUser.Username,
                IsAuthenticated = true
            });
        }
    }
}

