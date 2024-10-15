import { Routes } from '@angular/router';

// General pages (home, inbox, support, account, legal) - the same for all users
import { HomePageComponent } from './general/home-page/home-page.component';
import { InboxPageComponent } from './general/inbox-page/inbox-page.component';
import { SupportPageComponent } from './general/support-page/support-page.component';
import { AccountPageComponent } from './general/account-page/account-page.component';
import { CommunityHallComponent } from './general/community-hall/community-hall.component';
import { TermsOfServiceComponent } from './general/legal-pages/terms-of-service/terms-of-service.component';
import { PrivacyPolicyComponent } from './general/legal-pages/privacy-policy/privacy-policy.component';
import { RegistrationPageComponent } from './general/registration-page/registration-page.component';

// Student view pages - only for students
import { ClassDashboardPageComponent } from './student-view/class-dashboard-page/class-dashboard-page.component';
import { CoursesPageComponent } from './student-view/courses-page/courses-page.component';
import { ClassGradebookComponent } from './student-view/class-gradebook/class-gradebook.component';
import { RankingsPageComponent } from './student-view/rankings-page/rankings-page.component';
import { ActivitiesPageComponent } from './student-view/activities-page/activities-page.component';

// Admin view pages - only for admins
import { AdminDashboardComponent } from './admin-view/admin-dashboard/admin-dashboard.component';
import { InstructorDashboardComponent } from './instructor-view/instructor-dashboard/instructor-dashboard.component';

import { StudentAddComponent } from './admin-view/students/student-add/student-add.component';
import { StudentEditComponent } from './admin-view/students/student-edit/student-edit.component';
import { InstructorAddComponent } from './admin-view/instructors/instructor-add/instructor-add.component';
import { InstructorDeleteComponent } from './admin-view/instructors/instructor-delete/instructor-delete.component';
import { InstructorEditComponent } from './admin-view/instructors/instructor-edit/instructor-edit.component';
import { StudentDeleteComponent } from './admin-view/students/student-delete/student-delete.component';
import { StudentsListComponent } from './admin-view/students/students-list/students-list.component';
import { ContentListComponent } from './admin-view/content/content-list/content-list.component';
import { AssignmentsListComponent } from './admin-view/assignments/assignments-list/assignments-list.component';
import { QuizListComponent } from './admin-view/quizzes/quizzes-list/quizzes-list.component';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomePageComponent },
    { path: 'register', component: RegistrationPageComponent },
    { path: 'inbox', component: InboxPageComponent },
    { path: 'support', component: SupportPageComponent },
    { path: 'account', component: AccountPageComponent },
    { path: 'legal/terms_of_service', component: TermsOfServiceComponent },
    { path: 'legal/privacy_policy', component: PrivacyPolicyComponent },

    // Student view routes
    { path: 'dashboard', component: ClassDashboardPageComponent },
    { path: 'courses', component: CoursesPageComponent },
    { path: 'dashboard/gradebook', component: ClassGradebookComponent },
    { path: 'dashboard/rankings', component: RankingsPageComponent },
    { path: 'dashboard/community-hall', component: CommunityHallComponent },
    { path: 'dashboard/activities', component: ActivitiesPageComponent },

    // Admin dashboard route
    { path: 'admin/dashboard', component: AdminDashboardComponent },

    // Admin student management routes
    { path: 'admin/students/add', component: StudentAddComponent },
    { path: 'admin/students/edit/:id', component: StudentEditComponent },
    { path: 'admin/students/delete/:id', component: StudentDeleteComponent },
    { path: 'admin/students/list', component: StudentsListComponent }, 

    // Admin content management routes
    { path: 'admin/content', component: ContentListComponent },

    // Admin assignment management routes
    { path: 'admin/assignments', component: AssignmentsListComponent },

    // Admin quiz management routes
    { path: 'admin/quizzes', component: QuizListComponent },

    // Admin instructor management routes
    { path: 'admin/instructors/add', component: InstructorAddComponent },
    { path: 'admin/instructors/edit/:id', component: InstructorEditComponent },
    { path: 'admin/instructors/delete/:id', component: InstructorDeleteComponent },

    // Instructor dashboard route
    { path: 'instructor/dashboard', component: InstructorDashboardComponent }
];
