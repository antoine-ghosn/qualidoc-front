import { Injectable, signal } from '@angular/core';
import { appTranslations } from './app.translations';

@Injectable({ providedIn: 'root' })
export class LanguageService {
  lang = signal<'fr' | 'en'>(
    (localStorage.getItem('qualidoc-lang') as 'fr' | 'en') || 'fr'
  );

  setLang(lang: 'fr' | 'en') {
    this.lang.set(lang);
    localStorage.setItem('qualidoc-lang', lang);
  }

  toggle() {
    this.setLang(this.lang() === 'fr' ? 'en' : 'fr');
  }

  t(key: string): string {
    return appTranslations[this.lang()]?.[key] ?? key;
  }
}
