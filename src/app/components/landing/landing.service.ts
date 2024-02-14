import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { BehaviorSubject, Observable, delay, of } from "rxjs";
import { AuthenticationService } from "src/app/authentication.service";
import { Category } from "src/app/models/category";
import { Applicants, Invited, JobPosts, Roles } from "src/app/models/roles";
import { Users } from "src/app/models/users";
import { environment } from "src/environment";

@Injectable({
    providedIn: 'root'
})

export class LandingService {
    
    $isUsersLoading: BehaviorSubject<boolean> = new BehaviorSubject(false);
    $users = new BehaviorSubject([]);
    $isJobsLoading: BehaviorSubject<boolean> = new BehaviorSubject(false);
    $jobs = new BehaviorSubject([]);
    $isJobsCategoryCountLoading: BehaviorSubject<boolean> = new BehaviorSubject(false);
    $jobsCategoryCount = new BehaviorSubject([]);
    $isJobsByCategory: BehaviorSubject<boolean> = new BehaviorSubject(false);
    $jobsByCategory = new BehaviorSubject([]);
    $isApplicantsLoading: BehaviorSubject<boolean> = new BehaviorSubject(false);
    $applicants = new BehaviorSubject([]);

    users: any;
    jobs: any;
    applicants: any;
    jobsCategoryCount: any;
    category: any;
    id: any;
    user: any;
    role: any;
    err: string = '';

    position: string = '';
    setup: string = '';

    constructor(
        private http: HttpClient
    ) { }

    API_URL = (environment.apiUrl);

    getUsers() {
        return this.http.get<Users>(this.API_URL + 'api').subscribe(
            (res) => {
                this.users = res ?? [];
                this.$users.next(this.users);
                this.$isUsersLoading.next(false)
            },
            err => {
                this.users = [];
                this.$users.next(this.users);
                this.$isUsersLoading.next(false);
                if(err?.error.message) this.err = err.error.message;
            }
        )
    }

    postUser(payload: Users) {
        return this.http.post<Users>(this.API_URL + 'api', payload)
    }

    getJobs() {
        this.$isJobsLoading.next(true)
        return this.http.get(this.API_URL + 'api/jobPosts2').subscribe(
            (res) => {
                console.log('landing service jobs', res)
                this.jobs = res ?? [];
                this.$jobs.next(this.jobs);
                this.$isJobsLoading.next(false);
            },
            err => {
                this.jobs = [];
                this.$jobs.next(this.jobs);
                this.$isJobsLoading.next(false);
                if (err?.error.message) this.err = err.error.message;
            }
        )
    }

    getJobPost2(id: string, jobId: string) {
        let queryParams = new HttpParams();
        if(jobId) {
            queryParams = queryParams.append('jobId', jobId)
        }
        this.http.get(this.API_URL + `api/jobPosts/${id}`, { params: queryParams })
        .subscribe(
            (res) => {
                this.jobs = res ?? [];
                this.$jobs.next(this.jobs);
                this.$isJobsLoading.next(false);
            },
            err => {
                this.jobs = [];
                this.$jobs.next(this.jobs);
                this.$isJobsLoading.next(false);
                if (err?.error.message) this.err = err.error.message;
            }
        )
    }
    getJobPost(id: string, jobId: string): Observable<any> {
        let queryParams = new HttpParams();
        if(jobId) {
            queryParams = queryParams.append('jobId', jobId)
        }
        return this.http.get<any>(this.API_URL + `api/jobPosts/${id}`, { params: queryParams })
    }

    getJobsFiltered(designation: string, location: string, category: string, position: string, setup: string) {
        let queryParams = new HttpParams();
        if(designation) {
            queryParams = queryParams.append('designation', designation)
        }
        if(location && location !== 'Select City') {
            queryParams = queryParams.append('location', location)
        }
        if(category) {
            queryParams = queryParams.append('category', category)
        }
        if(position && position !== 'Select Position') {
            queryParams = queryParams.append('position', position);
        }
        if(setup && setup !== 'Select Setup') {
            queryParams = queryParams.append('setup', setup);
        }
        console.log('queryParams', queryParams)
        this.$isJobsLoading.next(true)
        this.http.get(this.API_URL + `api/search-jobs`, { params: queryParams }).subscribe(
            (res) => {
                console.log('jobs filtered', res)
                this.jobs = res ?? [];
                this.$jobs.next(this.jobs);
                this.$jobsByCategory.next(this.jobs);
                this.$isJobsLoading.next(false)
            },
            err => {
                this.jobs = [];
                this.$jobs.next(this.jobs);
                this.$jobsByCategory.next(this.jobs);
                this.$isJobsLoading.next(false);
                if(err?.error.message) this.err = err.error.message
            }
        )
    }

    getCandidatesFiltered(skills: string) {
        let queryParams = new HttpParams();
        if(skills && skills !== 'Select Skills') {
            queryParams = queryParams.append('skills', skills);
        }
        console.log('queryParams', queryParams, skills)
        this.$isUsersLoading.next(true)
        this.http.get(this.API_URL + `candidate/search-candidates`, { params: queryParams }).subscribe(
            (res) => {
                console.log('jobs filtered', res)
                this.users = res ?? [];
                this.$users.next(this.users);
                this.$jobsByCategory.next(this.users);
                this.$isUsersLoading.next(false)
            },
            err => {
                this.users = [];
                this.$users.next(this.users);
                this.$jobsByCategory.next(this.users);
                this.$isUsersLoading.next(false);
                if(err?.error.message) this.err = err.error.message
            }
        )
    }

    getJobsObservable(): Observable<any[]> {
        return this.$jobs.asObservable();
    }

    getIsJobsLoadingObservable(): Observable<boolean> {
        return this.$isJobsLoading.asObservable();
    }

    getJobsCategoryCount() {
        return this.http.get(this.API_URL + 'api/jobPosts2/find/category').subscribe(
            (res) => {
                this.jobsCategoryCount = res ?? [];
                this.$jobsCategoryCount.next(this.jobsCategoryCount);
                this.$isJobsCategoryCountLoading.next(false);
            },
            err => {
                this.jobsCategoryCount = [];
                this.$jobsCategoryCount.next(this.jobsCategoryCount);
                this.$isJobsCategoryCountLoading.next(false);
                if (err?.error.message) this.err = err.error.message;
            }
        )
    }

    getJobsByCategory(category: string) {
        return this.http.get(this.API_URL + `api/jobs-by-category`, { params: { category: category } }).subscribe(
            (res) => {
                console.log('jobs by category', res, category)
                this.category = res ?? [];
                this.$jobsByCategory.next(this.category);
                this.$isJobsCategoryCountLoading.next(false);
            },
            err => {
                this.category = [];
                this.$isJobsByCategory.next(this.category);
                this.$isJobsByCategory.next(false);
                if(err?.error.message) this.err = err.error.message;
            }
        )
    }

    postJob(id: any, payload: JobPosts) {
        return this.http.post<JobPosts>(this.API_URL + `api/${id}/add`, payload)
    }

    getCategory() {
        return this.http.get<Category>(this.API_URL + 'admin')
    }

    getRoles() {
        return this.http.get<Roles>(this.API_URL + 'admin/role')
    }

    apply(id: any, jobId: string, payload: Applicants) {
        let queryParams = new HttpParams();
        if(jobId) {
            queryParams = queryParams.append('jobId', jobId)
        }

        const formData: FormData = new FormData();

        formData.append("id", payload.id);
        formData.append("email", payload.email);
        formData.append("date_applied", payload.date_applied);
        formData.append("candidateInfo", JSON.stringify(payload.candidateInfo));
        
        return this.http.post(this.API_URL + `api/apply2/${id}`, payload, { params: queryParams })
    }

    invite(id: any, jobId: string, payload: Invited) {
        let queryParams = new HttpParams();
        if(jobId) {
            queryParams = queryParams.append('jobId', jobId)
        }

        const formData: FormData = new FormData();

        formData.append("date_applied", payload.date_invited);
        formData.append("candidateInfo", JSON.stringify(payload.candidateInfo));
        
        return this.http.post(this.API_URL + `api/invite/${id}`, payload, { params: queryParams })
    }

    getApplicants(id: string, jobId: string) {
        let queryParams = new HttpParams();
        if(jobId) {
            queryParams = queryParams.append('jobId', jobId)
        }
        this.http.get(this.API_URL + `api/applicants/${id}`, { params: queryParams }).subscribe(
            (res) => {
                console.log('applicants', res)
                this.applicants = res ?? [];
                this.$applicants.next(this.applicants);
                this.$isApplicantsLoading.next(false);
            },
            err => {
                this.applicants = [];
                this.$applicants.next(this.applicants);
                this.$isApplicantsLoading.next(false);
                if (err?.error.message) this.err = err.error.message;
            }
        )
    }
}