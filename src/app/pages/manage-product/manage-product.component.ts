import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PRODUCT, RESPONSE_SEARCH_PRODUCT_BY_ID } from '../../interfaces/generals.interface';
import { firstValueFrom } from 'rxjs';
import { ProductService } from '../../services/product.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-manage-product',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule,],
  templateUrl: './manage-product.component.html',
  styleUrl: './manage-product.component.css'
})
export class ManageProductComponent {
  idProduct: string;

  productForm = new FormGroup({
    id: new FormControl('', []),
    name: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z ]{1,30}$/)]),
    description: new FormControl('', [Validators.required,]),
    logo: new FormControl('', []),
    date_release: new FormControl('', []),
    date_revision: new FormControl('', []),
  });
  constructor(
    public readonly productService: ProductService,
    public readonly activatedRoute: ActivatedRoute,
  ) {
    activatedRoute.params.subscribe((params: any) => {
      if (params.id) {
        this.idProduct = params.id;
      }
    });
  }

  ngOnInit(): void {
    if (this.idProduct) {
      this.getProduct();
    }
  }

  async getProduct() {
    const productSearched: RESPONSE_SEARCH_PRODUCT_BY_ID = await this.productService.getProductById(this.idProduct);
    if (!productSearched.status) {

    }
  }

  async save() {

  }

}
