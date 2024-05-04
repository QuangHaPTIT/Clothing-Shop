import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ComponentsModule } from '../component.module';
import { ProductService } from 'src/app/services/product.service';
import { ProductResponse } from 'src/app/responses/product/product.response';
import { environment } from 'src/app/environments/environment';

@Component({
  templateUrl: 'edit-product.component.html',
  standalone: true,
  styleUrls: ['./edit-product.component.scss'],
  imports:[ReactiveFormsModule],
})
export class EditProductComponent implements OnInit{
  productForm: FormGroup = new FormGroup({});
  productResponse?: ProductResponse;
  selectedStatus?: string;
  constructor(private router: Router, private activatedRoute: ActivatedRoute, private formBuilder: FormBuilder, private productService: ProductService) {
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
    let productId = idProduct? parseInt(idProduct) : -1;
    console.log(productId);
    this.productService.getDetailProduct(productId).subscribe({
      next: (response: any) => {
        this.productResponse = {
          id: response.id,
          name: response.name,
          price: response.price,
          thumbnail: `${environment.apiBaseUrl}/products/images/${response.thumbnail}`,
          description: response.description,
          product_images: response.product_images
        };

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
    debugger
    if (this.productForm.invalid) {
      alert('Please fill all required fields');
      return;
    }else{
      const product = {
        id: this.productResponse?.id,
        name: this.productForm.get('product_name')?.value,
        price: this.productForm.get('price')?.value,
        thumbnail: this.productForm.get('thumbnail')?.value,
        description: this.productForm.get('description')?.value,
      };
      // this.productService.updateProduct(product).subscribe({
      //   next: (response: any) => {
      //     debugger
      //     alert('Update product successfully');
      //     this.router.navigate(['/admin/product']);
      //   },
      //   complete: () => {
      //     debugger
      //   },
      //   error: (error: any) => {
      //     debugger
      //     console.error('Error updating product:', error);
      //   }
      // });
    }
  }
  onFileSelected(event: any) {

  }
}
