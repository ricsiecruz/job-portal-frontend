import { Component } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from '../login/login.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LandingService } from '../landing.service';
import { Users } from 'src/app/models/users';
import { EmployerInfo, Roles } from 'src/app/models/roles';
import { AdminService } from '../../dashboard/admin/admin.service';
import { Subscription } from 'rxjs';
import { Category } from 'src/app/models/category';
// import { send } from 'process';
import { Data } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  roles?: any;
  selectRole?: any;
  activeRole: string = '';
  role?: string;
  email?: string;
  password?: string;
  confirm_pass?: string;
  userData: any;
  registerForm!: FormGroup;
  
  categoriesSubscription?: Subscription;
  categoriesLoadingSubscription?: Subscription;
  categories: Category[] = []
  isListLoading?: boolean;
  industry: any;
  category: any;
  industryName = [
    { category: '' }
  ]
  err: string = '';
  
  constructor(
    private modalService: NgbModal,
    public activeModal: NgbActiveModal,
    private landingService: LandingService,
    private adminService: AdminService,
    private fb: FormBuilder
  ) { }

  async ngOnInit() {
    this.registerForm = this.fb.group({
      role: ['', Validators.required],
      industry: ['', Validators.required],
      email: ['', Validators.required],
      passsword: ['', Validators.required],
      confirm_pass: ['', Validators.required]
    });

    this.registerForm.patchValue({role: this.role})
    this.registerForm.patchValue({industry: this.industry})
    this.registerForm.patchValue({email: this.email})
    this.registerForm.patchValue({password: this.password})
    this.registerForm.patchValue({confirm_pass: this.confirm_pass})

    this.adminService.getCategories();
    this.load();
  }

  login() {
    this.activeModal.close();
    this.modalService.open(LoginComponent)
  }

  onSubmit(input: any, success: any) {
    console.log('role', input)

    const employerInfo: EmployerInfo = {
      logo: undefined,
      banner: undefined,
      company: undefined,
      about: undefined,
      location: undefined,
      industry: input.industry
    }

    const data: Data = {
      employerInfo: employerInfo
    }

    const role: Roles = {
      role: input.role.role,
      data: data
    }

    const user: Users = {
      email: input.email,
      password: input.password,
      confirm_pass: input.confirm_pass,
      role: role
    }

    this.landingService.postUser(user).subscribe(
      (data) => {
        this.userData = JSON.stringify(data);
        this.activeModal.close()
        this.modalService.open(success,  { windowClass : "profile-status-modal"})
      }, err => {
        this.err = err.error.error
      }
    )
  }

  load() {
    this.landingService.getRoles().subscribe(
      res => {
        this.roles = res;
      }
    )
    this.categoriesSubscription = this.adminService.$categories.subscribe(val => {
        this.categories = val;

        this.categories.filter((name: any) => {
          this.category = name.category;
          this.industryName.push({ category: this.category })
        })
    })

    this.categoriesLoadingSubscription = this.adminService.$isCategoryLoading.subscribe(val => {
        this.isListLoading = val;
    })
  }

  selectedRole(role: any) {
    this.selectRole = role;
  }

  isSelected(role: any) {
    this.activeRole = this.selectRole?.role;
    return this.selectRole && this.selectRole === role;
  };

  ngOnDestroy() {
    this.categoriesSubscription?.unsubscribe();
    this.categoriesLoadingSubscription?.unsubscribe();
  }

}
