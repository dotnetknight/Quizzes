using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Quizzes.Models;

namespace Quizzes.Controllers
{
    [Route("api/[controller]")]
    public class UsersController : Controller
    {
        private readonly VegaContext _context;
        public UsersController(VegaContext context) { _context = context; }

        [HttpPost, Route("Register")]
        public async Task<IActionResult> Register([FromBody] QUsers User)
        {
            if (ModelState.IsValid)
            {
                if (!UserExists(User.Email))
                {
                    User.PasswordHash = PasswordHashing.Hash(User.PasswordHash);
                    _context.QUsers.Add(User);
                    await _context.SaveChangesAsync();
                    return Ok();
                }
                else { return Conflict(); }
            }
            else { return BadRequest(ModelState); }
        }

        [HttpPost, Route("Login")]
        public IActionResult Login([FromBody] LoginCredentials loginCredentials)
        {
            if (ModelState.IsValid)
            {
                if (LoginDataCheck(loginCredentials))
                {
                    var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("superSecretKey@345"));
                    var signinCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);

                    var claims = new List<Claim> { new Claim(ClaimTypes.Email, loginCredentials.Email), new Claim(ClaimTypes.Name, loginCredentials.Email) };

                    var tokeOptions = new JwtSecurityToken(
                        issuer: "https://localhost:44378",
                        audience: "https://localhost:44378",
                        claims: claims,
                        expires: DateTime.Now.AddDays(60),
                        signingCredentials: signinCredentials
                    );

                    var tokenString = new JwtSecurityTokenHandler().WriteToken(tokeOptions);
                    return Ok(new { Token = tokenString });
                }
                else { return Unauthorized(); }
            }
            else { return BadRequest(ModelState); }
        }

        [HttpGet, Route("MyProfile"), Authorize]
        [Produces(typeof(QUsers))]
        public async Task<IActionResult> MyProfile()
        {
            if (!ModelState.IsValid) { return BadRequest(ModelState); }

            var UserData = await _context.QUsers.SingleOrDefaultAsync(m => m.Email == User.Identity.Name.ToString());

            if (UserData == null) { return NotFound(); }

            return Ok(UserData);
        }

        [HttpPut, Route("UpdateProfile"), Authorize]
        [Produces(typeof(QUsers))]
        public async Task<IActionResult> UpdateProfile([FromBody] QUsers user)
        {
            if (ModelState.IsValid)
            {
                var UserData = _context.QUsers.Where(em => em.Email == user.Email).FirstOrDefault();
                if (UserData != null)
                {
                    UserData.FirstName = user.FirstName;
                    UserData.LastName = user.LastName;
                    UserData.PasswordHash = PasswordHashing.Hash(user.PasswordHash);
                    await _context.SaveChangesAsync();
                    return Ok(user);
                }
                else { return NotFound(); }
            }
            else { return BadRequest(); }
        }

        private bool UserExists(string Email)
        {
            var User = _context.QUsers.Where(usr => usr.Email == Email).FirstOrDefault();
            if (User != null) { return true; } else { return false; }
        }

        private bool LoginDataCheck(LoginCredentials login)
        {
            bool CorrectData = false;
            var userExists = UserExists(login.Email);

            if (userExists)
            {
                var user = _context.QUsers.Where(usr => usr.Email == login.Email).FirstOrDefault();
                if (string.Compare(PasswordHashing.Hash(login.Password), user.PasswordHash) == 0) { CorrectData = true; }
            }
            else { CorrectData = false; }

            return CorrectData;
        }
    }
}