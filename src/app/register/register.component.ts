import { HttpClient } from '@angular/common/http';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {


  constructor(private modalService: BsModalService,
    private toastr: ToastrService,
    private router: Router,
    private http: HttpClient) { }

  registerFormControl!: FormGroup;
  hide = true;


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

  goToLoginPage() {
    this.router.navigate(["login"]);
  }


  // VALIDATORS FOR FORMFIELDS
  ngOnInit(): void {
    this.registerFormControl = new FormGroup({
      'firstName': new FormControl(null, Validators.required),
      'lastName': new FormControl(null, Validators.required),
      'userName': new FormControl(null, Validators.minLength(3)),
      'passWord': new FormControl(null, Validators.minLength(6)),
    })
  }
}
