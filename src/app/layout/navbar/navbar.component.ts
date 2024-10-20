import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/shared/models/product';
import { ProductsService } from 'src/app/shared/services/products.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  item!: Product;
  constructor(private product: ProductsService) {}
  ngOnInit(): void {
    this.product.product.subscribe((i) => {
      console.log(i);
      this.item = i;
    });
  }
}
