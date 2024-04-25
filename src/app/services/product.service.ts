import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PRODUCT, RESPONSE_SEARCH_PRODUCT_BY_ID } from '../interfaces/generals.interface';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  urlBase = 'https://tribu-ti-staffing-desarrollo-afangwbmcrhucqfh.z01.azurefd.net/ipf-msa-productosfinancieros/bp/products';
  constructor(private http: HttpClient) { }

  getProducts() {
    let headers = new HttpHeaders();
    headers = headers.append('authorId', '75164573');
    return this.http.get<PRODUCT[]>(`${this.urlBase}`, { headers });
  }

  async getProductById(idProduct: string) {
    let headers = new HttpHeaders();
    headers = headers.append('authorId', '75164573');
    const existProduct: boolean = await firstValueFrom(this.http.get<boolean>(`${this.urlBase}/verification?id=${idProduct}`, { headers }));
    if (!existProduct) {
      return { status: false };
    }
    const products = await firstValueFrom(this.http.get<PRODUCT[]>(`${this.urlBase}`, { headers }));
    products.find(product => product.id === idProduct);
    return { ...products[0], status: true };

  }

}
