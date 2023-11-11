import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ScrollspyNavComponent } from './scrollspy-nav.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ScrollspyNavComponent,
  ],
  exports: [ScrollspyNavComponent],
})
export class ScrollspyNavModule {}
