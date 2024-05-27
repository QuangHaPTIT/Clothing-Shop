
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
  templateUrl: 'edit-product.component.html',
  standalone: true,
  styleUrls: ['./edit-product.component.scss'],
  imports: [ReactiveFormsModule, CommonModule, FormsModule]
})
export class EditProductComponent implements OnInit{
  productForm: FormGroup = new FormGroup({});
  productResponse?: ProductResponse;
  selectedStatus?: string;
  categories: Category[] = []; // Dữ liệu động từ categoryService
  productId: number = -1;
  selectedCategoryId: number = 1;
  constructor(private router: Router, private activatedRoute: ActivatedRoute, private formBuilder: FormBuilder, private productService: ProductService, private categoryService: CategoryService) {
    this.productForm = this.formBuilder.group({
      product_name: ['', Validators.required],
      price : ['', Validators.required],
      thumbnail : ['', Validators.required],
      description : ['', Validators.required],
    });
  }
  ngOnInit() {
    debugger
    const idProduct = this.activatedRoute.snapshot.paramMap.get('id') ?? '';
    this.productId = idProduct? parseInt(idProduct) : -1;
    console.log(this.productId);
    this.getCategories(1, 100);
    this.productService.getDetailProduct(this.productId).subscribe({
      next: (response: any) => {
        this.productResponse = {
          id: response.id,
          name: response.name,
          price: response.price,
          thumbnail: `${environment.apiBaseUrl}/products/images/${response.thumbnail}`,
          description: response.description,
          product_images: response.product_images
        };
        this.selectedCategoryId = response.category_id;
        console.log(this.selectedCategoryId);
        this.productForm.patchValue({
          product_name: this.productResponse?.name ?? '',
          price: this.productResponse?.price ?? '',
          thumbnail: this.productResponse?.thumbnail ?? '',
          description: this.productResponse?.description ?? '',
        });

      }, complete: () => {
        debugger
      },
      error: (error: any) => {
        debugger
        console.error(error.error.message);
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
  handleFileInput(event: any) {
    debugger
    const file: string = event.target.files[0];
    if(file) {

    }
  }

  selectStatus(event: string) {
    this.selectedStatus = event;
  }
  save() {
      const product: ProductDTO = {
        name: this.productForm.get('product_name')?.value,
        price: this.productForm.get('price')?.value,
        description: this.productForm.get('description')?.value,
        category_id: this.selectedCategoryId
      }
      console.log(product);
      this.productService.updateProduct(product, this.productId).subscribe({
        next: (response: any) => {
          debugger
          alert('Update product successfully');
          this.router.navigate(['/admin/product']);
        },
        complete: () => {
          debugger
        },
        error: (error: any) => {
          debugger
          console.error('Error updating product:', error);
        }
      });
  }
  onCategoryClick(category: number) {
    console.log(category);
    this.selectedCategoryId = category;
  }
  onFileSelected(event: any) {

  }
}
