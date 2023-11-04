import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SyntaxHighlightComponent } from './syntax-highlight.component';

const routes: Routes = [
  {
    path: '',
    component: SyntaxHighlightComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SyntaxHighlightRoutingModule { }
