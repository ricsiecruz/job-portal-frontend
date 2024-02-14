import { ChangeDetectorRef, Component, ElementRef, HostListener } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'src/environment';
import { AuthenticationService } from './authentication.service';
import { EmployerService } from './components/dashboard/employer/employer.service';
import { LandingService } from './components/landing/landing.service';
import { LoginComponent } from './components/landing/login/login.component';
import { Users } from './models/users';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'job-portal-frontend';

  @HostListener('window: resize', ['$event'])
  onResize(event: any) {
    this.isMobile = this.getIsMobile();
  }

  @HostListener('document: click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if(!this.elementRef.nativeElement.contains(event.target)) {
      this.isOpen = false;
    }
  }

  API_URL = (environment.apiUrl);
  
  img: string = '';
  isMobile = false;
  isOpen: boolean = false;
  user: any;
  userSubscription?: Subscription;
  
  constructor(
    private modalService: NgbModal,
    public authenticationService: AuthenticationService,
    private elementRef: ElementRef
  ) {

    this.userSubscription = this.authenticationService.currentUser.subscribe(user => {
      this.user = user;
    })
    if(this.user?.['user'].role?.role === 'employer' && this.user?.['user'].role?.data.employerInfo.logo === undefined) {
      this.img = 'logo.png'
    } 
    if(this.user?.['user'].role?.role === 'employer' && this.user?.['user'].role?.data.employerInfo.logo !== undefined) {
      this.img = this.user?.['user'].role?.data?.employerInfo?.logo;
    } 
    else {
      this.img = this.user?.['user'].role?.data?.candidateInfo?.image;
    }
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

  ngOnDestroy() {
    this.userSubscription?.unsubscribe()
  }
}
