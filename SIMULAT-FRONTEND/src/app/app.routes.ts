import { Routes } from '@angular/router';

// general pages (home, inbox, support, account, legal) - the same for all users
import { HomePageComponent } from './general/home-page/home-page.component';
import { InboxPageComponent } from './general/inbox-page/inbox-page.component';
import { SupportPageComponent } from './general/support-page/support-page.component';
import { AccountPageComponent } from './general/account-page/account-page.component';
import { CommunityHallComponent } from './general/community-hall/community-hall.component';
import { TermsOfServiceComponent } from './general/legal-pages/terms-of-service/terms-of-service.component';
import { PrivacyPolicyComponent } from './general/legal-pages/privacy-policy/privacy-policy.component';
import { RegistrationPageComponent } from './general/registration-page/registration-page.component';

// student view pages - only for students
import { ClassDashboardPageComponent } from './student-view/class-dashboard-page/class-dashboard-page.component';
import { CoursesPageComponent } from './student-view/courses-page/courses-page.component';
import { ClassGradebookComponent } from './student-view/class-gradebook/class-gradebook.component';
import { RankingsPageComponent } from './student-view/rankings-page/rankings-page.component';
import { ActivitiesPageComponent } from './student-view/activities-page/activities-page.component';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomePageComponent},
    { path: 'register', component: RegistrationPageComponent},
    { path: 'inbox', component: InboxPageComponent},
    { path: 'support', component: SupportPageComponent},
    { path: 'account', component: AccountPageComponent},
    { path: 'legal/terms_of_service', component: TermsOfServiceComponent},
    { path: 'legal/privacy_policy', component: PrivacyPolicyComponent},
    { path: 'dashboard', component: ClassDashboardPageComponent},
    { path: 'courses',component: CoursesPageComponent},
    { path: 'dashboard/gradebook', component: ClassGradebookComponent},
    { path: 'dashboard/rankings', component: RankingsPageComponent},
    { path: 'dashboard/community-hall', component: CommunityHallComponent},
    { path: 'dashboard/activities', component: ActivitiesPageComponent}
];
