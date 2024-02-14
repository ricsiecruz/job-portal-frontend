import { Component } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, Observable, first } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from 'src/app/authentication.service';
import { Users } from 'src/app/models/users';
import { LandingService } from '../landing.service';
import { RegisterComponent } from '../register/register.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  private currentUserSubject: BehaviorSubject<Users>;
  public currentUser: Observable<Users>;

  loginForm!: FormGroup;
  submitted = false;
  error = '';
  returnUrl!: string;
  user?: Users;
  
  constructor(
    public activeModal: NgbActiveModal,
    private landingService: LandingService,
    private authService: AuthenticationService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private modalService: NgbModal
  ) {
    this.currentUserSubject = new BehaviorSubject<Users>(JSON.parse(localStorage.getItem('currentUser') || 'null'));
    this.currentUser = this.currentUserSubject.asObservable(); 
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['test4', Validators.required],
      password: ['password', Validators.required]
    });
  }

  public get currentUserValue(): Users {
    return this.currentUserSubject.value;
  }

  get f() {
    return this.loginForm.controls;
  }

  register() {
    this.activeModal.close();
    this.modalService.open(RegisterComponent)
  }

  // forgotPassword() {
  //   this.activeModal.close();
  //   this.modalService.open(ForgotPasswordComponent)
  // }

  onSubmit(login:FormGroup) {
    this.submitted = true;
    this.authService.email = this.loginForm.value.email;
    this.authService.password = this.loginForm.value.password;
    this.landingService.user = '';
    this.authService.login(this.f['email'].value, this.f['password'].value)
      .pipe(first())
      .subscribe(
          data => {
            this.activeModal.close();
            if(this.landingService.role === 'candidate') {
              this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/candidate/dashboard/profile';
            } if(this.landingService.role === 'employer') {
              this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/employer/dashboard/profile';
            } if(this.landingService.role === 'admin') {
              this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/admin/dashboard/categories';
            }
            this.router.navigate([this.returnUrl])
          },
          error => {
            this.error = error.error.message;
          });
  }

}
