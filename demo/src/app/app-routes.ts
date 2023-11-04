import { Routes } from '@angular/router';

export const appRoutes: Routes = [
  {
    path: 'get-started',
    loadComponent: () => import('./get-started/get-started.component'),
    data: { label: 'Get Started' },
  },
  {
    path: 'cheat-sheet',
    loadComponent: () => import('./cheat-sheet/cheat-sheet.component'),
    data: { label: 'Cheat Sheet' },
  },
  {
    path: 'syntax-highlight',
    loadComponent: () => import('./syntax-highlight/syntax-highlight.component'),
    data: { label: 'Syntax Highlight' },
  },
  {
    path: 'bindings',
    loadComponent: () => import('./bindings/bindings.component'),
    data: { label: 'Bindings' },
  },
  {
    path: 'plugins',
    loadComponent: () => import('./plugins/plugins.component'),
    data: { label: 'Plugins' },
  },
  {
    path: 're-render',
    loadComponent: () => import('./rerender/rerender.component'),
    data: { label: 'Re-render' },
  },
  {
    path: '**',
    redirectTo: 'get-started',
  },
];
