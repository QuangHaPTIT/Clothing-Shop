
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, NgModel, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ComponentsModule } from '../component.module';
import { ProductService } from 'src/app/services/product.service';
import { ProductResponse } from 'src/app/responses/product/product.response';
import { environment } from 'src/app/environments/environment';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';
import {  ProductDTO } from 'src/app/dtos/product/product.dto';

@Component({
  templateUrl: 'new-product.component.html',
  standalone: true,
  styleUrls: ['./new-product.component.scss'],
  imports: [ReactiveFormsModule, CommonModule, FormsModule]
})
export class NewProductComponent implements OnInit{
  categories: Category[] = []; // Dữ liệu động từ categoryService
  productName: string = '';
  productPrice: number = 0;
  productDescription: string = '';
  selectedCategory: number = 1;
  constructor(private router: Router, private activatedRoute: ActivatedRoute, private formBuilder: FormBuilder, private productService: ProductService, private categoryService: CategoryService) {
  }
  ngOnInit(): void {
    this.getCategories(1, 100);
  }

  addProduct() {
    const productDTO: ProductDTO = {
      name: this.productName,
      price: this.productPrice,
      description: this.productDescription,
      category_id: this.selectedCategory
    };
    this.productService.addProduct(productDTO).subscribe({
      next: (response: any) => {
        console.log('Add product successfully:', response);
        this.router.navigate(['/component/table']);
      },
      complete: () => {
        debugger;
      },
      error: (error: any) => {
        console.error('Error adding product:', error);
      }
    });
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
}
