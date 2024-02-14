import { Component, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';
import { LandingService } from '../landing.service';
import { EmployerService } from '../../dashboard/employer/employer.service';
import { Subscription } from 'rxjs';
import { Setup, Position } from 'src/app/models/category';
import { Users } from 'src/app/models/users';
import { AdminService } from '../../dashboard/admin/admin.service';

@Component({
  selector: 'app-search-filter',
  templateUrl: './search-filter.component.html',
  styleUrls: ['./search-filter.component.scss']
})
export class SearchFilterComponent {

  @HostListener('document: click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if(!this.elementRef.nativeElement.contains(event.target)) {
      this.isOpen = false;
    }
  }

  @Output() filterChanged = new EventEmitter<any>();
  @Output() clearFilters = new EventEmitter<void>();

  categories: any;
  location: any;
  city: any;
  loc = [
    { city: '' }
  ]

  positionsSubscription?: Subscription;
  positionsLoadingSubscription?: Subscription;
  setupSubscription?: Subscription;
  setupLoadingSubscription?: Subscription;
  jobs: Users[] = [];
  positions: Position[] = [];
  setups: Setup[] = [];
  isListLoading?: boolean;

  designation: string = '';
  employerLocation: string = '';
  position: string = '';
  setup: string = '';
  isMobile = false;
  isOpen: boolean = false;

  constructor(
    private adminService: AdminService,
    private landingService: LandingService,
    private employerService: EmployerService,
    private elementRef: ElementRef
  ) {}

  ngOnInit() {
    this.isMobile = this.getIsMobile();
    window.onresize = () => {
      this.isMobile = this.getIsMobile();
    };
    this.landingService.getCategory().subscribe(res => {
      this.categories = res;
    })

    this.employerService.getLocationApi().subscribe(res => {

      this.location = res;
      
      const city = this.location.filter((loc: any) => {
        this.city = loc.name;
      
        const resolveHtml = ''
    
        const regExp = /City of/gi
        this.city = this.city.replace(regExp, resolveHtml)

        this.loc.push({ city: this.city })

        return loc.name
      })

    })

    this.setSubscriptions();

  }

  toggleDrawer() {
    this.isOpen = !this.isOpen;
    console.log('open', this.isOpen)
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

  setSubscriptions() {

    this.positionsSubscription = this.adminService.$positions.subscribe(val => {
        this.positions = val;
    })

    this.positionsLoadingSubscription = this.adminService.$isPositionLoading.subscribe(val => {
        this.isListLoading = val;
    })

    this.setupSubscription = this.adminService.$setup.subscribe(val => {
        this.setups = val;
    })

    this.setupLoadingSubscription = this.adminService.$isSetupLoading.subscribe(val => {
        this.isListLoading = val;
    })

  }

  applyFilter() {
    const filter = { designation: this.designation, location: this.employerLocation, position: this.position, setup: this.setup }
    this.filterChanged.emit(filter)
  }

  clearFilter() {
    this.designation = '';
    this.employerLocation = 'Select City';
    this.position = 'Select Position';
    this.setup = 'Select Setup';
    this.clearFilters.emit();
  }

}
