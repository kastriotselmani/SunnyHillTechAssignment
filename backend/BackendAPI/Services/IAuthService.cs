using BackendAPI.DTOs;
using BackendAPI.Models;

namespace BackendAPI.Services
{
    public interface IAuthService
    {
        Task<UserDto> RegisterUserAsync(RegisterDto registerDto);
        Task<UserDto> LoginUserAsync(LoginDto loginDto);
        Task<UserDto> RefreshTokenAsync(RefreshTokenDto refreshTokenDto);
        void Logout();
    }
}
