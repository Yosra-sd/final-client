import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  Role: any;
  role: any;
  isLogin = false;
  redirectUrl = ""

  constructor(private router: Router, private fb: FormBuilder, private http: HttpClient) { }

  loginForm = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required]
  })

  formAddEmail = this.fb.group({
    email: ['']
  })

  formEditPassword = this.fb.group({
    resetLink: [''],
    newPass: ['', [Validators.required, Validators.minLength(8)]],
    confirmPass: ['']
  })

  signIn(){
    return this.http.post(`http://localhost:5500/api/signin`, this.loginForm.getRawValue(), {responseType: 'text', withCredentials: true})
    .subscribe((result) => { 
      this.isLogin = true
      const user = JSON.parse(result)
      this.Role = user.role
      sessionStorage.setItem('Role', this.Role)
      this.router.navigate((['/dashboard']))
    })
  }

  forgotPassword() {
    return this.http.put(`http://localhost:5500/api/forgot-password-user`, this.formAddEmail.value, {responseType : "text"})
  }

  resetPassword() {
    return this.http.put(`http://localhost:5500/api/reset-password-user`, this.formEditPassword.value, {responseType : "text"})
  }

  logout() {
    return this.http.get(`http://localhost:5500/api/logout`, {responseType: 'text', withCredentials: true})
  }

  getLoggedInUser() {
    return this.http.get(`http://localhost:5500/api/profile`, {responseType: 'text', withCredentials: true})
  }

  getRole() {
    this.role = sessionStorage.getItem('Role')
    return this.role
  }

  isLoggedIn(){
    const loggedIn = sessionStorage.getItem('State');
    if (loggedIn == 'true')
    this.isLogin = true
    else 
    this.isLogin = false
    return this.isLogin;
  }
}
