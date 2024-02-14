import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
// import { error } from "console";
import { BehaviorSubject } from "rxjs";
import { Category, Course, Degree, Position, Rate, Setup, Skill, University } from "src/app/models/category";
import { Users } from "src/app/models/users";
import { environment } from "src/environment";

@Injectable({
    providedIn: 'root'
})

export class AdminService {

    $isCategoryLoading: BehaviorSubject<boolean> = new BehaviorSubject(false);
    $categories = new BehaviorSubject([]);

    $isPositionLoading: BehaviorSubject<boolean> = new BehaviorSubject(false);
    $positions = new BehaviorSubject([]);

    $isSetupLoading: BehaviorSubject<boolean> = new BehaviorSubject(false);
    $setup = new BehaviorSubject([]);

    $isRateLoading: BehaviorSubject<boolean> = new BehaviorSubject(false);
    $rate = new BehaviorSubject([]);

    $isSkillsLoading: BehaviorSubject<boolean> = new BehaviorSubject(false);
    $skills = new BehaviorSubject([]);

    $isDegreeLoading: BehaviorSubject<boolean> = new BehaviorSubject(false);
    $degree = new BehaviorSubject([]);

    $isCourseLoading: BehaviorSubject<boolean> = new BehaviorSubject(false);
    $course = new BehaviorSubject([]);

    $isUnivLoading: BehaviorSubject<boolean> = new BehaviorSubject(false);
    $university = new BehaviorSubject([]);

    categories: any;
    positions: any;
    setup: any;
    rate: any;
    skills: any;
    degree: any;
    course: any;
    university: any;
    err: string = '';

    constructor(
        private http: HttpClient
    ) {
    }

    API_URL = (environment.apiUrl);

    getCategories() {
        return this.http.get(this.API_URL + 'admin').subscribe(
            (response) => {
                this.categories = response ?? [];
                this.$categories.next(this.categories);
                this.$isCategoryLoading.next(false);
            },
            err => {
                this.categories = [];
                this.$categories.next(this.categories);
                this.$isCategoryLoading.next(false);
                if (err?.error.message) this.err = err.error.message;
            }
        )
    }

    postCategory(payload: Category) {
        return this.http.post<Category>(this.API_URL + 'admin/category', payload)
    }

    getPositions() {
        return this.http.get(this.API_URL + 'admin/position').subscribe((res) => {
            this.positions = res ?? [];
            this.$positions.next(this.positions);
            this.$isPositionLoading.next(false);
        }), (err: any) => {
            this.positions = [];
            this.$positions.next(this.positions);
            this.$isPositionLoading.next(false);
            if(err?.error.message) this.err = err.error.message;
        }
    }

    postPosition(payload: Position) {
        return this.http.post<Position>(this.API_URL + 'admin/position', payload)
    }

    getSetup() {
        return this.http.get(this.API_URL + 'admin/setup').subscribe((res) => {
            this.setup = res ?? [];
            this.$setup.next(this.setup);
            this.$isSetupLoading.next(false);
        }), (err: any) => {
            this.setup = [];
            this.$setup.next(this.setup);
            this.$isSetupLoading.next(false);
            if(err?.error.message) this.err = err.error.message;
        }
    }

    postSetup(payload: Setup) {
        return this.http.post<Setup>(this.API_URL + 'admin/setup', payload)
    }

    getRate() {
        return this.http.get(this.API_URL + 'admin/rate').subscribe((res) => {
            this.rate = res ?? [];
            this.$rate.next(this.rate);
            this.$isRateLoading.next(false);
        }), (err: any) => {
            this.rate = [];
            this.$rate.next(this.rate);
            this.$isRateLoading.next(false);
            if(err?.error.message) this.err = err.error.message;
        }
    }

    postRate(payload: Rate) {
        return this.http.post<Rate>(this.API_URL + 'admin/rate', payload)
    }

    getSkills() {
        return this.http.get(this.API_URL + 'admin/skills')
        .subscribe((res) => {
            this.skills = res ?? [];
            this.$skills.next(this.skills);
            this.$isSkillsLoading.next(false)
        }), (err: any) => {
            this.skills = [];
            this.$skills.next(this.skills);
            this.$isSkillsLoading.next(false);
            if(err?.error.message) this.err = err.error.message;
        }
    }

    postSkill(payload: Skill) {
        return this.http.post<Skill>(this.API_URL + 'admin/skills', payload)
    }

    getDegrees() {
        return this.http.get(this.API_URL + 'admin/degree')
        .subscribe((res) => {
            this.degree = res ?? [];
            this.$degree.next(this.degree);
            this.$isDegreeLoading.next(false)
        }), (err: any) => {
            this.degree = [];
            this.$degree.next(this.degree);
            this.$isDegreeLoading.next(false);
            if(err?.error.message) this.err = err.error.message;
        }
    }

    postDegree(payload: Degree) {
        return this.http.post<Degree>(this.API_URL + 'admin/degree', payload)
    }

    getCourses() {
        return this.http.get(this.API_URL + 'admin/course')
        .subscribe((res) => {
            this.course = res ?? [];
            this.$course.next(this.course);
            this.$isCourseLoading.next(false)
        }), (err: any) => {
            this.degree = [];
            this.$course.next(this.course);
            this.$isCourseLoading.next(false);
            if(err?.error.message) this.err = err.error.message;
        }
    }

    postCourse(payload: Course) {
        return this.http.post<Course>(this.API_URL + 'admin/course', payload)
    }

    getUniversities() {
        return this.http.get(this.API_URL + 'admin/university').subscribe((res) => {
            this.university = res ?? [];
            this.$university.next(this.university);
            this.$isUnivLoading.next(false)
        }), (err: any) => {
            this.university = [];
            this.$university.next(this.university);
            this.$isUnivLoading.next(false);
            if(err?.error.message) this.err = err.error.message;
        }
    }

    postUniversity(payload: University) {
        return this.http.post<University>(this.API_URL + 'admin/university', payload)
    }

}