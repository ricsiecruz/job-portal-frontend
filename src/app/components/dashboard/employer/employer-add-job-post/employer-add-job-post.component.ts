import { Component } from '@angular/core';
import { LandingService } from 'src/app/components/landing/landing.service';
import { EmployerService } from '../employer.service';
import { AuthenticationService } from 'src/app/authentication.service';
import { Users } from 'src/app/models/users';
import { AdminService } from '../../admin/admin.service';
import { Subscription } from 'rxjs';
import { Position, Rate, Setup } from 'src/app/models/category';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-employer-add-job-post',
  templateUrl: './employer-add-job-post.component.html',
  styleUrls: ['./employer-add-job-post.component.scss']
})

export class EmployerAddJobPostComponent {
  designation?: string;
  description?: string;
  category?: any;
  selectedCategory: any;
  isListLoading?: boolean;

  positionsSubscription?: Subscription;
  positionsLoadingSubscription?: Subscription;
  positions: Position[] = [];
  selectedPosition: any;

  setupSubscription?: Subscription;
  setupLoadingSubscription?: Subscription;
  setup: Setup[] = [];
  selectedSetup: any;

  rateSubscription?: Subscription;
  rateLoadingSubscription?: Subscription;
  rate: Rate[] = [];
  selectedRate: any;

  minSalary: any;
  maxSalary: any;

  editor = ClassicEditor;
  user: any;
  userSubscription?: Subscription;

  constructor(
    private landingService: LandingService,
    private adminService: AdminService,
    private authService: AuthenticationService,
    private modalService: NgbModal
  ) {
    this.userSubscription = this.authService.currentUser.subscribe(user => {
      this.user = user['user'];
    })

    this.adminService.getPositions();
    this.adminService.getSetup();
    this.adminService.getRate();
  }

  ngOnInit() {
    this.landingService.getCategory().subscribe(res => {
      this.category = res;
    })

    this.setSubscriptions();
  }

  setSubscriptions() {
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
    this.positionsSubscription?.unsubscribe();
    this.positionsLoadingSubscription?.unsubscribe();
    this.setupSubscription?.unsubscribe();
    this.setupLoadingSubscription?.unsubscribe();
    this.rateSubscription?.unsubscribe;
    this.rateLoadingSubscription?.unsubscribe();
  }

  onOptionsSelected() {
    this.category.filter((t: any) => {
      t.category == this.selectedCategory.category;
    });

  }

  positionSelected() {
    this.positions.filter((t: any) => {
      t.position == this.selectedPosition.position;
    })
  }

  setupSelected() {
    this.setup.filter((t: any) => {
      t.setup == this.selectedSetup.setup;
    })
  }

  rateSelected() {
    this.rate.filter((t: any) => {
      t.rate == this.selectedRate.rate;
    })
  }

  onSubmit(data: any, success: any, fail: any) {

    const payload = {
      designation: data.designation,
      description: data.description,
      category: this.selectedCategory.category,
      position: this.selectedPosition.position,
      setup: this.selectedSetup.setup,
      rate: this.selectedRate.rate,
      minSalary: data.minSalary,
      maxSalary: data.maxSalary
    }

    this.landingService.postJob(this.user._id, payload).subscribe({
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
