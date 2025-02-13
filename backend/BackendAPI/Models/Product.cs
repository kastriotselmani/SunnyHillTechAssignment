using System.ComponentModel.DataAnnotations;

namespace BackendAPI.Models
{
    public class Product
    {
        public int Id { get; set; }

        [Required, MaxLength(200)]
        public string Name { get; set; } = string.Empty;

        [Required, Range(0.01, 1000000)]
        public decimal Price { get; set; }

        [Required, Range(0, int.MaxValue)]
        public int Quantity { get; set; }

        [Required]
        public string Status { get; set; } = "Active";  

        public string Category { get; set; } = string.Empty;  
    }
}
