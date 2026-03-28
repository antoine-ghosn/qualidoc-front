import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UserActions, UserAPIActions } from './user.action';
import { map, of } from 'rxjs';
import { User } from '../../open-api/generated';
import { Store } from '@ngrx/store';
import { DocumentTypeActions } from '../type/type.actions';
import { exhaustMap } from 'rxjs';

// Static demo user for GITEX presentation
const DEMO_USER: User = {
  id: 'demo-001',
  username: 'demo@innologys.fr',
  firstName: 'Demo',
  lastName: 'Innologys',
  email: 'demo@innologys.fr',
  emailVerified: true,
  lastAccess: new Date().toISOString(),
  tenant: 'qualidoc',
};

@Injectable()
export class UserEffects {
  private store = inject(Store);
  private actions$ = inject(Actions);

  loadUserProfile$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.getProfile),
      exhaustMap(() =>
        of(UserAPIActions.loadUserProfileSuccess({ user: DEMO_USER }))
      )
    );
  });

  setDocumentType$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserAPIActions.loadUserProfileSuccess),
      map(({ user }) =>
        DocumentTypeActions.loadDocumentTypeByTenant({
          documentType: user?.tenant as string,
        })
      )
    );
  });
}
