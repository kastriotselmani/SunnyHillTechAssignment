import { Component, AfterViewInit, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ProductDto } from '../../../models/product.dto';
import { MatSort } from '@angular/material/sort';
import { ProductService } from '../../../services/product.service';
import { MatDialog } from '@angular/material/dialog';
import { ProductFormComponent } from '../product-form/product-form.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
  standalone: false
})
export class ListComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['name', 'price', 'quantity', 'status', 'category', 'actions'];
  dataSource = new MatTableDataSource<ProductDto>();
  errorMessage: string | null = null;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private productService: ProductService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.fetchProducts();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  fetchProducts(): void {
    this.productService.getProducts().subscribe({
      next: (products) => {
        this.dataSource.data = products;
        this.errorMessage = null; // clear error if successful
      },
      error: (error) => {
        console.error('Error fetching products', error);
        if (error.status === 403) {
          this.errorMessage = 'Only admin users have access to products.';
        } else {
          this.errorMessage = 'Error loading products. Please try again later.';
        }
      }
    });
  }
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onEdit(product: ProductDto): void {
    const dialogRef = this.dialog.open(ProductFormComponent, {
      width: '400px',
      data: product
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.productService.updateProduct(result).subscribe({
          next: () => {
            this.fetchProducts(); // Refresh list after update
          },
          error: (err) => {
            console.error('Error updating product', err);
          }
        });
      }
    });
  }

  onDelete(product: ProductDto): void {
    if (product.id !== undefined) {
      if (confirm(`Are you sure you want to delete ${product.name}?`)) {
        this.productService.deleteProduct(product.id).subscribe({
          next: () => {
            this.fetchProducts(); // Refresh list after deletion
          },
          error: (err) => {
            console.error('Error deleting product', err);
          }
        });
      }
    } else {
      console.error('Product ID is missing, cannot delete product.');
    }
  }

  onAdd(): void {
    const dialogRef = this.dialog.open(ProductFormComponent, {
      width: '400px',
      data: null
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.productService.addProduct(result).subscribe({
          next: () => {
            this.fetchProducts(); // Refresh list after adding
          },
          error: (err) => {
            console.error('Error adding product', err);
          }
        });
      }
    });
  }

  // Role-based check: Only Admin users see Edit/Delete actions.
  get isAdmin(): boolean {
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    return user?.role === 'Admin';
  }
}