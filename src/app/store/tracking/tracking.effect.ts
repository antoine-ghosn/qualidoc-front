import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  TrackingActions,
  TrackingAPIActions,
  TrackingWebSocketActions,
} from './tracking.action';
import { catchError, EMPTY, exhaustMap, filter, map, of, tap } from 'rxjs';
import { DefaultService, FileTransferUpdate } from '../../open-api/generated';
import { ToastrActions } from '../toastr/toastr.action';

@Injectable()
export class TrackingEffects {
  private actions$ = inject(Actions);
  private service = inject(DefaultService);

  startTransfert$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TrackingActions.startTransfert),
      exhaustMap(({ flow, settingId, folder }) =>
        this.service
          .startTransfert(flow as 'IMPORT' | 'EXPORT', { settingId, folder })
          .pipe(
            map((tracking: any) =>
              TrackingAPIActions.transfertStartedSuccess({ tracking })
            ),
            catchError((error) => EMPTY)
          )
      )
    );
  });

  loadTrackings$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TrackingActions.loadTracking),
      exhaustMap(({ flow }) =>
        this.service.listTracking(flow).pipe(
          map((result: any) =>
            TrackingAPIActions.loadTrackingSuccess({ items: result })
          ),
          catchError((error) => EMPTY)
        )
      )
    );
  });

  cancelTransfert$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TrackingActions.cancelTransfert),
      exhaustMap(({ flow, id }) =>
        this.service.cancelTransfert(flow as 'IMPORT' | 'EXPORT', id).pipe(
          map(() =>
            TrackingAPIActions.cancelTransfertSuccess({ trackingId: id })
          ),
          catchError((error) => EMPTY)
        )
      )
    );
  });

  deleteTransfert$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TrackingActions.deleteTransfert),
      exhaustMap(({ id }) =>
        this.service.deleteTrackingById(id).pipe(
          map(() => TrackingAPIActions.deleteTransfertSuccess({ id })),
          catchError((error) =>
            of(TrackingAPIActions.deleteTransfertFail({ error }))
          )
        )
      )
    );
  });

  downloadTransfert$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TrackingActions.downloadTransfert),
      exhaustMap(({ id }) =>
        this.service
          .downloadTransfertDocuments(id, 'body', false, {
            httpHeaderAccept: 'application/octet-stream',
          })
          .pipe(
            map((blob) => {
              const url = window.URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = `transfert-${id}.zip`;
              a.click();
              window.URL.revokeObjectURL(url);

              return TrackingAPIActions.downloadTransfertSuccess();
            }),
            catchError((error) => {
              return of(
                TrackingAPIActions.downloadTransfertFail({
                  error,
                })
              );
            })
          )
      )
    )
  );

  downloadTransfertFolder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TrackingActions.downloadTransfertFolder),
      exhaustMap(({ folder }) =>
        this.service
          .downloadFolderAsZip(folder, 'body', false, {
            httpHeaderAccept: 'application/octet-stream',
          })
          .pipe(
            map((blob) => {
              const url = window.URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = `transfert-${folder}.zip`;
              a.click();
              window.URL.revokeObjectURL(url);

              return TrackingAPIActions.downloadTransfertFolderSuccess();
            }),
            catchError((error) => {
              return of(
                TrackingAPIActions.downloadTransfertFolderFail({
                  error,
                })
              );
            })
          )
      )
    )
  );

  uploadFiles$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TrackingActions.uploadFiles),
      exhaustMap(({ folder, flow, files }) =>
        this.service.uploadFiles(files, folder).pipe(
          map((tracking: any) =>
            TrackingAPIActions.transfertStartedSuccess({ tracking })
          ),
          catchError((error) =>
            of(TrackingAPIActions.transfertStartedFail({ error }))
          )
        )
      )
    )
  );

  cancelTransfertSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TrackingAPIActions.cancelTransfertSuccess),
      map(() =>
        ToastrActions.notify({
          title: 'Transfert cancelled',
          status: 'success',
          message: 'Transfert cancelled successfully',
        })
      )
    );
  });

  resumeTransfert$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TrackingActions.resumeTransfert),
      exhaustMap(({ flow, id }) =>
        this.service.resumeTransfert(flow as 'IMPORT' | 'EXPORT', id).pipe(
          map((result: any) => TrackingAPIActions.resumeTransfertSuccess()),
          catchError((error) =>
            of(TrackingAPIActions.resumeTransfertFail({ error }))
          )
        )
      )
    );
  });

  transfertFinishedSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TrackingWebSocketActions.updateFileTransfertProgress),
      filter(
        ({ update }) =>
          update.status === FileTransferUpdate.StatusEnum.Completed
      ),
      map(({ update }) =>
        TrackingWebSocketActions.fileTransfertFinishedSuccess({
          update: update,
        })
      )
    );
  });

  fileTransfertFinishedSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TrackingWebSocketActions.fileTransfertFinishedSuccess),

      map(({ update }) =>
        ToastrActions.notify({
          title: 'File transferred',
          status: 'success',
          message: `File ${update.fileName} transferred successfully`,
        })
      )
    );
  });

  toastrErrorNotify$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(
        TrackingAPIActions.cancelTransfertFail,
        TrackingAPIActions.deleteTransfertFail,
        TrackingAPIActions.downloadTransfertFail,
        TrackingAPIActions.resumeTransfertFail,
        TrackingAPIActions.transfertStartedFail,
        TrackingAPIActions.loadTrackingFail,
        TrackingWebSocketActions.fileTransfertFinishedFail,
        TrackingWebSocketActions.fileCompressionFinishedFail
      ),
      map((action) =>
        ToastrActions.notify({
          title: action.type,
          status: 'error',
          message: action.error?.error.message || 'An error occurred',
        })
      )
    );
  });
}
