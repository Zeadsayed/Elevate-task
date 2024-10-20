import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Product } from 'src/app/shared/models/product';
import { MessagesService } from 'src/app/shared/services/message.service';
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
  categories!: any;
  selectedCat = 'All Products';
  limit: number = 6; // Products per page
  totalPages: number = 0;
  constructor(
    private product: ProductsService,
    private spinner: NgxSpinnerService,
    private messages: MessagesService
  ) {}
  ngOnInit(): void {
    this.loadProducts();
    this.getAllCategories();
  }
  // get all products
  loadProducts() {
    this.spinner.show();
    this.product.getProducts().subscribe(
      (res) => {
        if (res) {
          this.spinner.hide();
          this.messages.toast(`data is loaded successfully`, 'success');
        }
        this.products = res;
        this.totalPages = Math.ceil(this.products.length / this.limit);

        this.updateDisplayedProducts();
      },
      (error) => {
        this.spinner.hide();
        this.messages.toast(`Failed to load data`, 'error');
      }
    );
  }

  getAllCategories() {
    this.product.getCategories().subscribe((res) => {
      this.categories = res;
    });
  }

  getCat(e: Event) {
    this.spinner.show();
    const cat = (e.target as HTMLSelectElement).value;
    if (cat === 'all') this.loadProducts();
    else {
      console.log(cat);
      this.product.getCategory(cat).subscribe((res) => {
        this.spinner.hide();
        this.products = res as Product[];
        this.updateDisplayedProducts();
      });
    }
  }

  // sort product by desc or asc
  sorting(type: string) {
    this.spinner.show();
    this.product.sort(type).subscribe((res) => {
      this.spinner.hide();
      this.products = res;
      this.updateDisplayedProducts();
    });
  }

  updateDisplayedProducts(): void {
    const startIndex = (this.currentPage - 1) * this.limit;
    const endIndex = startIndex + this.limit;
    this.displayedProducts = this.products.slice(startIndex, endIndex);
  }

  // Go to the next page
  nextPage(): void {
    this.spinner.show();
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updateDisplayedProducts();
      this.spinner.hide();
      window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth',
      });
    }
  }

  // Go to the previous page
  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateDisplayedProducts();
      window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth',
      });
    }
  }

  getStars(rate: number): number[] {
    const stars = Math.floor(rate);
    return Array(stars).fill(0);
  }

  addToCart(item: Product) {
    this.messages.toast(`product ${item.title} is added to cart`, 'success');
    this.product.product.next(item);
  }
}
