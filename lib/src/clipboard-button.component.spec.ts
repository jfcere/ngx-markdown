import { ComponentFixture, TestBed } from '@angular/core/testing';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { ClipboardButtonComponent } from './clipboard-button.component';

describe('ClipboardButtonComponent', () => {
  let fixture: ComponentFixture<ClipboardButtonComponent>;
  let nativeElement: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClipboardButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ClipboardButtonComponent);
    nativeElement = fixture.nativeElement;
    fixture.detectChanges();

    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe('button', () => {
    it('should have class `markdown-clipboard-button`', () => {

      const buttonElement = nativeElement.querySelector<HTMLButtonElement>('.markdown-clipboard-button');

      expect(buttonElement).toBeDefined();
    });

    it('should have class `copied` applied for 3 seconds when clicked', () => {

      const buttonElement = nativeElement.querySelector<HTMLButtonElement>('.markdown-clipboard-button');

      expect(buttonElement?.classList).not.toContain('copied');

      buttonElement?.click();
      fixture.detectChanges();

      expect(buttonElement?.classList).toContain('copied');

      vi.advanceTimersByTime(2999);
      fixture.detectChanges();

      expect(buttonElement?.classList).toContain('copied');

      vi.advanceTimersByTime(1);
      fixture.detectChanges();

      expect(buttonElement?.classList).not.toContain('copied');
    });

    it('should display text `copy`', () => {

      const buttonElement = nativeElement.querySelector<HTMLButtonElement>('.markdown-clipboard-button');

      expect(buttonElement?.innerText).toBe('Copy');
    });

    it('should display text `copied` for 3 seconds when clicked', () => {

      const buttonElement = nativeElement.querySelector<HTMLButtonElement>('.markdown-clipboard-button');

      expect(buttonElement?.innerText).toBe('Copy');

      buttonElement?.click();
      fixture.detectChanges();

      expect(buttonElement?.innerText).toBe('Copied');

      vi.advanceTimersByTime(2999);
      fixture.detectChanges();

      expect(buttonElement?.innerText).toBe('Copied');

      vi.advanceTimersByTime(1);
      fixture.detectChanges();

      expect(buttonElement?.innerText).toBe('Copy');
    });
  });
});
