using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using prodigy_fs_02.Server.Entity;
using prodigy_fs_02.Server.Models;
using prodigy_fs_02.Server.Repositories;

namespace prodigy_fs_01.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {

        private readonly IAuthService _auth;
        private readonly IUserService _userservice;
        private readonly IMapper _mapper;

        public AuthController(IAuthService AuthService, IUserService userService, IMapper mapper)
        {
            _auth = AuthService;
            _userservice = userService;
            _mapper = mapper;
        }

        [AllowAnonymous]
        [HttpPost]
        [Route("Authentication")]
        public IActionResult Post([FromBody] AuthUser authentication)
        {
            var user = _auth.Authenticate(authentication);

            if (user != null)
            {
                var token = _auth.Generate(user);

                return Ok(new
                {
                    Id = user.Userid,
                    Username = user.Username,
                    Email = user.Email,
                    Role = user.Role,
                    Phone = user.PhoneNo,
                    Created_at = DateTime.UtcNow,
                    Token = token
                });

            }
            return NotFound("User Not Found");
        }

        [AllowAnonymous]
        [HttpPost]
        [Route("Register")]
        public IActionResult createUser([FromBody] RegisterUser user)
        {
            var model = _mapper.Map<User>(user);
            var createUser = _userservice.PostUser(model, user.Password);
            return Ok(createUser);
        }

    }
}
