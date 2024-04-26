import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageProductComponent } from './manage-product.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from "@angular/router/testing";
import { ProductService } from '../../services/product.service';
import { of } from 'rxjs';

describe('ManageProductComponent', () => {
  let component: ManageProductComponent;
  let fixture: ComponentFixture<ManageProductComponent>;
  let productService: ProductService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ManageProductComponent,
        HttpClientTestingModule,
        RouterTestingModule
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ManageProductComponent);
    productService = TestBed.inject(ProductService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should getProduct', () => {
    component.getProduct();

  });

  it('should checkIfIdExist', async () => {
    spyOn(productService, 'checkIfExistProductById').and.returnValue(of(false));
    component.productForm.controls['id'].setValue('abcde');
    await component.checkIfIdExist();
    expect(component.isIdProductValid).toBeTruthy();
  });

  it('should getProduct', async () => {
    spyOn(productService, 'getProductById').and.returnValue(Promise.resolve({
      status: true,
      name: 'product 2',
      date_release: '2024-02-06',
      date_revision: '2024-02-06',
    }));
    await component.getProduct();
    expect(component.productForm.value.name).toBe('product 2');
  });
});
