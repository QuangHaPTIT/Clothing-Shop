import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RegisterDTO } from '../dtos/user/register.dto';
import { LoginDTO } from '../dtos/user/login.dto';
import { environment } from '../environments/environment';
import { HttpUtilService } from './http.util.service';
import { UserResponse } from '../responses/user/user.response';
import { UpdateUserDTO } from '../dtos/user/update.user.dto';
import { TokenService } from './token.service';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiRegister = `${environment.apiBaseUrl}/users/register`;
  private apiLogin = `${environment.apiBaseUrl}/users/login`;
  private apiDetail = `${environment.apiBaseUrl}/users/details`;
  private apiConfig = {
    headers: this.httpUtilService.createHeaders(),
  }
  private apiUpdateUserDetail = `${environment.apiBaseUrl}/users/details`

  constructor(
    private http: HttpClient,
    private httpUtilService: HttpUtilService,
    private tokenSerive: TokenService
  ) { }

  register(registerDTO: RegisterDTO):Observable<any> {
    return this.http.post(this.apiRegister, registerDTO, this.apiConfig);
  }

  login(loginDTO: LoginDTO): Observable<any> {
    return this.http.post(this.apiLogin, loginDTO, this.apiConfig);
  }
  getUserDetail(token: String) {
    return this.http.post(this.apiDetail, {
      headers : new HttpHeaders ({
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      })
    })
  }

  saveUserToLocalStorage(userResponse?: UserResponse) {
    try{
      if(userResponse == null || userResponse == undefined){
        return;
      }
      // Convert the userResponse object to a JSON string
      const userResponseJson = JSON.stringify(userResponse);
      // Save the JSON string to local storage with a key of 'userResponse'
      localStorage.setItem('user', userResponseJson);

    }catch(error){
      console.error('Error saving user response to local storage:', error);
    }

  }

  getUserFromLocalStorage():UserResponse | null{
    try{
      const userResponseJson = localStorage.getItem('user');
      if(userResponseJson == null ||  userResponseJson == undefined){
        return null;
      }
      // Parse the JSON string into an object
      const user = JSON.parse(userResponseJson!);
      return user;
    }catch(error){
      console.log('Error getting user response from local storage:', error);
      return null;
    }
  }
  removeUserFromLocalStorage(): void {
    try{
      localStorage.removeItem('user');
      console.log('User response removed from local storage');
    }catch(error){
      console.error('Error removing user response from local storage:', error);
    }
  }
  updateUserDetail(token: string, updateUserDetail: UpdateUserDTO) {
    debugger
    const userId = this.tokenSerive.getUserId();
    return this.http.put(`${this.apiUpdateUserDetail}/${userId}`, updateUserDetail, {
      headers : new HttpHeaders ({
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      })
    })
  }
}
