import { Component } from '@angular/core';
import { JobPosts } from 'src/app/models/roles';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmployerService } from '../employer.service';
import { LandingService } from 'src/app/components/landing/landing.service';
import { AuthenticationService } from 'src/app/authentication.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AdminService } from '../../admin/admin.service';
import { Category, Position, Rate, Setup } from 'src/app/models/category';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-employer-job-posts-details',
  templateUrl: './employer-job-posts-details.component.html',
  styleUrls: ['./employer-job-posts-details.component.scss']
})
export class EmployerJobPostsDetailsComponent {

  public currentUserSubject: BehaviorSubject<JobPosts>;
  public currentUser: Observable<JobPosts>;

  data: any;
  detailsForm!: FormGroup;
  designation?: string;
  description: any;
  category: any;
  position: any;
  minSalary: number = 0;
  maxSalary: number = 0;
  
  job: any;
  categoriesSubscription?: Subscription;
  categoriesLoadingSubscription?: Subscription;
  categories: Category[] = []
  positionsSubscription?: Subscription;
  positionsLoadingSubscription?: Subscription;
  positions: Position[] = []
  setupSubscription?: Subscription;
  setupLoadingSubscription?: Subscription;
  setup: Setup[] = []
  rateSubscription?: Subscription;
  rateLoadingSubscription?: Subscription;
  rate: Rate[] = []
  isListLoading?: boolean;

  editor = ClassicEditor;
  user: any;
  userSubscription?: Subscription;
  constructor(
    private fb: FormBuilder,
    private adminService: AdminService,
    private landingService: LandingService,
    private employerService: EmployerService,
    private modalService: NgbModal,
    private authService: AuthenticationService
    ) {
    this.userSubscription = this.authService.currentUser.subscribe(user => {
      this.user = user['user'];
    })
    this.currentUserSubject = new BehaviorSubject<JobPosts>(JSON.parse(localStorage.getItem('selectedJobPost') || 'null'));
    this.currentUser = this.currentUserSubject.asObservable();
    this.data = this.currentUserSubject.value;
    this.landingService.getJobPost(this.user._id, this.data._jobId).subscribe(res => {
      this.job = res.job_details;
      this.description = this.job.description;
    })
  }

  ngOnInit() {
    this.detailsForm = this.fb.group({
      designation: [''],
      description: [''],
      category: [''],
      position: [''],
      setup: [''],
      rate: [''],
      minSalary: [''],
      maxSalary: ['']
    })

    this.adminService.getCategories()
    this.adminService.getPositions()
    this.adminService.getSetup()
    this.adminService.getRate();
    this.setSubscriptions()
    
    this.designation = this.data.designation;    
    this.category = this.data.category;
    this.position = this.data.position;
    this.setup = this.data.setup;
    this.rate = this.data.rate;
    this.minSalary = this.data.minSalary;
    this.maxSalary = this.data.maxSalary;

    this.detailsForm.patchValue({designation: this.designation});
    this.detailsForm.patchValue({description: this.description});
    this.detailsForm.patchValue({category: this.category})
    this.detailsForm.patchValue({position: this.position})
    this.detailsForm.patchValue({setup: this.setup})
    this.detailsForm.patchValue({rate: this.rate})
    this.detailsForm.patchValue({minSalary: this.minSalary})
    this.detailsForm.patchValue({maxSalary: this.maxSalary})

    this.detailsForm.controls['category'].setValue(this.category)
    this.detailsForm.controls['position'].setValue(this.position)
    this.detailsForm.controls['setup'].setValue(this.setup)
    this.detailsForm.controls['rate'].setValue(this.rate)
  }

  setSubscriptions() {
    this.categoriesSubscription = this.adminService.$categories.subscribe(val => {
      this.categories = val;
    })

    this.categoriesLoadingSubscription = this.adminService.$isCategoryLoading.subscribe(val => {
      this.isListLoading = val;
    })

    this.positionsSubscription = this.adminService.$positions.subscribe(val => {
        this.positions = val;
    })

    this.positionsLoadingSubscription = this.adminService.$isPositionLoading.subscribe(val => {
        this.isListLoading = val;
    })

    this.setupSubscription = this.adminService.$setup.subscribe(val => {
        this.setup = val;
    })

    this.setupLoadingSubscription = this.adminService.$isSetupLoading.subscribe(val => {
        this.isListLoading = val;
    })
    this.rateSubscription = this.adminService.$rate.subscribe(val => {
        this.rate = val;
    })

    this.rateLoadingSubscription = this.adminService.$isRateLoading.subscribe(val => {
        this.isListLoading = val;
    })
  }

  ngOnDestroy() {
    this.userSubscription?.unsubscribe();
    this.categoriesSubscription?.unsubscribe();
    this.categoriesLoadingSubscription?.unsubscribe();
    this.positionsSubscription?.unsubscribe();
    this.positionsLoadingSubscription?.unsubscribe();
    this.setupSubscription?.unsubscribe();
    this.setupLoadingSubscription?.unsubscribe();
    this.rateSubscription?.unsubscribe();
    this.rateLoadingSubscription?.unsubscribe();
  }

  save(success: any, fail: any) {
    const job_post: JobPosts = {
      _jobId: this.currentUserSubject.value._jobId,
      date_posted: this.currentUserSubject.value.date_posted,
      designation: this.detailsForm.value.designation,
      description: this.detailsForm.value.description,
      category: this.detailsForm.value.category,
      position: this.detailsForm.value.position,
      setup: this.detailsForm.value.setup,
      rate: this.detailsForm.value.rate,
      minSalary: this.detailsForm.value.minSalary,
      maxSalary: this.detailsForm.value.maxSalary,
      applicants: this.data.applicants
    }

    this.employerService.updateJobPost(this.user._id, this.data._jobId, job_post)
      .subscribe({
        next: (data) => {
          this.modalService.open(success,  { windowClass : "profile-status-modal"})
        },
        error:(err) => {
          this.modalService.open(fail,  { windowClass : "profile-status-modal"})
        }
      })
  }
}
