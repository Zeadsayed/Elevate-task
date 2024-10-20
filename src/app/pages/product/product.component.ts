import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Product } from 'src/app/shared/models/product';
import { ProductsService } from 'src/app/shared/services/products.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  products: Product[] = [];
  displayedProducts: Product[] = [];
  currentPage: number = 1;
  limit: number = 6; // Products per page
  totalPages: number = 0;
  constructor(
    private product: ProductsService,
    private spinner: NgxSpinnerService
  ) {}
  ngOnInit(): void {
    this.spinner.show();
    this.loadProducts();
  }
  loadProducts() {
    this.product.getProducts().subscribe(
      (res) => {
        if (res) this.spinner.hide();
        this.products = res;
        this.totalPages = Math.ceil(this.products.length / this.limit);
        console.log(this.totalPages);

        this.updateDisplayedProducts();
      },
      (error) => console.error('Error fetching products:', error)
    );
  }

  updateDisplayedProducts(): void {
    const startIndex = (this.currentPage - 1) * this.limit;
    const endIndex = startIndex + this.limit;
    this.displayedProducts = this.products.slice(startIndex, endIndex);
    console.log(this.displayedProducts);
  }

  // Go to the next page
  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updateDisplayedProducts();
    }
  }

  // Go to the previous page
  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateDisplayedProducts();
    }
  }

  getStars(rate: number): number[] {
    const stars = Math.floor(rate);
    return Array(stars).fill(0);
  }
}
