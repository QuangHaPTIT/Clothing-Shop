import { Component, OnInit } from '@angular/core';
import { TableRows, Employee } from './table-data';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/models/product';
import { Router } from '@angular/router';
import { environment } from 'src/app/environments/environment';
import { NgModel } from '@angular/forms';
import { get } from 'jquery';

@Component({
  selector: 'app-table',
  standalone: true,
  imports:[NgFor, NgClass, NgIf],
  templateUrl: 'table.component.html'
})
export class TableComponent implements OnInit{
  products?: Product[];
  trow: TableRows[];
  selectedCategoryId: number  = 0; // Giá trị category được chọn
  currentPage: number = 1;
  itemsPerPage: number = 12;
  pages: number[] = [];
  totalPages:number = 0;
  visiblePages: number[] = [];
  keyword:string = "";
  totlaPages: number = 0;
  constructor(private productService: ProductService, private router: Router) {

    this.trow = Employee;
  }
  ngOnInit() {
    debugger;
    this.getProducts(this.keyword, this.selectedCategoryId, this.currentPage, this.itemsPerPage);
  }
  navChangeProduct(value: number) {
    debugger;
    this.router.navigate(['/component/edit-product', value]);
  }
  deleteProduct(id: number) {
    debugger
    alert(id)
  }
  getProducts(keyword: string, selectedCategoryId: number, page: number, limit: number) {
    debugger
    this.productService.getProducts(keyword, selectedCategoryId, page, limit).subscribe({
      next: (response: any) => {
        debugger
        response.products.forEach((product: Product) => {
          product.url = product.thumbnail? `${environment.apiBaseUrl}/products/images/${product.thumbnail}`:`${environment.apiBaseUrl}/products/images/404.jpg`;
        });
        this.products = response.products;
        this.totalPages = response.totalPages;
        this.visiblePages = this.generateVisiblePageArray(this.currentPage, this.totalPages);
      },
      complete: () => {
        debugger;
      },
      error: (error: any) => {
        debugger;
        console.error('Error fetching products:', error);
      }
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

    return new Array(endPage - startPage + 1).fill(0).map((_, index) => startPage + index);
  }
  onPageChange(page: number) {
    debugger;
    this.currentPage = page;
    this.getProducts(this.keyword, this.selectedCategoryId, this.currentPage, this.itemsPerPage);
  }
}
