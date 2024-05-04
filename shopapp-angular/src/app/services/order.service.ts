import { ProductService } from './product.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { OrderDTO } from '../dtos/order/order.dto';
import { UserService } from './user.service';
import { TokenService } from './token.service';
import { OrderResponse } from '../responses/order/order.response';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private apiUrl = `${environment.apiBaseUrl}/orders`;

  constructor(private http: HttpClient, private userService: UserService, private tokenService: TokenService) {}

  placeOrder(orderData: OrderDTO): Observable<any> {
    // Gửi yêu cầu đặt hàng
    return this.http.post(this.apiUrl, orderData);
  }
  getOrderById(orderId: number): Observable<any> {
    const url = `${environment.apiBaseUrl}/orders/${orderId}`;
    return this.http.get(url);
  }
  getOrdersByUserId() {
    const user_id = this.tokenService.getUserId();
    const url = `${environment.apiBaseUrl}/orders/user/${user_id}`;
    return this.http.get(url);
  }

  getAllOrders(keyword: string, page: number, limit: number): Observable<OrderResponse[]> {
    const params = new HttpParams()
    .set('keyword', keyword)
    .set('page', page.toString())
    .set('limit', limit.toString());
    return this.http.get<any>(`${this.apiUrl}/get-orders-by-keyword`, { params });
  }
  deleteOrder(orderId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${orderId}`, { responseType: 'text' });
  }
  updateOrder(orderId: number, orderData: OrderDTO): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${orderId}`, orderData);
  }
}
