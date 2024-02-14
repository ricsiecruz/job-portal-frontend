import { ChangeDetectorRef, Component, EventEmitter, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { Position, Setup } from 'src/app/models/category';
import { Users } from 'src/app/models/users';
import { AdminService } from '../../dashboard/admin/admin.service';
import { EmployerService } from '../../dashboard/employer/employer.service';
import { LandingService } from '../landing.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-candidate-search',
  templateUrl: './candidate-search.component.html',
  styleUrls: ['./candidate-search.component.scss']
})
export class CandidateSearchComponent {
  @Output() filterChanged = new EventEmitter<any>();
  @Output() clearFilters = new EventEmitter<void>();

  skillsSubscription?: Subscription;
  skillsLoadingSubscription?: Subscription;

  isListLoading?: boolean;

  skills: any;
  dropdownSettings = {};

  dropdownList: any;
  searchForm!: FormGroup;
  selectedSkills: any;
  itemName: any;
  // itemName = [
  //   { itemName: '' }
  // ]

  constructor(
    private adminService: AdminService,
    private landingService: LandingService,
    private employerService: EmployerService,
    private cdr: ChangeDetectorRef,
    private fb: FormBuilder
  ) {}

  ngOnInit() {

    this.searchForm = this.fb.group({
      skills: [[]]
    })
    
    this.adminService.getSkills();
    this.setSubscriptions();
    this.dropdownSettings = {
      singleSelection: false,
      text: 'Select Skills',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      enableSearchFilter: true,
      classes: 'myclass custom-class'
    };

  }

  onItemSelect(item: any) {
    // console.log('on item select item', item);
  }
  OnItemDeSelect(item: any) {
    console.log('on item deselect item', item);
  }
  onSelectAll(items: any) {
    console.log('on select all items', items);
  }
  onDeSelectAll(items: any) {
    console.log('on deselect all items', items);
  }

  setSubscriptions() {

    this.skillsSubscription = this.adminService.$skills.subscribe(val => {
      this.skills = val;
    })

    this.skillsLoadingSubscription = this.adminService.$isSkillsLoading.subscribe(val => {
      this.isListLoading = val;
    })

  }

  applyFilter() {
    const filter = { skills: this.selectedSkills.itemName }
    this.selectedSkills.filter((loc: any) => {
      this.itemName = loc.itemName
    })
    this.filterChanged.emit(this.itemName)
  }

  clearFilter() {
    this.skills = 'Select Skills';
    this.clearFilters.emit();
  }
  
  ngOnDestroy() {
    this.skillsSubscription?.unsubscribe();
    this.skillsLoadingSubscription?.unsubscribe();
  }
}
