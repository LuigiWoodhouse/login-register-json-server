import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginFormControl!: FormGroup;
  userName!: string;
  passWord!: string;
  firstName!: string;
  route: any;
  userId!: number;

  constructor(private router: Router,
    private toastr: ToastrService,
    private http: HttpClient,
  ) { }


  goToLoginPage() {
    this.router.navigate(["login"]);
  }

  goToRegisterPage() {
    this.router.navigate(["register"]);
  }


  // LOGS THE USER IN IF THE CREDENTIALS ARE CORRECT , IF NOT, ACCESS IS NOT GRANTED.
  // APPROPRIATE MESSAGE IS DISPLAYED TO USER

  login() {
    this.http.get<any>("http://localhost:3000/users/")
      .subscribe(res => {
        const user = res.find((a: any) => {
          return a.userName === this.loginFormControl.value.userName && a.passWord === this.loginFormControl.value.passWord


        });
        if (user) {
          this.router.navigate(["user-account/", user.id])

          console.log(this.loginFormControl.value, 'user logged in')
          this.toastr.success(this.loginFormControl.value.userName + '\n have logged in successfully');

          this.userId = user.id;
          console.log(this.userId, 'this is my id')
        }
        else {
          this.toastr.error('Username or Password is incorrect');
        }

      })
  }


  ngOnInit(): void {

    this.loginFormControl = new FormGroup({
      'userName': new FormControl(null, Validators.required),
      'passWord': new FormControl(null, Validators.required),
    })
  }
}


