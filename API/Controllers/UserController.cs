using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using prodigy_fs_02.Server.Data;
using prodigy_fs_02.Server.Entity;
using prodigy_fs_02.Server.Models;
using prodigy_fs_02.Server.Repositories;
using System.Security.Claims;

namespace prodigy_fs_02.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    [Authorize(AuthenticationSchemes = "Bearer")]
    public class UserController : ControllerBase
    {
        private readonly IUserService _user;
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;

        public UserController(IUserService userService, ApplicationDbContext context, IMapper mapper)
        {
            _user = userService;
            _context = context;
            _mapper = mapper;
        }

        [HttpGet]
        [Authorize(Roles = "SuperAdmin, Admin")]
        public IActionResult GetUsers()
        {
            var AllUser = _user.GetUsers();
            return Ok(AllUser);
        }

        // GET: api/Users/5
        [HttpGet("{id}")]
        [Authorize(Roles = "SuperAdmin, Admin, Agent")]
        public IActionResult GetUserbyId(int id)
        {
            var userById = _user.GetUserbyId(id);

            if (userById == null)
            {
                return NotFound("User for the $`{id}` not found!");
            }

            return Ok(userById);
        }

        // PUT: api/Users/5
        [HttpPut("{id}")]
        [Authorize(Roles = "SuperAdmin, Admin")]
        public IActionResult PutUser(int id, UpdateUser user)
        {
            var dbuserid = _context.Users.Find(id);
            if (id != dbuserid.Userid)
            {
                return NotFound("Error : Invalid Put Request, User Not Found !");
            }

            try
            {
                _user.PutUser(id, user);
            }


            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
                {
                    return NotFound("Error Updating the User !");
                }
                else
                {
                    throw;
                }
            }

            return Ok("Success !");
        }

        // POST: api/Users
        [HttpPost]
        [AllowAnonymous]
        public IActionResult PostUser([FromBody] RegisterUser user)
        {
            var model = _mapper.Map<User>(user);
            var createUser = _user.PostUser(model, user.Password);
            return Ok(createUser);
        }

        // DELETE: api/Users/5
        [HttpDelete("{id}")]
        [Authorize(Roles = "SuperAdmin")]
        public IActionResult DeleteUser(int id)
        {
            var user = _user.GetUserbyId(id);
            if (user == null)
            {
                return NotFound("User Not Found");
            }

            _user.DeleteUser(user);
            return NotFound("User Deleted");
        }

        private bool UserExists(int id)
        {
            return _user.IsExist(id);
        }
        [Authorize]
        [HttpGet("/api/user/me")]
        public IActionResult GetUserData()
        {

            var username = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(username))
            {
                return Unauthorized("User ID not found in claims");
            }

            // Fetch user data from the database
            var user = _context.Users.FirstOrDefault(u => u.Username == username);

            if (user == null)
            {
                return NotFound("User Not Found!");
            }

            return Ok(user);

        }
    }
}
