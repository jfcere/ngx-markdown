import { animate, style, transition, trigger } from '@angular/animations';

export const ZOOM_ANIMATION = trigger('zoomAnimation', [
  transition('void => *', [
    style({ opacity: 0, transform: 'translateY(32px) scale(0)' }),
    animate('400ms cubic-bezier(0.35, 0, 0.25, 1)', style({ opacity: 1, transform: 'translateY(0) scale(1)' })),
  ]),
  transition('* => void', [
    style({ opacity: 1, transform: 'translateY(0)' }),
    animate('300ms cubic-bezier(0.35, 0, 0.25, 1)', style({ opacity: 0, transform: 'translateY(32px)' })),
  ]),
]);
