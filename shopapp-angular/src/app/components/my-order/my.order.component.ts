import { Component, OnInit, ViewChild } from '@angular/core';
import { LoginDTO } from '../../dtos/user/login.dto';
import { UserService } from '../../services/user.service';
import { TokenService } from '../../services/token.service';
import { RoleService } from '../../services/role.service'; // Import RoleService
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { LoginResponse } from '../../responses/user/login.response';
import { Role } from '../../models/role'; // Đường dẫn đến model Role
import { UserResponse } from 'src/app/responses/user/user.response';
import { ProductService } from 'src/app/services/product.service';
import { OrderData } from 'src/app/dtos/order/order.data';
import { OrderService } from 'src/app/services/order.service';
import { environment } from 'src/app/environments/environment';
import { OrderDetailService } from 'src/app/services/order.detail.service';

@Component({
  selector: 'app-my-order',
  templateUrl: './my.order.component.html',
  styleUrls: ['./my.order.component.scss'],
})
export class MyOrderComponent implements OnInit {
  orderData: OrderData[] = [];
  constructor(
    private productService: ProductService,
    private router: Router,
    private tokenService: TokenService,
    private orderService: OrderService,
    private orderDetailService: OrderDetailService
  ) {}
  ngOnInit(): void {
    this.getOrders();
  }

  // Lấy danh sách đơn hàng của người dùng
  getOrders() {
    debugger;
    this.orderService.getOrdersByUserId().subscribe({
      next: (response: any) => {
        this.orderData = response;

        this.orderData.forEach((order: OrderData) => {
          order.order_details.forEach((orderDetail) => {
            orderDetail.product.url =orderDetail.product.thumbnail ?`${environment.apiBaseUrl}/products/images/${orderDetail.product.thumbnail}`: `${environment.apiBaseUrl}/products/images/404.jpg`;
          });
          order.order_date = new Date(order.order_date).toISOString().replace('T', ' ');

        })

      },
      complete: () => {
        debugger;
      },
      error: (error: any) => {
        debugger;
        console.error(error.error.message);
      }
    });
  }
  confirmDelete( status: string, orderDetailId: number) {
    if(status !== 'pending') {
      alert('Bạn không thể hủy đơn hàng khi đã được đưa đến đơn vị vận chuyển hoặc đã giao');
      return;
    }
    const result = confirm('Bạn có chắc chắn muốn hủy đơn hàng này không?');
    if(result) {
      this.orderDetailService.cancelOrderDetail(orderDetailId).subscribe({
        next: (response: any) => {
          this.getOrders();
        },
        complete: () => {
          debugger;
        },
        error: (error: any) => {
          console.error(error.error.message);
        }
      });
      alert('Hủy đơn hàng thành công');
    }
  }
  detailOrder(orderId: number) {
    alert(orderId)
    // this.router.navigate(['order-detail', orderId]);
  }
}
