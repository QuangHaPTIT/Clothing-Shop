import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  NgbDropdownModule,
  NgbModule,
  NgbCollapseModule,
} from '@ng-bootstrap/ng-bootstrap';
import { OrderResponse } from 'src/app/responses/order/order.response';
import { OrderService } from 'src/app/services/order.service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-dropdown-basic',
  standalone: true,
  imports: [NgbDropdownModule, NgbModule, NgbCollapseModule, NgFor, NgClass, NgIf],
  templateUrl: './dropdown-collapse.component.html',
})
export class NgbdDropdownBasicComponent implements OnInit{
  // This is for the collapse example
  public isCollapsed = false;
  public isCollapsed2 = false;
  collapsed = true;
  orders: OrderResponse[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 6;
  totlaPages: number = 0;
  pages: number[] = [];
  keyword: string = '';
  visiblePages: number[] = [];

  constructor(private router: Router, private orderService: OrderService, private location: Location) {}
  ngOnInit(): void {
    this.getAllOrders(this.keyword, this.currentPage, this.itemsPerPage);
  }
  getAllOrders(keyword: string, page: number, limit: number) {
    this.orderService.getAllOrders(keyword, page, limit).subscribe({
      next: (response: any) => {
        this.orders = response.orderResponses;
        this.totlaPages = response.totalPages;
        this.visiblePages = this.generateVisiblePageArray(
          this.currentPage,
          this.totlaPages
        );
      },
      complete: () => {},
      error: (error: any) => {
        console.error('Error fetching products:', error);
      },
    });
  }
  generateVisiblePageArray(currentPage: number, totalPages: number): number[] {
    const maxVisiblePages = 5;
    const halfVisiblePages = Math.floor(maxVisiblePages / 2);

    let startPage = Math.max(currentPage - halfVisiblePages, 1);
    let endPage = Math.min(startPage + maxVisiblePages - 1, totalPages);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(endPage - maxVisiblePages + 1, 1);
    }

    return new Array(endPage - startPage + 1).fill(0)
        .map((_, index) => startPage + index);
  }
  onPageChange(page: number) {
    this.currentPage = page;
    this.getAllOrders(this.keyword, this.currentPage, this.itemsPerPage);
  }
  deleteOrder(id: number) {
    debugger
    const confirmDelete = confirm('Bạn có chắc chắn muốn xóa order này không?');
    if(confirmDelete) {
      this.orderService.deleteOrder(id).subscribe(response => {
        debugger
        alert(response);
        location.reload();
      });
    }
  }
  viewDetails(id: number) {
    debugger
    this.router.navigate(['/component/order-details', id]);
  }
}
