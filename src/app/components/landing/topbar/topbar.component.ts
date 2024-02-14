import { Component, ElementRef, HostListener } from '@angular/core';
import { LandingService } from '../landing.service';
import { Users } from 'src/app/models/users';
import { AuthenticationService } from 'src/app/authentication.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from '../login/login.component';
import { EmployerService } from '../../dashboard/employer/employer.service';
import { environment } from 'src/environment';
import { CandidateService } from '../../dashboard/candidate/candidate.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent {

  @HostListener('document: click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if(!this.elementRef.nativeElement.contains(event.target)) {
      this.isOpen = false;
    }
  }

  API_URL = (environment.apiUrl);
  
  currentUser?: Users;
  id: any;
  img: string = '';
  isMobile = false;
  isOpen: boolean = false;
  
  constructor(
    private employerService: EmployerService,
    private landingService: LandingService,
    private modalService: NgbModal,
    public authenticationService: AuthenticationService,
    private elementRef: ElementRef
  ) {
    this.authenticationService.currentUser.subscribe(
      x => {
        this.currentUser = x;
        this.id = this.currentUser["_id"];
        this.landingService.user = this.currentUser["_id"];
        this.landingService.role = this.currentUser?.role?.role;
      }
    );
    this.employerService.getUserInfo(this.id).subscribe((res: any) => {
      if(res.role.role === 'employer' && res.role.data.employerInfo.logo === undefined) {
        this.img = 'logo.png'
      } 
      if(res.role.role === 'employer' && res.role.data.employerInfo.logo !== undefined) {
        this.img = this.currentUser?.role?.data?.employerInfo?.logo;
      } 
      else {
        this.img = this.currentUser?.role?.data?.candidateInfo?.image;
      }
    })
  }

  ngOnInit(): void {
    this.isMobile = this.getIsMobile();
    window.onresize = () => {
      this.isMobile = this.getIsMobile();
    };
  }

  getIsMobile(): boolean {
    const w = document.documentElement.clientWidth;
    const breakpoint = 992;
    console.log(w);
    if (w < breakpoint) {
      return true;
    } else {
      return false;
    }
  }

  toggleDrawer() {
    this.isOpen = !this.isOpen;
  }

  login() {
    this.modalService.open(LoginComponent)
  }
  
  logout() {
    this.authenticationService.logout();
  }

}
