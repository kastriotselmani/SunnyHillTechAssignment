using BackendAPI.DTOs;
using BackendAPI.Models;
using BackendAPI.Repositories.Interfaces;

namespace BackendAPI.Services
{
    public class ProductService : IProductService
    {
        private readonly IProductRepository _productRepository;

        public ProductService(IProductRepository productRepository)
        {
            _productRepository = productRepository;
        }

        public async Task<IEnumerable<ProductDto>> GetAllProductsAsync()
        {
            var products = await _productRepository.GetAllProductsAsync();
            return products.Select(p => new ProductDto
            {
                Id = p.Id,
                Name = p.Name,
                Price = p.Price,
                Quantity = p.Quantity,
                Status = p.Status,
                Category = p.Category
            });
        }

        public async Task<ProductDto> GetProductByIdAsync(int id)
        {
            var product = await _productRepository.GetProductByIdAsync(id);
            if (product == null)
                throw new Exception("Product not found.");

            return new ProductDto
            {
                Id = product.Id,
                Name = product.Name,
                Price = product.Price,
                Quantity = product.Quantity,
                Status = product.Status,
                Category = product.Category
            };
        }

        public async Task AddProductAsync(ProductDto productDto)
        {
            var product = new Product
            {
                Name = productDto.Name,
                Price = productDto.Price,
                Quantity = productDto.Quantity,
                Status = productDto.Status,
                Category = productDto.Category
            };
            await _productRepository.AddProductAsync(product);
        }

        public async Task UpdateProductAsync(ProductDto productDto)
        {
            var product = await _productRepository.GetProductByIdAsync(productDto.Id);
            if (product == null)
                throw new Exception("Product not found.");

            product.Name = productDto.Name;
            product.Price = productDto.Price;
            product.Quantity = productDto.Quantity;
            product.Status = productDto.Status;
            product.Category = productDto.Category;

            await _productRepository.UpdateProductAsync(product);
        }

        public async Task DeleteProductAsync(int id)
        {
            var product = await _productRepository.GetProductByIdAsync(id);
            if (product == null)
                throw new Exception("Product not found.");

            await _productRepository.DeleteProductAsync(product);
        }

        public async Task<List<ProductCategoryCountDto>> GetProductCategoryCountsAsync()
        {
            return await _productRepository.GetProductCategoryCountsAsync();
        }
    }
}
