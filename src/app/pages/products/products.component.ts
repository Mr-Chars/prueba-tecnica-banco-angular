import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PRODUCT } from '../../interfaces/generals.interface';
import { ProductService } from '../../services/product.service';
import { firstValueFrom } from 'rxjs';
import { Router } from '@angular/router';
import swal from 'sweetalert2';

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

  searchProduct() {
    const result = this.productsBase.filter((product) => product.name.includes(this.wordSearched));
    this.products = result;
  }

  async getProducts() {
    try {
      this.products = await firstValueFrom(this.productService.getProducts());
      this.productsBase = this.products;
    } catch (error) {
      this.products = [];
    }
  }

  getQuantityProduct() {
    return this.products.length;
  }

  edit(idProduct: string) {
    this.router.navigate([`/manage-product/${idProduct}`]);
  }

  async delete(idProduct: string) {
    swal.fire({
      title: ' ',
      text: `Estas seguro de eliminar el producto ${idProduct}`,
      showCancelButton: true,
      confirmButtonColor: '#F5DF66',
      cancelButtonColor: '#EAECF2',
      confirmButtonText: 'Confirmar'
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
