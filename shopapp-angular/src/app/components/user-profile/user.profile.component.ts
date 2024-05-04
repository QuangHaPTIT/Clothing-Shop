import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators,  } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';
import { RegisterDTO } from '../../dtos/user/register.dto';
import { TokenService } from 'src/app/services/token.service';
import { UserResponse } from 'src/app/responses/user/user.response';
import { ValidationError } from 'class-validator';
import { UpdateUserDTO } from 'src/app/dtos/user/update.user.dto';
@Component({
  selector: 'app-user-profile',
  templateUrl: './user.profile.component.html',
  styleUrls: ['./user.profile.component.scss']
})
export class UserProfileComponent implements OnInit{
  userProfileForm: FormGroup = new FormGroup({}); // Initialize userProfileForm as an empty FormGroup
  userResponse?:UserResponse;
  constructor(private formBuilder: FormBuilder, private router: Router, private activedRoute: ActivatedRoute, private userService: UserService, private tokenService: TokenService){
    this.userProfileForm = this.formBuilder.group({
      fullname: ['', Validators.minLength(3)],
      password: ['', Validators.minLength(3)],
      retype_password: ['', Validators.minLength(3)],
      address: ['', Validators.minLength(6)],
      date_of_birth: [new Date()]
    }, {
      validators: this.passwordMatchValidator// Custom validator function for password match
    }
    ); // Move the code inside ngOnInit()


  }
  getTokenFromLocalStorage(){
    const token= this.tokenService.getToken();
    return token;
  }
  ngOnInit(): void {
    debugger
    let token : string =  this.getTokenFromLocalStorage() ?? '';
    this.userService.getUserDetail(token)
    .subscribe({
      next: (response: any) =>  {
        debugger
        this.userResponse = {
          ...response,
          date_of_birth : new Date(response.date_of_birth)
        };
        this.userProfileForm.patchValue({
          fullname: this.userResponse?.fullname ?? '',
          address: this.userResponse?.address ?? '',
          date_of_birth: this.userResponse?.date_of_birth.toISOString().substring(0, 10)
        })
        this.userService.saveUserToLocalStorage(this.userResponse);
      },
      complete: () => {
        debugger
      },
      error: (error : any) => {
        debugger
        console.log(error.error.message);
      }
    });
  }
  passwordMatchValidator(): ValidatorFn {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      debugger
      const password = formGroup.get('password')?.value;
      const retypedPassword = formGroup.get('retype_password')?.value;
      if (password !== retypedPassword) {
        return { passwordMismatch: true };
      }
      return null;
    };
  }

  save() : void {
    debugger
    if(this.userProfileForm.valid) {
      const updateUserDTO : UpdateUserDTO = {
        fullname: this.userProfileForm.get('fullname')?.value.trim(),
        address: this.userProfileForm.get('address')?.value.trim(),
        password: this.userProfileForm.get('password')?.value.trim(),
        retype_password: this.userProfileForm.get('retype_password')?.value.trim(),
        date_of_birth: this.userProfileForm.get('date_of_birth')?.value
      }
      this.userService.updateUserDetail(this.getTokenFromLocalStorage() ?? '', updateUserDTO).subscribe({
        next: (userResponse: any) => {
          let toLogin = false;
          this.userService.removeUserFromLocalStorage()
          this.tokenService.removeToken();
          this.router.navigate(['/login'])


        },
        error: (error: any) => {
          alert(error.error.message);
        }
      });
    }else{
      if(this.userProfileForm.hasError('passwordMismatch')) {
        alert("Mật khẩu và Mật khẩu gõ lại không khớp");
      }
    }

  }
}
