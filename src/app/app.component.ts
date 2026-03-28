import { Component, effect, inject, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './layouts/header/header.component';
import { BreadcrumbComponent } from './layouts/breadcrumb/breadcrumb.component';
import { MaterialModule } from './material.module';
import { BreakpointObserver } from '@angular/cdk/layout';
import { AppNavItemComponent } from './layouts/sidebar/nav-item/nav-item.component';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { MatSidenav } from '@angular/material/sidenav';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { UserActions } from './store/user/user.action';
import { WebSocketService } from './services/web-socket.service';
import { ToastrService } from 'ngx-toastr';
import { filter } from 'rxjs/operators';
import { LanguageService } from './shared/i18n/language.service';

const MOBILE_VIEW = 'screen and (max-width: 768px)';
const TABLET_VIEW = 'screen and (min-width: 769px) and (max-width: 1024px)';
const MONITOR_VIEW = 'screen and (min-width: 1024px)';
const BELOWMONITOR = 'screen and (max-width: 1023px)';

@Component({
  selector: 'app-root',
  imports: [
    CommonModule,
    RouterOutlet,
    HeaderComponent,
    BreadcrumbComponent,
    MaterialModule,
    AppNavItemComponent,
    NgScrollbarModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  @ViewChild('leftsidenav') sidenav!: MatSidenav;

  isLandingPage = false;
  isMobile = false;
  isTablet = false;
  sidenavCollapsed = false;
  sidenavOpened = false;
  breakpointObserver = inject(BreakpointObserver);
  store = inject(Store);
  WebSocketService = inject(WebSocketService);
  private router = inject(Router);
  lang = inject(LanguageService);

  navItems: any[] = [];

  private buildNavItems() {
    this.navItems = [
      { navCap: this.lang.t('nav.documents') },
      { displayName: this.lang.t('nav.documents'), iconName: 'folders', route: '/ged' },
      { displayName: this.lang.t('nav.lexique'), iconName: 'vocabulary', route: '/lexique' },
      { navCap: this.lang.t('nav.transfers') },
      { displayName: this.lang.t('nav.import'), iconName: 'download', route: '/import' },
      { displayName: this.lang.t('nav.export'), iconName: 'upload', route: '/export' },
      { navCap: this.lang.t('nav.admin') },
      { displayName: this.lang.t('nav.docTypes'), iconName: 'file-settings', route: '/admin/type-import' },
      { displayName: this.lang.t('nav.configImport'), iconName: 'settings', route: 'admin/settings/import' },
      { displayName: this.lang.t('nav.configExport'), iconName: 'settings', route: '/admin/settings/export' },
    ];
  }

  constructor() {
    effect(() => {
      // Rebuild nav items when language changes
      this.lang.lang();
      this.buildNavItems();
    });
  }

  ngOnInit(): void {
    this.buildNavItems();
    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event) => {
        this.isLandingPage = event.urlAfterRedirects === '/' || event.urlAfterRedirects === '/landing';
      });
    this.isLandingPage = this.router.url === '/' || this.router.url === '/landing';

    this.WebSocketService.connect();
    this.breakpointObserver
      .observe([MOBILE_VIEW, TABLET_VIEW, MONITOR_VIEW, BELOWMONITOR])
      .subscribe((state) => {
        this.isMobile = state.breakpoints[MOBILE_VIEW];
        this.isTablet = state.breakpoints[TABLET_VIEW];

        if (this.isMobile) {
          this.sidenavOpened = false;
          this.sidenavCollapsed = false;
        } else if (this.isTablet) {
          this.sidenavOpened = true;
          this.sidenavCollapsed = true;
        } else {
          this.sidenavOpened = true;
          this.sidenavCollapsed = false;
        }
      });

    this.store.dispatch(UserActions.getProfile());
  }

  toggleCollapsed() {
    if (!this.isMobile) {
      this.sidenavCollapsed = !this.sidenavCollapsed;
    }
  }

  toggleMobileNav() {
    if (this.isMobile) {
      this.sidenav?.toggle();
    }
  }

  onNavItemClick() {
    if (this.isMobile) {
      this.sidenav?.close();
    }
  }
}
