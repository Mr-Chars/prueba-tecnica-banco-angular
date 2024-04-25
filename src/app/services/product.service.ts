import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PRODUCT } from '../interfaces/generals.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  getProducts() {
    let headers = new HttpHeaders();
    headers = headers.append('authorId', '75164573');
    return this.http.get<PRODUCT[]>('https://tribu-ti-staffing-desarrollo-afangwbmcrhucqfh.z01.azurefd.net/ipf-msa-productosfinancieros/bp/products', { headers });
  }
}
