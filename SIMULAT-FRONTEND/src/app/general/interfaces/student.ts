import { CourseProgress } from './course-progress';

export default interface Student {
    id: number;
    username: string;
    password: string;
    email: string;
    name_given: string;
    name_last: string;
    gender: string;
    is_admin: boolean;
    is_instructor: boolean;
    is_student: boolean;
    is_super_admin: boolean;
    overall_progress: number;
    progress_score: number;
    course_progress: CourseProgress[];
    active: boolean;
}
