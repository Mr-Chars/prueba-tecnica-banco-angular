import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PRODUCT } from '../interfaces/generals.interface';
import { firstValueFrom } from 'rxjs';
import { URLS } from '../constanst.ts/generals';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private http: HttpClient) { }

  deleteProduct(idProduct: string) {
    return this.http.delete(`${URLS.main_product}?id=${idProduct}`);
  }

  updateProduct(body: PRODUCT) {
    return this.http.put(URLS.main_product, body);
  }

  addProduct(body: PRODUCT) {
    return this.http.post(URLS.main_product, body);
  }

  checkIfExistProductById(idProduct: string) {
    return this.http.get<boolean>(`${URLS.main_product}/verification?id=${idProduct}`);
  }

  getProducts() {
    return this.http.get<PRODUCT[]>(`${URLS.main_product}`);
  }

  verification(idProduct: string) {
    return this.http.get<boolean>(`${URLS.main_product}/verification?id=${idProduct}`);
  }

  async getProductById(idProduct: string) {
    const existProduct: boolean = await firstValueFrom(this.verification(idProduct));
    if (!existProduct) {
      return { status: false };
    }
    const products = await firstValueFrom(this.getProducts());
    const productSearched = products.find(product => product.id === idProduct);

    return { ...productSearched, status: true };
  }

}
