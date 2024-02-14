import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { AuthenticationService } from 'src/app/authentication.service';
import { CandidateInfo, Education, Roles, Work } from 'src/app/models/roles';
import { Users } from 'src/app/models/users';
import { environment } from 'src/environment';
import { AdminService } from '../../admin/admin.service';
import { EmployerService } from '../../employer/employer.service';
import { CandidateService } from '../candidate.service';

@Component({
  selector: 'app-candidate-profile',
  templateUrl: './candidate-profile.component.html',
  styleUrls: ['./candidate-profile.component.scss']
})
export class CandidateProfileComponent {
  API_URL = (environment.apiUrl);

  @ViewChild('fileInput') el?: ElementRef;

  editFile: boolean = true;
  removeUpload: boolean = false;

  currentUser!: Users;
  image?: any;
  banner?: any;
  email?: string;
  name?: string;
  phone?: string;
  designation?: string;
  location: any;
  salary: any;
  city: any;
  skills: any;
  degrees: any;
  courses: any;
  universities: any;
  resume: any;
  about?: string;
  loc = [
    { city: '' }
  ]
  profileForm!: FormGroup;
  isSuccess: boolean = false;
  isFail: boolean = false;
  
  skillsSubscription?: Subscription;
  skillsLoadingSubscription?: Subscription;
  degreesSubscription?: Subscription;
  degreesLoadingSubscription?: Subscription;
  coursesSubscription?: Subscription;
  coursesLoadingSubscription?: Subscription;
  universitiesSubscription?: Subscription;
  universitiesLoadingSubscription?: Subscription;
  isListLoading?: boolean;
  selectedItems: any;
  dropdownSettings = {};

  selectedSkills: any;
  yearsArray: number[] = [];
  show: boolean[] = [];
  showWork: boolean[] = [];
  userInfo: any;
  user: any;
  userSubscription?: Subscription;

  constructor(
    private authService: AuthenticationService,
    private adminService: AdminService,
    private employerService: EmployerService,
    private candidateService: CandidateService,
    private fb: FormBuilder,
    private modalService: NgbModal,
    public activeModal: NgbActiveModal
  ) { 
    this.userSubscription = this.authService.currentUser.subscribe(user => {
      this.user = user['user'];
    })
    this.adminService.getCourses();
    this.adminService.getDegrees();
    this.adminService.getUniversities();
    this.employerService.getUserInfo(this.user._id).subscribe((res: any) => {
      this.userInfo = res.role.data.candidateInfo;
      this.image = res.role.data.candidateInfo.image;
      this.employerService.logo = this.image;
      this.banner = res.role.data.candidateInfo.banner;
      this.employerService.banner = this.banner;
      this.selectedSkills = res.role.data.candidateInfo.skills;
      res.role.data.candidateInfo.education?.filter((degree: any) => {
        const educationDetailGroup = this.fb.group({
          degree: [degree.degree],
          course: [degree.course],
          year: [degree.year],
          university: [degree.university]
        })
        this.education.push(educationDetailGroup)
      })
      
      this.image = this.userInfo?.image;
      this.banner = this.userInfo?.banner;
      this.email = this.user.email!;
      this.name = this.userInfo?.name;
      this.phone = this.userInfo?.phone;
      this.designation = this.userInfo.designation;
      this.about = this.userInfo.about;
      this.location = this.userInfo?.location;
      this.salary = this.userInfo?.salary;
      this.resume = this.userInfo?.resume;
    
      if(this.image === undefined) {
        this.image = 'image.png'
      }
      if(this.banner === undefined) {
        this.banner = 'banner-candidate.jpg'
      }

      this.profileForm.controls['location'].setValue(this.location)

      this.profileForm.patchValue({image: this.image})
      this.profileForm.patchValue({banner: this.banner})
      this.profileForm.patchValue({email: this.email})
      this.profileForm.patchValue({name: this.name})
      this.profileForm.patchValue({phone: this.phone})
      this.profileForm.patchValue({designation: this.designation})
      this.profileForm.patchValue({about: this.about})
      this.profileForm.patchValue({location: this.location})
      this.profileForm.patchValue({salary: this.salary})
      this.profileForm.patchValue({resume: this.resume})

      res.role.data.candidateInfo.work?.filter((work: any) => {
        const workDetails = this.fb.group({
          company: [work.company],
          title: [work.title],
          fromYear: [work.fromYear],
          toYear: [work.toYear],
          description: [work.description]
        })
        this.work.push(workDetails)
      })
    })
  }

  async ngOnInit() { 
    this.currentUser = this.authService.currentUserValue;
    this.employerService["_id"] = this.currentUser["_id"];

    this.profileForm = this.fb.group({
      image: [''],
      banner: [''],
      email: [''],
      name: [''],
      phone: [''],
      designation: [''],
      location: [''],
      salary: [''],
      skills: [[]],
      resume: [''],
      about: [''],
      education: this.fb.array([]),
      work: this.fb.array([])
    })
    
    this.employerService.getLocationApi().subscribe(res => {

      this.location = res;
      
      this.location.filter((loc: any) => {
        this.city = loc.name;
      
        const resolveHtml = ''
    
        const regExp = /City of/gi
        this.city = this.city.replace(regExp, resolveHtml)

        this.loc.push({ city: this.city })

      })

    })

    this.adminService.getSkills();
    this.setSubscriptions();
    this.dropdownSettings = {
      singleSelection: false,
      text: 'Select Countries',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      enableSearchFilter: true,
      classes: 'myclass custom-class'
    };
    this.yearsArray = this.generateYears(1990, new Date().getFullYear())
  }

  toggle(i: any) {
    this.show[i] = !this.show[i];
  }

  toggleWork(i: any) {
    this.showWork[i] = !this.showWork[i];
  }

  get education(): FormArray {
    return this.profileForm.get('education') as FormArray;
  }

  get work(): FormArray {
    return this.profileForm.get('work') as FormArray;
  }

  getEducationGroup(index: number): FormGroup {
    return this.education.controls[index] as FormGroup;
  }

  getWork(index: number): FormGroup {
    return this.work.controls[index] as FormGroup;
  }

  addEducation(): void {
    const newIndex = this.education.length;
    this.education.push(this.fb.group({
      degree: [''],
      course: [''],
      year: [''],
      university: ['']
    }))
    this.show[newIndex] = true;
  }

  addWork(): void {
    const newIndex = this.work.length;
    this.work.push(this.fb.group({
      company: [''],
      title: [''],
      fromYear: [''],
      toYear: [''],
      description: ['']
    }))
    this.showWork[newIndex] = true;
  }

  removeEducation(index: number): void {
    this.education.removeAt(index);
  }

  removeWork(index: number): void {
    this.work.removeAt(index);
  }
     
  generateYears(startYear: number, endYear: number) {
    const years: number[] = [];
    for(let year = endYear; year >= startYear; year--) {
      years.push(year)
    }
    return years
  }

  onItemSelect(item: any) {
    console.log('on item select item', item);
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

  selectFile(event: any) {
    this.resume = event.target.files[0];
  }

  downloadFile(resume: string) {
    window.open(this.API_URL + resume, '_blank')
  }

  setSubscriptions() {
    this.skillsSubscription = this.adminService.$skills.subscribe(val => {
      this.skills = val;
    })

    this.skillsLoadingSubscription = this.adminService.$isSkillsLoading.subscribe(val => {
      this.isListLoading = val;
    })

    this.degreesSubscription = this.adminService.$degree.subscribe(val => {
      this.degrees = val;
    })

    this.degreesLoadingSubscription = this.adminService.$isDegreeLoading.subscribe(val => {
      this.isListLoading = val;
    })
    
    this.coursesSubscription = this.adminService.$course.subscribe(val => {
      this.courses = val;
    })

    this.coursesLoadingSubscription = this.adminService.$isCourseLoading.subscribe(val => {
      this.isListLoading = val;
    })
    
    this.universitiesSubscription = this.adminService.$university.subscribe(val => {
      this.universities = val;
    })

    this.universitiesLoadingSubscription = this.adminService.$isUnivLoading.subscribe(val => {
      this.isListLoading = val;
    })

  }

  ngOnDestroy() {
    this.userSubscription?.unsubscribe();
    this.skillsSubscription?.unsubscribe();
    this.skillsLoadingSubscription?.unsubscribe();
    this.degreesSubscription?.unsubscribe();
    this.degreesLoadingSubscription?.unsubscribe();
    this.coursesSubscription?.unsubscribe();
    this.coursesLoadingSubscription?.unsubscribe();
    this.universitiesSubscription?.unsubscribe();
    this.universitiesLoadingSubscription?.unsubscribe();
  }

  uploadFile(event: any) {
    const file = event.target.files[0];
    this.profileForm.get('image')?.setValue(file);
    this.image = file;
    this.profileForm.get('image')?.value;
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
    // this.image = 'assets/image.png'
    this.image = 'image.png'
    console.log('replace', this.image)
    // this.image = 'https://i.pinimg.com/236x/d6/27/d9/d627d9cda385317de4812a4f7bd922e9--man--iron-man.jpg';
    this.editFile = true;
    this.removeUpload = false;
    this.profileForm.patchValue({
      image: [null]
    });
  }

  // Function to remove uploaded file
  removeBanner() {
    // let newFileList = Array.from(this.el?.nativeElement.files);
    // this.image = 'assets/image.png'
    this.banner = 'banner-candidate.jpg'
    console.log('replace', this.banner)
    // this.image = 'https://i.pinimg.com/236x/d6/27/d9/d627d9cda385317de4812a4f7bd922e9--man--iron-man.jpg';
    this.editFile = true;
    this.removeUpload = false;
    this.profileForm.patchValue({
      banner: [null]
    });
  }

  save(success: any, fail: any) {

    const education: Education[] = this.education.controls.map((educationGroup) => {
      return {
        degree: educationGroup.get('degree')?.value,
        course: educationGroup.get('course')?.value,
        year: educationGroup.get('year')?.value,
        university: educationGroup.get('university')?.value
      }
    })

    const work: Work[] = this.work.controls.map((work) => {
      return {
        company: work.get('company')?.value,
        title: work.get('title')?.value,
        fromYear: work.get('fromYear')?.value,
        toYear: work.get('toYear')?.value,
        description: work.get('description')?.value
      }
    })

    const candidateInfo: CandidateInfo = {
      image: this.image,
      banner: this.banner,
      name: this.profileForm.value.name,
      phone: this.profileForm.value.phone,
      designation: this.profileForm.value.designation,
      location: this.profileForm.value.location,
      salary: this.profileForm.value.salary,
      skills: this.profileForm.value.skills,
      resume: this.resume,
      about: this.profileForm.value.about,
      education: education,
      work: work
    }

    this.candidateService.updateProfile(this.user._id, candidateInfo)
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
