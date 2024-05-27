import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute,  Router } from '@angular/router';
import { environment } from 'src/app/environments/environment';
import { OrderResponse } from 'src/app/responses/order/order.response';
import { OrderService } from 'src/app/services/order.service';
import { NgModel } from '@angular/forms';
import { NgFor } from '@angular/common';
import { OrderDTO } from 'src/app/dtos/order/order.dto';
import { CategoryService } from 'src/app/services/category.service';
import { Category } from 'src/app/models/category';

@Component({
  templateUrl: './categories.component.html',
  standalone: true,
  styleUrls: ['./categories.component.scss'],
  imports:[ReactiveFormsModule, FormsModule, NgFor],
})

export class CategoriesComponent implements OnInit{
  categories: Category[] = []; // Dữ liệu động từ categoryService
  constructor(private router: Router, private activatedRoute: ActivatedRoute, private formBuilder: FormBuilder,private categoryService: CategoryService) {
  }
  ngOnInit(): void {
    this.getCategories(1, 100);
  }
  getCategories(page: number, limit: number) {
    this.categoryService.getCategories(page, limit).subscribe({
      next: (response : any) => {
        const categories = response.data;
        debugger
        this.categories = categories;
        console.log(this.categories)
      },
      complete: () => {
        debugger;
      },
      error: (error: any) => {
        console.error('Error fetching categories:', error);
      }
    });
  }
  delete(id: number) {
    const isDelete = confirm('Are you sure you want to delete this category?');
    if(isDelete === true) {
      this.categoryService.deleteCategory(id).subscribe({
        next: (response: any) => {
          console.log('Delete category successfully:', response);
        },
        complete: () => {
          debugger;
        },
        error: (error: any) => {
          console.error('Error deleting category:', error);
        }
      });
    }
    }

}
