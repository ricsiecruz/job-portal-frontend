import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Data } from '@angular/router';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationService } from 'src/app/authentication.service';
import { Roles, EmployerInfo } from 'src/app/models/roles';
import { Users } from 'src/app/models/users';
import { EmployerService } from '../employer.service';
import { environment } from 'src/environment';
import { AdminService } from '../../admin/admin.service';
import { Subscription } from 'rxjs';
import { Category } from 'src/app/models/category';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-employer-profile',
  templateUrl: './employer-profile.component.html',
  styleUrls: ['./employer-profile.component.scss']
})
export class EmployerProfileComponent {

  API_URL = (environment.apiUrl);

  @ViewChild('fileInput') el?: ElementRef;

  editFile: boolean = true;
  removeUpload: boolean = false;

  currentUser!: Users;
  logo?: any;
  banner?: any;

  company?: string;
  email?: string;
  industry: any;
  location: any;
  about?: string;

  id: any;
  city: any;
  profileForm!: FormGroup;
  isSuccess: boolean = false;
  isFail: boolean = false;
  loc = [
    { city: '' }
  ]
  
  categoriesSubscription?: Subscription;
  categoriesLoadingSubscription?: Subscription;
  categories: Category[] = []
  isListLoading?: boolean;
  editor = ClassicEditor;
  user: any;
  userSubscription?: Subscription;
  userInfo: any;

  constructor(
    private authService: AuthenticationService,
    private adminService: AdminService,
    private employerService: EmployerService,
    private fb: FormBuilder,
    private modalService: NgbModal,
    public activeModal: NgbActiveModal
  ) { 
    this.userSubscription = this.authService.currentUser.subscribe(user => {
      this.user = user['user'];
    })
    this.employerService.getUserInfo(this.user._id).subscribe((res: any) => {
      this.userInfo = res.role.data.employerInfo;
      this.logo = res.role.data.employerInfo.logo;
      this.employerService.logo = this.logo;
      this.banner = res.role.data.employerInfo.banner;
      this.employerService.banner = this.banner;

      this.logo = this.userInfo?.logo;
      this.banner = this.userInfo?.banner;

      this.email = this.user.email!;
      this.company = this.userInfo?.company;
      this.about = this.userInfo?.about;
      this.industry = this.userInfo?.industry;
      this.location = this.userInfo?.location;

      if(this.logo === undefined) {
        this.logo = 'logo.png'
      }
      if(this.banner === undefined) {
        this.banner = 'banner-detail.jpg'
      }

      this.profileForm.patchValue({logo: this.logo})
      this.profileForm.patchValue({banner: this.banner})
      this.profileForm.patchValue({email: this.email})
      this.profileForm.patchValue({company: this.company})
      this.profileForm.patchValue({about: this.about})
      this.profileForm.patchValue({industry: this.industry})
      this.profileForm.patchValue({location: this.location})
    })
  }

  async ngOnInit() { 
    this.currentUser = this.authService.currentUserValue;
    this.employerService["_id"] = this.currentUser["_id"];

    this.profileForm = this.fb.group({
      logo: [''],
      banner: [''],
      email: [''],
      company: [''],
      about: [''],
      industry: [''],
      location: ['']
    })

    this.profileForm.controls['industry'].setValue(this.industry)
    this.profileForm.controls['location'].setValue(this.location)

    console.log('location', this.location, this.industry)

    this.employerService.getLocationApi().subscribe(res => {

      this.location = res;
      
      this.location.filter((loc: any) => {
        this.city = loc.name;
      
        const resolveHtml = ''
    
        const regExp = /City of/gi
        this.city = this.city.replace(regExp, resolveHtml)

        this.loc.push({ city: this.city })

        // return loc.name
      })

    })

    this.adminService.getCategories();
    this.setSubscriptions();

  }

  setSubscriptions() {
    this.categoriesSubscription = this.adminService.$categories.subscribe(val => {
      this.categories = val;
    })

    this.categoriesLoadingSubscription = this.adminService.$isCategoryLoading.subscribe(val => {
      this.isListLoading = val;
    })
  }

  ngOnDestroy() {
    this.userSubscription?.unsubscribe();
    this.categoriesSubscription?.unsubscribe();
    this.categoriesLoadingSubscription?.unsubscribe();
  }

  uploadFile(event: any) {
    const file = event.target.files[0];
    this.profileForm.get('logo')?.setValue(file);
    this.logo = file;
    this.profileForm.get('logo')?.value;
  }

  uploadBanner(event: any) {
    const file = event.target.files[0];
    this.profileForm.get('banner')?.setValue(file);
    this.banner = file;
    this.profileForm.get('banner')?.value;
  }

  // Function to remove uploaded file
  removeUploadedFile() {
    // let newFileList = Array.from(this.el?.nativeElement.files);
    // this.logo = 'assets/logo.png'
    this.logo = 'logo.png'
    console.log('replace', this.logo)
    // this.logo = 'https://i.pinimg.com/236x/d6/27/d9/d627d9cda385317de4812a4f7bd922e9--man--iron-man.jpg';
    this.editFile = true;
    this.removeUpload = false;
    this.profileForm.patchValue({
      logo: [null]
    });
  }

  // Function to remove uploaded file
  removeBanner() {
    // let newFileList = Array.from(this.el?.nativeElement.files);
    // this.logo = 'assets/logo.png'
    this.banner = 'banner-detail.jpg'
    console.log('replace', this.banner)
    // this.logo = 'https://i.pinimg.com/236x/d6/27/d9/d627d9cda385317de4812a4f7bd922e9--man--iron-man.jpg';
    this.editFile = true;
    this.removeUpload = false;
    this.profileForm.patchValue({
      banner: [null]
    });
  }

  save(success: any, fail: any) {

    if(this.logo === undefined) {
      this.logo = 'logo.png'
    }

    if(this.banner === undefined) {
      this.banner = 'banner-detail.jpg'
    }

    const employerInfo: EmployerInfo = {
      logo: this.logo,
      banner: this.banner,
      company: this.profileForm.value.company,
      about: this.profileForm.value.about,
      location: this.profileForm.value.location,
      industry: this.profileForm.value.industry
    }

    console.log('employerInfo', employerInfo)

    this.employerService.updateProfile(this.user._id, employerInfo)
      .subscribe({
        next: () => {
          this.modalService.open(success,  { windowClass : "profile-status-modal"})
        },
        error:(err) => {
          console.log('err', err)
          this.modalService.open(fail,  { windowClass : "profile-status-modal"})
        }
      })
  }
}
