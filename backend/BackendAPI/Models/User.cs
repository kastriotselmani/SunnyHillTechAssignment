using System.ComponentModel.DataAnnotations;

namespace BackendAPI.Models
{
    public class User
    {
        public int Id { get; set; }

        [Required, MaxLength(100)]
        public string Name { get; set; } 

        [Required, EmailAddress]
        public string Email { get; set; } 

        [Required]
        public string PasswordHash { get; set; } = string.Empty; 

        [Required]
        public string Role { get; set; } = "Standard"; 

        public DateTime LastLogin { get; set; } = DateTime.UtcNow;
        public string RefreshToken { get; set; } = string.Empty;  

    }
}
