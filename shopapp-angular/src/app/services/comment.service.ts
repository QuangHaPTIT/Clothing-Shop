import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { Comment } from '../models/comment';
import { CommentDTO } from '../dtos/comment/comment.dto';
@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private apiGetCategories  = `${environment.apiBaseUrl}/comments`;

  constructor(private http: HttpClient) { }
  getCommentByProductId(productId: number):Observable<any> {
    const params = new HttpParams()
      .set('product_id', productId.toString())
      return this.http.get(this.apiGetCategories, {params});
  }

  commentProduct(comment: CommentDTO): Observable<Comment> {
    return this.http.post<Comment>(this.apiGetCategories, comment);
  }
}
