import { Routes } from '@angular/router';

import { HomePageComponent } from './home-page/home-page.component';
import { InboxPageComponent } from './inbox-page/inbox-page.component';
import { SupportPageComponent } from './support-page/support-page.component';
import { AccountPageComponent } from './account-page/account-page.component';
import { ClassDashboardPageComponent } from './class-dashboard-page/class-dashboard-page.component';
import { CoursesPageComponent } from './courses-page/courses-page.component';


import { CommunityHallComponent } from './community-hall/community-hall.component';
import { ClassGradebookComponent } from './class-gradebook/class-gradebook.component';
import { RankingsPageComponent } from './rankings-page/rankings-page.component';
import { ActivitiesPageComponent } from './activities-page/activities-page.component';

import { TermsOfServiceComponent } from './legal-pages/terms-of-service/terms-of-service.component';
import { PrivacyPolicyComponent } from './legal-pages/privacy-policy/privacy-policy.component';
import { RegistrationPageComponent } from './registration-page/registration-page.component';

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
