import { Product } from 'src/app/shared/models/product';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environment/environment';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private readonly env: string = environment.apiUrl;
  product = new Subject<Product>();

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.env + `products`);
  }
  sort(type: any): Observable<Product[]> {
    return this.http.get<Product[]>(this.env + `products?sort=${type}`);
  }
  getCategories() {
    return this.http.get(this.env + `products/categories`);
  }
  getCategory(cat: any) {
    return this.http.get(this.env + `products/category/${cat}`);
  }
}
