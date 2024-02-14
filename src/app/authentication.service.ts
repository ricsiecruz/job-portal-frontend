import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable, map } from "rxjs";
import { Users } from "./models/users";
import { Router } from "@angular/router";
import { environment } from "src/environment";
import { LandingService } from "./components/landing/landing.service";
// import { LandingService } from "./landing.service";

@Injectable({ providedIn: "root" })
export class AuthenticationService {

  API_URL = (environment.apiUrl);

  public currentUserSubject: BehaviorSubject<Users>;
  public currentUser: Observable<Users>;

  public isLoggedIn$!: BehaviorSubject<boolean>;
  email?: string;
  password?: string;
  err: string = '';

  constructor (
    private http: HttpClient,
    private router: Router,
    private landingService: LandingService
  ) {    
    this.currentUserSubject = new BehaviorSubject<Users>(JSON.parse(localStorage.getItem('currentUser') || 'null'));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): Users {
    return this.currentUserSubject.value;
  }

  login(email: string, password: string) {
    return this.http
      .post<any>(this.API_URL + 'api/login', { email, password })
      .pipe(map(user => {

        localStorage.setItem("currentUser", JSON.stringify(user));
        this.currentUserSubject.next(user);
        this.landingService.user = user;
        this.landingService.id = user._id;
        this.landingService.role = user['user'].role.role;
        return user;
      }));
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null!);
    this.router.navigate(['/']);
  }
}
