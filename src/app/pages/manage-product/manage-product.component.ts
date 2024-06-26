import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PRODUCT, RESPONSE_SEARCH_PRODUCT_BY_ID } from '../../interfaces/generals.interface';
import { firstValueFrom } from 'rxjs';
import { ProductService } from '../../services/product.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DisplayErrorsValidationInputComponent } from '../../pluggins/display-errors-validation-input/display-errors-validation-input.component';
import swal from 'sweetalert2';
import { MESSAGES, REGEXS_CODES, ROUTES } from '../../constanst.ts/generals';
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
  lastDateRelease = new Date().toISOString().split('T')[0];

  productForm = new FormGroup({
    id: new FormControl('', [Validators.required, Validators.pattern(REGEXS_CODES.id)]),
    name: new FormControl('', [Validators.required, Validators.pattern(REGEXS_CODES.name)]),
    description: new FormControl('', [Validators.required, Validators.pattern(REGEXS_CODES.description)]),
    logo: new FormControl('', [Validators.required]),
    date_release: new FormControl(new Date().toISOString().split('T')[0], [Validators.required]),
    date_revision: new FormControl('', [Validators.required]),
  });
  constructor(
    public readonly productService: ProductService,
    public readonly activatedRoute: ActivatedRoute,
    public router: Router,
  ) {
    activatedRoute.params.subscribe((params: any) => {
      if (params.id) {
        this.productForm.controls.id.disable();
        this.idProduct = params.id;
      }
    });
  }

  ngOnInit(): void {
    if (this.idProduct) {
      this.getProduct();
    } else {
      const aYearFrom = new Date();
      aYearFrom.setFullYear(aYearFrom.getFullYear() + 1);
      this.productForm.controls['date_revision'].setValue(aYearFrom.toISOString().split('T')[0]);
    }
  }

  isDateBeforeToday(date: Date) {
    if (date.toISOString().split('T')[0] === new Date().toISOString().split('T')[0]) {
      return false;
    }
    return new Date(date.toISOString()) < new Date(new Date().toISOString());
  }

  checkDateRelease() {
    const date_release = this.productForm?.value?.date_release!;
    const aYearFrom = new Date(date_release);
    if (this.isDateBeforeToday(aYearFrom)) {
      this.productForm.controls['date_release'].setValue(this.lastDateRelease);
    } else {
      this.lastDateRelease = date_release;
      aYearFrom.setFullYear(aYearFrom.getFullYear() + 1);
      this.productForm.controls['date_revision'].setValue(aYearFrom.toISOString().split('T')[0]);
    }
  }

  resetForm() {
    this.productForm.reset();
    this.productForm.controls['date_release'].setValue(new Date().toISOString().split('T')[0]);
    this.lastDateRelease = new Date().toISOString().split('T')[0];
  }

  async getProduct() {
    const productSearched: RESPONSE_SEARCH_PRODUCT_BY_ID = await this.productService.getProductById(this.idProduct);
    if (productSearched.status) {
      this.productForm.controls['id'].setValue(productSearched.id!);
      this.productForm.controls['name'].setValue(productSearched.name!);
      this.productForm.controls['description'].setValue(productSearched.description!);
      this.productForm.controls['logo'].setValue(productSearched.logo!);
      this.productForm.controls['date_release'].setValue(productSearched.date_release!.slice(0, 10));
      this.productForm.controls['date_revision'].setValue(productSearched.date_revision!.slice(0, 10));
      this.lastDateRelease = productSearched.date_release!.slice(0, 10);
    }
  }

  async checkIfIdExist() {
    if (this.productForm.value.id?.length! < 3) {
      return;
    }
    this.isIdProductValid = false;
    try {
      const existId = await firstValueFrom(this.productService.checkIfExistProductById(this.productForm.value.id!));
      if (!existId) {
        this.isIdProductValid = true;
      }
    } catch (error) {
    }
  }

  async save() {
    const PRODUCT: PRODUCT = {
      id: this.productForm.value.id! || this.idProduct,
      name: this.productForm?.value?.name!,
      description: this.productForm?.value?.description!,
      logo: this.productForm?.value?.logo!,
      date_release: this.productForm?.value?.date_release!,
      date_revision: this.productForm?.value?.date_revision!,
    };

    try {
      this.resetForm();
      if (this.idProduct) {
        await firstValueFrom(this.productService.updateProduct(PRODUCT));
      } else {
        await firstValueFrom(this.productService.addProduct(PRODUCT));
      }
      swal.fire({
        position: 'top-end',
        icon: 'success',
        title: MESSAGES.successSaveProduct,
        showConfirmButton: false,
        timer: 1500
      });
      setTimeout(() => {
        this.router.navigate([`/${ROUTES.products}`]);
      }, 1600);
    } catch (error) {

    }
  }

}
