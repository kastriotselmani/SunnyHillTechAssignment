using BackendAPI.Data;
using BackendAPI.DTOs;
using BackendAPI.Helpers;
using BackendAPI.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace BackendAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;
        private readonly ILogger<AuthController> _logger;
        private readonly AppDbContext _context;
        private readonly IJwtHelper _jwtHelper;
        private readonly IPasswordHasher _passwordHasher;


        public AuthController(
            IAuthService authService,
            AppDbContext context,
            IJwtHelper jwtHelper,
            IPasswordHasher passwordHasher,
            ILogger<AuthController> logger)
        {
            _authService = authService;
            _context = context;
            _jwtHelper = jwtHelper;
            _passwordHasher = passwordHasher;
            _logger = logger;
        }

        // POST: api/auth/register
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDto registerDto)
        {
            try
            {
                var userDto = await _authService.RegisterUserAsync(registerDto);
                return Ok(userDto);
            }
            catch (Exception ex)
            {
                // You may log the exception here
                return BadRequest(new { message = ex.Message });
            }
        }

        // POST: api/auth/login
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto loginDto)
        {
            try
            {
                var userDto = await _authService.LoginUserAsync(loginDto);
                if (userDto == null)
                {
                    // Invalid credentials: return a 401 Unauthorized
                    return Unauthorized(new { message = "Invalid email or password." });
                }
                return Ok(userDto);
            }
            catch (Exception ex)
            {
                // Optionally log the exception for debugging
                _logger.LogError(ex, "Error during login for email: {Email}", loginDto.Email);
                return StatusCode(500, new { message = "An error occurred during login. Please try again later." });
            }
        }

        // POST: api/auth/refresh-token
        [HttpPost("refresh-token")]
        public async Task<IActionResult> RefreshToken([FromBody] RefreshTokenDto refreshTokenDto)
        {
            try
            {
                var userDto = await _authService.RefreshTokenAsync(refreshTokenDto);
                if (userDto == null)
                {
                    return Unauthorized(new { message = "Invalid refresh token." });
                }
                return Ok(new { token = userDto.Token, refreshToken = refreshTokenDto.RefreshToken });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }


        // PUT: api/auth/profile
        [Authorize]
        [HttpPut("profile")]
        public async Task<IActionResult> UpdateProfile([FromBody] UpdateUserDto updateDto)
        {
            try
            {
                // Retrieve the current user's email from the token claims
                var userEmail = User.FindFirst(ClaimTypes.Name)?.Value;
                if (string.IsNullOrEmpty(userEmail))
                {
                    return Unauthorized(new { message = "User not authenticated." });
                }

                // Retrieve the user from the database
                var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == userEmail);
                if (user == null)
                {
                    return NotFound(new { message = "User not found." });
                }

                // Update basic details
                user.Name = updateDto.Name;
                user.Email = updateDto.Email;

                // If a new password is provided, validate the current password and confirmation
                if (!string.IsNullOrEmpty(updateDto.NewPassword))
                {
                    if (string.IsNullOrEmpty(updateDto.CurrentPassword) ||
                        !_passwordHasher.VerifyPassword(user.PasswordHash, updateDto.CurrentPassword))
                    {
                        return BadRequest(new { message = "Current password is incorrect." });
                    }

                    if (updateDto.NewPassword != updateDto.ConfirmPassword)
                    {
                        return BadRequest(new { message = "New password and confirmation do not match." });
                    }

                    user.PasswordHash = _passwordHasher.HashPassword(updateDto.NewPassword);
                }

                await _context.SaveChangesAsync();

                // Optionally, generate a new token (especially if email changed)
                var token = _jwtHelper.GenerateToken(user);

                return Ok(new UserDto
                {
                    Email = user.Email,
                    Name = user.Name,
                    Role = user.Role,
                    LastLogin = user.LastLogin,
                    Token = token
                });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error updating profile for user {Email}", updateDto.Email);
                return StatusCode(500, new { message = "An error occurred while updating the profile. Please try again later." });
            }
        }

        // Optionally add logout if needed (though with JWT, logout is usually handled client-side)
        [HttpPost("logout")]
        public IActionResult Logout()
        {
            _authService.Logout();
            return Ok(new { message = "Logged out successfully." });
        }
    }
}
