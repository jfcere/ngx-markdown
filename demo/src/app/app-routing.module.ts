import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'get-started',
    loadChildren: () => import('./get-started/get-started.module').then(m => m.GetStartedModule),
    data: { label: 'Get Started' },
  },
  {
    path: 'introduction',
    loadChildren: () => import('./introduction/introduction.module').then(m => m.IntroductionModule),
    data: { label: 'Introduction' },
  },
  {
    path: 'access',
    loadChildren: () => import('./access/access.module').then(m => m.AccessModule),
    data: { label: 'Access' },
  },
  {
    path: 'authentication',
    loadChildren: () => import('./authentication/authentication.module').then(m => m.AuthenticationModule),
    data: { label: 'Authentication' },
  },
  {
    path: 'authorization',
    loadChildren: () => import('./authorization/authorization.module').then(m => m.AuthorizationModule),
    data: { label: 'Authorization' },
  },
  {
    path: 'identification',
    loadChildren: () => import('./identification/identification.module').then(m => m.IdentificationModule),
    data: { label: 'Identification' },
  },
  {
    path: '**',
    redirectTo: 'get-started',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      anchorScrolling: 'enabled',
      scrollOffset: [0, 64],
      scrollPositionRestoration: 'enabled',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
