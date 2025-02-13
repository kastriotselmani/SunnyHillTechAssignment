namespace BackendAPI.DTOs
{
    public class UserDto
    {
        public string Email { get; set; }
        public string Name { get; set; }
        public string Role { get; set; }
        public DateTime LastLogin { get; set; }
        public string Token { get; set; }
    }
}
