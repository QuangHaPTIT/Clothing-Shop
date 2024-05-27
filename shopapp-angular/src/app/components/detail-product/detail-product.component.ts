import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { CartService } from 'src/app/services/cart.service';
import { CategoryService } from 'src/app/services/category.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Product } from '../../models/product';
import { ProductImage } from 'src/app/models/product.image';
import { environment } from 'src/app/environments/environment';
import { CommentService } from 'src/app/services/comment.service';
import { Comment } from 'src/app/models/comment';
import { CommentDTO } from 'src/app/dtos/comment/comment.dto';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrls: ['./detail-product.component.scss']
})

export class DetailProductComponent implements OnInit {
  product?: Product;
  productId: number = 0;
  currentImageIndex: number = 0;
  quantity: number = 1;
  comments: Comment[] = [];
  commentContent: string = '';
  constructor(
    private productService: ProductService,
    private cartService: CartService,
    // private categoryService: CategoryService,
    // private router: Router,
      private activatedRoute: ActivatedRoute,
      private router: Router,
      private commentService: CommentService,
      private userService: UserService
    ) {

    }
    ngOnInit() {
      // Lấy productId từ URL
      const idParam = this.activatedRoute.snapshot.paramMap.get('id');

      debugger
      //this.cartService.clearCart();
      // const idParam = 10 //fake tạm 1 giá trị
      if (idParam !== null) {
        this.productId = +idParam;
      }


      if (!isNaN(this.productId)) {
        this.getCommentByProductId(this.productId);
        this.productService.getDetailProduct(this.productId).subscribe({
          next: (response: any) => {
            // Lấy danh sách ảnh sản phẩm và thay đổi URL
            debugger
            if (response.product_images && response.product_images.length > 0) {
              response.product_images.forEach((product_image:ProductImage) => {
                product_image.image_url = `${environment.apiBaseUrl}/products/images/${product_image.image_url}`;
              });
            }
            debugger
            this.product = response

            // Bắt đầu với ảnh đầu tiên
            this.showImage(0);
          },
          complete: () => {
            debugger;
          },
          error: (error: any) => {
            debugger;
            console.error('Error fetching detail:', error);
          }
        });
      } else {
        console.error('Invalid productId:', idParam);
      }
    }
    showImage(index: number): void {
      debugger
      if (this.product && this.product.product_images &&
          this.product.product_images.length > 0) {
        // Đảm bảo index nằm trong khoảng hợp lệ
        if (index < 0) {
          index = 0;
        } else if (index >= this.product.product_images.length) {
          index = this.product.product_images.length - 1;
        }
        // Gán index hiện tại và cập nhật ảnh hiển thị
        this.currentImageIndex = index;
      }
    }
    thumbnailClick(index: number) {
      debugger
      // Gọi khi một thumbnail được bấm
      this.currentImageIndex = index; // Cập nhật currentImageIndex
    }
    nextImage(): void {
      debugger
      this.showImage(this.currentImageIndex + 1);
    }

    previousImage(): void {
      debugger
      this.showImage(this.currentImageIndex - 1);
    }
    addToCart(): void {
      debugger
      if (this.product) {
        this.cartService.addToCart(this.product.id, this.quantity);
        alert('Đã thêm sản phẩm vào giỏ hàng.')
      } else {
        // Xử lý khi product là null
        console.error('Không thể thêm sản phẩm vào giỏ hàng vì product là null.');
      }
    }

    getCommentByProductId(productId: number): void {
      debugger
      if(productId > 0) {
        this.commentService.getCommentByProductId(productId).subscribe({
          next: (response: any) => {
            debugger
            this.comments = response.data;
            console.log('Comments:', this.comments);
          },
          complete: () => {
            debugger;
          },
          error: (error: any) => {
            debugger;
            console.error('Error fetching comment:', error);
          }
        });
      }
    }

    buyNow(product_id: number): void {
      if(product_id > 0) {
        this.cartService.addToCart(product_id, this.quantity);
      }
      this.router.navigate(['/orders']);
    }
    addComment() {
      const userResponse = this.userService.getUserFromLocalStorage();
      const comment : CommentDTO = {
        user_id: userResponse?.id ?? 0,
        product_id: this.productId,
        content: this.commentContent
      }

      if(this.commentContent.trim() !== '') {
        this.commentService.commentProduct(comment).subscribe({
          next: (response: any) => {
            debugger
            this.commentContent = '';
            this.getCommentByProductId(this.productId);
          },
          complete: () => {
            debugger
          },
          error: (error: any) => {
            debugger
            console.error('Error adding comment:', error);
          }
        });
      }else{
        alert('Nội dung bình luận không được để trống');
      }
    }
}
