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

// Admin data management pages
import { StudentsListComponent } from './admin-view/students/students-list/students-list.component';
import { ContentListComponent } from './admin-view/content/content-list/content-list.component';
import { ContentDetailComponent } from './instructor-view/content-detail/content-detail.component';
import { AssignmentsListComponent } from './admin-view/assignments/assignments-list/assignments-list.component';
import { QuizListComponent } from './admin-view/quizzes/quizzes-list/quizzes-list.component';
import { InstructorsListComponent } from './admin-view/instructors/instructors-list/instructors-list.component';
import { CourseDetailsPageComponent } from './student-view/course-details-page/course-details-page.component';
import { TermsPageComponent } from './general/terms-page/terms-page.component';
import { TermsDetailComponent } from './general/terms-detail/terms-detail.component';
import { ChallengePageComponent } from './general/challenge-page/challenge-page.component';
import { ChallengeDetailPageComponent } from './general/challenge-detail-page/challenge-detail-page.component';
import { AssignmentPageComponent } from './student-view/assignment-page/assignment-page.component';
import { ContentPageComponent } from './general/content-page/content-page.component';
import { BadgePageComponent } from './student-view/badge-page/badge-page.component';
import { StudyGroupPageComponent } from './student-view/study-group-page/study-group-page.component';
import { StudyGroupDetailComponent } from './student-view/study-group-detail/study-group-detail.component';
import { QuizDetailComponent } from './admin-view/quizzes/quiz-detail/quiz-detail.component';
import { QuizComponent } from './student-view/quiz/quiz.component';
import { ChallengeComponent } from './admin-view/challenge/challenge.component';
import { PendingGradesComponent } from './instructor-view/pending-grades/pending-grades.component';
import { AssignmentDetailComponent } from './general/assignment-detail/assignment-detail.component';

import { BadgeListComponent } from './admin-view/badge-list/badge-list.component';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomePageComponent },
    { path: 'register', component: RegistrationPageComponent },
    { path: 'inbox', component: InboxPageComponent },
    { path: 'support', component: SupportPageComponent },
    { path: 'account', component: AccountPageComponent },
    { path: 'account/:id', component: AccountPageComponent },
    { path: 'legal/terms_of_service', component: TermsOfServiceComponent },
    { path: 'legal/privacy_policy', component: PrivacyPolicyComponent },

    // Student view routes
    { path: 'dashboard', component: ClassDashboardPageComponent },
    { path: 'dashboard/gradebook', component: ClassGradebookComponent },
    { path: 'dashboard/rankings', component: RankingsPageComponent },
    { path: 'dashboard/community-hall', component: CommunityHallComponent },
    { path: 'dashboard/activities', component: ActivitiesPageComponent },

    // Admin dashboard route
    { path: 'admin/dashboard', component: AdminDashboardComponent },

    // Admin challenge management route
    { path: 'admin/challenges', component: ChallengeComponent },

    // Admin student management route
    { path: 'admin/students', component: StudentsListComponent }, 

    // Admin content management route
    { path: 'admin/content', component: ContentListComponent },
    { path: 'course/:id/pending-grades', component: PendingGradesComponent },

    // Admin assignment management route
    { path: 'admin/assignments', component: AssignmentsListComponent },

    // Admin quiz management route
    { path: 'quiz', component: QuizListComponent },
    { path: 'admin/quiz/:id', component:  QuizDetailComponent},

    // Student View Quiz Page Routes
    { path: 'quiz/:id', component: QuizComponent },

    // Admin badge management route
    { path: 'admin/badges', component: BadgeListComponent },
    // Admin instructor management route
    { path: 'admin/instructors', component: InstructorsListComponent },

    // Instructor dashboard route
    { path: 'instructor/dashboard', component: InstructorDashboardComponent },

    // Course Resource Views
    { path: 'courses', component: CoursesPageComponent },
    { path: 'course-detail/:id', component: CourseDetailsPageComponent},

    // Terms Component
    { path: 'terms', component: TermsPageComponent},
    { path: 'terms/:id', component: TermsDetailComponent},

    // Challenge Views
    { path: 'challenge', component: ChallengePageComponent},
    { path: 'challenge-detail/:id', component: ChallengeDetailPageComponent},

    // Assignment Views

    { path: 'assignment', component: AssignmentPageComponent},
    { path: 'assignment/:id', component: AssignmentDetailComponent },
    
    // Content Views

    {path: 'content', component: ContentPageComponent},
    { path: 'content/:id', component: ContentDetailComponent },


    // Badge Views

    {path: 'badge', component: BadgePageComponent},

    // Study Group Views

    {path: 'study-group', component: StudyGroupPageComponent},
    {path: 'study-group/:id', component: StudyGroupDetailComponent}


];
