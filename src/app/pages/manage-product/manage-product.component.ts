import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PRODUCT, RESPONSE_SEARCH_PRODUCT_BY_ID } from '../../interfaces/generals.interface';
import { firstValueFrom } from 'rxjs';
import { ProductService } from '../../services/product.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DisplayErrorsValidationInputComponent } from '../../pluggins/display-errors-validation-input/display-errors-validation-input.component';

@Component({
  selector: 'app-manage-product',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    DisplayErrorsValidationInputComponent
  ],
  templateUrl: './manage-product.component.html',
  styleUrl: './manage-product.component.css'
})
export class ManageProductComponent {
  idProduct: string;
  isIdProductValid = true;

  productForm = new FormGroup({
    id: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z ]{3,10}$/)]),
    name: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z ]{5,100}$/)]),
    description: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z ]{10,200}$/)]),
    logo: new FormControl('', [Validators.required]),
    date_release: new FormControl(new Date().toISOString().split('T')[0], [Validators.required]),
    date_revision: new FormControl('', [Validators.required]),
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

  resetForm() {

  }

  async getProduct() {
    const productSearched: RESPONSE_SEARCH_PRODUCT_BY_ID = await this.productService.getProductById(this.idProduct);
    if (productSearched.status) {

    }
  }

  async checkIfIdExist() {
    this.isIdProductValid = false;
    try {
      const existId = await firstValueFrom(this.productService.checkIfExistProductById(this.productForm.value.id!));
      console.log(existId);

      if (!existId) {
        this.isIdProductValid = true;
      }
    } catch (error) {
    }
  }

  async save() {
    const PRODUCT: PRODUCT = {
      id: this.productForm.value.id!,
      name: this.productForm?.value?.name!,
      description: this.productForm?.value?.description!,
      logo: this.productForm?.value?.logo!,
      date_release: this.productForm?.value?.date_release!,
      date_revision: this.productForm?.value?.date_revision!,
    };
    console.log(PRODUCT);

    try {
      const postProduct = await firstValueFrom(this.productService.addProduct(PRODUCT));
      console.log(postProduct);

    } catch (error) {

    }
  }

}
