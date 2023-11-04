import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheatSheetComponent } from './cheat-sheet.component';

const routes: Routes = [
  {
    path: '',
    component: CheatSheetComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CheatSheetRoutingModule { }
