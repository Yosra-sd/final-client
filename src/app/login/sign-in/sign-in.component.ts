import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthenticationService } from 'src/app/services/auth/authentication.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  loginForm!: FormGroup;
  Role: any;
  userValue: any;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    public authService: AuthenticationService,
    private cookieService: CookieService
    ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onLogin(): void {
    if (this.authService.loginForm.invalid) {
      return;
    }
    this.authService.signIn()
    // .subscribe((result) => {
    //   const user = JSON.parse(result)
    //   this.Role = user.role
    //   sessionStorage.setItem('Role', this.Role)
    //   sessionStorage.setItem('State', 'true')
    //   this.router.navigate((['/dashboard']))
    //   console.log(this.authService.userValue)
    // })
  }

  logout() {
    //this.cookieService.delete('token', '/')
    this.authService.logout().subscribe((result) => {
      this.router.navigate((['/']))
    }, (error) => {
      console.log(error)
    })
    
  }

  
}
