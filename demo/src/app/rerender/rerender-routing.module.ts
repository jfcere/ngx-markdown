import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RerenderComponent } from './rerender.component';

const routes: Routes = [
  {
    path: '',
    component: RerenderComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RerenderRoutingModule { }
