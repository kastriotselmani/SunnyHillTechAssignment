using BackendAPI.DTOs;
using BackendAPI.Models;

namespace BackendAPI.Repositories.Interfaces
{
    public interface IProductRepository
    {
        Task<IEnumerable<Product>> GetAllProductsAsync();
        Task<Product> GetProductByIdAsync(int id);
        Task AddProductAsync(Product product);
        Task UpdateProductAsync(Product product);
        Task DeleteProductAsync(Product product);
        Task<List<ProductCategoryCountDto>> GetProductCategoryCountsAsync();

    }
}
