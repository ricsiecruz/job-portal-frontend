import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { environment } from 'src/environment';
import { EmployerService } from '../../dashboard/employer/employer.service';
import { LandingService } from '../landing.service';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/authentication.service';
import { Users } from 'src/app/models/users';
import { Applicants, CandidateInfo, JobPosts } from 'src/app/models/roles';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.scss']
})
export class JobDetailsComponent {

  id: any;
  jobId: any;

  API_URL = (environment.apiUrl);

  jobsSubscription?: Subscription;
  jobsLoadingSubscription?: Subscription;
  applicantsSub?: Subscription;
  applicantsLoadingSubscription?: Subscription;
  applicants: any;
  jobs: any;
  isListLoading?: boolean;

  logo: any;
  employer: any;
  currentUser!: Users;
  currentUserId: any;
  applied: any;
  candidate?: CandidateInfo;
  editor = ClassicEditor;
  editorConfig = {
    toolbar: [],
    readonly: true,
    editor: {
      isReadOnly: true,
      isDisabled: true
    }
  }

  constructor(
    private route: ActivatedRoute,
    private landingService: LandingService,
    private employerService: EmployerService,
    private authenticationService: AuthenticationService,
    private modalService: NgbModal
  ) {
    this.id = this.route.snapshot.paramMap.get("id");
    this.jobId = this.route.snapshot.paramMap.get("jobId");
    this.employerService.getUserInfo(this.id).subscribe(res => {
      this.employer = res;
    })
    this.landingService.getJobPost2(this.id, this.jobId)
    this.landingService.getApplicants(this.id, this.jobId)
    this.authenticationService.currentUser.subscribe(
      x => {
        this.currentUser = x;
        this.currentUserId = this.currentUser["_id"];
      }
    );
  }

  ngOnInit() {
    this.employerService.getUserInfo(this.landingService.user).subscribe(res => {
      this.candidate = res.role?.data?.candidateInfo;
    })
    this.setSubscriptions();
  }

  apply(currentUserId: any, success: any, fail: any) {

    const applicants: Applicants = {
      id: currentUserId,
      email: this.currentUser.email,
      date_applied: Date.now(),
      candidateInfo: this.candidate
    }

    this.landingService.apply(this.id, this.jobId, applicants)
      .subscribe({
        next: (data) => {
          this.modalService.open(success,  { windowClass : "profile-status-modal"})
        },
        error:(err) => {
          this.modalService.open(fail,  { windowClass : "profile-status-modal"})
        }
      })
  }

  setSubscriptions() {
    this.jobsSubscription = this.landingService.$jobs.subscribe(val => {
      this.jobs = val;
    })

    this.jobsLoadingSubscription = this.landingService.$isJobsLoading.subscribe(val => {
        this.isListLoading = val;
    })

    this.applicantsSub = this.landingService.$applicants.subscribe(val => {
      this.applicants = val;
      const isUserApplied = this.isUserApplied(this.applicants);
      this.applied = isUserApplied;
    })

    this.applicantsLoadingSubscription = this.landingService.$isApplicantsLoading.subscribe(val => {
        this.isListLoading = val;
    })

  }
  
  isUserApplied(applicants: any): boolean {
    if(Array.isArray(applicants.applicants)) {
      const isApplied = applicants.applicants.some((applicant: any) => {
        return applicant.id === this.currentUserId
      })
      return isApplied
    }
    return false
  }

  view() {
    this.employerService.getUserInfo(this.id).subscribe(res => {
      this.employer = res;
    })
  }

  ngOnDestroy() {
    this.jobsSubscription?.unsubscribe();
    this.jobsLoadingSubscription?.unsubscribe();
  }
}
