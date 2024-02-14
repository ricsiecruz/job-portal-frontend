import { Component, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmployerService } from '../../dashboard/employer/employer.service';
import { environment } from 'src/environment';
import { LandingService } from '../landing.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CandidateInfo, Invited, JobPosts } from 'src/app/models/roles';

@Component({
  selector: 'app-candidate-profile',
  templateUrl: './candidate-profile.component.html',
  styleUrls: ['./candidate-profile.component.scss']
})
export class CandidateProfileComponent {

  API_URL = (environment.apiUrl);

  @ViewChild("inviteModal") inviteModal?: TemplateRef<any>;

  id: any;
  user: any;
  skill: any;
  skillList = [
    { itemName: '' }
  ]
  role: string = '';
  designation: string = '';
  jobs: any;
  selectedJobs: JobPosts[] = [];
  jobId: any;
  invited: any;

  constructor(
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private employerService: EmployerService,
    private landingService: LandingService
  ) {
    this.id = this.route.snapshot.paramMap.get("id");
    this.employerService.getUserInfo(this.id).subscribe(res => {
      this.user = res;
      this.user.role.data.candidateInfo.skills.filter((item: any) => {
        this.skill = item.itemName
        this.skillList.push({ itemName: this.skill })
      })
    })
    this.role = this.landingService.role;
  }

  toggle(index: number): void {
    const job = this.jobs[index];
    if(this.isSelected(job)) {
      this.selectedJobs = this.selectedJobs.filter(selectedJob => selectedJob !== job)
    } else {
      this.selectedJobs.push(job)
    }
  }

  isSelected(job: JobPosts): boolean {
    return this.selectedJobs.includes(job)
  }

  invite() {
    this.employerService.getUserInfo(this.landingService.user).subscribe(res => {
      this.jobs = res.role?.data?.job_posts;
      this.jobs.map((invited: any) => {
        invited.invited.map((data: any) => {
          this.invited = data.id;
        })
      })
    })
    this.modalService.open(this.inviteModal)
  }

  inviteCandidate(success: any, fail: any): void {
    const invited: Invited = { 
      id: this.user._id,
      email: this.user.email,
      date_invited: Date.now(),
      candidateInfo: {...this.user.role.data.candidateInfo} 
    }
    this.selectedJobs.map(item => {
      this.jobId = item._jobId;
    })

    this.landingService.invite(this.landingService.user, this.jobId, invited)
      .subscribe({
        next: (data) => {
          this.modalService.open(success,  { windowClass : "profile-status-modal"})
        },
        error:(err) => {
          this.modalService.open(fail,  { windowClass : "profile-status-modal"})
        }
      })
  }

  isCandidateInvited(job: JobPosts): boolean {
    return job?.invited?.some(invitedCandidate => invitedCandidate.id === this.user._id) ?? false
  } 

  downloadFile(resume: string) {
    window.open(this.API_URL + resume, '_blank')
  }

}
