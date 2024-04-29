import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsComponent } from './products.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ProductService } from '../../services/product.service';
import { of, throwError } from 'rxjs';
import { Router, RouterModule } from '@angular/router';
import { RANDOMS, ROUTES } from '../../constanst.ts/generals';

describe('ProductsComponent', () => {
  let component: ProductsComponent;
  let productService: ProductService;
  let router: Router;
  let fixture: ComponentFixture<ProductsComponent>;
  const mockRouter = {
    navigate: jasmine.createSpy('navigate')
  };

  const mockProduct = {
    id: 'id',
    name: 'sss',
    description: 'description',
    logo: 'logo',
    date_release: 'sss',
    date_revision: 'sss',
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        { provide: Router, useValue: mockRouter }
      ],
      imports: [
        ProductsComponent,
        HttpClientTestingModule,
        RouterModule
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ProductsComponent);
    productService = TestBed.inject(ProductService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(() => {
    router = TestBed.inject(Router);
    fixture.detectChanges();
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should getProducts', async () => {
    spyOn(productService, 'getProducts').and.returnValue(of([mockProduct]));
    await component.getProducts();
    expect(component).toBeTruthy();
  });

  it('should getProducts throwError', async () => {
    spyOn(productService, 'getProducts').and.returnValue(throwError({ error: 404 }));
    await component.getProducts();
    expect(component.products).toEqual([]);
  });

  it('should goToManageProduct', () => {
    component.goToManageProduct();
    expect(router.navigate).toHaveBeenCalledWith([`/${ROUTES.manageProduct}/`]);
  });

  it('should searchProduct', () => {
    component.wordSearched = 's';
    component.productsBase = [mockProduct];
    component.searchProduct();
    expect(component.products.length).toBe(1);
  });

  it('should getQuantityProduct', () => {
    component.products = [mockProduct, mockProduct, mockProduct];
    const test = component.getQuantityProduct();
    expect(test).toBe(`${component.products.length} ${RANDOMS.results}`);
  });

  it('should edit', () => {
    const idProduct = '123';
    component.edit(idProduct);
    expect(router.navigate).toHaveBeenCalledWith([`/${ROUTES.manageProduct}/${idProduct}`]);
  });

  it('should delete', async () => {
    spyOn(productService, 'deleteProduct').and.returnValue(of({}));
    await component.delete('1');
  });
});
