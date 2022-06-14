import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { ClipboardButtonComponent } from './clipboard-button.component';

describe('ClipboardButtonComponent', () => {
  let fixture: ComponentFixture<ClipboardButtonComponent>;
  let nativeElement: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        ClipboardButtonComponent,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ClipboardButtonComponent);
    nativeElement = fixture.nativeElement;
    fixture.detectChanges();
  });

  describe('button', () => {
    it('should have class `markdown-clipboard-button`', () => {

      const buttonElement = nativeElement.querySelector<HTMLButtonElement>('.markdown-clipboard-button');

      expect(buttonElement).toBeDefined();
    });

    it('should have class `copied` applied for 3 seconds when clicked', fakeAsync(() => {

      const buttonElement = nativeElement.querySelector<HTMLButtonElement>('.markdown-clipboard-button');

      expect(buttonElement?.classList).not.toContain('copied');

      buttonElement?.click();
      fixture.detectChanges();

      expect(buttonElement?.classList).toContain('copied');

      tick(2999);
      fixture.detectChanges();

      expect(buttonElement?.classList).toContain('copied');

      tick(1);
      fixture.detectChanges();

      expect(buttonElement?.classList).not.toContain('copied');
    }));

    it('should display text `copy`', () => {

      const buttonElement = nativeElement.querySelector<HTMLButtonElement>('.markdown-clipboard-button');

      expect(buttonElement?.innerText).toBe('Copy');
    });

    it('should display text `copied` for 3 seconds when clicked', fakeAsync(() => {

      const buttonElement = nativeElement.querySelector<HTMLButtonElement>('.markdown-clipboard-button');

      expect(buttonElement?.innerText).toBe('Copy');

      buttonElement?.click();
      fixture.detectChanges();

      expect(buttonElement?.innerText).toBe('Copied');

      tick(2999);
      fixture.detectChanges();

      expect(buttonElement?.innerText).toBe('Copied');

      tick(1);
      fixture.detectChanges();

      expect(buttonElement?.innerText).toBe('Copy');
    }));
  });
});
