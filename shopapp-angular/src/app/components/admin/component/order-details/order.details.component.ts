import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute,  Router } from '@angular/router';
import { environment } from 'src/app/environments/environment';
import { OrderResponse } from 'src/app/responses/order/order.response';
import { OrderService } from 'src/app/services/order.service';
import { NgModel } from '@angular/forms';
import { NgFor } from '@angular/common';
import { OrderDTO } from 'src/app/dtos/order/order.dto';

@Component({
  templateUrl: './order.details.component.html',
  standalone: true,
  styleUrls: ['./order.details.component.html'],
  imports:[ReactiveFormsModule, FormsModule, NgFor],
})

export class OrderDetailsComponent implements OnInit{
  orderId:number = 0;
  orderResponse: OrderResponse = {
    id: 0, // Hoặc bất kỳ giá trị số nào bạn muốn
    user_id: 0,
    fullname: '',
    phone_number: '',
    email: '',
    address: '',
    note: '',
    order_date: new Date(),
    status: '',
    total_money: 0,
    shipping_method: '',
    shipping_address: '',
    shipping_date: new Date(),
    payment_method: '',
    order_details: [],

  };
  constructor(private orderService: OrderService, private route: ActivatedRoute, private router: Router) {}
  ngOnInit(): void {
    this.getOrderDetails();
  }

  getOrderDetails(): void {
    debugger
    this.orderId = Number(this.route.snapshot.paramMap.get('id'));
    console.log(this.orderId)
    this.orderService.getOrderById(this.orderId).subscribe({
      next: (response: any) => {
        console.log(response)
        debugger;
        this.orderResponse.id = response.id;
        this.orderResponse.user_id = response.user_id;
        this.orderResponse.fullname = response.fullname;
        this.orderResponse.email = response.email;
        this.orderResponse.phone_number = response.phone_number;
        this.orderResponse.address = response.address;
        this.orderResponse.note = response.note;
        this.orderResponse.total_money = response.total_money;
        this.orderResponse.order_date = new Date(response.order_date)
        // if (response.order_date) {
        //   this.orderResponse.order_date = new Date(
        //     response.order_date[0],
        //     response.order_date[1] - 1,
        //     response.order_date[2]
        //   );
        // }
        this.orderResponse.order_details = response.order_details
          .map((order_detail:any) => {
            order_detail.product.thumbnail = `${environment.apiBaseUrl}/products/${order_detail.product.thumbnail}`;
            order_detail.number_of_products = order_detail.number_of_products;
            return order_detail;
          });
        this.orderResponse.status = response.status;
        this.orderResponse.shipping_method = response.shipping_method;
        this.orderResponse.shipping_address = response.shipping_address;
        if (response.shipping_date) {
          this.orderResponse.shipping_date = new Date(
            response.shipping_date[0],
            response.shipping_date[1] - 1,
            response.shipping_date[2]
          );
        }
        this.orderResponse.payment_method = response.payment_method;
        this.orderResponse.status = response.status;
        debugger;
      },
      complete: () => {},
      error: (error: any) => {
        console.error('Error fetching products:', error);
      }
    });
  }
  saveOrder(): void {

    debugger
    this.orderService.updateOrder(this.orderId, new OrderDTO(this.orderResponse))
      .subscribe({
      next: (response: any) => {
        debugger
        // Handle the successful update
        console.log('Order updated successfully:', response);
        // Navigate back to the previous page
        location.reload();
      },
      complete: () => {
        debugger;
      },
      error: (error: any) => {
        // Handle the error
        debugger
        console.error('Error updating order:', error);
      }
    });
  }
}
