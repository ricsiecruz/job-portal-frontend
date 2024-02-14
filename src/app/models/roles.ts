// import * as mongodb from "mongodb";
import { Skill } from "./category";

export interface Roles {
    role?: string;
    data?: Data;
}

interface Data {
    info?: Info;
    jobs_applied?: JobsApplied[];
    reviews?: Reviews[];
    shortlisted?: Shortlisted[];
    job_posts?: JobPosts;
    employerInfo?: EmployerInfo;
    candidateInfo?: CandidateInfo;
}

export interface JobPosts {
    _jobId?: string;
    designation?: string;
    description?: string;
    category?: string;
    date_posted?: string;
    position?: string;
    urgent?: boolean;
    setup?: string;
    minSalary?: number;
    maxSalary?: number;
    payment?: string;
    rate?: string;
    applicants?: Applicants[];
    invited?: Invited[];
}

export interface Applicants {
    id: string;
    email: any;
    date_applied: any;
    candidateInfo?: CandidateInfo;
}

export interface Invited {
    id: string;
    email: any;
    date_invited: any;
    candidateInfo?: CandidateInfo;
}

export interface EmployerInfo {
    logo: any;
    banner: any;
    company: any;
    about: any;
    location: any;
    // location: City;
    industry: string;
}

export interface CandidateInfo {
    image: any;
    banner: any;
    name: string;
    phone: any;
    designation: string;
    location: any;
    salary: any;
    skills: any;
    resume: any;
    about: string;
    education: Education[];
    work: Work[];
}

export interface Education {
    course: string;
    degree: string;
    year: string;
    // fromYear: any;
    // toYear: any;
    university: string;
    // description: string;
}

export interface Work {
    title: string;
    fromYear: string;
    toYear: string;
    company: string;
    description: string;
}

interface City {
    city: string;
}

interface Info {
    image?: string;
    name?: string;
    phone?: number;
    // email?: string;
    skills?: Skills;
    designation?: string;
    education?: string;
    experience?: string;
    profile_url?: string;
    about?: string;
    links?: string;
}

interface Skills {
    skill?: string;
}

interface JobsApplied {
    image?: string;
    company?: string;
    location?: string;
    designation?: string;
    date_applied?: string;
    status?: string;
}

interface Reviews {
    review?: string;
}

interface Shortlisted {
    company?: string;
}
