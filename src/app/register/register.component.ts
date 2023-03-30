import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../service/user.service';


interface Gender {
  value: string;
  genderValue: string;
}
interface Parish {
  value: string;
  parishValue: string;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  fieldTextType!: boolean;

  constructor(private modalService: BsModalService,
    private toastr: ToastrService,
    private router: Router,
    private http: HttpClient,
    private userService: UserService) { }

  registerFormControl!: FormGroup;

  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

  hide = true;
  filterParish!: any;
  parishInfo!: any;
  errorMessage!: any;


  //MODAL SPECIFICATIONS
  modalRef!: BsModalRef;
  config = {
    backdrop: true,
    ignoreBackdropClick: true,
    class: 'modal-md test'

  };

  // ERROR DISPLAY 
  get f() {
    return this.registerFormControl.controls;
  }

  // GENDER
  genders: Gender[] = [
    { value: 'Male', genderValue: 'Male' },
    { value: 'Female', genderValue: 'Female' }

  ];

  // parishes: Parish[] = [
  //   { value: 'Clarendon', parishValue: 'Clarendon' },
  //   { value: 'Hanover', parishValue: 'Hanover' },
  //   { value: 'Kingston', parishValue: 'Kingston' },
  //   { value: 'Manchester', parishValue: 'Manchester' },
  //   { value: 'Portland', parishValue: 'Portland' },
  //   { value: 'Trelawny', parishValue: 'Trelawny' },
  //   { value: 'St.Catherine', parishValue: 'St.Catherine' },
  //   { value: 'St.Andrew', parishValue: 'St.Andrew' },
  //   { value: 'St.Ann', parishValue: 'St.Ann' },
  //   { value: 'St.Elizabeth', parishValue: 'St.Elizabeth' },
  //   { value: 'St.James', parishValue: 'St.James' },
  //   { value: 'St.Mary', parishValue: 'St.Mary' },
  //   { value: 'St.Thomas', parishValue: 'St.Thomas' },
  //   { value: 'Westmoreland', parishValue: 'Westmoreland' }
  // ];

  //MODAL TO CONFIRM ACCOUNT DETAILS
  openRegister(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, this.config);

  }

  //NOTIFICATION MESSAGE INDICATING SUCCESSFUL ACCOUNT CREATION
  showToaster() {
    this.toastr.success('Your account has been succesfully registered');
  }


  //SAVE ACCOUNT DATA TO DATABASE AND REDIRECT USER TO HOMEPAGE
  register() {
    this.http.post<any>("http://localhost:3000/Users", this.registerFormControl.value)
      .subscribe(res => {
        console.log(this.registerFormControl.value)
        this.showToaster();
        this.registerFormControl.reset();
        this.router.navigate(["login"]);
      }, err => {
        alert("something went wrong")
      })
  }



  //PHONE NUMBER FORMATTING
  numberMask = [/\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/,];


  // VALIDATORS FOR FORMFIELDS
  ngOnInit(): void {
    this.registerFormControl = new FormGroup({
      'firstName': new FormControl(null, Validators.required),
      'lastName': new FormControl(null, Validators.required),
      'email': new FormControl(null, Validators.required),
      'gender': new FormControl(null, Validators.required),
      'phoneNumber': new FormControl(null, Validators.minLength(10)),
      //'country': new FormControl(null, Validators.required),
      'parish': new FormControl(null, Validators.required),
      'userName': new FormControl(null, Validators.minLength(3)),
      'passWord': new FormControl(null, Validators.minLength(6)),
      'securityQuestion': new FormControl(null, Validators.required),
      'securityQuestionAnswer': new FormControl(null, Validators.required),

    })
  }

}
