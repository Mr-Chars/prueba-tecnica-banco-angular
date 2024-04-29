import { TestBed } from '@angular/core/testing';

import { ProductService } from './product.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { of } from 'rxjs';

describe('ProductService', () => {
  let service: ProductService;
  let httpMock: HttpTestingController;

  const mockProduct = {
    id: 'id',
    name: 'sss',
    description: 'description',
    logo: 'logo',
    date_release: 'sss',
    date_revision: 'sss',
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ]
    });
    service = TestBed.inject(ProductService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be deleteProduct', () => {
    service.deleteProduct('abc').subscribe();
    const mockReq = httpMock.expectOne({ method: 'DELETE' });
    expect(mockReq.request.method).toBe('DELETE');
  });

  it('should be updateProduct', () => {
    service.updateProduct(mockProduct).subscribe();
    const mockReq = httpMock.expectOne({ method: 'PUT' });
    expect(mockReq.request.method).toBe('PUT');
  });

  it('should be addProduct', () => {
    service.addProduct(mockProduct).subscribe();
    const mockReq = httpMock.expectOne({ method: 'POST' });
    expect(mockReq.request.method).toBe('POST');
  });

  it('should be checkIfExistProductById', () => {
    service.checkIfExistProductById('123').subscribe();
    const mockReq = httpMock.expectOne({ method: 'GET' });
    expect(mockReq.request.method).toBe('GET');
  });

  it('should be getProductById', async () => {
    spyOn(service, 'verification').and.returnValue(of(false));
    const mockSearch = await service.getProductById('123');
    expect(mockSearch).toEqual({ status: false });
  });

  it('should be getProductById true', async () => {
    spyOn(service, 'verification').and.returnValue(of(true));
    spyOn(service, 'getProducts').and.returnValue(of([mockProduct]));
    const mockSearch = await service.getProductById('id');
    expect(mockSearch).toEqual({ status: true, ...mockProduct });
  });
});
