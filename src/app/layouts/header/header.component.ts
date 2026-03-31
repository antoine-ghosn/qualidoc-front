import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  inject,
  signal,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../../material.module';
import { TablerIconsModule } from 'angular-tabler-icons';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { LanguageService } from '../../shared/i18n/language.service';
import { selectUser } from '../../store/user/user.reducer';
import {
  FileCompressionUpdate,
  FileTransferUpdate,
  User,
} from '../../open-api/generated';
import { NotificationComponent } from '../../components/notification/notification.component';

interface profiledd {
  id: number;
  title: string;
  link: string;
  new?: boolean;
}

@Component({
  selector: 'app-header',
  imports: [
    RouterModule,
    MaterialModule,
    TablerIconsModule,
    CommonModule,
    NotificationComponent,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  @Input() showToggle = true;
  @Input() toggleChecked = false;
  @Output() toggleMobileNav = new EventEmitter<void>();
  @Output() toggleMobileFilterNav = new EventEmitter<void>();
  @Output() toggleCollapsed = new EventEmitter<void>();
  store = inject(Store);
  updates = signal<(FileTransferUpdate | FileCompressionUpdate)[]>([]);

  theme: string = 'dark';
  user$ = this.store.selectSignal<User | undefined>(selectUser);

  private htmlElement = document.querySelector('html')!;
  private router = inject(Router);
  lang = inject(LanguageService);

  isCollapse: boolean = false;

  profiledd: profiledd[] = [
    {
      id: 1,
      title: 'My Profile',
      link: '/',
    },
    {
      id: 2,
      title: 'My Projects',
      link: '/',
    },
    {
      id: 3,
      title: 'Inbox',
      new: true,
      link: '/',
    },
    {
      id: 4,
      title: ' Mode',
      link: '/',
    },
    {
      id: 5,
      title: ' Account Settings',
      link: '/',
    },
    {
      id: 6,
      title: 'Sign Out',
      link: '/authentication/login',
    },
  ];

  ngOnInit() {
    this.setlightDark(this.theme);
  }

  setlightDark(theme: string) {
    this.theme = theme;
    if (theme === 'dark') {
      this.htmlElement.classList.add('dark-theme');
      this.htmlElement.classList.remove('light-theme');
    } else {
      this.htmlElement.classList.remove('dark-theme');
      this.htmlElement.classList.add('light-theme');
    }
  }

  signout() {
    this.router.navigate(['/']);
  }

  onMenuClick() {
    // Emits both — app.component decides what to do based on screen size
    this.toggleCollapsed.emit();
    this.toggleMobileNav.emit();
  }

  changeLanguage(lang: any): void {}
}
