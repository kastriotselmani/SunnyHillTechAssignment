using BackendAPI.Data;
using BackendAPI.DTOs;
using BackendAPI.Models;
using BackendAPI.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace BackendAPI.Repositories.Implementation
{
    public class ProductRepository : IProductRepository
    {
        private readonly AppDbContext _context;
        public ProductRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Product>> GetAllProductsAsync()
        {
            return await _context.Products.ToListAsync();
        }

        public async Task<Product> GetProductByIdAsync(int id)
        {
            return await _context.Products.FindAsync(id);
        }

        public async Task AddProductAsync(Product product)
        {
            await _context.Products.AddAsync(product);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateProductAsync(Product product)
        {
            _context.Products.Update(product);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteProductAsync(Product product)
        {
            _context.Products.Remove(product);
            await _context.SaveChangesAsync();
        }

        public async Task<List<ProductCategoryCountDto>> GetProductCategoryCountsAsync()
        {
            return await _context.Products
                .GroupBy(p => p.Category)
                .Select(g => new ProductCategoryCountDto
                {
                    Category = g.Key,
                    Count = g.Count()
                })
                .ToListAsync();
        }
    }
}
