using BackendAPI.DTOs;

namespace BackendAPI.Services
{
    public interface IProductService
    {
        Task<IEnumerable<ProductDto>> GetAllProductsAsync();
        Task<ProductDto> GetProductByIdAsync(int id);
        Task AddProductAsync(ProductDto productDto);
        Task UpdateProductAsync(ProductDto productDto);
        Task DeleteProductAsync(int id);

        Task<List<ProductCategoryCountDto>> GetProductCategoryCountsAsync();

    }
}
