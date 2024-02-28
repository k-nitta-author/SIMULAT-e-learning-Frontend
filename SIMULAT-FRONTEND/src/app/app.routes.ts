import { Routes } from '@angular/router';

import { HomePageComponent } from './home-page/home-page.component';
import { InboxPageComponent } from './inbox-page/inbox-page.component';
import { SupportPageComponent } from './support-page/support-page.component';
import { AccountPageComponent } from './account-page/account-page.component';
import { ClassDashboardPageComponent } from './class-dashboard-page/class-dashboard-page.component';
import { CoursesPageComponent } from './courses-page/courses-page.component';

import { TermsOfServiceComponent } from './legal-pages/terms-of-service/terms-of-service.component';
import { PrivacyPolicyComponent } from './legal-pages/privacy-policy/privacy-policy.component';

export const routes: Routes = [
    { path: 'home', component: HomePageComponent},
    { path: 'inbox', component: InboxPageComponent},
    { path: 'support', component: SupportPageComponent},
    { path: 'account', component: AccountPageComponent},
    { path: 'terms_of_service', component: TermsOfServiceComponent},
    { path: 'privacy_policy', component: PrivacyPolicyComponent},
    { path: 'dashboard', component: ClassDashboardPageComponent},
    { path: 'courses',component: CoursesPageComponent}
];
