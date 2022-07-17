import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IRegisterRequest } from 'src/app/models/Index';
import IChangepasswordRequest from 'src/app/models/Users/IChangepasswordRequest';
import { AuthRepository } from 'src/app/repositories/auth/auth.service';
import { RegisterService } from 'src/app/usecases/register/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

  accountExist: boolean = false;

  passwordMatch: boolean = false

  registerForm = this.fb.group({
    firstname: ['', Validators.required],
    lastname: ['', Validators.required],
    email: ['', Validators.required],
    phone: ['', Validators.required],
    password: ['', Validators.required],
    password2: ['', Validators.required],
  })

  constructor(
    private fb: FormBuilder,
    private authRepository: AuthRepository,
    private router: Router
  ) { }

  ngOnInit(): void {
    
  }

  async register(): Promise<void> {
    
    if(this.registerForm.controls['password'].value !== this.registerForm.controls['password2'].value){
      this.passwordMatch = true;
      return
    }

   
    const payload: IRegisterRequest = {
      firstname: this.registerForm.controls['firstname'].value,
      lastname: this.registerForm.controls['lastname'].value,
      email: this.registerForm.controls['email'].value,
      phone: this.registerForm.controls['phone'].value,
      password: this.registerForm.controls['password'].value,
      role: "62cc77bcfbd7ed1360063ea7"
    };

    (await this.authRepository.register(payload)).subscribe(
      res => {
        if(res.status === 200) {
          this.router.navigate(['/auth/login']);
        }

        if(res.status === 500) {

        }

        if(res.status === 401){
          // when user already exists
          this.accountExist = true;
        }
      }
    )
    
  }

}
