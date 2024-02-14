import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { map } from "rxjs";
import { AuthenticationService } from "src/app/authentication.service";
import { Users } from "src/app/models/users";
import { environment } from "src/environment";
import { EmployerInfo, JobPosts } from 'src/app/models/roles';

@Injectable({
    providedIn: 'root'
})

export class EmployerService {

    _id: any;
    currentUser?: Users;
    logo: any;
    banner: any;

    constructor(
        private http: HttpClient,
        private authService: AuthenticationService,
        private route: ActivatedRoute
    ) {
        this.currentUser = this.authService.currentUserValue;

        this.route.paramMap.subscribe((param) => {
            this["_id"] = Number(param.get('__'));
            this["_id"] = this.currentUser?.["_id"];
        })
    }

    API_URL = (environment.apiUrl);

    getLocationApi() {
        return this.http.get('https://psgc.gitlab.io/api/cities/')
    }
    
    getUserInfo(id: any) {
        return this.http.get<Users>(this.API_URL + `api/${id}`);
    }

    updateProfile(id: any, payload: EmployerInfo) {

        const formData: FormData = new FormData();
 
		// The FormData object provides a way to programmatically submit data that the
		// Browser could have natively submitted using a "<form/>" tag. Each entry here
		// represents a form-control field.
		formData.append("company", payload.company);
        formData.append("about", payload.about);
		formData.append("location", payload.location);
        formData.append("industry", payload.industry);
 
		// While the above values are "simple" values, we can add File Blobs to the
		// FormData in the exactly same way.
		// --
		// NOTE: An optional "filename" can be provided for Files. But, for this demo,
		// we're going to allow the native filename to be used for the uploads.

        if(payload.logo.name) {
            ( payload.logo ) && formData.append( "logo", payload.logo );
        } else {
            const fileBlob = new Blob([payload.logo], {type: payload.logo.type});
            ( payload.logo ) && formData.append( "logo", fileBlob, payload.logo );
    
        }
        if(payload.banner.name) {
            ( payload.banner ) && formData.append( "banner", payload.banner );
        } else {
            const bannerBlob = new Blob([payload.banner], {type: payload.banner.type});
            ( payload.banner ) && formData.append( "banner", bannerBlob, payload.banner );
    
        }

        return this.http.put(this.API_URL + `api/${id}`, formData)
            .pipe(map(x => 
                {
                    // update stored user if the logged in user updated their own record
                    if (id == this.authService.currentUserValue["_id"]) {
                        // update local storage
                        const user = { ...this.authService.currentUserValue, ...payload };
                        localStorage.setItem('currentUser', JSON.stringify(user));

                        // publish updated user to subscribers
                        this.authService.currentUserSubject.next(user);
                    }
                    return x;
                }
            ));
    }

    updateJobPost(id: any, jobId: string, payload: JobPosts) {
        let queryParams = new HttpParams();
        if(jobId) {
            queryParams = queryParams.append('jobId', jobId)
        }
        return this.http.put(this.API_URL + `api/jobPosts/${id}`, payload, { params: queryParams })
    }

}