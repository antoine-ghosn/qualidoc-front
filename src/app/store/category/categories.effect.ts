import { Injectable, inject } from '@angular/core';
import { Actions, createEffect } from '@ngrx/effects';
import { tap } from 'rxjs/operators';

@Injectable()
export class CategoryEffects {
  private actions$ = inject(Actions);
 
}