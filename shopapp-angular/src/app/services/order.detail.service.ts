import { ProductService } from './product.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';


@Injectable({
  providedIn: 'root',
})
export class OrderDetailService {
  private apiUrl = `${environment.apiBaseUrl}/order_details`;
  constructor(private http: HttpClient) {

  }
  cancelOrderDetail(orderDetailId: number): Observable<any> {
    const url = `${this.apiUrl}/${orderDetailId}`;
    return this.http.delete(url);
  }
}
