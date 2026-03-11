import { Routes } from '@angular/router';
import { BusinessList } from './features/business-list/business-list';
import { BusinessDetails } from './features/business-details/business-details';

export const routes: Routes = [
  {
    path: 'business-accounts',
    component: BusinessList,
    title: 'Business Accounts',
  },
  {
    path: 'business-profiles',
    component: BusinessList,
    title: 'Business Profiles',
  },
  {
    path: 'business-details/:id',
    component: BusinessDetails,
    title: 'Business Details',
  },
  {
    path: '',
    redirectTo: '/business-accounts',
    pathMatch: 'full',
  },
];
