import { Component, HostListener, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { landingTranslations } from '../../shared/i18n/landing.translations';
import { LanguageService } from '../../shared/i18n/language.service';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent {
  private langService = inject(LanguageService);
  lang = this.langService.lang;
  showPitch = signal(false);
  showGitexPitch = signal(false);
  currentSlide = signal(0);
  currentQuote = signal(0);
  totalSlides = 9;
  gitexTotalSlides = 6;

  quotes = ['quote1', 'quote2', 'quote3'];
  private quoteInterval: any;

  constructor(private router: Router) {
    this.startQuoteRotation();
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboard(event: KeyboardEvent): void {
    if (!this.showPitch() && !this.showGitexPitch()) return;
    if (event.key === 'ArrowRight') this.nextSlide();
    if (event.key === 'ArrowLeft') this.prevSlide();
    if (event.key === 'Escape') { this.closePitch(); this.closeGitexPitch(); }
  }

  t(key: string): string {
    return landingTranslations[this.lang()]?.[key] ?? key;
  }

  toggleLang(): void {
    this.langService.toggle();
  }

  openPitch(): void {
    this.showPitch.set(true);
    this.currentSlide.set(0);
  }

  closePitch(): void {
    this.showPitch.set(false);
  }

  openGitexPitch(): void {
    this.showGitexPitch.set(true);
    this.currentSlide.set(0);
  }

  closeGitexPitch(): void {
    this.showGitexPitch.set(false);
  }

  get activeTotalSlides(): number {
    return this.showGitexPitch() ? this.gitexTotalSlides : this.totalSlides;
  }

  nextSlide(): void {
    if (this.currentSlide() < this.activeTotalSlides - 1) {
      this.currentSlide.set(this.currentSlide() + 1);
    }
  }

  prevSlide(): void {
    if (this.currentSlide() > 0) {
      this.currentSlide.set(this.currentSlide() - 1);
    }
  }

  goToSlide(index: number): void {
    this.currentSlide.set(index);
  }

  accessApp(): void {
    this.router.navigate(['/ged']);
  }

  private startQuoteRotation(): void {
    this.quoteInterval = setInterval(() => {
      this.currentQuote.set((this.currentQuote() + 1) % this.quotes.length);
    }, 4000);
  }

  ngOnDestroy(): void {
    if (this.quoteInterval) clearInterval(this.quoteInterval);
  }
}
