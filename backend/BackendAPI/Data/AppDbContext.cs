using BackendAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace BackendAPI.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }
        public DbSet<Product> Products { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>()
                .HasIndex(u => u.Email)
                .IsUnique(); // Ensure unique emails

            modelBuilder.Entity<Product>()
                .Property(p => p.Price)
                .HasPrecision(18, 4);

            base.OnModelCreating(modelBuilder);
        }
    }
}
