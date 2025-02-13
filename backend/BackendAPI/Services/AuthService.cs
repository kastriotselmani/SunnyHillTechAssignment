using BackendAPI.Data;
using BackendAPI.DTOs;
using BackendAPI.Helpers;
using BackendAPI.Models;
using Microsoft.EntityFrameworkCore;


namespace BackendAPI.Services
{
    public class AuthService : IAuthService

    {
        private readonly AppDbContext _context;
        private readonly IConfiguration _configuration;
        private readonly IJwtHelper _jwtHelper;
        private readonly IPasswordHasher _passwordHasher;

        public AuthService(AppDbContext context,
                           IConfiguration configuration,
                           IJwtHelper jwtHelper,
                           IPasswordHasher passwordHasher)
        {
            _context = context;
            _configuration = configuration;
            _jwtHelper = jwtHelper;
            _passwordHasher = passwordHasher;
        }

        public async Task<UserDto> RegisterUserAsync(RegisterDto registerDto)
        {
            var existingUser = await _context.Users.FirstOrDefaultAsync(u => u.Email == registerDto.Email);
            if (existingUser != null)
            {
                throw new Exception("Email is already registered.");
            }

            var newUser = new User
            {
                Email = registerDto.Email,
                Name = registerDto.Name,
                PasswordHash = _passwordHasher.HashPassword(registerDto.Password),
                Role = "StandardUser",
                LastLogin = DateTime.UtcNow
            };

            await _context.Users.AddAsync(newUser);
            await _context.SaveChangesAsync();

            var token = _jwtHelper.GenerateToken(newUser);

            return new UserDto
            {
                Email = newUser.Email,
                Name = newUser.Name,
                Role = newUser.Role,
                LastLogin = newUser.LastLogin,
                Token = token
            };
        }

        // Note the nullable return type
        public async Task<UserDto?> LoginUserAsync(LoginDto loginDto)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == loginDto.Email);
            if (user == null || !_passwordHasher.VerifyPassword(user.PasswordHash, loginDto.Password))
            {
                return null;
            }

            user.LastLogin = DateTime.UtcNow;
            await _context.SaveChangesAsync();

            var token = _jwtHelper.GenerateToken(user);

            return new UserDto
            {
                Email = user.Email,
                Name = user.Name,
                Role = user.Role,
                LastLogin = user.LastLogin,
                Token = token
            };
        }

        public async Task<UserDto?> RefreshTokenAsync(RefreshTokenDto refreshTokenDto)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.RefreshToken == refreshTokenDto.RefreshToken);
            if (user == null)
            {
                return null;
            }

            var token = _jwtHelper.GenerateToken(user);

            return new UserDto
            {
                Email = user.Email,
                Name = user.Name,
                Role = user.Role,
                LastLogin = user.LastLogin,
                Token = token
            };
        }

        public void Logout()
        {
            // For token-based authentication, the logout logic is typically handled client-side
            // (by removing the token). Optionally, you can implement token revocation here.
        }
    }
}
