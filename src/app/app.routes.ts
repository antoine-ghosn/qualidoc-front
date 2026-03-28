import { Routes } from '@angular/router';
import { GedComponent } from './pages/ged/ged.component';
import { ImportComponent } from './pages/import/import.component';
import { ExportComponent } from './pages/export/export.component';
import { LexiqueComponent } from './pages/lexique/lexique.component';
import { SettingsComponent } from './pages/admin/settings/settings.component';
import { TypeImportSettingComponent } from './pages/admin/type-import/type-import.component';
import { TypeImportDetailComponent } from './pages/admin/type-import/type-import-detail/type-import-detail.component';
import { LandingComponent } from './pages/landing/landing.component';

export const routes: Routes = [
  {
    path: '',
    component: LandingComponent,
  },
  {
    path: 'landing',
    component: LandingComponent,
  },
  {
    path: 'ged',
    component: GedComponent,
  },
  {
    path: 'import',
    component: ImportComponent,
  },
  {
    path: 'export',
    component: ExportComponent,
  },
  {
    path: 'lexique',
    component: LexiqueComponent,
  },
  {
    path: 'admin/type-import',
    component: TypeImportSettingComponent,
  },
  {
    path: 'admin/type-import/:documentType',
    component: TypeImportDetailComponent,
  },
  {
    path: 'admin/settings/:flow',
    component: SettingsComponent,
  },
];
