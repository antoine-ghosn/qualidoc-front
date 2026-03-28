import {
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import * as TablerIcons from 'angular-tabler-icons/icons';
import { TablerIconsModule } from 'angular-tabler-icons';
import { routes } from './app.routes';
import { MaterialModule } from './material.module';
import { provideState, provideStore } from '@ngrx/store';
import { documentsFeature } from './store/document/documents.reducer';
import { categoriesFeature } from './store/category/categories.reducer';
import { aliasesFeature } from './store/alias/aliases.reducer';
import { trackingFeature } from './store/tracking/tracking.reducer';
import { metaReducers } from './store/metaReducer/metaReducer';
import { settingsFeature } from './store/settings/settings.reducer';
import { typeFeature } from './store/type/type.reducer';
import Keycloak from 'keycloak-js';
import { config } from './shared/utils/enviroment/dev';
import { BASE_PATH } from './open-api/generated';
import { SettingEffects } from './store/settings/settings.effect';
import { provideHttpClient } from '@angular/common/http';
import { provideEffects } from '@ngrx/effects';
import { AliasEffects } from './store/alias/aliases.effect';
import { ErrorStateMatcher } from '@angular/material/core';
import { ShowErrorOnTouchMatcher } from './shared/utils/validators/ErrorStateMatcher';
import { DocumentTypeEffects } from './store/type/type.effect';
import { DocumentEffects } from './store/document/documents.effect';
import { UserEffects } from './store/user/user.effect';
import { userFeature } from './store/user/user.reducer';
import { TrackingEffects } from './store/tracking/tracking.effect';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { Toastrffects } from './store/toastr/toastr.effect';
import { StorageEffects } from './store/storage/storage.effect';
import { storageFeature } from './store/storage/storage.reducer';

// Demo mode: Keycloak bypassed with static mock
const keycloakMock = {
  authenticated: true,
  token: 'demo-token',
  subject: 'demo-user',
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  updateToken: () => Promise.resolve(true),
} as unknown as Keycloak;

export const appConfig: ApplicationConfig = {
  providers: [
    { provide: Keycloak, useValue: keycloakMock },
    {
      provide: BASE_PATH,
      useValue: config.basePath,
    },
    { provide: ErrorStateMatcher, useClass: ShowErrorOnTouchMatcher },
    provideAnimations(),
    provideToastr(),
    provideHttpClient(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withComponentInputBinding()),
    provideStore({}, { metaReducers: metaReducers }),
    provideState(typeFeature),
    provideState(documentsFeature),
    provideState(categoriesFeature),
    provideState(aliasesFeature),
    provideState(trackingFeature),
    provideState(settingsFeature),
    provideState(userFeature),
    provideState(storageFeature),
    provideEffects([
      SettingEffects,
      AliasEffects,
      DocumentTypeEffects,
      DocumentEffects,
      UserEffects,
      TrackingEffects,
      Toastrffects,
      StorageEffects
    ]),
    importProvidersFrom(MaterialModule, TablerIconsModule.pick(TablerIcons)),
  ],
};
