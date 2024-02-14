import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map } from "rxjs";
import { AuthenticationService } from "src/app/authentication.service";
import { CandidateInfo } from "src/app/models/roles";
import { environment } from "src/environment";

@Injectable({
    providedIn: 'root'
})

export class CandidateService {

    API_URL = (environment.apiUrl);

    constructor(
        private http: HttpClient,
        private authService: AuthenticationService
    ) {
    }

    updateProfile(id: any, payload: CandidateInfo) {
        console.log('payload', payload)
        const formData: FormData = new FormData();
 
		// The FormData object provides a way to programmatically submit data that the
		// Browser could have natively submitted using a "<form/>" tag. Each entry here
		// represents a form-control field.
		formData.append("name", payload.name);
        formData.append("phone", payload.phone);
		formData.append("designation", payload.designation);
		formData.append("location", payload.location);
        formData.append("salary", payload.salary);
        formData.append("about", payload.about);
        if(payload.skills !== undefined && payload.skills !== null) {
            for(let i = 0; i < payload.skills.length; i++) {
                const skill = payload.skills[i];
                formData.append(`skills[${i}][id]`, skill.id.toString());
                formData.append(`skills[${i}][itemName]`, skill.itemName);
            }
        }
        // formData.append("education[year]", payload.education.year);
        // formData.append("education[university]", payload.education.university);

        payload.education.forEach((edu: any, index: any) => {
            formData.append(`education[${index}][degree]`, edu.degree)
        })

        payload.education.forEach((edu: any, index: any) => {
            formData.append(`education[${index}][course]`, edu.course)
        })

        payload.education.forEach((edu: any, index: any) => {
            formData.append(`education[${index}][year]`, edu.year)
        })

        payload.education.forEach((edu: any, index: any) => {
            formData.append(`education[${index}][university]`, edu.university)
        })

        payload.work.forEach((edu: any, index: any) => {
            formData.append(`work[${index}][company]`, edu.company)
        })

        payload.work.forEach((edu: any, index: any) => {
            formData.append(`work[${index}][title]`, edu.title)
        })

        payload.work.forEach((edu: any, index: any) => {
            formData.append(`work[${index}][fromYear]`, edu.fromYear)
        })

        payload.work.forEach((edu: any, index: any) => {
            formData.append(`work[${index}][toYear]`, edu.toYear)
        })

        payload.work.forEach((edu: any, index: any) => {
            formData.append(`work[${index}][description]`, edu.description)
        })
 
		// While the above values are "simple" values, we can add File Blobs to the
		// FormData in the exactly same way.
		// --
		// NOTE: An optional "filename" can be provided for Files. But, for this demo,
		// we're going to allow the native filename to be used for the uploads.

        if(payload.image.name) {
            ( payload.image ) && formData.append( "image", payload.image );
        } else {
            const fileBlob = new Blob([payload.image], {type: payload.image.type});
            ( payload.image ) && formData.append( "image", fileBlob, payload.image );
    
        }
        if(payload.banner.name) {
            ( payload.banner ) && formData.append( "banner", payload.banner );
        } else {
            const bannerBlob = new Blob([payload.banner], {type: payload.banner.type});
            ( payload.banner ) && formData.append( "banner", bannerBlob, payload.banner );
    
        }
        if(payload.resume !== undefined) {
            if(payload.resume.name) {
                ( payload.resume ) && formData.append( "resume", payload.resume );
            } else {
                const resumeBlob = new Blob([payload.resume], {type: payload.resume.type});
                ( payload.resume ) && formData.append( "resume", resumeBlob, payload.resume );
        
            }
        }

        return this.http.put(this.API_URL + `candidate/${id}`, formData)
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

    getJobsApplied(id: string): Observable<any> {
        return this.http.get(this.API_URL + `candidate/applied/${id}`)
    }

    getJobInvite(id: string): Observable<any> {
        return this.http.get(this.API_URL + `candidate/invite/${id}`)
    }

}