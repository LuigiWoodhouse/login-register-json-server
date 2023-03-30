import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
//import { id } from 'date-fns/locale';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs/internal/Subscription';
// import { AuthService } from '../services/auth.service';
// import { TokenStorageServiceService } from '../services/token-service.service';

// import { UserManagementService } from '../services/user-management.service';
//import { UserService } from '../services/user.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginFormControl!: FormGroup;
  isLoggedIn = false;
  fieldTextType!: boolean;
  repeatFieldTextType!: boolean;

  backGroundImageLogin = 'assets/doggieInHand.jpg';
  userName!: string;
  passWord!: string;
  firstName!: string;
  id!: number;
  loading!: boolean;
  returnUrl: any;
  error: any;
  route: any;
  userId!: number;
  loginName!: string;
  form: any = {};


  constructor(private router: Router,
    private toastr: ToastrService,
    private http: HttpClient,
    // private user: UserService,
    //private authService: AuthService,
    //private tokenStorage: TokenStorageServiceService
  ) { }

  // HIDES THE CHARACTERS IN THE PASSWORD FIELD
  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }


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
          //  this.router.navigate([this.returnUrl]);
          return a.userName === this.loginFormControl.value.userName && a.passWord === this.loginFormControl.value.passWord




        });
        if (user) {
          this.router.navigate(["account/personalinfo/", user.id])

          // this.tokenStorage.saveToken(res.token);
          // this.tokenStorage.saveUser(res);
          // this.loginName = this.tokenStorage.getUser().user.userName;
          console.log(this.loginFormControl.value, 'user logged in')
          this.toastr.success(this.loginFormControl.value.userName + '\n have logged in successfully');
          //  this.loginFormControl.reset();
          this.userId = user.id;
          console.log(this.userId, 'this is my id')
        }
        else {
          this.toastr.error('Username or Password is incorrect');
        }
        //THIS CHECKS THE ROLE OF THE USER 
        if (this.userId == 5) {
          this.userId = user.id;
          this.router.navigate(["/admin-account/manage-pet"])
          console.log(this.userId, 'this is my id')

        }
      })
  }

  // gotDashboard() {
  //   //this.notificationService.showSuccess(this.loginName + NotificationMessage.LOGIN_SUCESSFUL_MESSAGE, NotificationType.SUCCESS );
  //   this.router.navigate(['/account']);
  // }

  ngOnInit(): void {

    // if (this.tokenStorage.getToken()) {
    //   this.isLoggedIn = true;
    //   this.loginName = this.tokenStorage.getUser().user.userName;
 
    // }


    this.loginFormControl = new FormGroup({
      'userName': new FormControl(null, Validators.required),
      'passWord': new FormControl(null, Validators.required),
    })
  }
}


