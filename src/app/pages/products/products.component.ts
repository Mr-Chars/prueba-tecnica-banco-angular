import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { PRODUCT } from '../../interfaces/generals.interface';
import { ProductService } from '../../services/product.service';
import { firstValueFrom } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule,],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {
  products: Array<PRODUCT> = [];

  constructor(
    public readonly productService: ProductService,
    public router: Router,
  ) { }

  ngOnInit(): void {
    this.getProducts();
  }

  goToManageProduct() {
    this.router.navigate(['/manage-product/']);
  }

  async getProducts(where = '') {
    try {
      this.products = await firstValueFrom(this.productService.getProducts());
    } catch (error) {
      this.products = [];
    }
  }

  getQuantityProduct() {
    return this.products.length;
  }
}
