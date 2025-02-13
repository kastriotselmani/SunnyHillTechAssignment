import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ProductDto } from '../models/product.dto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = environment.apiUrl + '/products';

  constructor(private http: HttpClient) { }

  getProducts(): Observable<ProductDto[]> {
    return this.http.get<ProductDto[]>(`${this.apiUrl}`);
  }

  addProduct(product: ProductDto): Observable<ProductDto> {
    return this.http.post<ProductDto>(`${this.apiUrl}`, product);
  }

  updateProduct(product: ProductDto): Observable<ProductDto> {
    return this.http.put<ProductDto>(`${this.apiUrl}/${product.id}`, product);
  }

  deleteProduct(productId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${productId}`);
  }
}