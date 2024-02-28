import { Routes } from '@angular/router';

import { HomePageComponent } from './home-page/home-page.component';
import { InboxPageComponent } from './inbox-page/inbox-page.component';
import { SupportPageComponent } from './support-page/support-page.component';
import { AccountPageComponent } from './account-page/account-page.component';

export const routes: Routes = [
    { path: 'home', component: HomePageComponent},
    { path: 'inbox', component: InboxPageComponent},
    { path: 'support', component: SupportPageComponent},
    { path: 'account', component: AccountPageComponent}
];
