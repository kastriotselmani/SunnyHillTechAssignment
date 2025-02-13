using BackendAPI.DTOs;
using BackendAPI.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BackendAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductsController : ControllerBase
    {
        private readonly IProductService _productService;

        public ProductsController(IProductService productService)
        {
            _productService = productService;
        }

        // GET: api/products
        [HttpGet]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetProducts()
        {
            var products = await _productService.GetAllProductsAsync();
            return Ok(products);
        }

        // GET: api/products/{id}
        [HttpGet("{id}")]
        [Authorize(Roles = "Admin,StandardUser")]
        public async Task<IActionResult> GetProduct(int id)
        {
            try
            {
                var product = await _productService.GetProductByIdAsync(id);
                return Ok(product);
            }
            catch (Exception ex)
            {
                return NotFound(new { message = ex.Message });
            }
        }

        // POST: api/products
        // Only Admins are allowed to add products
        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> AddProduct([FromBody] ProductDto productDto)
        {
            try
            {
                await _productService.AddProductAsync(productDto);
                return Ok(new { message = "Product added successfully." });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        // PUT: api/products/{id}
        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> UpdateProduct(int id, [FromBody] ProductDto productDto)
        {
            if (id != productDto.Id)
            {
                return BadRequest(new { message = "Product ID mismatch." });
            }
            try
            {
                await _productService.UpdateProductAsync(productDto);
                return Ok(new { message = "Product updated successfully." });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        // DELETE: api/products/{id}
        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            try
            {
                await _productService.DeleteProductAsync(id);
                return Ok(new { message = "Product deleted successfully." });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpGet("categories-count")]
        [Authorize(Roles = "Admin,StandardUser")] // Allow both Admin & StandardUser
        public async Task<IActionResult> GetProductCategoryCounts()
        {
            var categoryCounts = await _productService.GetProductCategoryCountsAsync();
            return Ok(categoryCounts);
        }



    }
}
