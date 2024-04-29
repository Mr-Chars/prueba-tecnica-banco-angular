import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PRODUCT } from '../../interfaces/generals.interface';
import { ProductService } from '../../services/product.service';
import { firstValueFrom } from 'rxjs';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { COLORS, MESSAGES, RANDOMS, ROUTES } from '../../constanst.ts/generals';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {
  productsBase: Array<PRODUCT> = [];
  products: Array<PRODUCT> = [];

  wordSearched = '';
  paginationQuantity = 5;
  constructor(
    public readonly productService: ProductService,
    public router: Router,
  ) { }

  ngOnInit(): void {
    this.getProducts();
  }

  goToManageProduct() {
    this.router.navigate([`/${ROUTES.manageProduct}/`]);
  }

  searchProduct() {
    const result = this.productsBase.filter((product) => product.name.includes(this.wordSearched));
    this.products = result.slice(0, this.paginationQuantity);
  }

  async getProducts() {
    try {
      this.productsBase = await firstValueFrom(this.productService.getProducts());
      this.searchProduct();
    } catch (error) {
      this.products = [];
    }
  }

  getQuantityProduct() {
    let word = RANDOMS.result;
    if (this.products.length > 1) {
      word = RANDOMS.results;
    }
    return `${this.products.length} ${word}`;
  }

  edit(idProduct: string) {
    this.router.navigate([`/${ROUTES.manageProduct}/${idProduct}`]);
  }

  async delete(idProduct: string) {
    swal.fire({
      title: ' ',
      text: `${MESSAGES.deletingProduct} ${idProduct}`,
      showCancelButton: true,
      confirmButtonColor: COLORS.yellow_1,
      cancelButtonColor: COLORS.gray_1,
      confirmButtonText: RANDOMS.confirm
    }).then(async (result) => {

      if (result.value) {
        try {
          await firstValueFrom(this.productService.deleteProduct(idProduct));
        } catch (error) {
        } finally {
          this.getProducts();
        }
      }
    });
  }
}
